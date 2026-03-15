import { readdir, readFile, writeFile, mkdir, copyFile, rm, stat } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();

// User-requested source: public/hrmmitra.com/blog/wp-content/uploads
const uploadsDir = path.join(repoRoot, "public", "hrmmitra.com", "blog", "wp-content", "uploads");
// Fallback source if public uploads were already pruned.
const distUploadsDir = path.join(repoRoot, "dist", "hrmmitra.com", "blog", "wp-content", "uploads");
const targetImagesDir = path.join(repoRoot, "public", "assets", "images", "wp-uploads");

const SKIP_DIRS = new Set(["node_modules", "dist", ".git"]);
const TEXT_EXTS = new Set([".js", ".jsx", ".ts", ".tsx", ".json", ".html", ".css", ".md", ".svg"]);
const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif", ".svg", ".ico"]);

function isImagePath(p) {
  const ext = path.extname(p).toLowerCase();
  return IMAGE_EXTS.has(ext);
}

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function walkFiles(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walkFiles(full)));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

async function listFiles(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await listFiles(full)));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function toPosix(p) {
  return p.replaceAll("\\", "/");
}

function normalizeUploadsRel(rawUrl) {
  // Extract the part after "wp-content/uploads/" (with or without a leading slash).
  const m = rawUrl.match(/(?:^|\/)wp-content\/uploads\/([\s\S]+)$/i);
  if (!m) return null;
  let rel = m[1];

  // Strip query/hash and any trailing quotes.
  rel = rel.split("#")[0].split("?")[0];
  // srcset candidates might be followed by a comma/descriptor; keep only the URL path segment.
  rel = rel.split(",")[0].trim().split(/\s+/)[0];
  rel = rel.replaceAll("\\", "/");
  rel = rel.replace(/^\/+/, "");
  rel = rel.trim();

  if (!rel) return null;
  if (!isImagePath(rel)) return null;
  return rel;
}

function makeNewUrl(rel) {
  return `/assets/images/wp-uploads/${toPosix(rel)}`;
}

function normalizeWpUploadsRel(rawUrl) {
  const m = rawUrl.match(/assets\/images\/wp-uploads\/([\s\S]+)$/i);
  if (!m) return null;
  let rel = m[1];
  rel = rel.split("#")[0].split("?")[0];
  rel = rel.split(",")[0].trim().split(/\s+/)[0];
  rel = rel.replaceAll("\\", "/");
  rel = rel.replace(/^\/+/, "");
  rel = rel.trim();
  if (!rel) return null;
  if (!isImagePath(rel)) return null;
  return rel;
}

function replaceUploadsImageUrls(text, replacements) {
  // Match any URL that contains wp-content/uploads/...<imageExt>
  // Includes forms like:
  // - ../../../hrmmitra.com/blog/wp-content/uploads/2025/06/x.png
  // - https://i0.wp.com/hrmmitra.com/blog/wp-content/uploads/...
  // - /wp-content/uploads/...
  const re =
    /(?:https?:\/\/[^\s"'<>]+)?[^\s"'<>]*?(?:\/)?wp-content\/uploads\/([^\s"'<>?,#]+\.(?:png|jpe?g|gif|webp|avif|svg|ico))(?:\?[^"'<>]*)?(?:#[^"'<>]*)?/gi;

  return text.replace(re, (full, rel) => {
    const normalized = normalizeUploadsRel(`wp-content/uploads/${rel}`);
    if (!normalized) return full;
    return replacements.get(normalized) || makeNewUrl(normalized);
  });
}

function replaceWpUploadsImageUrls(text, relRemap) {
  const re =
    /(?:\/)?assets\/images\/wp-uploads\/([^\s"'<>?,#]+\.(?:png|jpe?g|gif|webp|avif|svg|ico))(?:\?[^"'<>]*)?(?:#[^"'<>]*)?/gi;

  return text.replace(re, (full, rel) => {
    const normalized = normalizeWpUploadsRel(`assets/images/wp-uploads/${rel}`);
    if (!normalized) return full;
    const nextRel = relRemap.get(normalized) || normalized;
    return makeNewUrl(nextRel);
  });
}

async function main() {
  if (!(await exists(uploadsDir))) {
    // Allow running after the folder was deleted; we can still migrate from dist.
    if (!(await exists(distUploadsDir))) {
      console.error(`Uploads directory not found: ${uploadsDir}`);
      process.exitCode = 1;
      return;
    }
  }

  await mkdir(targetImagesDir, { recursive: true });

  const repoFiles = await walkFiles(repoRoot);
  const textFiles = repoFiles.filter((p) => TEXT_EXTS.has(path.extname(p).toLowerCase()));

  // Build an index of dist upload filenames per directory to resolve missing "original" names.
  const distIndex = new Map(); // dir -> Set(fileName)
  if (await exists(distUploadsDir)) {
    const distFiles = await listFiles(distUploadsDir);
    for (const abs of distFiles) {
      const rel = toPosix(path.relative(distUploadsDir, abs));
      if (!isImagePath(rel)) continue;
      const dir = toPosix(path.dirname(rel));
      const file = path.basename(rel);
      if (!distIndex.has(dir)) distIndex.set(dir, new Set());
      distIndex.get(dir).add(file);
    }
  }

  function resolveMissingRel(rel) {
    const dir = toPosix(path.dirname(rel));
    const ext = path.extname(rel);
    const base = path.basename(rel, ext);
    const candidates = distIndex.get(dir);
    if (!candidates) return null;
    const matches = [...candidates].filter((f) => f.startsWith(`${base}_`) && f.endsWith(ext));
    matches.sort((a, b) => a.localeCompare(b));
    return matches.length > 0 ? `${dir === "." ? "" : `${dir}/`}${matches[0]}` : null;
  }

  // Pass 1: collect referenced images (either from wp-content/uploads OR already migrated wp-uploads).
  const referencedRel = new Set();
  const referencedWpRel = new Set();
  const matchRe =
    /(?:https?:\/\/[^\s"'<>]+)?[^\s"'<>]*?(?:\/)?wp-content\/uploads\/[^\s"'<>?,#]+\.(?:png|jpe?g|gif|webp|avif|svg|ico)(?:\?[^"'<>]*)?(?:#[^"'<>]*)?/gi;
  const wpRe = /(?:\/)?assets\/images\/wp-uploads\/[^\s"'<>?,#]+\.(?:png|jpe?g|gif|webp|avif|svg|ico)(?:\?[^"'<>]*)?(?:#[^"'<>]*)?/gi;

  for (const filePath of textFiles) {
    let content;
    try {
      content = await readFile(filePath, "utf8");
    } catch {
      continue;
    }
    const matches = content.match(matchRe) || [];
    for (const m of matches) {
      const rel = normalizeUploadsRel(m);
      if (rel) referencedRel.add(rel);
    }

    const wpMatches = content.match(wpRe) || [];
    for (const m of wpMatches) {
      const rel = normalizeWpUploadsRel(m);
      if (rel) referencedWpRel.add(rel);
    }
  }

  // Determine final rels, resolving missing originals to a hashed variant if needed.
  const moved = [];
  const missing = [];
  const replacements = new Map(); // rel(from wp-content) -> new url
  const relRemap = new Map(); // rel(from wp-uploads) -> resolved rel
  const finalRels = new Set();

  for (const rel of new Set([...referencedRel, ...referencedWpRel])) {
    let resolved = rel;

    const fromPublic = path.join(uploadsDir, ...resolved.split("/"));
    const fromDist = path.join(distUploadsDir, ...resolved.split("/"));
    const hasSource = (await exists(fromPublic)) || (await exists(fromDist));
    if (!hasSource) {
      const alt = resolveMissingRel(resolved);
      if (alt) resolved = alt;
    }

    finalRels.add(resolved);
    if (rel !== resolved) relRemap.set(rel, resolved);
  }

  // Copy resolved images into public/assets/images/wp-uploads/<rel>.
  for (const rel of finalRels) {
    const fromPublic = path.join(uploadsDir, ...rel.split("/"));
    const fromDist = path.join(distUploadsDir, ...rel.split("/"));
    const to = path.join(targetImagesDir, ...rel.split("/"));
    await mkdir(path.dirname(to), { recursive: true });

    const from = (await exists(fromPublic)) ? fromPublic : (await exists(fromDist)) ? fromDist : null;
    if (!from) {
      missing.push(rel);
      continue;
    }

    // If already copied, just register replacement.
    if (!(await exists(to))) await copyFile(from, to);

    moved.push(rel);
  }

  // Create replacements map for wp-content references after resolution.
  for (const rel of referencedRel) {
    const resolved = relRemap.get(rel) || rel;
    replacements.set(rel, makeNewUrl(resolved));
  }

  // Pass 2: rewrite text files to canonical /assets/images/wp-uploads/ URLs.
  const updatedFiles = [];
  for (const filePath of textFiles) {
    let content;
    try {
      content = await readFile(filePath, "utf8");
    } catch {
      continue;
    }

    let next = replaceUploadsImageUrls(content, replacements);
    next = replaceWpUploadsImageUrls(next, relRemap);
    if (next !== content) {
      await writeFile(filePath, next, "utf8");
      updatedFiles.push(path.relative(repoRoot, filePath));
    }
  }

  // Prune any target images that are no longer referenced.
  const targetFiles = (await exists(targetImagesDir)) ? await listFiles(targetImagesDir) : [];
  const toKeep = new Set([...finalRels].map((r) => toPosix(r)));
  let pruned = 0;
  for (const abs of targetFiles) {
    const rel = toPosix(path.relative(targetImagesDir, abs));
    if (!isImagePath(rel)) continue;
    if (!toKeep.has(rel)) {
      await rm(abs, { force: true });
      pruned += 1;
    }
  }

  // Delete ALL images in uploadsDir (used or unused) since URLs now point to /assets/images/wp-uploads/.
  // Keep non-image files (like sinatra dynamic css) untouched.
  const deleted = [];
  if (await exists(uploadsDir)) {
    const allUploadsFiles = await listFiles(uploadsDir);
    const uploadImages = allUploadsFiles.filter((p) => isImagePath(p));
    for (const imgAbs of uploadImages) {
      const relToUploads = toPosix(path.relative(uploadsDir, imgAbs));
      await rm(imgAbs, { force: true });
      deleted.push(relToUploads);
    }
  }

  const report = {
    uploadsDir: path.relative(repoRoot, uploadsDir),
    targetImagesDir: path.relative(repoRoot, targetImagesDir),
    referencedImages: referencedRel.size,
    movedImages: moved.length,
    missingImages: missing.length,
    updatedFiles: updatedFiles.length,
    deletedUploadImages: deleted.length,
    prunedTargetImages: pruned,
    missingImagePaths: missing.sort(),
    updatedFilePaths: updatedFiles.sort(),
  };

  await mkdir(path.join(repoRoot, "scripts"), { recursive: true });
  await writeFile(
    path.join(repoRoot, "scripts", "migrate-blog-uploads-images.report.json"),
    JSON.stringify(report, null, 2) + "\n",
    "utf8"
  );

  if (process.argv.includes("--delete-report")) {
    try {
      await rm(path.join(repoRoot, "scripts", "migrate-blog-uploads-images.report.json"), { force: true });
    } catch {
      // ignore
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
