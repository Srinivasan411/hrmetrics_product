import { Suspense, lazy, useEffect, useMemo } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { initLegacyDomEnhancements } from "./legacyDomEnhancements.js";

export default function App() {
  const location = useLocation();
  const routes = useMemo(() => {
    const pageModules = import.meta.glob("./pages/*.jsx");

    const entries = Object.entries(pageModules).map(([filePath, loader]) => {
      const fileName = filePath.split("/").pop() || "";
      const slug = fileName.replace(/\.jsx$/i, "");
      const routePath = slug === "home" ? "/" : `/${slug}`;
      return [routePath, lazy(loader)];
    });

    entries.sort((a, b) => a[0].localeCompare(b[0]));
    // Put `/` first.
    entries.sort((a, b) => (a[0] === "/" ? -1 : b[0] === "/" ? 1 : 0));
    return entries;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const isSticky = window.scrollY > 120;
      for (const header of document.querySelectorAll(".headerfull")) {
        header.classList.toggle("is-sticky", isSticky);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Defer until after the new route's DOM is painted.
    let cleanup = () => {};
    const id = requestAnimationFrame(() => {
      cleanup = initLegacyDomEnhancements();
    });
    return () => {
      cancelAnimationFrame(id);
      cleanup();
    };
  }, [location.pathname]);

  return (
    <Suspense fallback={null}>
      <>
        <Routes>
          {routes.map(([path, Component]) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/:slug/index.html" element={<IndexHtmlRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <FloatingActions />
      </>
    </Suspense>
  );
}

function IndexHtmlRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/${slug || ""}`.replace(/\/+$/, "") || "/"} replace />;
}

function FloatingActions() {
  return (
    <>
      <a
        className="whatsapp-float"
        href="https://wa.me/919910224881"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with us on WhatsApp"
        aria-label="Chat with us on WhatsApp"
      >
        <img alt="" aria-hidden="true" src="/gh/edent/SuperTinyIcons/images/svg/whatsapp.svg" />
      </a>
      <button
        type="button"
        className="bookdemo-float btn btn-theme text-white btn-md radius"
        data-bs-toggle="modal"
        data-bs-target="#bookdemo-modal"
      >
        Book a demo
      </button>
    </>
  );
}
