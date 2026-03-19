import { Suspense, lazy, useEffect, useMemo } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { initLegacyDomEnhancements } from "./legacyDomEnhancements.js";
import { useSiteSettings } from "./siteSettings.jsx";
import { LeadModals } from "./components/LeadModals.jsx";
import { SeoMeta } from "./components/SeoMeta.jsx";

const DEFAULT_MARKETING_TITLE = "Best HRM Solution In India, HRMS - HRMetricS";
const DEFAULT_MARKETING_DESCRIPTION =
  "HRMetricS helps businesses automate HR, payroll, attendance, employee management, analytics, and workforce productivity with modern HRMS tools.";
const DEFAULT_SOCIAL_IMAGE = "/assets/images/logo1.png";

const DEFAULT_MARKETING_PATHS = new Set([
  "/",
  "/about",
  "/activity-management-software",
  "/asset-management-software",
  "/attendance-management-software",
  "/company-management-software",
  "/contact",
  "/employees-management-software",
  "/events-and-meeting-software",
  "/field-force-management-software",
  "/hrm-soultion-software",
  "/leave-management-software",
  "/mobile-app-software",
  "/payroll-management",
  "/payroll-management-software",
  "/privacy-policy",
  "/report-and-analytics-software",
  "/talent-management-software",
  "/task-management-software",
  "/terms-services",
]);

const ROUTE_TITLES = {
  "/activity-management": "Activity Management Archives - HRMetricS",
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
  const location = useLocation();
  const { siteSettings } = useSiteSettings();
  const seo = useMemo(() => getPageSeo(location.pathname), [location.pathname]);
  const canonicalUrl = useMemo(() => {
    if (typeof window === "undefined") return location.pathname;
    return new URL(location.pathname, window.location.origin).toString();
  }, [location.pathname]);
  const socialImage = useMemo(() => {
    if (typeof window === "undefined") return DEFAULT_SOCIAL_IMAGE;
    return new URL(DEFAULT_SOCIAL_IMAGE, window.location.origin).toString();
  }, []);
  const routes = useMemo(() => {
    const pageModules = import.meta.glob("./pages/*.jsx");

    const entries = Object.entries(pageModules).map(([filePath, loader]) => {
      const fileName = filePath.split("/").pop() || "";
      const slug = fileName.replace(/\.jsx$/i, "");
      const routePath = slug === "home" ? "/" : `/${slug}`;
      return [routePath, lazy(loader)];
    });

    entries.sort((a, b) => a[0].localeCompare(b[0]));
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
    const handleSoftwareAnchorClick = (event) => {
      const link = event.target instanceof Element ? event.target.closest('a[href^="#software"]') : null;
      if (!link) return;

      const targetSelector = link.getAttribute("href");
      if (!targetSelector) return;

      const target = document.querySelector(targetSelector);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    document.addEventListener("click", handleSoftwareAnchorClick);
    return () => document.removeEventListener("click", handleSoftwareAnchorClick);
  }, []);

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
  }, [location.pathname, siteSettings]);

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
