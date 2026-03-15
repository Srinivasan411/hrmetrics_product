import { useEffect, useState } from "react";
import LegacyHtmlPage from "./LegacyHtmlPage.jsx";

export default function LegacyRoute({ loader }) {
  const [html, setHtml] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    Promise.resolve()
      .then(() => loader())
      .then((loadedHtml) => {
        if (!cancelled) setHtml(loadedHtml || "");
      })
      .catch((e) => {
        if (!cancelled) setError(e);
      });

    return () => {
      cancelled = true;
    };
  }, [loader]);

  if (error) {
    return (
      <div className="container" style={{ padding: "48px 16px" }}>
        <h1>Failed to load page</h1>
        <pre style={{ whiteSpace: "pre-wrap" }}>{String(error)}</pre>
      </div>
    );
  }

  if (!html) return null;

  return <LegacyHtmlPage html={html} />;
}

