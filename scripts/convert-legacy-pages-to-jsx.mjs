import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import HTMLtoJSX from "htmltojsx";

const root = process.cwd();
const pagesDir = path.join(root, "src", "pages");

function getTemplateLiteral(text, startNeedle) {
  const startIdx = text.indexOf(startNeedle);
  if (startIdx < 0) return null;

  const tickIdx = text.indexOf("`", startIdx + startNeedle.length);
  if (tickIdx < 0) return null;

  let i = tickIdx + 1;
  for (; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === "\\") {
      // Skip escaped character (e.g. \`, \${).
      i += 1;
      continue;
    }
    if (ch === "`") break;
  }
  if (i >= text.length) return null;

  const raw = text.slice(tickIdx + 1, i);
  return { raw, tickIdx, endTickIdx: i };
}

function decodeCommonEscapes(raw) {
  // Only decode sequences that were used to prevent template literal interpolation.
  return raw
    .replaceAll("\\`", "`")
    .replaceAll("\\${", "${");
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? match[1].replace(/\s+/g, " ").trim() : "";
}

function extractBodyInfo(html) {
  const bodyOpen = html.match(/<body([^>]*)>/i);
  const bodyInner = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const attrs = bodyOpen ? bodyOpen[1] : "";
  const inner = bodyInner ? bodyInner[1] : html;

  const classMatch = attrs.match(/\bclass\s*=\s*(['"])([\s\S]*?)\1/i);
  const idMatch = attrs.match(/\bid\s*=\s*(['"])([\s\S]*?)\1/i);

  return {
    className: classMatch ? classMatch[2].trim() : "",
    id: idMatch ? idMatch[2].trim() : "",
    inner,
  };
}

function stripScriptsAndStyles(html) {
  return (
    html
      // Remove HTML comments.
      .replaceAll(/<!--([\s\S]*?)-->/g, "")
      // In a JS-enabled SPA, noscript blocks are not useful and can confuse HTML->JSX conversion.
      .replaceAll(/<noscript\b[\s\S]*?<\/noscript>/gi, "")
      // Drop inline scripts/styles; these won't reliably execute in React render anyway.
      .replaceAll(/<script\b[\s\S]*?<\/script>/gi, "")
      .replaceAll(/<style\b[\s\S]*?<\/style>/gi, "")
  );
}

function buildComponentSource({ componentName, title, bodyWrapperHtml }) {
  const safeTitle = title.replaceAll("\\", "\\\\").replaceAll("`", "\\`").replaceAll('"', '\\"');
  return `import { useEffect } from "react";

export default function ${componentName}() {
  useEffect(() => {
    ${safeTitle ? `document.title = "${safeTitle}";` : ""}
  }, []);

  return (
${indentJsx(bodyWrapperHtml, 4)}
  );
}
`;
}

function indentJsx(jsx, spaces) {
  const pad = " ".repeat(spaces);
  return jsx
    .trim()
    .split("\n")
    .map((line) => `${pad}${line}`.replace(/\s+$/g, ""))
    .join("\n");
}

function toJsx(html) {
  const converter = new HTMLtoJSX({ createClass: false });
  let jsx = converter.convert(html);

  // htmltojsx turns empty attributes like alt="" / class="" into bare props.
  // In JSX that becomes boolean true, which can render "true" strings.
  jsx = jsx.replace(/(^|\s)className(?=[\s/>])/g, '$1className=""');
  jsx = jsx.replace(/(^|\s)alt(?=[\s/>])/g, '$1alt=""');

  return jsx;
}

function convertPageFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");
  if (!original.includes("const html = `")) return { changed: false };
  if (!original.includes("export default function")) return { changed: false };

  const fnMatch = original.match(/export default function\s+([A-Za-z0-9_]+)\s*\(/);
  if (!fnMatch) return { changed: false };
  const componentName = fnMatch[1];

  const tpl = getTemplateLiteral(original, "const html = ");
  if (!tpl) return { changed: false };

  const decoded = decodeCommonEscapes(tpl.raw);
  const title = extractTitle(decoded);

  const { className, id, inner } = extractBodyInfo(decoded);
  const cleanedInner = stripScriptsAndStyles(inner);

  const wrapperAttrs = [
    className ? ` class="${className.replaceAll('"', "&quot;")}"` : "",
    id ? ` id="${id.replaceAll('"', "&quot;")}"` : "",
  ].join("");
  const wrapped = `<div${wrapperAttrs}>${cleanedInner}</div>`;

  const jsxMarkup = toJsx(wrapped);
  const nextSource = buildComponentSource({ componentName, title, bodyWrapperHtml: jsxMarkup });

  if (nextSource.trim() === original.trim()) return { changed: false };
  fs.writeFileSync(filePath, nextSource, "utf8");
  return { changed: true, componentName, title };
}

function main() {
  const args = new Set(process.argv.slice(2));
  const shouldWrite = args.has("--write");
  if (!shouldWrite) {
    console.error("Pass --write to rewrite src/pages/*.jsx");
    process.exit(2);
  }

  const entries = fs
    .readdirSync(pagesDir)
    .filter((name) => name.endsWith(".jsx"))
    .map((name) => path.join(pagesDir, name));

  let changedCount = 0;
  for (const filePath of entries) {
    const result = convertPageFile(filePath);
    if (result.changed) changedCount += 1;
  }

  console.log(`Converted ${changedCount} page(s).`);
}

main();
