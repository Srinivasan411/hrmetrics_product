import { mkdir, readdir, writeFile, stat, readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const repoRoot = process.cwd();
const distAssetsDir = path.join(repoRoot, "dist", "assets");
const srcDir = path.join(repoRoot, "src");
const pagesDir = path.join(srcDir, "pages");

const SKIP_SLUGS = new Set(["about", "activity-management-software", "index", "index.static"]);

function isLikelyHtmlModule(source) {
  // Vite raw imports compile to: var e=`...`;export{e as default};
  return source.includes("export{e as default}") && source.includes("var e=`");
}

function slugFromDistFilename(filename) {
  const name = filename.replace(/\.js$/i, "");
  const parts = name.split("-");

  // Some Vite chunks end with a trailing "-" before ".js".
  while (parts.length > 0 && parts.at(-1) === "") parts.pop();

  // Strip trailing hash segments (these almost always contain uppercase or "_").
  while (parts.length > 1 && /[A-Z_]/.test(parts.at(-1))) parts.pop();

  return parts.join("-");
}

function componentNameFromSlug(slug) {
  const words = slug
    .split(/[^a-zA-Z0-9]+/g)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1));
  const base = words.join("") || "Page";
  return `${base}Page`;
}

function escapeForTemplateLiteral(html) {
  return String(html || "")
    .replaceAll("\\", "\\\\")
    .replaceAll("`", "\\`")
    .replaceAll("${", "\\${");
}

function pageModuleSource(slug, html) {
  const componentName = componentNameFromSlug(slug);
  const safeHtml = escapeForTemplateLiteral(html);

  return `import LegacyHtmlPage from "../LegacyHtmlPage.jsx";
const html = \`${safeHtml}\`;

export default function ${componentName}() {
  return <LegacyHtmlPage html={html} />;
}
`;
}

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await ensureDir(pagesDir);

  const entries = await readdir(distAssetsDir);
  for (const filename of entries) {
    if (!filename.endsWith(".js")) continue;
    if (/^\d+-/.test(filename)) continue; // app chunks, not legacy HTML pages

    const fullPath = path.join(distAssetsDir, filename);
    const src = await readFile(fullPath, "utf8");
    if (!isLikelyHtmlModule(src)) continue;

    const slug = slugFromDistFilename(filename);
    if (!slug || SKIP_SLUGS.has(slug)) continue;

    const mod = await import(pathToFileURL(fullPath).href);
    const html = String(mod.default || "");
    if (!html.trim()) continue;

    const pageOutPath = path.join(pagesDir, `${slug}.jsx`);
    if (await fileExists(pageOutPath)) continue;

    await writeFile(pageOutPath, pageModuleSource(slug, html), "utf8");
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});