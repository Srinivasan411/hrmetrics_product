import { useEffect, useState } from "react";
import { defaultSiteSettings } from "../siteSettings.jsx";
import "./admin.css";

const emptyForm = {
  id: null,
  clientName: "",
  clientRole: "",
  companyName: "",
  imageUrl: "",
  testimonial: "",
  rating: 5,
  isActive: true,
  sortOrder: 0,
};

const emptySettingsForm = { ...defaultSiteSettings };
const emptyPricingForm = {
  id: null,
  name: "",
  planKey: "",
  subtitle: "",
  priceMonthly: 0,
  priceYearly: 0,
  ctaLabel: "Choose Plan",
  ctaUrl: "#contact",
  badgeText: "",
  pageLimitLabel: "",
  pointsText: "",
  isCustom: false,
  isPopular: false,
  isActive: true,
  sortOrder: 0,
};

async function parseJson(response) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || "Request failed.");
  }
  return payload;
}

function SettingsIcon() {
  return (
    <svg className="hr-admin__nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.807 2.885 2.165a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.807 3.31-2.165 2.885a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.807-2.885-2.165a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.807-3.31 2.165-2.885a1.724 1.724 0 002.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg className="hr-admin__nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="hr-admin__nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

function PricingIcon() {
  return (
    <svg className="hr-admin__nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 .896-4 2s1.79 2 4 2 4 .896 4 2-1.79 2-4 2m0-8c1.11 0 2.12.228 2.892.6M12 8V6m0 10v2m0-2c-1.11 0-2.12-.228-2.892-.6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [form, setForm] = useState(emptyForm);
  const [items, setItems] = useState([]);
  const [settingsForm, setSettingsForm] = useState(emptySettingsForm);
  const [pricingForm, setPricingForm] = useState(emptyPricingForm);
  const [pricingItems, setPricingItems] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState("settings");

  useEffect(() => {
    if (!status && !error) return undefined;

    const timer = setTimeout(() => {
      setStatus("");
      setError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [status, error]);

  useEffect(() => {
    let ignore = false;

    async function loadSession() {
      try {
        const payload = await parseJson(
          await fetch("/api/admin/session", {
            credentials: "include",
          }),
        );
        if (!ignore) {
          setSession(payload.data);
          await loadSettings();
          loadTestimonials();
          loadPricingPlans();
        }
      } catch {
        if (!ignore) setSession(null);
      } finally {
        if (!ignore) setCheckingSession(false);
      }
    }

    loadSession();
    return () => {
      ignore = true;
    };
  }, []);

  async function loadTestimonials() {
    try {
      const payload = await parseJson(
        await fetch("/api/admin/testimonials", {
          credentials: "include",
        }),
      );
      setItems(payload.data || []);
    } catch (err) {
      setError(err.message);
    }
  }

  async function loadSettings() {
    try {
      const payload = await parseJson(
        await fetch("/api/admin/site-settings", {
          credentials: "include",
        }),
      );
      setSettingsForm({ ...emptySettingsForm, ...(payload.data || {}) });
      return payload.data || {};
    } catch (err) {
      setError(err.message);
      return null;
    }
  }

  async function loadPricingPlans() {
    try {
      const payload = await parseJson(
        await fetch("/api/admin/pricing-plans", {
          credentials: "include",
        }),
      );
      setPricingItems(payload.data || []);
    } catch (err) {
      setError(err.message);
    }
  }

  function resetMessages() {
    setStatus("");
    setError("");
  }

  async function handleLogin(event) {
    event.preventDefault();
    resetMessages();
    setBusy(true);

    try {
      const payload = await parseJson(
        await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(loginForm),
        }),
      );
      setSession(payload.data);
      setStatus("Login successful.");
      setLoginForm({ username: "", password: "" });
      await loadSettings();
      await loadTestimonials();
      await loadPricingPlans();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      setCheckingSession(false);
    }
  }

  async function handleLogout() {
    resetMessages();
    setBusy(true);
    try {
      await parseJson(
        await fetch("/api/admin/logout", {
          method: "POST",
          credentials: "include",
        }),
      );
      setSession(null);
      setItems([]);
      setForm(emptyForm);
      setStatus("Logged out.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  function updateForm(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateSettingsForm(key, value) {
    setSettingsForm((current) => ({ ...current, [key]: value }));
  }

  function handleEdit(item) {
    resetMessages();
    setForm({
      id: item.id,
      clientName: item.clientName || "",
      clientRole: item.clientRole || "",
      companyName: item.companyName || "",
      imageUrl: item.imageUrl || "",
      testimonial: item.testimonial || "",
      rating: item.rating || 5,
      isActive: Boolean(item.isActive),
      sortOrder: item.sortOrder || 0,
    });
    setActiveTab("testimonials");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    resetMessages();
    setBusy(true);

    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `/api/admin/testimonials/${form.id}` : "/api/admin/testimonials";

    try {
      await parseJson(
        await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...form,
            rating: Number(form.rating),
            sortOrder: Number(form.sortOrder),
          }),
        }),
      );
      setForm(emptyForm);
      setStatus(form.id ? "Testimonial updated." : "Testimonial created.");
      await loadTestimonials();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    resetMessages();
    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const payload = await parseJson(
        await fetch("/api/admin/uploads/testimonial-image", {
          method: "POST",
          credentials: "include",
          body: formData,
        }),
      );

      updateForm("imageUrl", payload.data.imageUrl);
      setStatus(`Image uploaded: ${payload.data.originalName}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this testimonial?")) return;

    resetMessages();
    setBusy(true);
    try {
      await parseJson(
        await fetch(`/api/admin/testimonials/${id}`, {
          method: "DELETE",
          credentials: "include",
        }),
      );
      if (form.id === id) setForm(emptyForm);
      setStatus("Testimonial deleted.");
      await loadTestimonials();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleSettingsSubmit(event) {
    event.preventDefault();
    resetMessages();
    setBusy(true);

    try {
      const payload = await parseJson(
        await fetch("/api/admin/site-settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(settingsForm),
        }),
      );
      setSettingsForm({ ...emptySettingsForm, ...(payload.data || {}) });
      setStatus("Site settings updated.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  function updatePricingForm(key, value) {
    setPricingForm((current) => ({ ...current, [key]: value }));
  }

  function handleEditPricing(item) {
    resetMessages();
    setPricingForm({
      id: item.id,
      name: item.name || "",
      planKey: item.planKey || "",
      subtitle: item.subtitle || "",
      priceMonthly: item.priceMonthly || 0,
      priceYearly: item.priceYearly || 0,
      ctaLabel: item.ctaLabel || "Choose Plan",
      ctaUrl: item.ctaUrl || "#contact",
      badgeText: item.badgeText || "",
      pageLimitLabel: item.pageLimitLabel || "",
      pointsText: Array.isArray(item.points) ? item.points.join("\n") : "",
      isCustom: Boolean(item.isCustom),
      isPopular: Boolean(item.isPopular),
      isActive: Boolean(item.isActive),
      sortOrder: item.sortOrder || 0,
    });
    setActiveTab("pricing");
  }

  async function handlePricingSubmit(event) {
    event.preventDefault();
    resetMessages();
    setBusy(true);

    const points = pricingForm.pointsText
      .split("\n")
      .map((entry) => entry.trim())
      .filter(Boolean);
    const method = pricingForm.id ? "PUT" : "POST";
    const url = pricingForm.id ? `/api/admin/pricing-plans/${pricingForm.id}` : "/api/admin/pricing-plans";

    try {
      await parseJson(
        await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...pricingForm,
            points,
            priceMonthly: Number(pricingForm.priceMonthly),
            priceYearly: Number(pricingForm.priceYearly),
            sortOrder: Number(pricingForm.sortOrder),
          }),
        }),
      );
      setPricingForm(emptyPricingForm);
      setStatus(pricingForm.id ? "Pricing plan updated." : "Pricing plan created.");
      await loadPricingPlans();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleDeletePricing(id) {
    if (!window.confirm("Delete this pricing plan?")) return;

    resetMessages();
    setBusy(true);
    try {
      await parseJson(
        await fetch(`/api/admin/pricing-plans/${id}`, {
          method: "DELETE",
          credentials: "include",
        }),
      );
      if (pricingForm.id === id) setPricingForm(emptyPricingForm);
      setStatus("Pricing plan deleted.");
      await loadPricingPlans();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleLoadExistingSettings() {
    resetMessages();
    setBusy(true);

    try {
      const data = await loadSettings();
      if (data) {
        setStatus("Loaded existing site settings.");
      }
    } finally {
      setBusy(false);
    }
  }

  const userInitial = session?.username ? session.username.charAt(0).toUpperCase() : "A";

  if (checkingSession) {
    return (
      <div className="hr-admin">
        <div className="hr-admin__loading">
          <div className="hr-admin__spinner" />
          <p className="hr-admin__subtext">Checking admin session...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="hr-admin__login-page">
        <div className="hr-admin__login-card">
          <div className="hr-admin__login-header">
            <h1 className="hr-admin__login-logo">HR<span>MetricS</span></h1>
            <p className="hr-admin__login-subtitle">Sign in to manage your site</p>
          </div>

          {status ? (
            <div className="hr-admin__alert hr-admin__alert--success" role="status">
              <p className="hr-admin__alert-text">{status}</p>
              <button type="button" className="hr-admin__alert-close" onClick={() => setStatus("")}>×</button>
            </div>
          ) : null}
          {error ? (
            <div className="hr-admin__alert hr-admin__alert--error" role="alert">
              <p className="hr-admin__alert-text">{error}</p>
              <button type="button" className="hr-admin__alert-close" onClick={() => setError("")}>×</button>
            </div>
          ) : null}

          <form onSubmit={handleLogin} className="hr-admin__form">
            <label className="hr-admin__label">
              Username
              <input
                className="hr-admin__input"
                value={loginForm.username}
                onChange={(event) => setLoginForm((current) => ({ ...current, username: event.target.value }))}
                placeholder="Enter username"
                autoComplete="username"
                required
              />
            </label>
            <label className="hr-admin__label">
              Password
              <input
                className="hr-admin__input"
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
            </label>
            <button type="submit" disabled={busy} className="hr-admin__btn hr-admin__btn--primary">
              {busy ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="hr-admin">
      <div className="hr-admin__layout">
        <aside className="hr-admin__sidebar">
          <div className="hr-admin__sidebar-brand">
            <h1 className="hr-admin__sidebar-logo">HR<span>MetricS</span></h1>
          </div>

          <nav className="hr-admin__sidebar-nav">
            <button
              type="button"
              className={`hr-admin__nav-item ${activeTab === "settings" ? "hr-admin__nav-item--active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <SettingsIcon />
              Site Settings
            </button>
            <button
              type="button"
              className={`hr-admin__nav-item ${activeTab === "pricing" ? "hr-admin__nav-item--active" : ""}`}
              onClick={() => setActiveTab("pricing")}
            >
              <PricingIcon />
              Pricing
            </button>
            <button
              type="button"
              className={`hr-admin__nav-item ${activeTab === "testimonials" ? "hr-admin__nav-item--active" : ""}`}
              onClick={() => setActiveTab("testimonials")}
            >
              <ChatIcon />
              Testimonials
            </button>
          </nav>

          <div className="hr-admin__sidebar-footer">
            <div className="hr-admin__user">
              <div className="hr-admin__user-avatar">{userInitial}</div>
              <div className="hr-admin__user-info">
                <p className="hr-admin__user-name">{session.username}</p>
                <p className="hr-admin__user-role">Administrator</p>
              </div>
            </div>
            <button type="button" onClick={handleLogout} disabled={busy} className="hr-admin__btn hr-admin__btn--logout" style={{ width: "100%", marginTop: "12px" }}>
              <LogoutIcon />
              Sign Out
            </button>
          </div>
        </aside>

        <main className="hr-admin__main">
          <header className="hr-admin__header">
            <h2 className="hr-admin__header-title">
              {activeTab === "settings" ? "Site Settings" : activeTab === "pricing" ? "Pricing" : "Testimonials"}
            </h2>
          </header>

          <div className="hr-admin__content">
            {status ? (
              <div className="hr-admin__alert hr-admin__alert--success" role="status">
                <p className="hr-admin__alert-text">{status}</p>
                <button type="button" className="hr-admin__alert-close" onClick={() => setStatus("")}>×</button>
              </div>
            ) : null}
            {error ? (
              <div className="hr-admin__alert hr-admin__alert--error" role="alert">
                <p className="hr-admin__alert-text">{error}</p>
                <button type="button" className="hr-admin__alert-close" onClick={() => setError("")}>×</button>
              </div>
            ) : null}

            {activeTab === "settings" && (
              <div className="hr-admin__card">
                <div className="hr-admin__card-header">
                  <div>
                    <h2 className="hr-admin__card-title">Contact & Social Settings</h2>
                    <p className="hr-admin__subtext">Update contact details and social links across the website.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLoadExistingSettings}
                    disabled={busy}
                    className="hr-admin__btn hr-admin__btn--secondary hr-admin__btn--sm"
                  >
                    Load Existing
                  </button>
                </div>

                <form onSubmit={handleSettingsSubmit} className="hr-admin__form">
                  <div className="hr-admin__form-grid">
                    <label className="hr-admin__label">
                      Company Name
                      <input
                        className="hr-admin__input"
                        value={settingsForm.company_name}
                        onChange={(event) => updateSettingsForm("company_name", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      Legal Name
                      <input
                        className="hr-admin__input"
                        value={settingsForm.company_legal_name}
                        onChange={(event) => updateSettingsForm("company_legal_name", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      Company URL
                      <input
                        className="hr-admin__input"
                        value={settingsForm.company_url}
                        onChange={(event) => updateSettingsForm("company_url", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      Demo Login URL
                      <input
                        className="hr-admin__input"
                        value={settingsForm.demo_login_url}
                        onChange={(event) => updateSettingsForm("demo_login_url", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      WhatsApp Number
                      <input
                        className="hr-admin__input"
                        value={settingsForm.whatsapp_number}
                        onChange={(event) => updateSettingsForm("whatsapp_number", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      WhatsApp Message
                      <input
                        className="hr-admin__input"
                        value={settingsForm.whatsapp_message}
                        onChange={(event) => updateSettingsForm("whatsapp_message", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      Primary Phone
                      <input
                        className="hr-admin__input"
                        value={settingsForm.primary_phone}
                        onChange={(event) => updateSettingsForm("primary_phone", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      Secondary Phone
                      <input
                        className="hr-admin__input"
                        value={settingsForm.secondary_phone}
                        onChange={(event) => updateSettingsForm("secondary_phone", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      Primary Email
                      <input
                        className="hr-admin__input"
                        value={settingsForm.primary_email}
                        onChange={(event) => updateSettingsForm("primary_email", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      LinkedIn URL
                      <input
                        className="hr-admin__input"
                        value={settingsForm.linkedin_url}
                        onChange={(event) => updateSettingsForm("linkedin_url", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      Facebook URL
                      <input
                        className="hr-admin__input"
                        value={settingsForm.facebook_url}
                        onChange={(event) => updateSettingsForm("facebook_url", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      X URL
                      <input
                        className="hr-admin__input"
                        value={settingsForm.x_url}
                        onChange={(event) => updateSettingsForm("x_url", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      Instagram URL
                      <input
                        className="hr-admin__input"
                        value={settingsForm.instagram_url}
                        onChange={(event) => updateSettingsForm("instagram_url", event.target.value)}
                      />
                    </label>
                  </div>

                  <label className="hr-admin__label">
                    Maldives Address
                    <textarea
                      className="hr-admin__input hr-admin__textarea"
                      value={settingsForm.new_delhi_address}
                      onChange={(event) => updateSettingsForm("new_delhi_address", event.target.value)}
                    />
                  </label>
                  <label className="hr-admin__label">
                    Madurai Address
                    <textarea
                      className="hr-admin__input hr-admin__textarea"
                      value={settingsForm.noida_address}
                      onChange={(event) => updateSettingsForm("noida_address", event.target.value)}
                    />
                  </label>
                  <label className="hr-admin__label">
                    Google Maps Embed URL
                    <textarea
                      className="hr-admin__input hr-admin__textarea"
                      value={settingsForm.google_maps_embed_url}
                      onChange={(event) => updateSettingsForm("google_maps_embed_url", event.target.value)}
                    />
                  </label>

                  <button type="submit" disabled={busy} className="hr-admin__btn hr-admin__btn--primary">
                    {busy ? "Saving..." : "Save Settings"}
                  </button>
                </form>
              </div>
            )}

            {activeTab === "pricing" && (
              <div className="hr-admin__split">
                <div className="hr-admin__card">
                  <div className="hr-admin__card-header">
                    <div>
                      <h2 className="hr-admin__card-title">{pricingForm.id ? "Edit Pricing Plan" : "Add Pricing Plan"}</h2>
                      <p className="hr-admin__subtext">Add one point per line.</p>
                    </div>
                  </div>

                  <form onSubmit={handlePricingSubmit} className="hr-admin__form">
                    <div className="hr-admin__form-grid">
                      <label className="hr-admin__label">
                        Plan Name
                        <input className="hr-admin__input" value={pricingForm.name} onChange={(event) => updatePricingForm("name", event.target.value)} required />
                      </label>
                      <label className="hr-admin__label">
                        Plan Key
                        <input className="hr-admin__input" value={pricingForm.planKey} onChange={(event) => updatePricingForm("planKey", event.target.value)} required />
                      </label>
                    </div>

                    <label className="hr-admin__label">
                      Subtitle
                      <input className="hr-admin__input" value={pricingForm.subtitle} onChange={(event) => updatePricingForm("subtitle", event.target.value)} />
                    </label>

                    <div className="hr-admin__form-grid">
                      <label className="hr-admin__label">
                        Monthly Price
                        <input className="hr-admin__input" type="number" min="0" step="0.01" value={pricingForm.priceMonthly} onChange={(event) => updatePricingForm("priceMonthly", event.target.value)} />
                      </label>
                      <label className="hr-admin__label">
                        Yearly Price
                        <input className="hr-admin__input" type="number" min="0" step="0.01" value={pricingForm.priceYearly} onChange={(event) => updatePricingForm("priceYearly", event.target.value)} />
                      </label>
                    </div>

                    <div className="hr-admin__form-grid">
                      <label className="hr-admin__label">
                        CTA Label
                        <input className="hr-admin__input" value={pricingForm.ctaLabel} onChange={(event) => updatePricingForm("ctaLabel", event.target.value)} />
                      </label>
                      <label className="hr-admin__label">
                        CTA URL
                        <input className="hr-admin__input" value={pricingForm.ctaUrl} onChange={(event) => updatePricingForm("ctaUrl", event.target.value)} />
                      </label>
                    </div>

                    <div className="hr-admin__form-grid">
                      <label className="hr-admin__label">
                        Badge Text
                        <input className="hr-admin__input" value={pricingForm.badgeText} onChange={(event) => updatePricingForm("badgeText", event.target.value)} />
                      </label>
                      <label className="hr-admin__label">
                        Page Limit Label
                        <input className="hr-admin__input" value={pricingForm.pageLimitLabel} onChange={(event) => updatePricingForm("pageLimitLabel", event.target.value)} />
                      </label>
                        
                      <label className="hr-admin__label">
                        Sort Order
                        <input className="hr-admin__input" type="number" min="0" value={pricingForm.sortOrder} onChange={(event) => updatePricingForm("sortOrder", event.target.value)} />
                      </label>

                    </div>

                    <label className="hr-admin__label">
                      Plan Points
                      <textarea
                        className="hr-admin__input hr-admin__textarea"
                        value={pricingForm.pointsText}
                        onChange={(event) => updatePricingForm("pointsText", event.target.value)}
                        required
                      />
                    </label>

                    <div className="hr-admin__form-grid">
                      <label className="hr-admin__checkbox">
                        <input type="checkbox" checked={pricingForm.isCustom} onChange={(event) => updatePricingForm("isCustom", event.target.checked)} />
                        Custom plan
                      </label>
                      <label className="hr-admin__checkbox">
                        <input type="checkbox" checked={pricingForm.isPopular} onChange={(event) => updatePricingForm("isPopular", event.target.checked)} />
                        Mark as popular
                      </label>
                      <label className="hr-admin__checkbox">
                        <input type="checkbox" checked={pricingForm.isActive} onChange={(event) => updatePricingForm("isActive", event.target.checked)} />
                        Show on website
                      </label>
                    </div>
                    <div className="hr-admin__actions">
                      <button type="submit" disabled={busy} className="hr-admin__btn hr-admin__btn--primary">
                        {busy ? "Saving..." : pricingForm.id ? "Update Plan" : "Create Plan"}
                      </button>
                      <button type="button" onClick={() => setPricingForm(emptyPricingForm)} disabled={busy} className="hr-admin__btn hr-admin__btn--secondary">
                        Reset
                      </button>
                    </div>
                  </form>
                </div>

                <div className="hr-admin__card">
                  <div className="hr-admin__card-header">
                    <div>
                      <h2 className="hr-admin__card-title">Saved Pricing Plans</h2>
                      <p className="hr-admin__subtext">{pricingItems.length ? `${pricingItems.length} saved` : "No plans yet"}</p>
                    </div>
                  </div>
                  {pricingItems.length > 0 ? (
                    <div className="hr-admin__list">
                      {pricingItems.map((item) => (
                        <article key={item.id} className={item.isActive ? "hr-admin__item" : "hr-admin__item hr-admin__item--inactive"}>
                          <div className="hr-admin__item-top">
                            <div>
                              <h3 className="hr-admin__item-title">{item.name}</h3>
                              <p className="hr-admin__item-meta">{item.subtitle || item.planKey}</p>
                            </div>
                            <span className={item.isActive ? "hr-admin__badge hr-admin__badge--active" : "hr-admin__badge"}>
                              {item.isActive ? "Visible" : "Hidden"}
                            </span>
                          </div>
                          <p className="hr-admin__item-foot">
                            <span>${item.priceMonthly}/mo</span>
                            <span>Sort: {item.sortOrder}</span>
                          </p>
                          <div className="hr-admin__actions">
                            <button type="button" onClick={() => handleEditPricing(item)} className="hr-admin__btn hr-admin__btn--secondary hr-admin__btn--sm" disabled={busy}>Edit</button>
                            <button type="button" onClick={() => handleDeletePricing(item.id)} className="hr-admin__btn hr-admin__btn--danger hr-admin__btn--sm" disabled={busy}>Delete</button>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="hr-admin__empty">
                      <p>No pricing plans saved yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "testimonials" && (
              <div className="hr-admin__split">
                <div className="hr-admin__card">
                  <div className="hr-admin__card-header">
                    <div>
                      <h2 className="hr-admin__card-title">{form.id ? "Edit Testimonial" : "Add Testimonial"}</h2>
                      <p className="hr-admin__subtext">Only visible testimonials appear on the website.</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="hr-admin__form">
                    <div className="hr-admin__form-grid">
                      <label className="hr-admin__label">
                        Client Name
                          <input
                            className="hr-admin__input"
                            value={form.clientName}
                            onChange={(event) => updateForm("clientName", event.target.value)}
                            required
                          />
                      </label>
                      <label className="hr-admin__label">
                        Client Role
                        <input
                          className="hr-admin__input"
                          value={form.clientRole}
                          onChange={(event) => updateForm("clientRole", event.target.value)}
                        />
                      </label>
                    </div>

                    <label className="hr-admin__label">
                      Company Name
                      <input
                        className="hr-admin__input"
                        value={form.companyName}
                        onChange={(event) => updateForm("companyName", event.target.value)}
                      />
                    </label>

                    <div className="hr-admin__form-grid">
                      <label className="hr-admin__label">
                        Image URL
                        <input
                          className="hr-admin__input"
                          value={form.imageUrl}
                          onChange={(event) => updateForm("imageUrl", event.target.value)}
                          placeholder="/uploads/testimonials/example.jpg"
                        />
                      </label>
                      <label className="hr-admin__label">
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage || busy}
                          className="hr-admin__input"
                        />
                      </label>
                    </div>

                    {form.imageUrl ? (
                      <div className="hr-admin__preview">
                        <img src={form.imageUrl} alt="Preview" />
                        <span className="hr-admin__subtext">
                          {uploadingImage ? "Uploading..." : "Image preview"}
                        </span>
                      </div>
                    ) : null}

                    <label className="hr-admin__label">
                      Testimonial
                      <textarea
                        className="hr-admin__input hr-admin__textarea"
                        value={form.testimonial}
                        onChange={(event) => updateForm("testimonial", event.target.value)}
                        required
                      />
                    </label>

                    <div className="hr-admin__form-grid">
                      <label className="hr-admin__label">
                        Rating
                        <input
                          className="hr-admin__input"
                          type="number"
                          min="1"
                          max="5"
                          value={form.rating}
                          onChange={(event) => updateForm("rating", event.target.value)}
                        />
                      </label>
                      <label className="hr-admin__label">
                        Sort Order
                        <input
                          className="hr-admin__input"
                          type="number"
                          min="0"
                          value={form.sortOrder}
                          onChange={(event) => updateForm("sortOrder", event.target.value)}
                        />
                      </label>
                    </div>

                    <label className="hr-admin__checkbox">
                      <input
                        type="checkbox"
                        checked={form.isActive}
                        onChange={(event) => updateForm("isActive", event.target.checked)}
                      />
                      Show on website
                    </label>

                    <div className="hr-admin__actions">
                      <button type="submit" disabled={busy} className="hr-admin__btn hr-admin__btn--primary">
                        {busy ? "Saving..." : form.id ? "Update" : "Create"}
                      </button>
                      <button type="button" onClick={() => setForm(emptyForm)} disabled={busy} className="hr-admin__btn hr-admin__btn--secondary">
                        Reset
                      </button>
                    </div>
                  </form>
                </div>

                <div className="hr-admin__card">
                  <div className="hr-admin__card-header">
                    <div>
                      <h2 className="hr-admin__card-title">Saved Testimonials</h2>
                      <p className="hr-admin__subtext">{items.length ? `${items.length} saved` : "No testimonials yet"}</p>
                    </div>
                  </div>

                  {items.length > 0 ? (
                    <div className="hr-admin__list">
                      {items.map((item) => (
                        <article key={item.id} className={item.isActive ? "hr-admin__item" : "hr-admin__item hr-admin__item--inactive"}>
                          <div className="hr-admin__item-top">
                            <div>
                              <h3 className="hr-admin__item-title">{item.clientName}</h3>
                              <p className="hr-admin__item-meta">{[item.clientRole, item.companyName].filter(Boolean).join(", ") || "No role/company set"}</p>
                            </div>
                            <span className={item.isActive ? "hr-admin__badge hr-admin__badge--active" : "hr-admin__badge"}>
                              {item.isActive ? "Visible" : "Hidden"}
                            </span>
                          </div>
                          <p className="hr-admin__item-body">
                            {item.testimonial?.length > 120 ? `${item.testimonial.slice(0, 120)}...` : item.testimonial}
                          </p>
                          <p className="hr-admin__item-foot">
                            <span>Rating: {item.rating}/5</span>
                            <span>Sort: {item.sortOrder}</span>
                          </p>
                          <div className="hr-admin__actions">
                            <button
                              type="button"
                              onClick={() => handleEdit(item)}
                              className="hr-admin__btn hr-admin__btn--secondary hr-admin__btn--sm"
                              disabled={busy}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="hr-admin__btn hr-admin__btn--danger hr-admin__btn--sm"
                              disabled={busy}
                            >
                              Delete
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="hr-admin__empty">
                      <p>No testimonials saved yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
