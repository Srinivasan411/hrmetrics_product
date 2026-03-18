import { Suspense, lazy, useEffect, useMemo } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { initLegacyDomEnhancements } from "./legacyDomEnhancements.js";
import { useSiteSettings } from "./siteSettings.jsx";
import { LeadModals } from "./components/LeadModals.jsx";

export default function App() {
  const location = useLocation();
  const { siteSettings } = useSiteSettings();
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

  useEffect(() => {
    const socialMap = new Map([
      ["https://www.linkedin.com/showcase/hrmmitra", siteSettings.linkedin_url],
      ["https://mv.linkedin.com/company/systems-solutions-pvt-ltd", siteSettings.linkedin_url],
      ["https://www.facebook.com", siteSettings.facebook_url],
      ["https://www.facebook.com/hrmmitra", siteSettings.facebook_url],
      ["https://x.com", siteSettings.x_url],
      ["https://x.com/hrmmitra", siteSettings.x_url],
      ["https://www.instagram.com", siteSettings.instagram_url],
      ["https://www.instagram.com/hrmmitra", siteSettings.instagram_url],
      ["https://demo.hrmmitra.in/", siteSettings.demo_login_url],
      ["mailto:marketing@unistal.com", siteSettings.primary_email_href],
      ["tel:+918800114822", siteSettings.secondary_phone_href],
      ["https://unistal.com/", siteSettings.company_url],
    ]);

    for (const anchor of document.querySelectorAll("a[href]")) {
      const href = anchor.getAttribute("href");
      if (!href) continue;

      if (socialMap.has(href)) {
        anchor.setAttribute("href", socialMap.get(href));
      } else if (href.startsWith("https://wa.me/")) {
        anchor.setAttribute("href", href.includes("?text=") ? siteSettings.whatsapp_url : siteSettings.whatsapp_direct_url);
      } else if (href === "tel:+919910224881") {
        anchor.setAttribute("href", siteSettings.primary_phone_href);
      }

      const text = anchor.textContent?.trim();
      if (text === "+91 99102 24881" || text === "+91 99102 24881".replace(/\s+/g, " ")) {
        anchor.textContent = siteSettings.primary_phone;
      } else if (text === "+91 8800 1148 22") {
        anchor.textContent = siteSettings.secondary_phone;
      } else if (text === "marketing@unistal.com") {
        anchor.textContent = siteSettings.primary_email;
      } else if (text === "Unistal Systems Pvt. Ltd") {
        anchor.textContent = siteSettings.company_legal_name;
      }
    }
  }, [location.pathname, siteSettings]);

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
        <LeadModals />
      </>
    </Suspense>
  );
}

function IndexHtmlRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/${slug || ""}`.replace(/\/+$/, "") || "/"} replace />;
}

function FloatingActions() {
  const { siteSettings } = useSiteSettings();

  return (
    <>
      <a
        className="whatsapp-float"
        href={siteSettings.whatsapp_direct_url}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with us on WhatsApp"
        aria-label="Chat with us on WhatsApp"
      >
        <img alt="" aria-hidden="true" src="/gh/edent/SuperTinyIcons/images/svg/whatsapp.svg" />
      </a>
      <button
        type="button"
        className="bookdemo-float btn"
        data-bs-toggle="modal"
        data-bs-target="#bookdemo-modal"
        aria-label="Book a demo"
      >
        <i className="fas fa-calendar-check" aria-hidden="true" />
        <span>Book a demo</span>
      </button>
    </>
  );
}
