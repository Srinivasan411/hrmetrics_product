import { readdir, readFile, writeFile, rm, rename, stat, mkdir } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const wpUploadsRoot = path.join(repoRoot, "public", "assets", "images", "wp-uploads");

const SKIP_DIRS = new Set(["node_modules", "dist", ".git"]);
const TEXT_EXTS = new Set([".js", ".jsx", ".ts", ".tsx", ".json", ".html", ".css", ".md", ".svg"]);
const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif", ".svg", ".ico"]);

function toPosix(p) {
  return p.replaceAll("\\", "/");
}

function isImageFile(p) {
  return IMAGE_EXTS.has(path.extname(p).toLowerCase());
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

function simplifyBasename(name) {
  // Strip common wordpress/hash suffixes: foo_deadbeef, foo_deadbeefdeadbeef..., foo-deadbeef
  return name
    .replace(/_[0-9a-f]{8}$/i, "")
    .replace(/_[0-9a-f]{32}$/i, "")
    .replace(/-[0-9a-f]{8}$/i, "");
}

function collectWpUploadRefs(text) {
  const rels = [];
  const re =
    /(?:\/)?assets\/images\/wp-uploads\/([^\s"'<>?,#]+\.(?:png|jpe?g|gif|webp|avif|svg|ico))(?:\?[^"'<>]*)?(?:#[^"'<>]*)?/gi;
  let m;
  while ((m = re.exec(text)) !== null) {
    rels.push(m[1]);
  }
  return rels;
}

function replaceRefs(text, relMap) {
  const re =
    /(?:\/)?assets\/images\/wp-uploads\/([^\s"'<>?,#]+\.(?:png|jpe?g|gif|webp|avif|svg|ico))(?:\?[^"'<>]*)?(?:#[^"'<>]*)?/gi;
  return text.replace(re, (full, rel) => {
    const nextRel = relMap.get(rel);
    if (!nextRel) return full;
    return `/assets/images/wp-uploads/${nextRel}`;
  });
}

async function removeEmptyDirs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await removeEmptyDirs(full);
      const after = await readdir(full);
      if (after.length === 0) await rm(full, { recursive: true, force: true });
    }
  }
}

async function main() {
  if (!(await exists(wpUploadsRoot))) {
    console.error(`Missing folder: ${wpUploadsRoot}`);
    process.exitCode = 1;
    return;
  }

  // Scan project for used wp-uploads URLs.
  const allFiles = await walkFiles(repoRoot);
  const textFiles = allFiles.filter((p) => TEXT_EXTS.has(path.extname(p).toLowerCase()));

  const used = new Set();
  for (const filePath of textFiles) {
    let content;
    try {
      content = await readFile(filePath, "utf8");
    } catch {
      continue;
    }
    for (const rel of collectWpUploadRefs(content)) used.add(rel);
  }

  // Build rename map for used files that exist.
  const relMap = new Map(); // oldRel -> newRel
  const takenPerDir = new Map(); // dir -> Set(filename)

  const usedSorted = [...used].sort((a, b) => a.localeCompare(b));
  for (const rel of usedSorted) {
    const abs = path.join(wpUploadsRoot, ...rel.split("/"));
    if (!(await exists(abs))) continue;

    const dir = toPosix(path.dirname(rel));
    const ext = path.extname(rel);
    const base = path.basename(rel, ext);
    const simplifiedBase = simplifyBasename(base);

    const desired = `${simplifiedBase}${ext}`;
    if (!takenPerDir.has(dir)) takenPerDir.set(dir, new Set());
    const taken = takenPerDir.get(dir);

    let finalName = desired;
    let i = 2;
    while (taken.has(finalName)) {
      finalName = `${simplifiedBase}-${i}${ext}`;
      i += 1;
    }
    taken.add(finalName);

    const nextRel = dir === "." ? finalName : `${dir}/${finalName}`;
    relMap.set(rel, nextRel);
  }

  // Apply renames on disk.
  const renamed = [];
  for (const [oldRel, newRel] of relMap.entries()) {
    if (oldRel === newRel) continue;
    const from = path.join(wpUploadsRoot, ...oldRel.split("/"));
    const to = path.join(wpUploadsRoot, ...newRel.split("/"));
    await mkdir(path.dirname(to), { recursive: true });
    if (await exists(from)) {
      await rename(from, to);
      renamed.push({ from: oldRel, to: newRel });
    }
  }

  // Rewrite references across text files.
  const updatedFiles = [];
  for (const filePath of textFiles) {
    let content;
    try {
      content = await readFile(filePath, "utf8");
    } catch {
      continue;
    }
    const next = replaceRefs(content, relMap);
    if (next !== content) {
      await writeFile(filePath, next, "utf8");
      updatedFiles.push(path.relative(repoRoot, filePath));
    }
  }

  // Delete any wp-uploads images that are no longer referenced (post-rename).
  const keep = new Set([...relMap.values()]);
  const allWpFiles = await listFiles(wpUploadsRoot);
  let deleted = 0;
  for (const abs of allWpFiles) {
    const rel = toPosix(path.relative(wpUploadsRoot, abs));
    if (!isImageFile(rel)) continue;
    if (!keep.has(rel)) {
      await rm(abs, { force: true });
      deleted += 1;
    }
  }

  await removeEmptyDirs(wpUploadsRoot);

  const report = {
    wpUploadsRoot: path.relative(repoRoot, wpUploadsRoot),
    referencedBefore: used.size,
    renamed: renamed.length,
    updatedFiles: updatedFiles.length,
    deletedUnused: deleted,
  };

  await writeFile(
    path.join(repoRoot, "scripts", "simplify-wp-uploads.report.json"),
    JSON.stringify(report, null, 2) + "\n",
    "utf8"
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

