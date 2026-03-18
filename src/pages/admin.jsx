import { useEffect, useState } from "react";
import { defaultSiteSettings } from "../siteSettings.jsx";

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

const shellStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f4efe8 0%, #eef5ff 100%)",
  padding: "32px 16px",
  fontFamily: "Manrope, sans-serif",
};

const panelStyle = {
  maxWidth: 1200,
  margin: "0 auto",
  background: "#ffffff",
  borderRadius: 24,
  boxShadow: "0 24px 80px rgba(15, 23, 42, 0.12)",
  overflow: "hidden",
};

const inputStyle = {
  width: "100%",
  border: "1px solid #dbe2ea",
  borderRadius: 14,
  padding: "12px 14px",
  fontSize: 15,
  outline: "none",
};

const labelStyle = {
  display: "grid",
  gap: 8,
  fontSize: 14,
  color: "#334155",
};

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
    document.title = "HRMetricS Admin";
  }, []);

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
      <div style={shellStyle}>
        <div style={{ ...panelStyle, padding: 32 }}>
          <p style={{ margin: 0, color: "#334155" }}>Checking admin session...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={shellStyle}>
      <div style={panelStyle}>
        <div style={{ padding: 32, background: "#0f172a", color: "#ffffff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <p style={{ margin: 0, opacity: 0.7, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 12 }}>HRMetricS CMS</p>
              <h1 style={{ margin: "10px 0 0", fontSize: 32 }}>Admin Testimonials</h1>
            </div>
            {session ? (
              <button
                type="button"
                onClick={handleLogout}
                disabled={busy}
                style={{ border: 0, borderRadius: 999, padding: "12px 18px", background: "#f97316", color: "#fff", fontWeight: 700 }}
              >
                Logout {session.username ? `(${session.username})` : ""}
              </button>
            ) : null}
          </div>
        </div>

        <div style={{ padding: 32 }}>
          {status ? <div style={{ marginBottom: 16, padding: 14, borderRadius: 14, background: "#dcfce7", color: "#166534" }}>{status}</div> : null}
          {error ? <div style={{ marginBottom: 16, padding: 14, borderRadius: 14, background: "#fee2e2", color: "#b91c1c" }}>{error}</div> : null}

          {!session ? (
            <form onSubmit={handleLogin} style={{ maxWidth: 420, display: "grid", gap: 16 }}>
              <label style={labelStyle}>
                Username
                <input
                  style={inputStyle}
                  value={loginForm.username}
                  onChange={(event) => setLoginForm((current) => ({ ...current, username: event.target.value }))}
                  placeholder="admin"
                />
              </label>
              <label style={labelStyle}>
                Password
                <input
                  style={inputStyle}
                  type="password"
                  value={loginForm.password}
                  onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                  placeholder="Enter password"
                />
              </label>
              <button
                type="submit"
                disabled={busy}
                style={{ border: 0, borderRadius: 14, padding: "14px 18px", background: "#0f766e", color: "#fff", fontWeight: 700 }}
              >
                {busy ? "Signing in..." : "Login"}
              </button>
              <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>
                Default login is <strong>admin</strong> / <strong>admin123</strong> until you change the admin env variables.
              </p>
            </form>
          ) : (
            <div style={{ display: "grid", gap: 28 }}>
              <form onSubmit={handleSettingsSubmit} style={{ display: "grid", gap: 16, padding: 24, border: "1px solid #e2e8f0", borderRadius: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <h2 style={{ margin: 0, fontSize: 24 }}>Site settings</h2>
                  <button
                    type="button"
                    onClick={handleLoadExistingSettings}
                    disabled={busy}
                    style={{ border: "1px solid #cbd5e1", borderRadius: 12, padding: "10px 14px", background: "#fff", color: "#0f172a", fontWeight: 700 }}
                  >
                    Load existing site settings
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
                  <label style={labelStyle}>Company name<input style={inputStyle} value={settingsForm.company_name} onChange={(event) => updateSettingsForm("company_name", event.target.value)} /></label>
                  <label style={labelStyle}>Legal name<input style={inputStyle} value={settingsForm.company_legal_name} onChange={(event) => updateSettingsForm("company_legal_name", event.target.value)} /></label>
                  <label style={labelStyle}>Company URL<input style={inputStyle} value={settingsForm.company_url} onChange={(event) => updateSettingsForm("company_url", event.target.value)} /></label>
                  <label style={labelStyle}>Demo login URL<input style={inputStyle} value={settingsForm.demo_login_url} onChange={(event) => updateSettingsForm("demo_login_url", event.target.value)} /></label>
                  <label style={labelStyle}>WhatsApp number<input style={inputStyle} value={settingsForm.whatsapp_number} onChange={(event) => updateSettingsForm("whatsapp_number", event.target.value)} /></label>
                  <label style={labelStyle}>WhatsApp message<input style={inputStyle} value={settingsForm.whatsapp_message} onChange={(event) => updateSettingsForm("whatsapp_message", event.target.value)} /></label>
                  <label style={labelStyle}>Primary phone<input style={inputStyle} value={settingsForm.primary_phone} onChange={(event) => updateSettingsForm("primary_phone", event.target.value)} /></label>
                  <label style={labelStyle}>Secondary phone<input style={inputStyle} value={settingsForm.secondary_phone} onChange={(event) => updateSettingsForm("secondary_phone", event.target.value)} /></label>
                  <label style={labelStyle}>Primary email<input style={inputStyle} value={settingsForm.primary_email} onChange={(event) => updateSettingsForm("primary_email", event.target.value)} /></label>
                  <label style={labelStyle}>LinkedIn URL<input style={inputStyle} value={settingsForm.linkedin_url} onChange={(event) => updateSettingsForm("linkedin_url", event.target.value)} /></label>
                  <label style={labelStyle}>Facebook URL<input style={inputStyle} value={settingsForm.facebook_url} onChange={(event) => updateSettingsForm("facebook_url", event.target.value)} /></label>
                  <label style={labelStyle}>X URL<input style={inputStyle} value={settingsForm.x_url} onChange={(event) => updateSettingsForm("x_url", event.target.value)} /></label>
                  <label style={labelStyle}>Instagram URL<input style={inputStyle} value={settingsForm.instagram_url} onChange={(event) => updateSettingsForm("instagram_url", event.target.value)} /></label>
                </div>
                <label style={labelStyle}>New Delhi address<textarea style={{ ...inputStyle, minHeight: 80 }} value={settingsForm.new_delhi_address} onChange={(event) => updateSettingsForm("new_delhi_address", event.target.value)} /></label>
                <label style={labelStyle}>Noida address<textarea style={{ ...inputStyle, minHeight: 80 }} value={settingsForm.noida_address} onChange={(event) => updateSettingsForm("noida_address", event.target.value)} /></label>
                <label style={labelStyle}>Google Maps embed URL<textarea style={{ ...inputStyle, minHeight: 100 }} value={settingsForm.google_maps_embed_url} onChange={(event) => updateSettingsForm("google_maps_embed_url", event.target.value)} /></label>
                <div>
                  <button type="submit" disabled={busy} style={{ border: 0, borderRadius: 14, padding: "14px 18px", background: "#0f766e", color: "#fff", fontWeight: 700 }}>
                    {busy ? "Saving..." : "Save site settings"}
                  </button>
                </div>
              </form>

              <div style={{ display: "grid", gridTemplateColumns: "minmax(320px, 420px) minmax(0, 1fr)", gap: 24 }}>
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16, alignContent: "start" }}>
                  <h2 style={{ margin: 0, fontSize: 24 }}>{form.id ? "Edit testimonial" : "Add testimonial"}</h2>
                  <label style={labelStyle}>
                    Client name
                    <input style={inputStyle} value={form.clientName} onChange={(event) => updateForm("clientName", event.target.value)} />
                  </label>
                  <label style={labelStyle}>
                    Role
                    <input style={inputStyle} value={form.clientRole} onChange={(event) => updateForm("clientRole", event.target.value)} />
                  </label>
                  <label style={labelStyle}>
                    Company
                    <input style={inputStyle} value={form.companyName} onChange={(event) => updateForm("companyName", event.target.value)} />
                  </label>
                  <label style={labelStyle}>
                    Image path
                    <input style={inputStyle} value={form.imageUrl} onChange={(event) => updateForm("imageUrl", event.target.value)} placeholder="/uploads/testimonials/example.jpg" />
                  </label>
                  <label style={labelStyle}>
                    Upload image
                    <input style={inputStyle} type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage || busy} />
                  </label>
                  {form.imageUrl ? (
                    <div style={{ display: "grid", gap: 8 }}>
                      <span style={{ fontSize: 14, color: "#334155" }}>{uploadingImage ? "Uploading image..." : "Image preview"}</span>
                      <img
                        src={form.imageUrl}
                        alt="Testimonial preview"
                        style={{ width: 96, height: 96, objectFit: "cover", borderRadius: 16, border: "1px solid #dbe2ea" }}
                      />
                    </div>
                  ) : null}
                  <label style={labelStyle}>
                    Testimonial
                    <textarea style={{ ...inputStyle, minHeight: 140, resize: "vertical" }} value={form.testimonial} onChange={(event) => updateForm("testimonial", event.target.value)} />
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <label style={labelStyle}>
                      Rating
                      <input style={inputStyle} type="number" min="1" max="5" value={form.rating} onChange={(event) => updateForm("rating", event.target.value)} />
                    </label>
                    <label style={labelStyle}>
                      Sort order
                      <input style={inputStyle} type="number" min="0" value={form.sortOrder} onChange={(event) => updateForm("sortOrder", event.target.value)} />
                    </label>
                  </div>
                  <label style={{ ...labelStyle, gridAutoFlow: "column", justifyContent: "start", alignItems: "center", gap: 12 }}>
                    <input type="checkbox" checked={form.isActive} onChange={(event) => updateForm("isActive", event.target.checked)} />
                    Show on website
                  </label>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <button type="submit" disabled={busy} style={{ border: 0, borderRadius: 14, padding: "14px 18px", background: "#0f766e", color: "#fff", fontWeight: 700 }}>
                      {busy ? "Saving..." : form.id ? "Update" : "Create"}
                    </button>
                    <button type="button" onClick={() => setForm(emptyForm)} disabled={busy} style={{ border: "1px solid #cbd5e1", borderRadius: 14, padding: "14px 18px", background: "#fff", color: "#0f172a", fontWeight: 700 }}>
                      Reset
                    </button>
                  </div>
                </form>

                <div>
                  <h2 style={{ marginTop: 0, fontSize: 24 }}>Saved testimonials</h2>
                  <div style={{ display: "grid", gap: 16 }}>
                    {items.map((item) => (
                      <article key={item.id} style={{ border: "1px solid #e2e8f0", borderRadius: 18, padding: 18, background: item.isActive ? "#fff" : "#f8fafc" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "start" }}>
                          <div>
                            <h3 style={{ margin: 0, fontSize: 20 }}>{item.clientName}</h3>
                            <p style={{ margin: "6px 0 0", color: "#475569" }}>
                              {[item.clientRole, item.companyName].filter(Boolean).join(", ") || "No role/company set"}
                            </p>
                          </div>
                          <span style={{ padding: "6px 10px", borderRadius: 999, background: item.isActive ? "#dcfce7" : "#e2e8f0", color: "#0f172a", fontSize: 12 }}>
                            {item.isActive ? "Visible" : "Hidden"}
                          </span>
                        </div>
                        <p style={{ margin: "14px 0", color: "#334155", lineHeight: 1.6 }}>{item.testimonial}</p>
                        <p style={{ margin: "0 0 14px", color: "#64748b", fontSize: 14 }}>
                          Rating: {item.rating}/5 | Sort: {item.sortOrder} | Image: {item.imageUrl || "default"}
                        </p>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                          <button type="button" onClick={() => handleEdit(item)} style={{ border: 0, borderRadius: 12, padding: "10px 14px", background: "#dbeafe", color: "#1d4ed8", fontWeight: 700 }}>
                            Edit
                          </button>
                          <button type="button" onClick={() => handleDelete(item.id)} style={{ border: 0, borderRadius: 12, padding: "10px 14px", background: "#fee2e2", color: "#b91c1c", fontWeight: 700 }}>
                            Delete
                          </button>
                        </div>
                      </article>
                    ))}
                    {items.length === 0 ? <p style={{ margin: 0, color: "#64748b" }}>No testimonials saved yet.</p> : null}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
