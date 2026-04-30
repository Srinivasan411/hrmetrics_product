import { useEffect, useState } from "react";
import { TryForFreeCard } from "../components/LeadModals.jsx";
import { BannerStyleFourHero } from "../components/BannerStyleFourHero.jsx";
import { useSiteSettings } from "../siteSettings.jsx";
import FaqSection from "../components/FaqSection.jsx";

const COOKIE_CONSENT_NAME = "hrmetrics_cookie_consent";
const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "yopmail.com",
]);

const fallbackTestimonials = [
  {
    id: 1,
    clientName: "Tapasya",
    clientRole: "HR Head",
    companyName: "IndiaIT360",
    imageUrl: "assets/images/testhr.png",
    testimonial:
      "It's easy to manage HR processes than what we where doing it manually. After adopting HRMetricS, we are able to same time by automating all the manual processes from attendance tracking to leave approvals and payslip generation, everything is now automated and accessible in just a few clicks. Our employees love the self-service portal, and our HR team has finally moved from firefighting to strategic planning.",
    rating: 5,
  },
  {
    id: 2,
    clientName: "Vivek Arora",
    clientRole: "HR Head",
    companyName: "Simsona",
    imageUrl: "assets/images/test4.jpg",
    testimonial:
      "At Simsona, we have completely transformed the way we handle recruitment and performance reviews. The platform is intuitive, fast, and incredibly powerful. We've reduced our employee onboarding to exit process by nearly 40% and gained real-time visibility into employee performance metrics.",
    rating: 5,
  },
  {
    id: 3,
    clientName: "Anita Mishra",
    clientRole: "VP of Employee Relations",
    companyName: "",
    imageUrl: "assets/images/test3.jpg",
    testimonial:
      "HRMetricS has made our payroll processing seamless and efficient. What used to take several days now takes less than two days with error-free calculations and payslip generation at the click of a button.",
    rating: 5,
  },
  {
    id: 4,
    clientName: "Kritika Sharma",
    clientRole: "Employee Relation Manager",
    companyName: "",
    imageUrl: "assets/images/test5.avif",
    testimonial:
      "HRMetricS is built for every kind of workforce. Our field employees can now mark their attendance and submit expenses on the go, right from their mobile devices.",
    rating: 5,
  },
];

const fallbackPricingPlans = [
  {
    id: 1,
    name: "Starter",
    subtitle: "Up to 350 pages / month",
    priceMonthly: 25,
    priceYearly: 300,
    ctaLabel: "Choose Plan",
    ctaUrl: "#contact",
    pageLimitLabel: "350 pages / month",
    badgeText: "",
    isCustom: false,
    isPopular: false,
    points: ["27+ document types", "Full REST API access", "Real-time SES JSON output", "Auto document classification", "IP whitelisting per key", "Email support", "Audit log & CSV export"],
  },
  {
    id: 2,
    name: "Professional",
    subtitle: "Up to 500 pages / month",
    priceMonthly: 32,
    priceYearly: 372,
    ctaLabel: "Get Started",
    ctaUrl: "#contact",
    pageLimitLabel: "500 pages / month",
    badgeText: "Most Popular",
    isCustom: false,
    isPopular: true,
    points: ["27+ document types", "Full REST API access", "Real-time SES JSON output", "Auto document classification", "IP whitelisting per key", "Email support", "Audit log & CSV export", "Priority support"],
  },
  {
    id: 3,
    name: "Enterprise",
    subtitle: "Up to 1,200 pages / month",
    priceMonthly: 50,
    priceYearly: 600,
    ctaLabel: "Choose Plan",
    ctaUrl: "#contact",
    pageLimitLabel: "1,200 pages / month",
    badgeText: "",
    isCustom: false,
    isPopular: false,
    points: ["27+ document types", "Full REST API access", "Real-time SES JSON output", "Auto document classification", "IP whitelisting per key", "Email support", "Audit log & CSV export", "Dedicated account manager", "SLA guarantee", "Custom schema setup"],
  },
  {
    id: 4,
    name: "Custom Plan",
    subtitle: "High-volume or unique requirements?",
    priceMonthly: 0,
    priceYearly: 0,
    ctaLabel: "Contact Us",
    ctaUrl: "#contact",
    pageLimitLabel: "",
    badgeText: "",
    isCustom: true,
    isPopular: false,
    points: ["Unlimited pages", "Custom document schemas", "On-premise deployment option", "Dedicated SLA & support"],
  },
];

function formatClientMeta(testimonial) {
  const clientRole = String(testimonial.clientRole ?? "").trim();
  const companyName = String(testimonial.companyName ?? "").trim();
  if (clientRole && companyName) return `${clientRole}, ${companyName}`;
  return clientRole || companyName;
}

function readCookie(name) {
  if (typeof document === "undefined") return "";

  const cookies = document.cookie ? document.cookie.split("; ") : [];
  const cookiePrefix = `${name}=`;
  const cookieValue = cookies.find((entry) => entry.startsWith(cookiePrefix));

  return cookieValue ? decodeURIComponent(cookieValue.slice(cookiePrefix.length)) : "";
}

function writeCookie(name, value, maxAge) {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function updateGoogleConsent(consentGranted) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const consentState = consentGranted ? "granted" : "denied";
  window.gtag("consent", "update", {
    ad_storage: consentState,
    ad_user_data: consentState,
    ad_personalization: consentState,
    analytics_storage: consentState,
  });
}

function preventDefault(event) {
  event.preventDefault();
}

function activateFeatureTab(tabId) {
  if (!tabId || typeof document === "undefined") return;
  const trigger = document.querySelector(`[data-bs-target="#${tabId}"]`);
  if (trigger) trigger.click();
}

function handleFeatureMenuClick(event, primaryTabId, nestedTabId = "") {
  event.preventDefault();

  if (typeof document !== "undefined") {
    const softwareSection = document.getElementById("software");
    if (softwareSection) {
      softwareSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  activateFeatureTab(primaryTabId);
  if (nestedTabId) {
    setTimeout(() => activateFeatureTab(nestedTabId), 90);
  }
}

function isOfficialEmail(email) {
  const normalized = String(email ?? "").trim().toLowerCase();
  const domain = normalized.split("@")[1] ?? "";
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.has(domain);
}

function SubmitAlert({ variant, message }) {
  if (!message) return null;
  const klass = variant === "success" ? "alert alert-success" : "alert alert-danger";
  const role = variant === "success" ? "status" : "alert";
  return (
    <div className={`${klass} mt-3 mb-0 py-2`} role={role}>
      {message}
    </div>
  );
}

export default function HomePage() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [pricingPlans, setPricingPlans] = useState(fallbackPricingPlans);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [cookieConsent, setCookieConsent] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const { siteSettings } = useSiteSettings();

  useEffect(() => {
    const savedConsent = readCookie(COOKIE_CONSENT_NAME);

    if (savedConsent === "accepted" || savedConsent === "declined") {
      setCookieConsent(savedConsent);
      updateGoogleConsent(savedConsent === "accepted");
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadPricingPlans() {
      try {
        const response = await fetch("/api/pricing-plans");
        if (!response.ok) return;
        const payload = await response.json();
        if (!ignore && Array.isArray(payload.data) && payload.data.length > 0) {
          setPricingPlans(payload.data);
        }
      } catch {
        // Keep fallback pricing plans if API is unavailable.
      }
    }

    loadPricingPlans();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadTestimonials() {
      try {
        const response = await fetch("/api/testimonials");
        if (!response.ok) return;
        const payload = await response.json();
        if (!ignore && Array.isArray(payload.data) && payload.data.length > 0) {
          setTestimonials(payload.data);
        }
      } catch {
        // Keep the seeded fallback content on the page if the API is unavailable.
      }
    }

    loadTestimonials();
    return () => {
      ignore = true;
    };
  }, []);

  function handleCookieConsent(nextConsent) {
    setCookieConsent(nextConsent);
    writeCookie(COOKIE_CONSENT_NAME, nextConsent, COOKIE_CONSENT_MAX_AGE);
    updateGoogleConsent(nextConsent === "accepted");
  }

  async function handleContactSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setMessage("");
    setSubmitError("");

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const email = String(formData.get("email") ?? "").trim();

    if (!isOfficialEmail(email)) {
      setSubmitError("Please enter your official (work) email address.");
      setSubmitting(false);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const body = new URLSearchParams();
      for (const [key, value] of formData.entries()) {
        body.append(key, String(value));
      }

      const response = await fetch("/contactMail.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: body.toString(),
        signal: controller.signal,
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.message || "Unable to submit right now. Please try again.");
      }

      setMessage(payload.message || "Message sent successfully! We'll get back to you soon.");
      formEl.reset();
    } catch (err) {
      const errorMessage = err?.name === "AbortError" ? "Request timed out. Please try again." : err?.message || "Request failed.";
      setSubmitError(errorMessage);
    } finally {
      clearTimeout(timeout);
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="top-bar-area top-bar-style-one text-light">
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-8">
              <div className="animate-text text-left">
                <h1 className="mb-0 typing-animation" style={{ fontSize: 16, fontWeight: 400, position: 'relative', top: 2 }}>Most Advanced HRM Software in Indian Market Trusted by Many <img alt="" src="assets/images/hand.gif" /></h1>
              </div>
            </div>
            <div className="col-lg-4 text-end">
              <div className="social">
                <ul>
                  <li>
                    <a href={siteSettings.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                  <li>
                    <a href={siteSettings.facebook_url} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href={siteSettings.x_url} target="_blank" rel="noopener noreferrer">
                      <i className="">X</i>
                    </a>
                  </li>
                  <li>
                    <a href={siteSettings.instagram_url} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href={siteSettings.whatsapp_url} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-whatsapp" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-new">
        <div className="wsmobileheader clearfix">
          <a className="wsanimated-arrow" href="#" onClick={preventDefault} id="wsnavtoggle"><span /></a>
          <span className="smllogo"><img alt="" src="assets/images/logo1.png" width={80} /></span>
        </div>
        <div className="headerfull">
          <div className="container">
            <div className="wsmain clearfix">
              <div className="smllogo">
                <a href="index.html"><img alt="" src="assets/images/logo1.png" /></a>
              </div>
              <nav className="wsmenu clearfix">
                <ul className="wsmenu-list">
                  <li aria-haspopup="true"><a className="navtext" href="index.html"><span /> <span>Home</span></a>
                  </li>
                  <li aria-haspopup="true">
                    <a className="navtext" href="#" onClick={preventDefault}>
                      <span /> <span>Features</span> <span className="wsarrow" />
                    </a>
                    <ul className="sub-menu">
                      <li aria-haspopup="true"><a href="#software" onClick={(event) => handleFeatureMenuClick(event, "hrms", "company")}>Company Management</a></li>
                      <li aria-haspopup="true"><a href="#software" onClick={(event) => handleFeatureMenuClick(event, "hrms", "employee")}>Employee Management</a></li>
                      <li aria-haspopup="true"><a href="#software" onClick={(event) => handleFeatureMenuClick(event, "hrms", "attendance")}>Attendance Management</a></li>
                      <li aria-haspopup="true"><a href="#software" onClick={(event) => handleFeatureMenuClick(event, "hrms", "leave")}>Leave Management</a></li>
                      <li aria-haspopup="true"><a href="#software" onClick={(event) => handleFeatureMenuClick(event, "hrms", "payroll")}>Payroll Management</a></li>
                      <li aria-haspopup="true"><a href="#software" onClick={(event) => handleFeatureMenuClick(event, "hrms", "talent")}>Talent Management</a></li>
                      <li aria-haspopup="true"><a href="#software" onClick={(event) => handleFeatureMenuClick(event, "hrms", "reports")}>Reports & Analytics</a></li>
                      <li aria-haspopup="true"><a href="#software" onClick={(event) => handleFeatureMenuClick(event, "hrms", "events")}>Events & Meetings</a></li>
                      <li aria-haspopup="true"><a href="#software" onClick={(event) => handleFeatureMenuClick(event, "hrms", "mobile")}>Mobile App</a></li>
                      <li aria-haspopup="true"><a href="#software" onClick={(event) => handleFeatureMenuClick(event, "activityreporter")}>Activity Reporter</a></li>
                      <li aria-haspopup="true"><a href="#software" onClick={(event) => handleFeatureMenuClick(event, "taskmanagement")}>Task Management</a></li>
                      <li aria-haspopup="true"><a href="#software" onClick={(event) => handleFeatureMenuClick(event, "assetmanagement")}>Organisation Structure</a></li>
                      <li aria-haspopup="true"><a href="#software" onClick={(event) => handleFeatureMenuClick(event, "forcemanagement")}>Gatepass Management</a></li>
                    </ul>
                  </li>
                  <li aria-haspopup="true"><a className="navtext" href="#pricing"><span /> <span>Pricing</span></a>
                  </li>
                  <li aria-haspopup="true"><a className="navtext" href="#faq"><span /> <span>FAQ</span></a>
                  </li>
                  <li className="wscarticon clearfix">
                    <a className="btn btn-theme text-white btn-md radius" href={siteSettings.demo_login_url} target="_blank" rel="noopener noreferrer">Login</a>
                    <a className="btn btn-theme text-white btn-md radius" data-bs-target="#demoshedule-modal" data-bs-toggle="modal" href="#" onClick={preventDefault}>Schedule a demo</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <BannerStyleFourHero
        badgeText="HRMS Management"
        title={<>Ready to Dive into <span>HR & Payroll</span> Bliss? that Automates all your Complex Business Operations</>}
        description="HRMetricS streamlines everything from onboarding and attendance to payroll and performance saving up to 25% on time and cost while delivering a smarter, paperless employee experience."
        primaryAction={
          <a className="btn btn-hrms-primary" data-bs-target="#demoshedule-modal" data-bs-toggle="modal" href="#" onClick={(e) => e.preventDefault()}>
            <i className="fas fa-calendar-check" /> Schedule a Demo
          </a>
        }
        secondaryAction={
          <a className="btn btn-hrms-secondary" href="#software">
            Learn More <i className="fas fa-arrow-right" />
          </a>
        }
      >
        <div className="raitingboxx animation wow fadeInUp">
          <img alt="" src="assets/images/Play-Store-Logo.webp" />
          <span className="starricon">
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star-half-o" />
            <i className="fa fa-star-o" />
          </span>
          <p>3+ ratings across all platforms</p>
        </div>
        <div className="row mt-3 justify-content-center animation wow fadeInUp">
          <div className="col-md-5">
            <div className="app-box">
              <a href="https://apps.apple.com/in/app/bss-metrics/id1451487941" target="_blank">
                <img alt="" src="assets/images/Group-1-2.webp" />
              </a>
              <a href="https://play.google.com/store/search?q=hr%20metrics%20pro&c=apps&hl=en_IN" target="_blank">
                <img alt="" src="assets/images/Group-2-1.webp" />
              </a>
            </div>
          </div>
        </div>
      </BannerStyleFourHero>
      <div className="trust-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <div className="site-heading mt-3 mb-0 wow fadeInUp">
                <h2 className="title title1 split-text">Brands That Trust Us</h2>
                <div className="devider" />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="brand-two-carousel swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="aaa Hotels & Resorts" src="assets/images/clients/aaa-Hotels-Resorts.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Alia" src="assets/images/clients/Alia.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Baglioni Resorts" src="assets/images/clients/Baglioni-Resorts.jpg" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="City Garden" src="assets/images/clients/City-Garden.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="City Investments" src="assets/images/clients/City-Investments.jpg" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Cocoon" src="assets/images/clients/Cocoon.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Co Load" src="assets/images/clients/Co-Load.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Colors Of OBLU" src="assets/images/clients/Colors-Of-OBLU.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="ECM" src="assets/images/clients/ECM.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Flyme" src="assets/images/clients/Flyme.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="FSM" src="assets/images/clients/FSM.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Fun Island" src="assets/images/clients/Fun-Island.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Fushifaru" src="assets/images/clients/Fushifaru.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Gage Fire Safety" src="assets/images/clients/Gage-Fire-Safety.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Happy Market" src="assets/images/clients/Happy-Market.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="HDFC" src="assets/images/clients/HDFC.jpg" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Horizon Fisheries" src="assets/images/clients/Horizon-Fisheries.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="IBC" src="assets/images/clients/IBC.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Ilaa" src="assets/images/clients/Ilaa.jpg" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Island Breeze Maldives" src="assets/images/clients/Island-Breeze-Maldives.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Maldives Stock Exchange" src="assets/images/clients/Maldives-Stock-Exchange.jpg" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Medianet" src="assets/images/clients/Medianet.jpg" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Mifco" src="assets/images/clients/Mifco.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="OBLU Atmosphere" src="assets/images/clients/OBLU-Atmosphere.jpg" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Paradise Island Resort" src="assets/images/clients/Paradise-Island-Resort.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Royal Island" src="assets/images/clients/Royal-Island.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="TEP Construction" src="assets/images/clients/TEP-Construction.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Voyages Maldives" src="assets/images/clients/Voyages-Maldives.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="hr_process_section default-padding pt-0" id="hrms-overview">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading mb-0 text-center">
                <h4 className="sub-title">Automate HR Processes</h4>
                <h2 className="title split-text mb-0">Simplify HR Work </h2>
                <p className="split-text">With HRMetricS' flexible platform, streamline every process—from onboarding and attendance to payroll and performance reviews. Each module adapts to your organisation's unique structures and policies. Fully automated with integrated
                  self-service tools and robust analytics, HRMetricS empowers your HR team to move beyond paperwork and focus on strategy, enhancing efficiency, accuracy, and employee engagement. </p>
                <div className="devider" />
              </div>
            </div>
          </div>
          <div className="grid-container mt-4">
            <div className="box box-org">
              <a className="scrollbtnn" href="#software" onClick={(e) => handleFeatureMenuClick(e, 'hrms', 'company')}>
                <div className="icon-text">
                  <i className="fas fa-sitemap" />
                  <p>Company Management</p>
                </div>
              </a>
            </div>
            <div className="box box-emp ddd">
              <a className="scrollbtnn" href="#software" onClick={(e) => handleFeatureMenuClick(e, 'hrms', 'employee')}>
                <div className="icon-text">
                  <i className="fas fa-project-diagram" />
                  <p>Employee Management</p>
                </div>
              </a>
            </div>
            <div className="box box-access">
              <a className="scrollbtnn" href="#software" onClick={(e) => handleFeatureMenuClick(e, 'hrms', 'reports')}>
                <div className="icon-text">
                  <i className="fas fa-lock" />
                  <p>Reports and Analytics</p>
                </div>
              </a>
            </div>
            <div className="box box-roles">
              <a className="scrollbtnn" href="#software" onClick={(e) => handleFeatureMenuClick(e, 'hrms', 'leave')}>
                <div className="icon-text">
                  <i className="fas fa-user" />
                  <p>Leave Management</p>
                </div>
              </a>
            </div>
            <div className="box box-audit">
              <a className="scrollbtnn" href="#software" onClick={(e) => handleFeatureMenuClick(e, 'hrms', 'payroll')}>
                <div className="icon-text">
                  <i className="fas fa-file-alt" />
                  <p>Payroll Management</p>
                </div>
              </a>
            </div>
            <div className="box box-hr">
              <a className="scrollbtnn" href="#software" onClick={(e) => handleFeatureMenuClick(e, 'hrms', 'events')}>
                <div className="icon-text">
                  <i className="fas fa-comments" />
                  <p>Events and Meetings</p>
                </div>
              </a>
            </div>
            <div className="box box-notif">
              <a className="scrollbtnn" href="#software" onClick={(e) => handleFeatureMenuClick(e, 'hrms', 'attendance')}>
                <div className="icon-text">
                  <i className="fas fa-bell" />
                  <p>Attendance Management</p>
                </div>
              </a>
            </div>
            <div className="box box-know">
              <a className="scrollbtnn" href="#software" onClick={(e) => handleFeatureMenuClick(e, 'hrms', 'talent')}>
                <div className="icon-text">
                  <i className="fas fa-user-check" />
                  <p>Talent Management</p>
                </div>
              </a>
            </div>
            <div className="box box-know1">
              <a className="scrollbtnn" href="#software" onClick={(e) => handleFeatureMenuClick(e, 'hrms', 'mobile')}>
                <div className="icon-text">
                  <i className="fas fa-mobile-alt" />
                  <p>Mobile App</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="brand-section default-padding animatedBackground" id="software" style={{ backgroundImage: 'url(assets/images/patten1.png)' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">One Platform Many Possibilities</h4>
                <h2 className="title split-text">The All-In-One HRM Platform For Your Business</h2>
                <div className="devider" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="tab_section_layout layoet_main_2">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" data-bs-target="#hrms" data-bs-toggle="tab" id="hrms-tab" role="tab" type="button">
                      <span className="svg_bg">
                        <svg fill="currentColor" height="64px" id="Capa_1" version="1.1" viewBox="0 0 60 60" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M25,15c-3.9,0-7,3.1-7,7v14h2V22c0-2.8,2.2-5,5-5h4v5h2v-5h4c2.8,0,5,2.2,5,5v14h2V22c0-3.9-3.1-7-7-7H25z" /> <path d="M29,14h2c2.8,0,5-2.2,5-5V6c0-2.8-2.2-5-5-5h-2c-2.8,0-5,2.2-5,5v3C24,11.8,26.2,14,29,14z M26,6c0-1.7,1.3-3,3-3h2 c1.7,0,3,1.3,3,3v3c0,1.7-1.3,3-3,3h-2c-1.7,0-3-1.3-3-3V6z" /> <rect height={2} width={2} x={29} y={32} /> <rect height={2} width={2} x={29} y={28} /> <rect height={2} width={2} x={29} y={24} /> <path d="M48,54c0-1.7-1.3-3-3-3h-2v-5c0-0.6-0.4-1-1-1H11v41h13h34h13v-2H48V54z M14,57v-3c0-0.6,0.4-1,1-1h3h15v-2H19v-4h22v5c0,0.6,0.4,1,1,1h3c0.6,0,1,0.4,1,1v3 H14z" /> <path d="M3.3,10.7l1.4-1.4L3.4,8H21V6H3.4l1.3-1.3L3.3,3.3l-3,3c-0.4,0.4-0.4,1,0,1.4L3.3,10.7z" /> <path d="M3.3,31.7l1.4-1.4L3.4,29H15v-2H3.4l1.3-1.3l-1.4-1.4l-3,3c-0.4,0.4-0.4,1,0,1.4L3.3,31.7z" /> <path d="M55.3,19.3l1.4,1.4l3-3c0.4-0.4,0.4-1,0-1.4l-3-3l-1.4,1.4l1.3,1.3H45v2h11.6L55.3,19.3z" /> <path d="M56.7,37.3l-1.4,1.4l1.3,1.3H41v2h15.6l-1.3,1.3l1.4,1.4l3-3c0.4-0.4,0.4-1,0-1.4L56.7,37.3z" /> <rect height={2} width={2} x={45} y={27} /> <rect height={2} width={2} x={49} y={27} /> <rect height={2} width={2} x={53} y={27} /> <rect height={2} width={2} x={57} y={27} /> <rect height={2} width={2} x={1} y={37} /> <rect height={2} width={2} x={5} y={37} /> <rect height={2} width={2} x={9} y={37} /> <rect height={2} width={2} x={13} y={37} /> <rect height={2} width={2} x={1} y={15} /> <rect height={2} width={2} x={5} y={15} /> <rect height={2} width={2} x={9} y={15} /> <rect height={2} width={2} x={13} y={15} /> </g> </g> </g></svg>
                      </span>
                      <span>HRMS</span>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" data-bs-target="#activityreporter" data-bs-toggle="tab" id="activity-tab" role="tab" type="button">
                      <span className="svg_bg akkbg">
                        <svg fill="currentColor" height="64px" id="Layer_1" version="1.1" viewBox="0 0 491.52 491.52" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M471.04,358.4V51.2H20.48v307.2H0v44.06l25.24,37.86h441.04l25.24-37.86V358.4H471.04z M40.96,71.68h409.6V358.4H40.96 V71.68z M471.04,396.26l-15.72,23.58H36.2l-15.72-23.58v-17.38h450.56V396.26z" /> </g> </g> <g> <g> <rect height="20.48" width="20.48" x="235.52" y="389.12" /> </g> </g> <g> <g> <rect height="20.48" width="20.48" x="276.48" y="389.12" /> </g> </g> <g> <g> <rect height="20.48" width="20.48" x="194.56" y="389.12" /> </g> </g> <g> <g> <path d="M348.16,102.4v235.52h71.68V102.4H348.16z M399.36,317.44h-30.72V122.88h30.72V317.44z" /> </g> </g> <g> <g> <path d="M256,143.36v194.56h71.68V143.36H256z M307.2,317.44h-30.72v-153.6h30.72V317.44z" /> </g> </g> <g> <g> <path d="M163.84,184.32v153.6h71.68v-153.6H163.84z M215.04,317.44h-30.72V204.8h30.72V317.44z" /> </g> </g> <g> <g> <path d="M71.68,235.52v102.4h71.68v-102.4H71.68z M122.88,317.44H92.16V256h30.72V317.44z" /> </g> </g> </g></svg>
                      </span>
                      <span>Activity Reporter</span>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" data-bs-target="#taskmanagement" data-bs-toggle="tab" id="task-tab" role="tab" type="button">
                      <span className="svg_bg akkbg">
                        <svg fill="currentColor" height="64px" viewBox="0 0 28 28" width="64px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M4 5.25C4 3.45508 5.45507 2 7.25 2H20.75C22.5449 2 24 3.45507 24 5.25V17.3787C23.8796 17.4592 23.7653 17.5527 23.659 17.659L22.5 18.818V5.25C22.5 4.2835 21.7165 3.5 20.75 3.5H7.25C6.2835 3.5 5.5 4.2835 5.5 5.25V22.7497C5.5 23.7162 6.2835 24.4997 7.25 24.4997H15.3177L16.8177 25.9997H7.25C5.45507 25.9997 4 24.5446 4 22.7497V5.25Z" fill="#212121" /> <path d="M10.5 8.75C10.5 9.44036 9.94036 10 9.25 10C8.55964 10 8 9.44036 8 8.75C8 8.05964 8.55964 7.5 9.25 7.5C9.94036 7.5 10.5 8.05964 10.5 8.75Z" fill="#212121" /> <path d="M9.25 15.2498C9.94036 15.2498 10.5 14.6902 10.5 13.9998C10.5 13.3095 9.94036 12.7498 9.25 12.7498C8.55964 12.7498 8 13.3095 8 13.9998C8 14.6902 8.55964 15.2498 9.25 15.2498Z" fill="#212121" /> <path d="M9.25 20.5C9.94036 20.5 10.5 19.9404 10.5 19.25C10.5 18.5596 9.94036 18 9.25 18C8.55964 18 8 18.5596 8 19.25C8 19.9404 8.55964 20.5 9.25 20.5Z" fill="#212121" /> <path d="M12.75 8C12.3358 8 12 8.33579 12 8.75C12 9.16421 12.3358 9.5 12.75 9.5H19.25C19.6642 9.5 20 9.16421 20 8.75C20 8.33579 19.6642 8 19.25 8H12.75Z" fill="#212121" /> <path d="M12 13.9998C12 13.5856 12.3358 13.2498 12.75 13.2498H19.25C19.6642 13.2498 20 13.5856 20 13.9998C20 14.414 19.6642 14.7498 19.25 14.7498H12.75C12.3358 14.7498 12 14.414 12 13.9998Z" fill="#212121" /> <path d="M12.75 18.5C12.3358 18.5 12 18.8358 12 19.25C12 19.6642 12.3358 20 12.75 20H19.25C19.6642 20 20 19.6642 20 19.25C20 18.8358 19.6642 18.5 19.25 18.5H12.75Z" fill="#212121" /> <path d="M25.7803 19.7803L19.7803 25.7803C19.6397 25.921 19.4489 26 19.25 26C19.0511 26 18.8603 25.921 18.7197 25.7803L15.7216 22.7823C15.4287 22.4894 15.4287 22.0145 15.7216 21.7216C16.0145 21.4287 16.4894 21.4287 16.7823 21.7216L19.25 24.1893L24.7197 18.7197C25.0126 18.4268 25.4874 18.4268 25.7803 18.7197C26.0732 19.0126 26.0732 19.4874 25.7803 19.7803Z" fill="#212121" /> </g></svg>
                      </span>
                      <span>Task Management</span>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" data-bs-target="#assetmanagement" data-bs-toggle="tab" id="asset-tab" role="tab" type="button">
                      <span className="svg_bg">
                        <svg fill="currentColor" height="64px" id="Layer_1" version="1.1" viewBox="0 0 491.52 491.52" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g> <g> <rect height="20.48" width="92.16" x="71.68" y="102.4" /> </g> </g> <g> <g> <rect height="20.48" width="51.2" x="184.32" y="102.4" /> </g> </g> <g> <g> <rect height="20.48" width="92.16" x="71.68" y={256} /> </g> </g> <g> <g> <rect height="20.48" width="51.2" x="184.32" y={256} /> </g> </g> <g> <g> <rect height="20.48" width="61.44" x="71.68" y="204.8" /> </g> </g> <g> <g> <rect height="20.48" width="30.72" x="296.96" y="204.8" /> </g> </g> <g> <g> <rect height="20.48" width="122.88" x="153.6" y="204.8" /> </g> </g> <g> <g> <rect height="20.48" width="40.96" x="204.8" y="153.6" /> </g> </g> <g> <g> <rect height="20.48" width="112.64" x="71.68" y="153.6" /> </g> </g> <g> <g> <rect height="20.48" width="153.6" x="266.24" y="153.6" /> </g> </g> <g> <g> <rect height="20.48" width="153.6" x="71.68" y="307.2" /> </g> </g> <g> <g> <polygon points="391.24,243.64 376.76,258.12 405.36,286.72 376.76,315.32 391.24,329.8 434.32,286.72 " /> </g> </g> <g> <g> <polygon points="309.32,258.12 294.84,243.64 251.76,286.72 294.84,329.8 309.32,315.32 280.72,286.72 " /> </g> </g> <g> <g> <rect height="20.48" transform="matrix(0.3711 -0.9286 0.9286 0.3711 -50.5861 498.917)" width="110.284" x="287.878" y="276.562" /> </g> </g> <g> <g> <path d="M471.04,358.4V51.2H20.48v307.2H0v44.06l25.24,37.86h441.04l25.24-37.86V358.4H471.04z M40.96,71.68h409.6V358.4H40.96 V71.68z M471.04,396.26l-15.72,23.58H36.2l-15.72-23.58v-17.38h450.56V396.26z" /> </g> </g> <g> <g> <rect height="20.48" width="20.48" x="276.48" y="389.12" /> </g> </g> <g> <g> <rect height="20.48" width="20.48" x="235.52" y="389.12" /> </g> </g> <g> <g> <rect height="20.48" width="20.48" x="194.56" y="389.12" /> </g> </g> </g></svg>
                      </span>
                      <span>Organisation Structure</span>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" data-bs-target="#forcemanagement" data-bs-toggle="tab" id="force-tab" role="tab" type="button">
                      <span className="svg_bg">
                        <svg fill="currentColor" height="64px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M73.237,341.312l-50.539-0.021c3.797-14.379,15.125-25.92,30.101-29.675l42.069-10.517 c3.819-0.939,6.805-3.925,7.765-7.744l4.352-17.408c0.725-2.923,0.192-6.037-1.515-8.555c-1.685-2.496-4.373-4.16-7.381-4.587 c-12.992-1.813-22.933-4.565-29.803-6.955c6.763-11.648,14.251-32.405,14.251-67.115c0-49.941,36.437-60.757,45.461-60.757 c10.389,0,12.181,1.685,16.064,5.312c4.288,4.032,11.029,3.84,15.083-0.448c4.053-4.288,3.84-11.051-0.448-15.083 c-8.853-8.32-16.597-11.136-30.699-11.136c-20.928,0-66.795,20.672-66.795,82.091c0,48.576-16.149,62.891-16.128,62.891 c-2.859,2.133-4.437,5.525-4.245,9.088c0.171,3.541,2.091,6.763,5.141,8.597c0.619,0.363,13.205,7.808,37.525,12.651 l-35.861,8.981C19.584,297.941,0,323.051,0,351.979c0,5.888,4.779,10.667,10.667,10.667h62.571 c5.888,0,10.667-4.779,10.667-10.667S79.125,341.312,73.237,341.312z" /> <path d="M464.363,290.923l-35.861-8.96v-0.043c24.149-4.843,36.864-12.224,37.461-12.587c2.944-1.749,4.757-4.928,5.056-8.384 c0.277-3.435-1.237-6.912-3.861-9.131c-0.171-0.128-16.384-14.421-16.384-63.083c0-47.701-12.16-71.872-36.181-71.872h-0.811 c-7.872-7.168-14.827-10.219-29.781-10.219c-6.293,0-14.656,2.219-22.955,6.123c-5.333,2.496-7.637,8.853-5.141,14.187 c2.517,5.333,8.896,7.595,14.187,5.12c6.933-3.243,12.117-4.096,13.909-4.096c10.88,0,12.245,1.344,17.941,7.083 c2.005,1.984,4.715,3.115,7.552,3.115h5.099c9.152,0,14.848,19.371,14.848,50.539c0,34.688,7.467,55.424,14.229,67.072 c-6.891,2.411-16.875,5.163-29.803,6.976c-3.008,0.405-5.675,2.091-7.36,4.587c-1.707,2.517-2.24,5.611-1.515,8.555l4.352,17.429 c0.96,3.819,3.925,6.827,7.765,7.765l42.069,10.517c14.976,3.755,26.304,15.296,30.101,29.696h-50.496v21.333l62.549-0.021 c5.888,0,10.667-4.779,10.667-10.667C512,323.029,492.416,297.941,464.363,290.923z" /> <path d="M364.608,336.512l-51.136-12.779l-1.557-6.293c34.859-6.421,53.035-16.981,53.845-17.472 c2.987-1.771,4.864-4.971,5.12-8.448c0.256-3.477-1.28-6.933-3.989-9.131c-0.213-0.192-23.723-20.203-23.723-88.981 c0-62.464-15.296-94.144-45.461-94.144h-2.603c-10.027-9.451-18.475-13.909-39.125-13.909c-27.307,0-87.189,27.2-87.189,108.053 c0,68.779-23.488,88.789-23.552,88.853c-2.837,2.112-4.437,5.525-4.245,9.067c0.171,3.541,2.091,6.763,5.141,8.597 c0.832,0.491,18.816,11.115,53.909,17.536l-1.536,6.251l-51.136,12.779c-36.523,9.131-62.037,41.813-62.037,79.488 c0,2.837,1.109,5.568,3.115,7.552s4.715,3.115,7.552,3.115h319.979c5.888,0,10.667-4.779,10.667-10.667 C426.645,378.304,401.131,345.643,364.608,336.512z M107.605,405.291c4.117-23.189,21.44-42.24,44.949-48.107l57.344-14.336 c3.819-0.96,6.805-3.947,7.765-7.765l5.909-23.744c0.725-2.944,0.192-6.059-1.515-8.555c-1.685-2.496-4.373-4.16-7.381-4.587 c-20.992-2.923-36.309-7.659-45.824-11.307c9.365-14.229,21.291-42.389,21.291-93.525c0-71.275,52.8-86.72,65.856-86.72 c15.808,0,18.688,2.24,27.264,10.795c2.005,1.984,4.715,3.115,7.552,3.115h6.933c15.339,0,24.128,26.539,24.128,72.811 c0,51.093,11.883,79.232,21.248,93.483c-9.579,3.669-24.939,8.405-45.824,11.328c-3.008,0.405-5.675,2.091-7.36,4.587 c-1.707,2.517-2.24,5.632-1.515,8.555l5.931,23.765c0.96,3.819,3.925,6.827,7.765,7.765l57.344,14.336 c23.488,5.867,40.832,24.939,44.928,48.128L107.605,405.291z" /> </g> </g> </g> </g></svg>
                      </span>
                      <span>Gatepass Management</span>
                    </button>
                  </li>
                </ul>
                <div className="tab-content mt-4" id="myTabContent">
                  <div aria-labelledby="hrms-tab" className="tab-pane fade show active" id="hrms" role="tabpanel">
                    <div className="tab_section_layout hrmstabs">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button className="nav-link active" data-bs-target="#company" data-bs-toggle="tab" id="company-tab" role="tab" type="button">
                            <span className="svg_bg">
                              <svg fill="currentColor" height="64px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M471,160V48c0-26.51-21.49-48-48-48H89C62.49,0,41,21.49,41,48v416c0,26.51,21.49,48,48,48h334c26.51,0,48-21.49,48-48V352h-32v112c0,8.837-7.163,16-16,16H89c-8.837,0-16-7.163-16-16V48c0-8.837,7.163-16,16-16h334c8.837,0,16,7.163,16,16v112H471z" /> <rect height={32} width={320} x={113} y={96} /> <rect height={32} width={320} x={113} y={192} /> <rect height={32} width={320} x={113} y={288} /> <rect height={32} width={320} x={113} y={384} /> </g> </g> </g></svg>
                            </span>
                            <span>Company Management</span>
                          </button>
                        </li>
                        <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#employee" data-bs-toggle="tab" id="employee-tab" role="tab" type="button"> <span className="svg_bg"> <svg enableBackground="new 0 0 511 511" fill="#000000" height="64px" version="1.1" viewBox="0 0 511 511" width="64px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                          <g id="SVGRepo_iconCarrier">
                            <g>
                              <path d="m503.5,436h-103.705c7.13-9.007 9.992-20.574 7.837-31.891l-21.252-111.577c-2.674-14.037-12.756-25.563-26.312-30.082l-54.196-18.065c-0.954-0.318-1.927-0.43-2.872-0.366v-14.399c10.341-11.62 16-26.396 16-42.12v-17.734c9.29-3.138 16-11.93 16-22.266v-40c0-26.191-21.309-47.5-47.5-47.5h-64c-10.584,0-19.557,7.033-22.489,16.672-14.267,2.999-25.011,15.682-25.011,30.828v40c0,10.335 6.71,19.127 16,22.266v15.387c0,16.529 6.063,31.796 16,43.459v15.407c-0.945-0.063-1.917,0.048-2.872,0.367l-54.196,18.065c-13.556,4.519-23.638,16.045-26.312,30.082l-21.252,111.577c-2.156,11.317 0.707,22.884 7.837,31.891h-103.705c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5 7.5,7.5h134.67 1.33 16 192 16 1.33 134.67c4.142,0 7.5-3.358 7.5-7.5s-3.358-7.501-7.5-7.501zm-288-177c4.142,0 7.5-3.358 7.5-7.5v-9.919c9.01,5.649 19.437,9.056 30.552,9.39 0.659,0.02 1.315,0.029 1.971,0.029 11.614,0 22.742-3.101 32.477-8.927v9.427c0,4.142 3.358,7.5 7.5,7.5 0.105,0 0.207-0.011 0.311-0.016-1.953,18.497-19.284,33.016-40.311,33.016s-38.358-14.519-40.311-33.016c0.104,0.005 0.206,0.016 0.311,0.016zm-24.5-111.5v-40c0-9.098 7.402-16.5 16.5-16.5 4.142,0 7.5-3.358 7.5-7.5 0-4.687 3.813-8.5 8.5-8.5h64c17.92,0 32.5,14.579 32.5,32.5v40c0,1.442-0.364,2.8-1,3.992v-11.992c0-12.958-10.542-23.5-23.5-23.5h-80c-12.958,0-23.5,10.542-23.5,23.5v11.992c-0.636-1.192-1-2.55-1-3.992zm16-8c0-4.687 3.813-8.5 8.5-8.5h80c4.687,0 8.5,3.813 8.5,8.5v48c0,13.23-5.23,25.593-14.727,34.809-9.493,9.212-22.035,14.065-35.271,13.669-25.917-0.778-47.002-23.579-47.002-50.826v-45.652zm-47.5,296.5c-0.276,0-0.5-0.225-0.5-0.5v-104c0-0.275 0.224-0.5 0.5-0.5h192c0.276,0 0.5,0.225 0.5,0.5v104c0,0.275-0.224,0.5-0.5,0.5h-192zm208,0h-0.525c0.005-0.167 0.025-0.331 0.025-0.5v-104c0-8.547-6.953-15.5-15.5-15.5h-192c-8.547,0-15.5,6.953-15.5,15.5v104c0,0.169 0.02,0.333 0.025,0.5h-0.525-1.33c-7.326,0-14.205-3.237-18.875-8.881-4.67-5.644-6.563-13.007-5.191-20.203l21.252-111.577c1.658-8.706 7.912-15.855 16.32-18.658l44.75-14.917c3.342,25.452 26.757,45.236 55.074,45.236s51.732-19.784 55.075-45.236l44.75,14.916c8.408,2.803 14.662,9.953 16.32,18.659l21.252,111.577c1.371,7.196-0.521,14.56-5.191,20.203-4.67,5.644-11.55,8.881-18.875,8.881h-1.331z" />
                              <path d="m255.5,364c-12.958,0-23.5,10.542-23.5,23.5s10.542,23.5 23.5,23.5 23.5-10.542 23.5-23.5-10.542-23.5-23.5-23.5zm0,32c-4.687,0-8.5-3.813-8.5-8.5s3.813-8.5 8.5-8.5 8.5,3.813 8.5,8.5-3.813,8.5-8.5,8.5z" />
                            </g>
                          </g>
                        </svg></span><span>Employee Management</span></button> </li>
                        <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#attendance" data-bs-toggle="tab" id="attendance-tab" role="tab" type="button"> <span className="svg_bg akkbg"> <svg fill="#000000" height="64px" mirror-in-rtl="true" viewBox="0 0 24 24" width="64px" xmlns="http://www.w3.org/2000/svg">
                          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                          <g id="SVGRepo_iconCarrier">
                            <path d="M7 11c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2zm-2 6.993L9 18c.55 0 1-.45 1-1v-2c0-1.65-1.35-3-3-3s-3 1.35-3 3v2c0 .552.448.993 1 .993zM19 18h-6c-.553 0-1-.447-1-1s.447-1 1-1h6c.553 0 1 .447 1 1s-.447 1-1 1zm0-4h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1zm0-4h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1z" fill="#494c4e" />
                            <path d="M22 2H2C.9 2 0 2.9 0 4v16c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 17.5c0 .28-.22.5-.5.5h-19c-.28 0-.5-.22-.5-.5v-15c0-.28.22-.5.5-.5h19c.28 0 .5.22.5.5v15z" fill="#494c4e" />
                          </g>
                        </svg></span><span>Attendance Management</span> </button> </li>
                        <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#leave" data-bs-toggle="tab" id="leave-tab" role="tab" type="button"> <span className="svg_bg"> <svg fill="#000000" height="64px" id="Capa_1" version="1.1" viewBox="0 0 60 60" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                          <g id="SVGRepo_iconCarrier">
                            <g>
                              <g>
                                <path d="M59,0H1C0.4,0,0,0.4,0,1v46c0,0.6,0.4,1,1,1h4v11c0,0.6,0.4,1,1,1h48c0.6,0,1-0.4,1-1V48h4c0.6,0,1-0.4,1-1V1 C60,0.4,59.6,0,59,0z M58,2v6H2V2H58z M53,24H7v-6h46V24z M7,58V26h46v32H7z M55,46V17c0-0.6-0.4-1-1-1H6c-0.6,0-1,0.4-1,1v29H2 V10h56v36H55z" />
                                <rect height={2} width={4} x={4} y={4} />
                                <rect height={2} width={4} x={10} y={4} />
                                <rect height={2} width={4} x={9} y={20} />
                                <rect height={2} width={4} x={15} y={20} />
                                <rect height={2} width={2} x={54} y={4} />
                                <rect height={2} width={2} x={50} y={4} />
                                <rect height={2} width={2} x={49} y={20} />
                                <rect height={2} width={2} x={45} y={20} />
                                <path d="M11,47h16c0.6,0,1-0.4,1-1V30c0-0.6-0.4-1-1-1H11c-0.6,0-1,0.4-1,1v16C10,46.6,10.4,47,11,47z M12,39h6v6h-6V39z M20,45 v-6h6v6H20z M26,37h-6v-6h6V37z M18,31v6h-6v-6H18z" />
                                <rect height={2} width={4} x={31} y={29} />
                                <rect height={2} width={2} x={31} y={33} />
                                <rect height={2} width={2} x={35} y={33} />
                                <rect height={2} width={2} x={39} y={33} />
                                <rect height={2} width={2} x={43} y={33} />
                                <rect height={2} width={2} x={47} y={33} />
                                <rect height={2} width={4} x={38} y={29} />
                                <rect height={2} width={4} x={45} y={29} />
                                <rect height={2} width={18} x={31} y={37} />
                                <rect height={2} width={18} x={31} y={41} />
                                <rect height={2} width={18} x={31} y={45} />
                                <rect height={2} width={2} x={10} y={51} />
                                <rect height={2} width={2} x={14} y={51} />
                                <rect height={2} width={2} x={18} y={51} />
                                <rect height={2} width={27} x={22} y={51} />
                              </g>
                            </g>
                          </g>
                        </svg></span><span>Leave Management</span> </button> </li>
                        <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#payroll" data-bs-toggle="tab" id="payroll-tab" role="tab" type="button"> <span className="svg_bg"> <svg fill="#000000" height="64px" id="Layer_1_1_" version="1.1" viewBox="0 0 64 64" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                          <g id="SVGRepo_iconCarrier">
                            <g>
                              <path d="M60,3h-9.184C50.402,1.839,49.302,1,48,1H34c-1.302,0-2.402,0.839-2.816,2H22c-1.654,0-3,1.346-3,3v13h-3.406 c-1.217,0-2.418,0.319-3.474,0.923L6.734,23H1v18h6.697l4.236,2.824C13.087,44.594,14.43,45,15.816,45H19v15c0,1.654,1.346,3,3,3 h38c1.654,0,3-1.346,3-3V6C63,4.346,61.654,3,60,3z M25,27h2c2.206,0,4-1.794,4-4s-1.794-4-4-4h-2V9h6.184 c0.414,1.161,1.514,2,2.816,2h14c1.302,0,2.402-0.839,2.816-2H57v48H25V27z M33,4c0-0.552,0.448-1,1-1h14c0.552,0,1,0.448,1,1v4 c0,0.552-0.448,1-1,1H34c-0.552,0-1-0.448-1-1V4z M21,6c0-0.552,0.448-1,1-1h9v2h-8v12h-2V6z M15.816,43 c-0.99,0-1.949-0.29-2.773-0.84L8.303,39H3V25h4.266l5.847-3.341C13.867,21.228,14.725,21,15.594,21H27c1.103,0,2,0.897,2,2 s-0.897,2-2,2H15v1c0,2.757-2.243,5-5,5v2c3.521,0,6.442-2.612,6.929-6H19v16H15.816z M61,60c0,0.552-0.448,1-1,1H22 c-0.552,0-1-0.448-1-1V27h2v32h36V7h-8V5h9c0.552,0,1,0.448,1,1V60z" />
                              <rect height={2} width={2} x={35} y={5} />
                              <rect height={2} width={2} x={45} y={5} />
                              <path d="M48.373,47.209l-3.375-0.964l-0.001-0.507C46.81,44.472,48,42.374,48,40v-2c0-3.859-3.141-7-7-7s-7,3.141-7,7v2 c0,2.372,1.189,4.469,3,5.736v0.51l-3.374,0.963C31.491,47.82,30,49.797,30,52.018V55h22v-2.982 C52,49.797,50.509,47.82,48.373,47.209z M36,40v-2c0-2.757,2.243-5,5-5s5,2.243,5,5v2c0,2.757-2.243,5-5,5S36,42.757,36,40z M42.965,46.714L41,49.333l-1.965-2.619C39.659,46.897,40.318,47,41,47S42.341,46.897,42.965,46.714z M50,53H32v-0.982 c0-1.332,0.895-2.519,2.176-2.885l3.437-0.982L41,52.667l3.387-4.516l3.437,0.982C49.105,49.499,50,50.686,50,52.018V53z" />
                              <rect height={2} width={2} x={27} y={13} />
                              <rect height={2} width={24} x={31} y={13} />
                              <rect height={2} width={22} x={33} y={17} />
                              <rect height={2} width={22} x={33} y={21} />
                              <rect height={2} width={2} x={53} y={25} />
                              <rect height={2} width={18} x={33} y={25} />
                            </g>
                          </g>
                        </svg></span><span>Payroll Management</span> </button> </li>
                        <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#talent" data-bs-toggle="tab" id="talent-tab" role="tab" type="button"> <span className="svg_bg"> <svg fill="#000000" height="64px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                          <g id="SVGRepo_iconCarrier">
                            <g>
                              <g>
                                <rect height="15.77" width={512} y="483.614" />
                              </g>
                            </g>
                            <g>
                              <g>
                                <path d="M487.359,12.616h-80.492v174.522h15.77v-78.85h64.723c4.534,0,8.087,3.463,8.087,7.885s-3.552,7.885-8.087,7.885h-56.313 v15.77h56.313c13.151,0,23.852-10.605,23.857-23.643l0.119-80.064C511.336,23.16,500.58,12.616,487.359,12.616z M495.48,93.928 c-2.535-0.913-5.271-1.411-8.121-1.411h-64.723v-31.54V28.386h64.723c4.602,0,8.207,3.397,8.207,7.722L495.48,93.928z" />
                              </g>
                            </g>
                            <g>
                              <g>
                                <polygon points="399.511,43.846 284.043,43.846 303.169,91.662 284.043,139.477 399.508,139.477 399.508,123.707 307.337,123.707 320.155,91.662 307.337,59.616 399.511,59.616 " />
                              </g>
                            </g>
                            <g>
                              <g>
                                <rect height="15.77" width="152.444" x="15.77" y="44.156" />
                              </g>
                            </g>
                            <g>
                              <g>
                                <rect height="15.77" width="48.361" x="15.77" y="76.747" />
                              </g>
                            </g>
                            <g>
                              <g>
                                <rect height="15.77" width="39.951" x="79.901" y="76.747" />
                              </g>
                            </g>
                            <g>
                              <g>
                                <rect height="15.77" width="72.542" x="15.77" y="107.236" />
                              </g>
                            </g>
                            <g>
                              <g>
                                <rect height="15.77" width="24.181" x="15.77" y="139.828" />
                              </g>
                            </g>
                            <g>
                              <g>
                                <path d="M207.943,275.447v199.555h15.77v-63.93h64.091V475h15.77V275.447H207.943z M287.805,395.302h-64.091v-16.821h64.091 V395.302z M287.805,362.711h-64.091v-71.494h64.091V362.711z" />
                              </g>
                            </g>
                            <g>
                              <g>
                                <path d="M48.218,363.294V475h15.77v-16.618h64.091V475h15.771V363.294H48.218z M128.08,442.612H63.988v-15.77h64.091V442.612z M128.08,411.072H63.988v-32.008h64.091V411.072z" />
                              </g>
                            </g>
                            <g>
                              <g>
                                <path d="M367.668,195.584V475h15.77V275.45h64.093V475h15.77V195.584H367.668z M447.53,259.68h-64.093v-15.77h64.093V259.68z M447.53,228.14h-64.093v-16.786h64.093V228.14z" />
                              </g>
                            </g>
                          </g>
                        </svg></span><span>Talent Management</span> </button> </li>
                        <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#reports" data-bs-toggle="tab" id="reports-tab" role="tab" type="button"> <span className="svg_bg"> <svg fill="#000000" height="64px" version="1.1" viewBox="0 0 512 512" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                          <g id="SVGRepo_iconCarrier">
                            <g id="_x30_7_x2C__Analytics_x2C__laptop_x2C__statistics_x2C__web_x2C__computer">
                              <g id="XMLID_858_">
                                <g id="XMLID_197_">
                                  <path d="M351,237.458h-70c-1.788,0-3.439-0.955-4.332-2.503l-26.627-46.209 c-0.983-1.706-0.874-3.829,0.279-5.424l20.793-28.791c0.94-1.301,2.448-2.072,4.054-2.072h21.666 c1.605,0,3.113,0.771,4.054,2.073l54.167,75c1.099,1.522,1.253,3.532,0.398,5.204C354.597,236.407,352.878,237.458,351,237.458z M283.89,227.458h57.331l-46.944-65h-16.553l-17.403,24.097L283.89,227.458z" id="XMLID_699_" />
                                </g>
                                <g id="XMLID_196_">
                                  <path d="M281,237.458H151c-1.786,0-3.436-0.952-4.329-2.498s-0.895-3.451-0.003-4.999l51.861-90 c0.893-1.549,2.544-2.503,4.332-2.503h26.277c1.788,0,3.439,0.955,4.332,2.503l25.234,43.791l0,0l26.627,46.209 c0.892,1.547,0.891,3.453-0.003,4.999S282.785,237.458,281,237.458z M159.652,227.458h112.697l-46.1-80h-20.498L159.652,227.458z " id="XMLID_696_" />
                                </g>
                                <g id="XMLID_195_">
                                  <path d="M371,237.458H131c-2.761,0-5-2.239-5-5s2.239-5,5-5h240c2.762,0,5,2.239,5,5 S373.762,237.458,371,237.458z" id="XMLID_695_" />
                                </g>
                                <g id="XMLID_194_">
                                  <path d="M181,312.458h-50c-2.761,0-5-2.238-5-5v-50c0-2.761,2.239-5,5-5h50c2.761,0,5,2.239,5,5v50 C186,310.22,183.761,312.458,181,312.458z M136,302.458h40v-40h-40V302.458z" id="XMLID_692_" />
                                </g>
                                <g id="XMLID_193_">
                                  <path d="M241,267.458h-40c-2.761,0-5-2.238-5-5s2.239-5,5-5h40c2.761,0,5,2.238,5,5S243.761,267.458,241,267.458 z" id="XMLID_691_" />
                                </g>
                                <g id="XMLID_192_">
                                  <path d="M241,287.458h-40c-2.761,0-5-2.238-5-5s2.239-5,5-5h40c2.761,0,5,2.238,5,5S243.761,287.458,241,287.458 z" id="XMLID_690_" />
                                </g>
                                <g id="XMLID_191_">
                                  <path d="M316,312.458h-50c-2.762,0-5-2.238-5-5v-50c0-2.761,2.238-5,5-5h50c2.762,0,5,2.239,5,5v50 C321,310.22,318.762,312.458,316,312.458z M271,302.458h40v-40h-40V302.458z" id="XMLID_687_" />
                                </g>
                                <g id="XMLID_190_">
                                  <path d="M376,267.458h-40c-2.762,0-5-2.238-5-5s2.238-5,5-5h40c2.762,0,5,2.238,5,5S378.762,267.458,376,267.458 z" id="XMLID_686_" />
                                </g>
                                <g id="XMLID_189_">
                                  <path d="M376,287.458h-40c-2.762,0-5-2.238-5-5s2.238-5,5-5h40c2.762,0,5,2.238,5,5S378.762,287.458,376,287.458 z" id="XMLID_685_" />
                                </g>
                                <g id="XMLID_859_">
                                  <g id="XMLID_860_">
                                    <g id="XMLID_188_">
                                      <path d="M450,412.458H62c-17.093,0-31-13.906-31-31v-18c0-17.094,13.907-31,31-31h144c2.761,0,5,2.238,5,5v15 h90v-15c0-2.762,2.238-5,5-5h144c17.094,0,31,13.906,31,31v18C481,398.552,467.094,412.458,450,412.458z M62,342.458 c-11.58,0-21,9.421-21,21v18c0,11.579,9.42,21,21,21h388c11.579,0,21-9.421,21-21v-18c0-11.579-9.421-21-21-21H311v15 c0,2.762-2.238,5-5,5H206c-2.761,0-5-2.238-5-5v-15H62z" id="XMLID_682_" />
                                    </g>
                                    <g id="XMLID_187_">
                                      <path d="M446.477,342.458c-2.762,0-5-2.238-5-5V147.28c0-20.809-16.93-37.738-37.738-37.738H108.262 c-20.809,0-37.738,16.929-37.738,37.738v190.178c0,2.762-2.239,5-5,5s-5-2.238-5-5V147.28 c0-26.323,21.415-47.738,47.738-47.738h295.477c26.323,0,47.738,21.416,47.738,47.738v190.178 C451.477,340.22,449.238,342.458,446.477,342.458z" id="XMLID_681_" />
                                    </g>
                                    <g id="XMLID_186_">
                                      <path d="M445.091,312.458H66.909c-2.761,0-5-2.238-5-5s2.239-5,5-5h378.182c2.762,0,5,2.238,5,5 S447.853,312.458,445.091,312.458z" id="XMLID_676_" />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                            <g id="Layer_1" />
                          </g>
                        </svg></span><span>Reports and Analytics</span></button> </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link" data-bs-target="#events" data-bs-toggle="tab" id="events-tab" role="tab" type="button">
                            <span className="svg_bg"><svg fill="currentColor" height="64px" viewBox="0 0 50 50" width="64px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path d="M8 2L8 6L4 6L4 48L46 48L46 14L30 14L30 6L26 6L26 2 Z M 10 4L24 4L24 8L28 8L28 46L19 46L19 39L15 39L15 46L6 46L6 8L10 8 Z M 10 10L10 12L12 12L12 10 Z M 14 10L14 12L16 12L16 10 Z M 18 10L18 12L20 12L20 10 Z M 22 10L22 12L24 12L24 10 Z M 10 15L10 19L12 19L12 15 Z M 14 15L14 19L16 19L16 15 Z M 18 15L18 19L20 19L20 15 Z M 22 15L22 19L24 19L24 15 Z M 30 16L44 16L44 46L30 46 Z M 32 18L32 20L34 20L34 18 Z M 36 18L36 20L38 20L38 18 Z M 40 18L40 20L42 20L42 18 Z M 10 21L10 25L12 25L12 21 Z M 14 21L14 25L16 25L16 21 Z M 18 21L18 25L20 25L20 21 Z M 22 21L22 25L24 25L24 21 Z M 32 22L32 24L34 24L34 22 Z M 36 22L36 24L38 24L38 22 Z M 40 22L40 24L42 24L42 22 Z M 32 26L32 28L34 28L34 26 Z M 36 26L36 28L38 28L38 26 Z M 40 26L40 28L42 28L42 26 Z M 10 27L10 31L12 31L12 27 Z M 14 27L14 31L16 31L16 27 Z M 18 27L18 31L20 31L20 27 Z M 22 27L22 31L24 31L24 27 Z M 32 30L32 32L34 32L34 30 Z M 36 30L36 32L38 32L38 30 Z M 40 30L40 32L42 32L42 30 Z M 10 33L10 37L12 37L12 33 Z M 14 33L14 37L16 37L16 33 Z M 18 33L18 37L20 37L20 33 Z M 22 33L22 37L24 37L24 33 Z M 32 34L32 36L34 36L34 34 Z M 36 34L36 36L38 36L38 34 Z M 40 34L40 36L42 36L42 34 Z M 32 38L32 40L34 40L34 38 Z M 36 38L36 40L38 40L38 38 Z M 40 38L40 40L42 40L42 38 Z M 10 39L10 44L12 44L12 39 Z M 22 39L22 44L24 44L24 39 Z M 32 42L32 44L34 44L34 42 Z M 36 42L36 44L38 44L38 42 Z M 40 42L40 44L42 44L42 42Z" /></g></svg></span><span>Events and Meetings</span></button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link" data-bs-target="#mobile" data-bs-toggle="tab" id="mobile-tab" role="tab" type="button"> <span className="svg_bg">
                            <svg fill="currentColor" height="64px" id="Layer_1" version="1.1" viewBox="0 0 491.52 491.52" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M368.64,163.84V0H0v491.52h368.64V358.4h122.88V163.84H368.64z M450.846,184.32L348.16,260.79l-102.686-76.47H450.846z M297.588,248.662l-72.308,74.294V194.819L297.588,248.662z M20.48,20.48h327.68v40.96H20.48V20.48z M348.16,471.04H20.48V409.6 h327.68V471.04z M348.16,389.12H20.48V81.92h327.68v81.92H204.8V358.4h143.36V389.12z M239.295,337.92l74.863-76.919 l34.002,25.319l34.003-25.319l74.863,76.919H239.295z M471.04,322.957l-72.308-74.294l72.308-53.844V322.957z" /> </g> </g> <g> <g> <rect height="20.48" width="102.4" x="133.12" y="430.08" /> </g> </g> <g> <g> <rect height="20.48" width="61.44" x="133.12" y="30.72" /> </g> </g> <g> <g> <rect height="20.48" width="20.48" x="215.04" y="30.72" /> </g> </g> </g></svg>
                          </span><span>Mobile App</span></button>
                        </li>
                      </ul>
                      <div className="tab-content mt-3" id="myTabContent">
                        <div className="tab-pane fade show active" id="company" role="tabpanel">
                          <div className="tab-content-area pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/Product/HRMS.JPG" /> </div>
                              <div className="content-box-over">
                                <h5>Company Management Software</h5>
                                <p>Drive growth through centralised control</p>
                                <ul className="text-left text-white mt-2 mb-3" style={{fontSize: '14px', listStyleType: 'disc', paddingLeft: '20px'}}>
                                  <li>Manage company structure, branches, and departments</li>
                                  <li>Align operations with business goals</li>
                                  <li>Ensure smooth coordination across all units</li>
                                </ul>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="#" onClick={preventDefault}>Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="employee" role="tabpanel">
                          <div className="tab-content-area newhrtab pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/employees.png" /> </div>
                              <div className="content-box-over">
                                <h5>Employee Management Software</h5>
                                <p>Unlock your workforce's full potential</p>
                                <ul className="text-left text-white mt-2 mb-3" style={{fontSize: '14px', listStyleType: 'disc', paddingLeft: '20px'}}>
                                  <li>Maintain comprehensive employee profiles</li>
                                  <li>Streamline onboarding, transitions, and exits</li>
                                  <li>Boost engagement with effective communication tools</li>
                                </ul>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="#" onClick={preventDefault}>Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="attendance" role="tabpanel">
                          <div className="tab-content-area newhrtab pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/attandence.png" /> </div>
                              <div className="content-box-over">
                                <h5>Attendance Management Software</h5>
                                <p>Track time and presence with accuracy</p>
                                <ul className="text-left text-white mt-2 mb-3" style={{fontSize: '14px', listStyleType: 'disc', paddingLeft: '20px'}}>
                                  <li>Enable geo-tagged, geo-fenced, and selfie-based attendance</li>
                                  <li>Monitor check-in/out times in real-time</li>
                                  <li>Generate accurate reports for payroll processing</li>
                                </ul>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="#" onClick={preventDefault}>Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="leave" role="tabpanel">
                          <div className="tab-content-area pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/levemanagement.png" /> </div>
                              <div className="content-box-over">
                                <h5>Leave Management System</h5>
                                <p>Simplify leave requests and planning</p>
                                <ul className="text-left text-white mt-2 mb-3" style={{fontSize: '14px', listStyleType: 'disc', paddingLeft: '20px'}}>
                                  <li>Allow employees to apply and track leaves digitally</li>
                                  <li>Automate approvals and policy adherence</li>
                                  <li>Plan resources better with clear leave insights</li>
                                </ul>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="#" onClick={preventDefault}>Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="payroll" role="tabpanel">
                          <div className="tab-content-area pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/payroll-management.png" /> </div>
                              <div className="content-box-over">
                                <h5>Payroll Management Software</h5>
                                <p>Seamless and compliant salary processing</p>
                                <ul className="text-left text-white mt-2 mb-3" style={{fontSize: '14px', listStyleType: 'disc', paddingLeft: '20px'}}>
                                  <li>Automate salary, tax, and benefit calculations</li>
                                  <li>Generate payslips, handle TDS, PF, and ESI with ease</li>
                                  <li>Ensure timely, error-free disbursements</li>
                                </ul>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="#" onClick={preventDefault}>Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="talent" role="tabpanel">
                          <div className="tab-content-area newhrtab pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/talentmanagement.png" /> </div>
                              <div className="content-box-over">
                                <h5>Talent Management Software</h5>
                                <p>Build high-performing teams effortlessly</p>
                                <ul className="text-left text-white mt-2 mb-3" style={{fontSize: '14px', listStyleType: 'disc', paddingLeft: '20px'}}>
                                  <li>Set goals, track performance, and provide feedback</li>
                                  <li>Recognise achievements and address gaps</li>
                                  <li>Align employee growth with business success</li>
                                </ul>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="#" onClick={preventDefault}>Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="reports" role="tabpanel">
                          <div className="tab-content-area pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/reportanalytics.png" /> </div>
                              <div className="content-box-over">
                                <h5>Reports and Analytics Software</h5>
                                <p>Turn data into actionable insights</p>
                                <ul className="text-left text-white mt-2 mb-3" style={{fontSize: '14px', listStyleType: 'disc', paddingLeft: '20px'}}>
                                  <li>Access customised reports across HR functions</li>
                                  <li>Monitor KPIs and workforce trends in real-time</li>
                                  <li>Make faster, smarter decisions with reliable data</li>
                                </ul>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="#" onClick={preventDefault}>Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="events" role="tabpanel">
                          <div className="tab-content-area pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/eventmanagement.png" /> </div>
                              <div className="content-box-over">
                                <h5>Events and Meetings Management Software</h5>
                                <p>Foster collaboration and drive alignment</p>
                                <ul className="text-left text-white mt-2 mb-3" style={{fontSize: '14px', listStyleType: 'disc', paddingLeft: '20px'}}>
                                  <li>Schedule and manage meetings company-wide</li>
                                  <li>Send invites, share updates, and track participation</li>
                                  <li>Host effective virtual or in-person events</li>
                                </ul>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="#" onClick={preventDefault}>Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="mobile" role="tabpanel">
                          <div className="tab-content-area pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/mobileapp.png" /> </div>
                              <div className="content-box-over">
                                <h5>Mobile App</h5>
                                <p>Manage HR tasks anytime, anywhere</p>
                                <ul className="text-left text-white mt-2 mb-3" style={{fontSize: '14px', listStyleType: 'disc', paddingLeft: '20px'}}>
                                  <li>Empower employees with self-service access</li>
                                  <li>Track attendance, apply for leave, and view payslips on the go</li>
                                  <li>Stay connected and productive from any location</li>
                                </ul>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="#" onClick={preventDefault}>Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div aria-labelledby="activity-tab" className="tab-pane fade" id="activityreporter" role="tabpanel">
                    <div className="imgbox-tab text-center position-relative">
                      <img alt="" className="over1" src="assets/images/rate.gif" />
                      <div className="shadowww">
                        <img alt="" className="img22" src="assets/images/Product/Activity-Management.png" />
                      </div>
                      <div className="content-box-over">
                        <h5>Activity Management Software </h5>
                        <p>Track, manage, and analyse employee activities in real time to ensure optimal performance. </p>
                        <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="#" onClick={preventDefault} style={{ visibility: 'visible', animationName: 'fadeInUp' }}>Book a demo</a> </div>
                      </div>
                    </div>
                  </div>
                  <div aria-labelledby="task-tab" className="tab-pane fade text-center" id="taskmanagement" role="tabpanel">
                    <div className="imgbox-tab position-relative">
                      <img alt="" className="over1" src="assets/images/rate.gif" />
                      <div className="shadowww">
                        <img alt="" className="img22" src="assets/images/Product/Task-managment.png" />
                      </div>
                      <div className="content-box-over">
                        <h5>Task Management Software</h5>
                        <p>Plan, assign, and track tasks effortlessly with automation-driven workflows that improve collaboration.</p>
                        <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="#" onClick={preventDefault} style={{ visibility: 'visible', animationName: 'fadeInUp' }}>Book a demo</a> </div>
                      </div>
                    </div>
                  </div>
                  <div aria-labelledby="asset-tab" className="tab-pane fade text-center" id="assetmanagement" role="tabpanel">
                    <div className="imgbox-tab position-relative">
                      <img alt="" className="over1" src="assets/images/rate.gif" />
                      <div className="shadowww">
                        <img alt="" className="img22" src="assets/images/Product/OrganisationStructure.png" />
                      </div>
                      <div className="content-box-over">
                        <h5>Organisation Structure</h5>
                        <p>Gain complete control over your Organisation Structure, monitor, and maintain them in real-time with a platform.</p>
                        <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="#" onClick={preventDefault} style={{ visibility: 'visible', animationName: 'fadeInUp' }}>Book a demo</a> </div>
                      </div>
                    </div>
                  </div>
                  <div aria-labelledby="force-tab" className="tab-pane fade text-center" id="forcemanagement" role="tabpanel">
                    <div className="imgbox-tab position-relative">
                      <img alt="" className="over1" src="assets/images/rate.gif" />
                      <div className="shadowww">
                        <img alt="" className="img22" src="assets/images/Product/Gatepass.png" />
                      </div>
                      <div className="content-box-over">
                        <h5>Gatepass Management</h5>
                        <p>Empower your on-ground teams with GPS-based tracking, live updates, task allocation.</p>
                        <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="#" onClick={preventDefault} style={{ visibility: 'visible', animationName: 'fadeInUp' }}>Book a demo</a> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <section className="platform-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">A Single Unified Platform</h4>
                <h2 className="title split-text">Loved By All - From Employer to Employee</h2>
                <div className="devider" />
              </div>
            </div>
          </div>
          <ul className="nav nav-tabs justify-content-center mb-4" id="roleTabs" role="tablist">
            <li className="nav-item" role="presentation"> <button className="nav-link active" data-bs-target="#chro" data-bs-toggle="tab" id="chro-tab" role="tab" type="button">
              <div className="tab-hold"> <img alt="" src="assets/images/human-resources.png" /> <span className="d-block">CHRO</span> </div>
            </button> </li>
            <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#manager" data-bs-toggle="tab" id="manager-tab" role="tab" type="button">
              <div className="tab-hold"> <img alt="" src="assets/images/manager.png" /> <span className="d-block">Manager</span> </div>
            </button> </li>
            <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#management" data-bs-toggle="tab" id="management-tab" role="tab" type="button">
              <div className="tab-hold"> <img alt="" src="assets/images/management.png" /> <span className="d-block">Management</span> </div>
            </button> </li>
            <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#employee1" data-bs-toggle="tab" id="employee-tab" role="tab" type="button">
              <div className="tab-hold"> <img alt="" src="assets/images/employee.png" /> <span className="d-block">Employee</span> </div>
            </button> </li>
            <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#finance" data-bs-toggle="tab" id="finance-tab" role="tab" type="button">
              <div className="tab-hold"> <img alt="" src="assets/images/business-and-finance.png" /> <span className="d-block">Finance</span> </div>
            </button> </li>
          </ul>
          <div className="tab-content" id="roleTabsContent">
            <div className="tab-pane fade show active" id="chro" role="tabpanel">
              <div className="row g-4 align-items-center">
                <div className="col-md-6">
                  <div className="p-4 border rad10 bg-white shadow-sm">
                    <h5 className="fw-bold">CHRO - Before HRMetricS</h5>
                    <ul className="list-unstyled mt-3">
                      <li className="mb-1"><span className="text-warning" /> Use of spreadsheets for People Ops</li>
                      <li className="mb-1"><span className="text-warning" /> Manual data entries leading to frequent errors</li>
                      <li className="mb-1"><span className="text-warning" /> Disengaged employees with low motivation</li>
                      <li><span className="text-warning" /> Valuable time lost in repetitive admin work</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-4 rad10 bg1 bg-opacity-25">
                    <h5 className="fw-bold">With HRMetricS</h5>
                    <p className="text-justify">Workforce management becomes effortless. Centralize employee records, leave, and attendance data on a single platform. Monitor People Operations, boost employee engagement, and make HR processes more strategic. Track and evaluate employee performance effectively using the built-in task management module and Daily Progress Reports (DPR).</p>
                  </div>
                </div>
                <div className="col-md-6 text-center">
                  <div className="p-3 bg1 bg-opacity-25 rad10 img_paltform"> <img alt="Employee with tablet" className="img-fluid" src="assets/images/img2.png" /> </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="manager" role="tabpanel">
              <div className="row g-4 align-items-center">
                <div className="col-md-6">
                  <div className="p-4 border rad10 bg-white shadow-sm">
                    <h5 className="fw-bold">Manager - Before HRMetricS</h5>
                    <ul className="list-unstyled mt-3">
                      <li className="mb-1"><span className="text-warning" /> Delays in approval workflows</li>
                      <li className="mb-1"><span className="text-warning" /> Difficulty tracking team performance</li>
                      <li className="mb-1"><span className="text-warning" /> Overloaded with routine admin tasks</li>
                      <li><span className="text-warning" /> No structured system to assign or monitor work</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-4 rad10 bg2 bg-opacity-25">
                    <h5 className="fw-bold">With HRMetricS</h5>
                    <p>Managers can track team activities in real time through Attendance Regularization (AR), task assignments, and performance dashboardsâ€”bringing structure, speed, and visibility to daily operations.</p>
                  </div>
                </div>
                <div className="col-md-6 text-center">
                  <div className="p-3 bg2 bg-opacity-25 rad10 img_paltform"> <img alt="Manager with dashboard" className="img-fluid" src="assets/images/img3.png" /> </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="management" role="tabpanel">
              <div className="row g-4 align-items-center">
                <div className="col-md-6">
                  <div className="p-4 border rad10 bg-white shadow-sm">
                    <h5 className="fw-bold">Management - Before HRMetricS</h5>
                    <ul className="list-unstyled mt-3">
                      <li className="mb-1"><span className="text-warning" /> Struggle with data security and software compatibility</li>
                      <li className="mb-1"><span className="text-warning" /> Low platform adoption among users</li>
                      <li><span className="text-warning" /> No structured support during implementation</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-4 rad10 bg1 bg-opacity-25">
                    <h5 className="fw-bold">With HRMetricS</h5>
                    <p className="text-justify">Experience zero compliance hassles. Our expert team works closely with your IT department to ensure seamless implementation, secure data management, and scalable, future-ready operations. Gain complete visibility with graphical and analytical reports that track project start and end dates, monitor actual vs. planned progress, and maintain comprehensive document recordsâ€”all in one place.</p>
                  </div>
                </div>
                <div className="col-md-6 text-center">
                  <div className="p-3 bg1 bg-opacity-25 rad10 img_paltform"> <img alt="Management overview" className="img-fluid" src="assets/images/management-img.png" /> </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="employee1" role="tabpanel">
              <div className="row g-4 align-items-center">
                <div className="col-md-6">
                  <div className="p-4 border rad10 bg-white shadow-sm">
                    <h5 className="fw-bold">Employee - Before HRMetricS</h5>
                    <ul className="list-unstyled mt-3">
                      <li className="mb-1"><span className="text-warning" /> Complicated systems for basic HR tasks</li>
                      <li className="mb-1"><span className="text-warning" /> Constant dependency on HR for documents</li>
                      <li className="mb-1"><span className="text-warning" /> Disconnected from internal communication</li>
                      <li><span className="text-warning" /> Manual tracking using spreadsheets</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-4 rad10 bg1 bg-opacity-25">
                    <h5 className="fw-bold">With HRMetricS</h5>
                    <p className="text-justify">Empower your workforce with a seamless self-service experience! Through our easy-to-use mobile app, employees can apply for leave, view shifts, download payslips, and access trainingâ€”anytime, anywhere. They can also track their daily tasks, helping them manage their workload and time more efficiently.</p>
                  </div>
                </div>
                <div className="col-md-6 text-center">
                  <div className="p-3 bg1 bg-opacity-25 rad10 img_paltform"> <img alt="Employee overview" className="img-fluid" src="assets/images/employess.png" /> </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="finance" role="tabpanel">
              <div className="row g-4 align-items-center">
                <div className="col-md-6">
                  <div className="p-4 border rad10 bg-white shadow-sm">
                    <h5 className="fw-bold">Finance - Before HRMetricS</h5>
                    <ul className="list-unstyled mt-3">
                      <li className="mb-1"><span className="text-warning" /> Payroll management still done on Excel</li>
                      <li className="mb-1"><span className="text-warning" /> Struggling with complex statutory regulations</li>
                      <li><span className="text-warning" /> Frequent data entry errors and tedious manual processes</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-4 rad10 bg1 bg-opacity-25">
                    <h5 className="fw-bold">With HRMetricS</h5>
                    <p className="text-justify">Run payroll like a pro! HRMetricS' advanced Payroll Management module ensures complete accuracy, statutory compliance, and seamless salary disbursement. It automatically generates Form 16, gives access to detailed reports, and simplifies every aspect of payroll processing. HRMetricS also generates the Bank CMS file, ready for direct download and upload to your bank portalâ€”saving time and reducing manual effort.</p>
                  </div>
                </div>
                <div className="col-md-6 text-center">
                  <div className="p-3 bg1 bg-opacity-25 rad10 img_paltform"> <img alt="Finance overview" className="img-fluid" src="assets/images/finance.png" /> </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-center text-center mt-5"> <a className="btn btn-theme btn-md radius animation wow scrollToForm fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="#" onClick={preventDefault} style={{ visibility: 'visible', animationName: 'fadeInUp' }}>Book a demo</a> </div>
        </div>
      </section>
      <hr />
      <div className="tesimoinial-style-four-area bg-gray default-padding bg-cover" style={{ backgroundImage: 'url(assets/img/shape/38.png)' }}>
        <div className="container">
          <div className="left-heading">
            <div className="row">
              <div className="col-lg-6">
                <h4 className="sub-title">Testimonials</h4>
                <h2 className="title">What Our Clients Say About Us</h2>
              </div>
              <div className="col-lg-5 offset-lg-1 text-end">
                <div className="testimonial-four-swiper-nav">
                  <div className="testimonial-four-prev"><i className="fas fa-angle-left" /></div>
                  <div className="testimonial-four-next"><i className="fas fa-angle-right" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-112">
              <div className="testimonial-style-four-carousel swiper">
                <div className="swiper-wrapper">
                  {testimonials.map((item) => (
                    <div key={item.id} className="swiper-slide">
                      <div className="testimonial-style-four">
                        <div className="quote">
                          <img alt="Quote" src="assets/images/quote.png" />
                        </div>
                        <div className="provider">
                          <div className="thumb">
                            <img alt={item.clientName} src={item.imageUrl || "assets/images/testhr.png"} />
                          </div>
                          <div className="info">
                            <h4>{item.clientName}</h4>
                            <span>{formatClientMeta(item)}</span>
                          </div>
                        </div>
                        <p className="moretext" data-fulltext={item.testimonial}>{item.testimonial}</p>
                        <div className="bottom-info mt-2">
                          <div className="icon">
                            {Array.from({ length: Math.max(1, Math.min(5, Number(item.rating) || 5)) }).map((_, index) => (
                              <i key={`${item.id}-star-${index}`} className="fas fa-star" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {false && (
                    <>
                      <div className="swiper-slide">
                        <div className="testimonial-style-four">
                          <div className="quote">
                            <img alt="Image Not Found" src="assets/images/quote.png" />
                          </div>
                          <div className="provider">
                            <div className="thumb">
                              <img alt="Image Not Found" src="assets/images/testhr.png" />
                            </div>
                            <div className="info">
                              <h4>Tapasya</h4>
                              <span>HR Head, IndiaIT360</span>
                            </div>
                          </div>
                          <div className="more">
                            <p className="moretext" data-fulltext=" It's easy to manage HR processes than what we where doing it manually. After adopting HRMetricS, we are able to same time by automating all the manual processes from attendance tracking to leave approvals and payslip generation, everything is now automated and accessible in just a few clicks. Our employees love the self-service portal, and our HR team has finally moved from firefighting to strategic planning. Kudos to the HRMetricS intuitive HRMS platform for such a comprehensive solution!" />
                          </div>
                          <div className="bottom-info mt-2">
                            <div className="icon">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="testimonial-style-four">
                          <div className="quote">
                            <img alt="Image Not Found" src="assets/images/quote.png" />
                          </div>
                          <div className="provider">
                            <div className="thumb">
                              <img alt="Image Not Found" src="assets/images/test4.jpg" />
                            </div>
                            <div className="info">
                              <h4>Vivek Arora</h4>
                              <span>HR Head, Simsona</span>
                            </div>
                          </div>
                          <p className="moretext" data-fulltext="At Simsona, we have completely transformed the way we handle recruitment and performance reviews. The platform is intuitive, fast, and incredibly powerful. Weâ€™ve reduced our employee onboarding  to exit process by nearly 40% and gained real-time visibility into employee performance metrics. It's like having an extra HR manager onboardâ€”only smarter!" />
                          <div className="bottom-info mt-2">
                            <div className="icon">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="testimonial-style-four">
                          <div className="quote">
                            <img alt="Image Not Found" src="assets/images/quote.png" />
                          </div>
                          <div className="provider">
                            <div className="thumb">
                              <img alt="Image Not Found" src="assets/images/test3.jpg" />
                            </div>
                            <div className="info">
                              <h4>Anita Mishra</h4>
                              <span>VP of Employee Relations</span>
                            </div>
                          </div>
                          <p className="moretext" data-fulltext=" HRMetricS has made our payroll processing seamless and efficient. What used to take several days now takes less than two days â€”with error-free calculations and payslip generation at the click of a button" />
                          <div className="bottom-info mt-2">
                            <div className="icon">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="testimonial-style-four">
                          <div className="quote">
                            <img alt="Image Not Found" src="assets/images/quote.png" />
                          </div>
                          <div className="provider">
                            <div className="thumb">
                              <img alt="Image Not Found" src="assets/images/test5.avif" />
                            </div>
                            <div className="info">
                              <h4>Kritika Sharma</h4>
                              <span>Employee Relation Manager</span>
                            </div>
                          </div>
                          <p className="moretext" data-fulltext="HRMetricS is built for every kind of workforce. Our field employees can now mark their attendance and submit expenses on the go, right from their mobile devices." />
                          <div className="bottom-info mt-2">
                            <div className="icon">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="testimonial-style-four">
                          <div className="quote">
                            <img alt="Image Not Found" src="assets/images/quote.png" />
                          </div>
                          <div className="provider">
                            <div className="thumb">
                              <img alt="Image Not Found" src="assets/images/test6.jpg" />
                            </div>
                            <div className="info">
                              <h4>Beena Rathi</h4>
                              <span>Talent Acquisition Coordinator</span>
                            </div>
                          </div>
                          <p className="moretext" data-fulltext=" Our employees appreciate the transparency and convenience HRMetricS offersâ€”easy access to personal data, a clear and timely payroll process, and smooth leave and attendance management. The platformâ€™s secure data handling also builds trust. Itâ€™s more than just an HR toolâ€”itâ€™s an asset to employee satisfaction." />
                          <div className="bottom-info mt-2">
                            <div className="icon">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="testimonial-style-four">
                          <div className="quote">
                            <img alt="Image Not Found" src="assets/images/quote.png" />
                          </div>
                          <div className="provider">
                            <div className="thumb">
                              <img alt="Image Not Found" src="assets/images/test7.jpeg" />
                            </div>
                            <div className="info">
                              <h4>Carmen Bety</h4>
                              <span>Talent Acquisition Specialist</span>
                            </div>
                          </div>
                          <p className="moretext" data-fulltext="Iâ€™ve always liked the software we were using for years, but after exploring other platforms like HRMetricS, it tuned out to be the best fit for our needs. HRMetricS stood out with its powerful customization options. Weâ€™re able to create tailored workflows that fit our unique processesâ€”something I havenâ€™t seen with other HR solutions. It offers outstanding value." />
                          <div className="bottom-info mt-2">
                            <div className="icon">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="testimonial-style-four">
                          <div className="quote">
                            <img alt="Image Not Found" src="assets/images/quote.png" />
                          </div>
                          <div className="provider">
                            <div className="thumb">
                              <img alt="Image Not Found" src="assets/images/test8.jpg" />
                            </div>
                            <div className="info">
                              <h4>Ruby Nair</h4>
                              <span>Chief Human Resources&nbsp;Officer</span>
                            </div>
                          </div>
                          <p className="moretext" data-fulltext="One of the standout features of HRMetricS is its versatility. Itâ€™s not just limited to the HR teamâ€”our Assets, Office Management, Training, and Finance departments. All use it effectively to streamline their operations." />
                          <div className="bottom-info mt-2">
                            <div className="icon">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="technolgy-index-two-area default-padding bg-dark text-light bg-cover">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="left-heading-two">
                <div className="left-info">
                  <h4 className="sub-title">Recognitions</h4>
                  <h2 className="title">Awards We Won</h2>
                </div>
                <div className="right-info">
                  <p className="text-white">Weâ€™re honored to be recognized for our innovation, impact, and commitment to excellence. These awards reflect the hard work of our team and the trust of our partners, clients, and community.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="technology-index-two-items text-center">
                <div className="tech-index-two-item">
                  <a href="#">
                    <div className="icon">
                      <img src="assets/images/certificate.png" />
                    </div>
                  </a>
                </div>
                <div className="tech-index-two-item">
                  <a href="#">
                    <div className="icon">
                      <img src="assets/images/award2.png" />
                    </div>
                  </a>
                </div>
                <div className="tech-index-two-item">
                  <a href="#">
                    <div className="icon">
                      <img src="assets/images/award3.png" />
                    </div>
                  </a>
                </div>
                <div className="tech-index-two-item">
                  <a href="#">
                    <div className="icon">
                      <img src="assets/images/award4.png" />
                    </div>
                  </a>
                </div>
                <div className="tech-index-two-item">
                  <a href="#">
                    <div className="icon">
                      <img src="assets/images/award5.png" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <section id="pricing" className="default-padding bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <h5 className="sub-title">Pricing</h5>
              <h2 className="title mb-2">Transparent Plans. No Hidden Fees.</h2>
              <p className="mb-4">Pay only for pages you process. Start monthly, save with yearly billing.</p>
              <div className="pricing-billing-toggle">
                <button type="button" onClick={() => setBillingCycle("monthly")} className={`pricing-billing-btn ${billingCycle === "monthly" ? "is-active" : ""}`}>
                  Monthly
                </button>
                <button type="button" onClick={() => setBillingCycle("yearly")} className={`pricing-billing-btn ${billingCycle === "yearly" ? "is-active" : ""}`}>
                  Yearly <span className="save-badge">Save 20%</span>
                </button>
              </div>
            </div>
          </div>
          <div className="row g-4">
            {pricingPlans.map((plan) => (
              <div key={plan.id} className="col-xl-3 col-lg-6 col-md-6">
                <div className={`pricing-style-one h-100 ${plan.isPopular ? "active" : ""}`} style={{ border: "1px solid #d9dff2", borderRadius: 12, background: "#fff", padding: 20, position: "relative" }}>
                  {plan.badgeText ? (
                    <span style={{ position: "absolute", top: -10, left: 20, background: "#2f41e9", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                      {plan.badgeText}
                    </span>
                  ) : null}
                  <h6 style={{ color: "#2f41e9", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{plan.planKey || plan.name}</h6>
                  <h4 style={{ marginBottom: 6 }}>{plan.name}</h4>
                  <p style={{ fontSize: 14, minHeight: 44 }}>{plan.subtitle || "\u00a0"}</p>
                  {plan.isCustom ? (
                    <h3 style={{ color: "#2f41e9", margin: "10px 0 12px" }}>Let's talk</h3>
                  ) : (
                    <h3 style={{ margin: "10px 0 12px" }}>
                      ${billingCycle === "yearly" ? plan.priceYearly : plan.priceMonthly}
                      <span style={{ fontSize: 16, fontWeight: 500 }}>/ {billingCycle === "yearly" ? "yr" : "mo"}</span>
                    </h3>
                  )}
                  {plan.pageLimitLabel ? (
                    <div style={{ border: "1px solid #b7dfc4", background: "#ecfff2", color: "#0d8b4e", borderRadius: 8, padding: "8px 10px", fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
                      {plan.pageLimitLabel}
                    </div>
                  ) : null}
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {(plan.points || []).map((point, index) => (
                      <li key={`${plan.id}-${index}`} style={{ marginBottom: 8, fontSize: 14 }}>
                        <i className="fas fa-check" style={{ color: "#3857f1", marginRight: 8 }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a
                    className={`btn mt-3 w-100 ${plan.isPopular ? "btn-theme text-white" : "btn-theme btn-md radius"}`}
                    href={plan.ctaUrl || "#contact"}
                  >
                    {plan.ctaLabel || "Choose Plan"} <i className="fas fa-arrow-right" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="dem-section bg-gradientt position-relative py-5">
        <div className="circle-img" style={{ backgroundImage: 'url(assets/images/circlbg.png)' }}>
        </div>
        <div className="container">
          <div className="btn-center text-center myflex">
            <h3>Transform Your HR Process: Take the First Step Towards Automation</h3>
            <a className="btn btn-theme btn-md radius scrollToForm animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="#" onClick={preventDefault} style={{ visibility: 'visible', animationName: 'fadeInUp' }}>Book a demo</a>
          </div>
        </div>
      </div>
      <section id="about">
        <div className="about-style-two-area default-padding overflow-hidden bg-gray">
          <div className="shape">
            <img alt="Shape" src="assets/images/line-side.png" />
          </div>
          <div className="container">
            <div className="row align-center">
              <div className="col-lg-6">
                <div className="about-style-two-thumb">
                  <img alt="Image Not Found" className="wow fadeInUp" src="assets/images/aboutmain.png" />
                  <img alt="Image Not Found" className="wow fadeInDown" data-wow-delay="100ms" src="assets/images/hrmetrics-building.jpg" />
                  <div className="certification wow fadeInUp" data-wow-delay="250ms">
                    <img alt="Image Not Found" src="assets/images/abtcerti.png" />
                    <h4> Certified Company</h4>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 pl-50 pl-md-15 pl-xs-15">
                <div className="about-style-two-info">
                  <h4 className="sub-title">About Us</h4>
                  <h2 className="title mb-3 split-text">Who We Are</h2>
                  <p>HRMetricS is the brainchild of the HRMetricS team.</p>
                  <p>Systems Solutions Pvt Ltd is a tech-leading IT consulting and software development company in the Digital Era! We have provisioned our esteemed clients with the Best-Suite Software Solutions. We mainly focus on <strong>HR-MetricS </strong> and <strong>ERP Development </strong> , Implementation, and integration.</p>
                  <p>Our journey began out of the passion for a unique monarch in the industry. To save time and money and to free up the platform owners to concentrate on their main offering, we identified the common denominator. Because of this, we have teamed up to create fresh, prosperous businesspeople all over the world!</p>

                  <div className="grid grid-cols-3 gap-15 text-center" style={{ display: "flex", gap: "50px" }}>
                    <div>
                      <div className="text-3xl font-bold text-primary">300+</div>
                      <div className="text-gray-600">Projects Completed</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary">50+</div>
                      <div className="text-gray-600">Happy Clients</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary">100%</div>
                      <div className="text-gray-600">Client Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="faq">
          <FaqSection className="pt-2 faq-minimal" subHeading="FAQ" heading="" />
        </div>
      </section>
      <section id="contact">
        <div className="contact-style-one-area overflow-hidden default-padding">
          <div className="contact-shape">
            <img alt="Image Not Found" src="assets/img/shape/37.png" />
          </div>
          <div className="container">
            <div className="row">
              <div className="contact-stye-one col-lg-5 mb-md-50 mb-xs-20">
                <div className="contact-style-one-info">
                  <h2 className="split-text">Contact Information</h2>
                  <ul>
                    <li className="wow fadeInUp">
                      <div className="icon">
                        <i className="fas fa-phone-alt" />
                      </div>
                      <div className="content">
                        <h5 className="title">Call</h5>
                        <a href={siteSettings.whatsapp_direct_url} target="_blank" rel="noopener noreferrer"> {siteSettings.primary_phone}</a><span className="text-white">,</span> <a href={siteSettings.secondary_phone_href}>{siteSettings.secondary_phone}</a>
                      </div>
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="300ms">
                      <div className="icon">
                        <i className="fas fa-map-marker-alt" />
                      </div>
                      <div className="info">
                        <h5 className="title">Our Location</h5>
                        <p><strong><span className="dottt" /> Maldives:</strong> {siteSettings.new_delhi_address}</p>
                        <p><strong><span className="dottt" /> Madurai:</strong> {siteSettings.noida_address}</p>
                      </div>
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="500ms">
                      <div className="icon">
                        <i className="fas fa-envelope-open-text" />
                      </div>
                      <div className="info">
                        <h5 className="title">Email</h5>
                        <a href={siteSettings.primary_email_href}>{siteSettings.primary_email}</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="contact-stye-one col-lg-7 pl-60 pl-md-15 pl-xs-15">
                <div className="contact-form-style-one">
                  <h5 className="sub-title">Have Questions?</h5>
                  <h2 className="title">Send us a Massage</h2>
                  <form className="contact-form1" onSubmit={handleContactSubmit}>
                    <div className="row">
                      <div className="col-lg-12"><div className="form-group"><input className="form-control" id="name" name="name" placeholder="Name*" required type="text" /><span className="alert-error" /></div></div>
                      <div className="col-lg-6"><div className="form-group"><input className="form-control" id="email" name="email" placeholder="Official Email*" required type="email" /><span className="alert-error" /></div></div>
                      <div className="col-lg-6"><div className="form-group"><input className="form-control" id="phone" maxLength={10} minLength={10} name="phone" placeholder="Mobile*" required type="text" /><span className="alert-error" /></div></div>
                      <div className="col-lg-6"><div className="form-group"><input className="form-control" id="company" name="company" placeholder="Organization Name*" required type="text" /><span className="alert-error" /></div></div>
                      <div className="col-lg-6"><div className="form-group"><input className="form-control" id="employees" name="employees" placeholder="Number of Employees*" required type="text" /><span className="alert-error" /></div></div>
                      <div className="col-lg-6"><div className="form-group"><input className="form-control" id="address" name="address" placeholder="Address" type="text" /><span className="alert-error" /></div></div>
                      <div className="col-lg-6"><div className="form-group"><input className="form-control" id="city" name="city" placeholder="City" type="text" /><span className="alert-error" /></div></div>
                      <div className="col-lg-12"><div className="form-group"><input className="form-control" id="pincode" name="pincode" placeholder="Pincode" type="text" /><span className="alert-error" /></div></div>
                      <div className="col-lg-12"><div className="form-group comments"><textarea className="form-control" id="message" name="message" placeholder="Message*" defaultValue="" /></div></div>
                      <div className="col-lg-12">
                        <button id="submit" name="submit" type="submit" disabled={submitting}>
                          {submitting ? <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />Sending...</> : <><i className="fa fa-paper-plane" /> Get in Touch</>}
                        </button>
                      </div>
                      <div className="col-lg-12 alert-notification">
                        <SubmitAlert variant="success" message={message} />
                        <SubmitAlert variant="error" message={submitError} />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="google-map">
          <iframe allowFullScreen frameBorder={0} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={siteSettings.google_maps_embed_url} style={{ border: 0, width: "100%", height: 350 }} />
        </div>
      </section>
      {cookieConsent === null ? (
        <div className="cookie-consent-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
          <p>
            We use cookies to enhance your experience.
            <a href="/privacy-policy"> Policy</a>
          </p>
          <div className="cookie-consent-actions">
            <button
              className="btn-cookie-decline"
              type="button"
              onClick={() => handleCookieConsent("declined")}
            >
              Decline
            </button>
            <button
              className="btn-cookie-accept"
              type="button"
              onClick={() => handleCookieConsent("accepted")}
            >
              Accept All
            </button>
          </div>
        </div>
      ) : null}

            <footer className="footer-bg text-light bg-cover footer-clean">
        <div className="container">
          <div className="f-items relative pt-50 pb-40 pt-xs-0 pb-xs-30">
            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div className="f-item about">
                  <img alt="Logo" className="logo mb-2" src="assets/images/Logo.png" style={{ height: 44 }} />
                  <h5 className="mb-2">HRMetricS</h5>
                  <p className="mb-0">AI-powered document and HR automation for enterprises. Built to simplify operations and improve workforce productivity.</p>
                  <ul className="footer-social mt-3">
                    <li><a href={siteSettings.linkedin_url} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in" /></a></li>
                    <li><a href={siteSettings.facebook_url} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f" /></a></li>
                    <li><a href={siteSettings.x_url} target="_blank" rel="noopener noreferrer"><i className="">X</i></a></li>
                    <li><a href={siteSettings.instagram_url} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a></li>
                    <li><a href={siteSettings.whatsapp_url} target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp" /></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <div className="f-item link">
                  <h4 className="widget-title">Product</h4>
                  <ul>
                    <li><a href="#software">How it Works</a></li>
                    <li><a href="#software">Features</a></li>
                    <li><a href="#about">Industries</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="f-item link">
                  <h4 className="widget-title">MV Maldives</h4>
                  <ul>
                    <li><a href={siteSettings.company_url} target="_blank" rel="noopener noreferrer">solutions.com.mv</a></li>
                    <li><a href={siteSettings.whatsapp_direct_url} target="_blank" rel="noopener noreferrer">{siteSettings.primary_phone}</a></li>
                    <li><a href={siteSettings.primary_email_href}>{siteSettings.primary_email}</a></li>
                  </ul>
                  <h4 className="widget-title mt-3">BT Bhutan</h4>
                  <ul>
                    <li><a href={siteSettings.secondary_phone_href}>{siteSettings.secondary_phone}</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="f-item link">
                  <h4 className="widget-title">IN India</h4>
                  <ul>
                    <li><a href={siteSettings.company_url} target="_blank" rel="noopener noreferrer">bsyssolutions.com</a></li>
                    <li><a href={siteSettings.whatsapp_direct_url} target="_blank" rel="noopener noreferrer">{siteSettings.secondary_phone}</a></li>
                    <li><a href={siteSettings.primary_email_href}>{siteSettings.primary_email}</a></li>
                  </ul>
                  <h4 className="widget-title">Company</h4>
                  <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="/terms-services">Terms of service</a></li>
                    <li><a href="/privacy-policy">Privacy policy</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <p>© 2026 {siteSettings.company_legal_name}. All rights reserved.</p>
              </div>
              <div className="col-lg-6 col-md-6 text-md-end">
                <p><a href="/privacy-policy">Privacy Policy</a> <span className="mx-2">|</span> <a href="/terms-services">Terms of Use</a></p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <button id="scrollTopBtn">â†‘</button>


    </div>
  );
}




