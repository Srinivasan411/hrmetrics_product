import { useEffect, useRef } from "react";

export default function LegacyDocumentFrame({ html, title }) {
  const frameRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const resize = () => {
      try {
        const doc = frame.contentWindow?.document;
        if (!doc) return;
        const body = doc.body;
        const htmlEl = doc.documentElement;
        const height = Math.max(
          body?.scrollHeight || 0,
          body?.offsetHeight || 0,
          htmlEl?.clientHeight || 0,
          htmlEl?.scrollHeight || 0,
          htmlEl?.offsetHeight || 0,
          window.innerHeight
        );
        frame.style.height = height + "px";
      } catch {
        frame.style.height = "100vh";
      }
    };

    const onLoad = () => resize();
    frame.addEventListener("load", onLoad);
    const timer = window.setTimeout(resize, 150);

    return () => {
      frame.removeEventListener("load", onLoad);
      window.clearTimeout(timer);
    };
  }, [html]);

  return (
    <iframe
      ref={frameRef}
      srcDoc={html}
      title={title}
      style={{ display: "block", width: "100%", border: 0, minHeight: "100vh" }}
    />
  );
}
