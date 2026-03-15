import { readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const imagesRoot = path.join(repoRoot, "public", "assets", "images");

const TEXT_EXTS = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".json",
  ".html",
  ".css",
  ".md",
  ".svg",
]);

const SKIP_DIRS = new Set(["node_modules", "dist", ".git"]);

function normalizeAssetPath(raw) {
  if (!raw) return null;
  let p = raw.trim();

  p = p.replaceAll("\\", "/");
  p = p.replace(/^['"`(]+/, "").replace(/['"`)]*$/, "");

  // Strip query/hash.
  p = p.split("#")[0].split("?")[0];

  // Normalize leading bits.
  p = p.replace(/^(\.\.\/)+/, "");
  p = p.replace(/^\/+/, "");

  if (!p.startsWith("assets/images/")) return null;
  return p;
}

function collectImageRefs(text) {
  const refs = new Set();
  const re = /(?:^|[\s("'`])(\.\.\/)?\/?assets\/images\/[^"'`\s)<>]+/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    const normalized = normalizeAssetPath(match[0]);
    if (normalized) refs.add(normalized);
  }
  return refs;
}

async function walkFiles(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walkFiles(full)));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

async function listImageFiles(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await listImageFiles(full)));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function toPosixRel(fromAbs) {
  return path.relative(repoRoot, fromAbs).replaceAll("\\", "/");
}

async function main() {
  const allFiles = await walkFiles(repoRoot);

  const used = new Set();
  for (const filePath of allFiles) {
    const ext = path.extname(filePath).toLowerCase();
    if (!TEXT_EXTS.has(ext)) continue;

    let content;
    try {
      content = await readFile(filePath, "utf8");
    } catch {
      continue;
    }

    for (const ref of collectImageRefs(content)) used.add(ref);
  }

  // Keep only those that physically exist under public/assets/images.
  const usedExisting = new Set();
  for (const ref of used) {
    const abs = path.join(repoRoot, "public", ref);
    try {
      const s = await stat(abs);
      if (s.isFile()) usedExisting.add(ref);
    } catch {
      // ignore
    }
  }

  const imageFiles = await listImageFiles(imagesRoot);
  const unusedAbs = [];
  for (const abs of imageFiles) {
    const rel = toPosixRel(abs); // public/assets/images/...
    const assetRel = rel.replace(/^public\//, ""); // assets/images/...
    if (!usedExisting.has(assetRel)) unusedAbs.push(abs);
  }

  const report = {
    scannedFiles: allFiles.length,
    referencedImages: used.size,
    referencedImagesExisting: usedExisting.size,
    totalImages: imageFiles.length,
    unusedImages: unusedAbs.length,
    unusedImagePaths: unusedAbs.map(toPosixRel).sort(),
  };

  await writeFile(
    path.join(repoRoot, "scripts", "prune-public-images.report.json"),
    JSON.stringify(report, null, 2) + "\n",
    "utf8"
  );

  for (const abs of unusedAbs) {
    await rm(abs, { force: true });
  }

  if (process.argv.includes("--delete-report")) {
    await rm(path.join(repoRoot, "scripts", "prune-public-images.report.json"), { force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
