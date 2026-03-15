import { useEffect, useMemo } from "react";

function extractTagText(html, tagName) {
  const re = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = html.match(re);
  return match ? match[1].trim() : "";
}

function extractBody(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1] : html;
}

export default function LegacyHtmlPage({ html }) {
  const title = useMemo(() => extractTagText(html, "title"), [html]);
  const bodyHtml = useMemo(() => extractBody(html), [html]);

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}

