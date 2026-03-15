import { useEffect, useMemo, useRef } from "react";

function extractTagText(html, tagName) {
  const re = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = html.match(re);
  return match ? match[1].trim() : "";
}

function extractHead(html) {
  const match = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  return match ? match[1] : "";
}

function extractBody(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1] : html;
}

export default function LegacyHtmlPage({ html }) {
  const title = useMemo(() => extractTagText(html, "title"), [html]);
  const headHtml = useMemo(() => extractHead(html), [html]);
  const bodyHtml = useMemo(() => extractBody(html), [html]);
  const injectedHeadNodesRef = useRef([]);

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  useEffect(() => {
    // Remove any nodes injected by the previous page render.
    for (const node of injectedHeadNodesRef.current) node.remove();
    injectedHeadNodesRef.current = [];

    if (!headHtml) return;

    // Only inject styles (not scripts) to avoid unexpected side effects.
    const parsed = new DOMParser().parseFromString(`<head>${headHtml}</head>`, "text/html");
    const nodes = parsed.head.querySelectorAll('link[rel="stylesheet"], style');

    for (const node of nodes) {
      const clone = document.createElement(node.tagName.toLowerCase());
      for (const attr of node.attributes) clone.setAttribute(attr.name, attr.value);
      clone.textContent = node.textContent;
      clone.setAttribute("data-legacy-injected", "true");
      document.head.appendChild(clone);
      injectedHeadNodesRef.current.push(clone);
    }

    return () => {
      for (const node of injectedHeadNodesRef.current) node.remove();
      injectedHeadNodesRef.current = [];
    };
  }, [headHtml]);

  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}
