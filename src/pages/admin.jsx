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

async function parseJson(response) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || "Request failed.");
  }
  return payload;
}

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [form, setForm] = useState(emptyForm);
  const [items, setItems] = useState([]);
  const [settingsForm, setSettingsForm] = useState(emptySettingsForm);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  if (checkingSession) {
    return (
      <div className="hr-admin">
        <div className="hr-admin__panel">
          <div className="hr-admin__content">
            <div className="hr-admin__loading">
              <p className="hr-admin__subtext">Checking admin session…</p>
              <span className="hr-admin__spinner" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hr-admin">
      <div className="hr-admin__panel">
        <header className="hr-admin__topbar">
          <div className="hr-admin__topbar-inner">
            <div>
              <h1 className="hr-admin__title">HRMetricS</h1>
            </div>
            {session ? (
              <button type="button" onClick={handleLogout} disabled={busy} className="hr-admin__btn hr-admin__btn--logout">
                Logout {session.username ? `(${session.username})` : ""}
              </button>
            ) : null}
          </div>
        </header>

        <main className="hr-admin__content">
          {status ? (
            <div className="hr-admin__alert hr-admin__alert--success" role="status">
              <p className="hr-admin__alert-text">{status}</p>
              <button type="button" className="hr-admin__alert-close" onClick={() => setStatus("")} aria-label="Dismiss message">
                ×
              </button>
            </div>
          ) : null}
          {error ? (
            <div className="hr-admin__alert hr-admin__alert--error" role="alert">
              <p className="hr-admin__alert-text">{error}</p>
              <button type="button" className="hr-admin__alert-close" onClick={() => setError("")} aria-label="Dismiss error">
                ×
              </button>
            </div>
          ) : null}

          {!session ? (
            <div className="hr-admin__card hr-admin__login-card">
              <form onSubmit={handleLogin} className="hr-admin__form">
                <div>
                  <h2 className="hr-admin__h2">Sign in</h2>
                  <p className="hr-admin__subtext">Use your admin credentials to manage site settings and testimonials.</p>
                </div>

                <label className="hr-admin__label">
                  Username
                  <input
                    className="hr-admin__input"
                    value={loginForm.username}
                    onChange={(event) => setLoginForm((current) => ({ ...current, username: event.target.value }))}
                    placeholder="admin"
                    autoComplete="username"
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
                  />
                </label>
                <div className="hr-admin__actions">
                  <button type="submit" disabled={busy} className="hr-admin__btn hr-admin__btn--primary">
                    {busy ? "Signing in..." : "Login"}
                  </button>
                </div>
                <p className="hr-admin__subtext">
                  Default login is <strong>admin</strong> / <strong>admin123</strong> until you change the admin env variables.
                </p>
              </form>
            </div>
          ) : (
            <div className="hr-admin__stack">
              <section className="hr-admin__card">
                <div className="hr-admin__card-header">
                  <div>
                    <h2 className="hr-admin__h2">Site settings</h2>
                    <p className="hr-admin__subtext">These values update contact details and social links across the website.</p>
                  </div>
                  <div className="hr-admin__actions">
                    <button
                      type="button"
                      onClick={handleLoadExistingSettings}
                      disabled={busy}
                      className="hr-admin__btn hr-admin__btn--secondary hr-admin__btn--sm"
                    >
                      Load existing
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSettingsSubmit} className="hr-admin__form">
                  <div className="hr-admin__form-grid">
                    <label className="hr-admin__label">
                      Company name
                      <input className="hr-admin__input" value={settingsForm.company_name} onChange={(event) => updateSettingsForm("company_name", event.target.value)} />
                    </label>
                    <label className="hr-admin__label">
                      Legal name
                      <input
                        className="hr-admin__input"
                        value={settingsForm.company_legal_name}
                        onChange={(event) => updateSettingsForm("company_legal_name", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      Company URL
                      <input className="hr-admin__input" value={settingsForm.company_url} onChange={(event) => updateSettingsForm("company_url", event.target.value)} />
                    </label>
                    <label className="hr-admin__label">
                      Demo login URL
                      <input
                        className="hr-admin__input"
                        value={settingsForm.demo_login_url}
                        onChange={(event) => updateSettingsForm("demo_login_url", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      WhatsApp number
                      <input
                        className="hr-admin__input"
                        value={settingsForm.whatsapp_number}
                        onChange={(event) => updateSettingsForm("whatsapp_number", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      WhatsApp message
                      <input
                        className="hr-admin__input"
                        value={settingsForm.whatsapp_message}
                        onChange={(event) => updateSettingsForm("whatsapp_message", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      Primary phone
                      <input
                        className="hr-admin__input"
                        value={settingsForm.primary_phone}
                        onChange={(event) => updateSettingsForm("primary_phone", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      Secondary phone
                      <input
                        className="hr-admin__input"
                        value={settingsForm.secondary_phone}
                        onChange={(event) => updateSettingsForm("secondary_phone", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      Primary email
                      <input
                        className="hr-admin__input"
                        value={settingsForm.primary_email}
                        onChange={(event) => updateSettingsForm("primary_email", event.target.value)}
                      />
                    </label>
                    <label className="hr-admin__label">
                      LinkedIn URL
                      <input className="hr-admin__input" value={settingsForm.linkedin_url} onChange={(event) => updateSettingsForm("linkedin_url", event.target.value)} />
                    </label>
                    <label className="hr-admin__label">
                      Facebook URL
                      <input className="hr-admin__input" value={settingsForm.facebook_url} onChange={(event) => updateSettingsForm("facebook_url", event.target.value)} />
                    </label>
                    <label className="hr-admin__label">
                      X URL
                      <input className="hr-admin__input" value={settingsForm.x_url} onChange={(event) => updateSettingsForm("x_url", event.target.value)} />
                    </label>
                    <label className="hr-admin__label">
                      Instagram URL
                      <input className="hr-admin__input" value={settingsForm.instagram_url} onChange={(event) => updateSettingsForm("instagram_url", event.target.value)} />
                    </label>
                  </div>

                  <label className="hr-admin__label">
                    Maldives address
                    <textarea
                      className="hr-admin__textarea"
                      value={settingsForm.new_delhi_address}
                      onChange={(event) => updateSettingsForm("new_delhi_address", event.target.value)}
                    />
                  </label>
                  <label className="hr-admin__label">
                    Madurai address
                    <textarea className="hr-admin__textarea" value={settingsForm.noida_address} onChange={(event) => updateSettingsForm("noida_address", event.target.value)} />
                  </label>
                  <label className="hr-admin__label">
                    Google Maps embed URL
                    <textarea
                      className="hr-admin__textarea hr-admin__textarea--lg"
                      value={settingsForm.google_maps_embed_url}
                      onChange={(event) => updateSettingsForm("google_maps_embed_url", event.target.value)}
                    />
                  </label>
                  <div className="hr-admin__actions">
                    <button type="submit" disabled={busy} className="hr-admin__btn hr-admin__btn--primary">
                      {busy ? "Saving..." : "Save site settings"}
                    </button>
                  </div>
                </form>
              </section>

              <div className="hr-admin__split">
                <section className="hr-admin__card">
                  <div className="hr-admin__card-header">
                    <div>
                      <h2 className="hr-admin__h2">{form.id ? "Edit testimonial" : "Create testimonial"}</h2>
                      <p className="hr-admin__subtext">Only testimonials marked visible appear on the website.</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="hr-admin__form">
                    <label className="hr-admin__label">
                      Client name
                      <input className="hr-admin__input" value={form.clientName} onChange={(event) => updateForm("clientName", event.target.value)} />
                    </label>
                    <label className="hr-admin__label">
                      Client role
                      <input className="hr-admin__input" value={form.clientRole} onChange={(event) => updateForm("clientRole", event.target.value)} />
                    </label>
                    <label className="hr-admin__label">
                      Company name
                      <input className="hr-admin__input" value={form.companyName} onChange={(event) => updateForm("companyName", event.target.value)} />
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
                        Upload image
                        <input className="hr-admin__file" type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage || busy} />
                      </label>
                    </div>

                    {form.imageUrl ? (
                      <div className="hr-admin__preview" aria-busy={uploadingImage ? "true" : "false"}>
                        <span className="hr-admin__subtext">{uploadingImage ? "Uploading image..." : "Image preview"}</span>
                        <img src={form.imageUrl} alt="Testimonial preview" />
                      </div>
                    ) : null}

                    <label className="hr-admin__label">
                      Testimonial
                      <textarea className="hr-admin__textarea hr-admin__textarea--lg" value={form.testimonial} onChange={(event) => updateForm("testimonial", event.target.value)} />
                    </label>

                    <div className="hr-admin__form-grid">
                      <label className="hr-admin__label">
                        Rating
                        <input className="hr-admin__input" type="number" min="1" max="5" value={form.rating} onChange={(event) => updateForm("rating", event.target.value)} />
                      </label>
                      <label className="hr-admin__label">
                        Sort order
                        <input className="hr-admin__input" type="number" min="0" value={form.sortOrder} onChange={(event) => updateForm("sortOrder", event.target.value)} />
                      </label>
                    </div>

                    <label className="hr-admin__checkbox">
                      <input type="checkbox" checked={form.isActive} onChange={(event) => updateForm("isActive", event.target.checked)} />
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
                </section>

                <section className="hr-admin__card">
                  <div className="hr-admin__card-header">
                    <div>
                      <h2 className="hr-admin__h2">Saved testimonials</h2>
                      <p className="hr-admin__subtext">{items.length ? `${items.length} saved` : "No testimonials yet"}</p>
                    </div>
                  </div>

                  <div className="hr-admin__list">
                    {items.map((item) => (
                      <article key={item.id} className={item.isActive ? "hr-admin__item" : "hr-admin__item hr-admin__item--inactive"}>
                        <div className="hr-admin__item-top">
                          <div>
                            <h3 className="hr-admin__item-title">{item.clientName}</h3>
                            <p className="hr-admin__item-meta">{[item.clientRole, item.companyName].filter(Boolean).join(", ") || "No role/company set"}</p>
                          </div>
                          <span className={item.isActive ? "hr-admin__badge hr-admin__badge--active" : "hr-admin__badge"}>{item.isActive ? "Visible" : "Hidden"}</span>
                        </div>
                        <p className="hr-admin__item-body">{item.testimonial}</p>
                        <p className="hr-admin__item-foot">Rating: {item.rating}/5 · Sort: {item.sortOrder} · Image: {item.imageUrl || "default"}</p>
                        <div className="hr-admin__actions">
                          <button type="button" onClick={() => handleEdit(item)} className="hr-admin__btn hr-admin__btn--info hr-admin__btn--sm" disabled={busy}>
                            Edit
                          </button>
                          <button type="button" onClick={() => handleDelete(item.id)} className="hr-admin__btn hr-admin__btn--danger hr-admin__btn--sm" disabled={busy}>
                            Delete
                          </button>
                        </div>
                      </article>
                    ))}
                    {items.length === 0 ? <p className="hr-admin__subtext">No testimonials saved yet.</p> : null}
                  </div>
                </section>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

