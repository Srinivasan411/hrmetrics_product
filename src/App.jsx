import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { initLegacyDomEnhancements } from "./legacyDomEnhancements.js";
import { useSiteSettings } from "./siteSettings.jsx";
import { LeadModals } from "./components/LeadModals.jsx";
import { SeoMeta } from "./components/SeoMeta.jsx";

const DEFAULT_MARKETING_TITLE = "Best HRM Solution In India, HRMS - HRMetricS";
const DEFAULT_MARKETING_DESCRIPTION =
  "HRMetricS helps businesses automate HR, payroll, attendance, employee management, analytics, and workforce productivity with modern HRMS tools.";
const DEFAULT_SOCIAL_IMAGE = "/assets/images/logo1.png";

const DEFAULT_MARKETING_PATHS = new Set([
  "/dashboard",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-services",
]);
const HOME_SECTION_HASHES = new Set(["home", "about", "contact", "software", "pricing", "faq"]);

const ROUTE_TITLES = {
  "/activity-management": "Activity Management Archives - HRMetricS",
  "/dashboard": "HRMetricS - Enterprise HRMS Dashboard",
  "/admin": "HRMetricS Admin",
  "/asset-management": "Asset Management Archives - HRMetricS",
  "/building-safe-workplaces-the-essential-role-of-hr-and-hrms-in-womens-safety":
    "Building Safe Workplaces: The Essential Role of HR and HRMS in Women's Safety - HRMetricS",
  "/customization-vs-standardization-finding-the-right-balance-in-hrms-implementation":
    "Customization vs. Standardization: Finding the Right Balance in HRMS Implementation - HRMetricS",
  "/designing-the-ideal-work-environment-for-maximum-employee-productivity":
    "Designing the Ideal Work Environment for Maximum Employee Productivity - HRMetricS",
  "/divya": "Divya Giri, Author at HRMetricS",
  "/from-desk-to-pocket-how-mobile-hr-apps-are-changing-the-way-we-work-in-india":
    "From Desk to Pocket: How Mobile HR Apps Are Changing the Way We Work in India - HRMetricS",
  "/how-hrms-can-help-organizations-support-employee-self-care":
    "How HRMS Can Help Organizations Support Employee Self-Care - HRMetricS",
  "/how-to-manage-payroll-effectively-a-comprehensive-guide":
    "how-to-manage-payroll-effectively-a-comprehensive-guide",
  "/hrms": "HRMS Archives - HRMetricS",
  "/hrms-software": "HRMS Software Archives - HRMetricS",
  "/pros-and-cons-of-employee-monitoring": "Pros and Cons of Employee Monitoring - HRMetricS",
  "/revolutionize-your-workflow-the-benefits-of-task-management-software":
    "Revolutionize Your Workflow: The Benefits of Task Management Software - HRMetricS",
  "/survisahay": "Survi Sahay, Author at HRMetricS",
  "/task-management": "Task Management Archives - HRMetricS",
  "/the-top-8-hr-trends-you-need-to-watch-in-2025": "The Top 8 HR Trends You Need to Watch in 2025",
  "/uncategorized": "Uncategorized Archives - HRMetricS",
  "/understanding-the-sandwich-leave-policy-and-its-impact-on-employee-productivity":
    "Understanding the Sandwich Leave Policy and Its Impact on Employee Productivity - HRMetricS",
};

const ROUTE_DESCRIPTIONS = {
  "/": DEFAULT_MARKETING_DESCRIPTION,
  "/about":
    "Learn how HRMetricS simplifies HR operations with automation, payroll, attendance, employee self-service, and workforce management tools.",
  "/contact":
    "Contact HRMetricS for product demos, implementation help, support, and business inquiries for HRMS and workforce automation solutions.",
  "/admin": "Secure admin access for managing HRMetricS site content, testimonials, and business settings.",
  "/activity-management-software":
    "Monitor productive hours, app usage, idle time, and remote work behavior with HRMetricS activity management software.",
  "/attendance-management-software":
    "Track attendance, shifts, work hours, and time records accurately with HRMetricS attendance management software.",
  "/company-management-software":
    "Manage company structure, branches, departments, and policies in one centralized HRMetricS platform.",
  "/employees-management-software":
    "Organize employee records, onboarding, access controls, documents, and self-service workflows with HRMetricS employee management software.",
  "/leave-management-software":
    "Simplify leave requests, approvals, leave balances, and policy management with HRMetricS leave management software.",
  "/payroll-management-software":
    "Automate salary processing, compliance, payslips, and payroll calculations with HRMetricS payroll management software.",
  "/report-and-analytics-software":
    "Turn workforce data into insights with HRMetricS reports and analytics for HR, payroll, attendance, and performance.",
  "/task-management-software":
    "Assign, monitor, and optimize team tasks with HRMetricS task management software built for operational visibility.",
  "/field-force-management-software":
    "Manage field employees, tracking, attendance, and off-site productivity with HRMetricS field force management software.",
  "/mobile-app-software":
    "Access attendance, requests, approvals, and employee services on the go with the HRMetricS mobile app.",
  "/privacy-policy":
    "Read the HRMetricS privacy policy to understand how we collect, use, and protect your data.",
  "/terms-services":
    "Review the HRMetricS terms of service for website use, platform access, and service conditions.",
};

function getPageSeo(path) {
  const title = DEFAULT_MARKETING_PATHS.has(path) ? DEFAULT_MARKETING_TITLE : ROUTE_TITLES[path] || DEFAULT_MARKETING_TITLE;
  const description = ROUTE_DESCRIPTIONS[path] || DEFAULT_MARKETING_DESCRIPTION;
  const robots = path === "/admin" ? "noindex,nofollow" : "index,follow";
  const type = path === "/admin" ? "website" : "article";

  return { title, description, robots, type };
}

export default function App() {
  const { siteSettings } = useSiteSettings();
  const [activePath, setActivePath] = useState(() =>
    typeof window === "undefined" ? "/" : getSpaPath(window.location),
  );
  const seo = useMemo(() => getPageSeo(activePath), [activePath]);
  const canonicalUrl = useMemo(() => {
    if (typeof window === "undefined") return activePath;
    return new URL(activePath, window.location.origin).toString();
  }, [activePath]);
  const socialImage = useMemo(() => {
    if (typeof window === "undefined") return DEFAULT_SOCIAL_IMAGE;
    return new URL(DEFAULT_SOCIAL_IMAGE, window.location.origin).toString();
  }, []);
  const routeComponents = useMemo(() => {
    const pageModules = import.meta.glob("./pages/*.jsx");

    const entries = Object.entries(pageModules).map(([filePath, loader]) => {
      const fileName = filePath.split("/").pop() || "";
      const slug = fileName.replace(/\.jsx$/i, "");
      const routePath = slug === "home" ? "/" : `/${slug}`;
      return [routePath, lazy(loader)];
    });

    return new Map(entries);
  }, []);
  const ActiveComponent = routeComponents.get(activePath) || routeComponents.get("/") || null;

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
    let cleanup = () => {};
    const id = requestAnimationFrame(() => {
      cleanup = initLegacyDomEnhancements();
    });
    return () => {
      cancelAnimationFrame(id);
      cleanup();
    };
  }, [activePath]);

  useEffect(() => {
    const onLocationChange = () => {
      const hash = String(window.location.hash || "").replace(/^#\/?/, "").trim();
      const nextPath = getSpaPath(window.location);

      setActivePath(nextPath);
      if (HOME_SECTION_HASHES.has(hash)) {
        requestAnimationFrame(() => {
          const target = document.getElementById(hash);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          } else if (hash === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        });
        return;
      }

      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("hashchange", onLocationChange);
    window.addEventListener("popstate", onLocationChange);
    return () => {
      window.removeEventListener("hashchange", onLocationChange);
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  useEffect(() => {
    const handleSoftwareAnchorClick = (event) => {
      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      if (!link) return;

      const targetSelector = link.getAttribute("href");
      if (!targetSelector) return;
      const targetId = targetSelector.replace(/^#/, "").trim();
      if (!HOME_SECTION_HASHES.has(targetId)) return;

      const target = document.querySelector(targetSelector);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      if (window.location.hash !== targetSelector) {
        window.history.replaceState(null, "", targetSelector);
      }
    };

    document.addEventListener("click", handleSoftwareAnchorClick);
    return () => document.removeEventListener("click", handleSoftwareAnchorClick);
  }, []);

  useEffect(() => {
    const handleSpaNavigationClick = (event) => {
      if (event.defaultPrevented) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        link.hasAttribute("download")
      ) {
        return;
      }
      if (link.target && link.target.toLowerCase() === "_blank") return;
      if (/^https?:\/\//i.test(href)) return;

      const nextPath = normalizeSpaPathFromHref(href);
      if (!nextPath) return;

      event.preventDefault();
      if (nextPath === activePath) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      window.location.hash = nextPath === "/" ? "#home" : `#${nextPath.slice(1)}`;
    };

    document.addEventListener("click", handleSpaNavigationClick);
    return () => document.removeEventListener("click", handleSpaNavigationClick);
  }, [activePath]);

  useEffect(() => {
    const socialMap = new Map([
      ["https://www.linkedin.com/showcase/hrmetrics", siteSettings.linkedin_url],
      ["https://mv.linkedin.com/company/systems-solutions-pvt-ltd", siteSettings.linkedin_url],
      ["https://www.facebook.com", siteSettings.facebook_url],
      ["https://www.facebook.com/hrmetrics", siteSettings.facebook_url],
      ["https://x.com", siteSettings.x_url],
      ["https://x.com/hrmetrics", siteSettings.x_url],
      ["https://www.instagram.com", siteSettings.instagram_url],
      ["https://www.instagram.com/hrmetrics", siteSettings.instagram_url],
      ["https://demo.hrmetrics.in/", siteSettings.demo_login_url],
      ["mailto:info@hrmetrics.in", siteSettings.primary_email_href],
      ["tel:+918800114822", siteSettings.secondary_phone_href],
      ["https://hrmetrics.in/", siteSettings.company_url],
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
      } else if (text === "info@hrmetrics.in") {
        anchor.textContent = siteSettings.primary_email;
      } else if (text === "HRMetricS") {
        anchor.textContent = siteSettings.company_legal_name;
      }
    }
  }, [activePath, siteSettings]);

  return (
    <Suspense fallback={null}>
      <>
        <SeoMeta
          canonicalUrl={canonicalUrl}
          description={seo.description}
          image={socialImage}
          robots={seo.robots}
          title={seo.title}
          type={seo.type}
        />
        {ActiveComponent ? <ActiveComponent /> : null}
        <FloatingActions />
        <LeadModals />
      </>
    </Suspense>
  );
}

function getSpaPathFromHash(hash) {
  const clean = String(hash || "")
    .replace(/^#\/?/, "")
    .replace(/\/+$/, "")
    .trim();
  if (HOME_SECTION_HASHES.has(clean)) return "/";
  if (!clean || clean === "home" || clean === "index.html") return "/";
  return `/${clean}`;
}

function getSpaPath(locationLike) {
  const hashPath = getSpaPathFromHash(locationLike?.hash);
  if (hashPath !== "/") return hashPath;

  const pathname = String(locationLike?.pathname || "/")
    .trim()
    .replace(/\/+$/, "") || "/";

  if (pathname === "/" || pathname === "/index.html") return "/";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

function normalizeSpaPathFromHref(href) {
  const normalized = String(href || "")
    .trim()
    .replace(/^(\.\/|\.\.\/)+/g, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");

  if (!normalized || normalized === "index.html") return "/";

  if (normalized.endsWith("/index.html")) {
    const slug = normalized.slice(0, -"/index.html".length);
    return slug ? `/${slug}` : "/";
  }

  if (normalized.endsWith(".html")) return null;
  if (normalized.includes("/")) return `/${normalized.split("/")[0]}`;
  return `/${normalized}`;
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
      {/* <button
        type="button"
        className="box-transform bookdemo-float btn"
        style={{ borderRadius: "9999px 9999px 9999px 0" }}
        data-bs-toggle="modal"
        data-bs-target="#bookdemo-modal"
        aria-label="Book a demo"
      >
        <i className="fas fa-calendar-check" aria-hidden="true" />
        <span>Book a demo</span>
      </button> */}
    </>
  );
}
