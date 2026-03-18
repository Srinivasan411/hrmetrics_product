const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookie = require("cookie");
const multer = require("multer");
const { sendEmail } = require("./mailer.cjs");
const {
  defaultSiteSettings,
  listPublicTestimonials,
  listAllTestimonials,
  getTestimonial,
  createTestimonial,
  saveTestimonial,
  removeTestimonial,
  getAllSiteSettings,
  saveSiteSettings,
} = require("./db.cjs");

dotenv.config();

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "100kb" }));

const ADMIN_COOKIE_NAME = "hrmetrics_admin_session";
const ADMIN_SESSION_TTL_MS = 1000 * 60 * 60 * 12;
const adminSessions = new Map();
const uploadsDir = path.resolve(__dirname, "..", "public", "uploads", "testimonials");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname).toLowerCase() || ".jpg";
      const baseName = path
        .basename(file.originalname, extension)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 50) || "testimonial";
      cb(null, `${Date.now()}-${crypto.randomBytes(6).toString("hex")}-${baseName}${extension}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (/^image\/(png|jpe?g|webp|gif|avif)$/i.test(String(file.mimetype))) {
      cb(null, true);
      return;
    }
    cb(new Error("Only image files are allowed."));
  },
});

function normalizeString(value) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ");
}

function normalizeInteger(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function isJsonPreferred(req) {
  const accept = String(req.get("accept") ?? "").toLowerCase();
  const xhr = String(req.get("x-requested-with") ?? "").toLowerCase();
  return accept.includes("application/json") || xhr === "xmlhttprequest";
}

function getClientIp(req) {
  const xff = String(req.get("x-forwarded-for") ?? "");
  if (xff) return xff.split(",")[0].trim();
  return req.ip ?? "";
}

function safeSameOriginReturnUrl(req) {
  const referer = String(req.get("referer") ?? "");
  if (!referer) return "/";

  try {
    const ref = new URL(referer);
    const currentHost = String(req.get("host") ?? "").toLowerCase();
    if (currentHost && ref.host.toLowerCase() !== currentHost) return "/";
    if (!["http:", "https:"].includes(ref.protocol)) return "/";
    return `${ref.pathname}${ref.search}`;
  } catch {
    return "/";
  }
}

function respond(req, res, status, payload) {
  if (isJsonPreferred(req)) return res.status(status).json(payload);

  const title = String(payload.status ?? "error");
  const message = String(payload.message ?? "Something went wrong.");

  res.status(status).type("html").send(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; padding:24px;">
    <h2 style="margin:0 0 12px;">${escapeHtml(message)}</h2>
    <p style="margin:0 0 16px;"><a href="/">Back to home</a></p>
  </body>
</html>`);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return ch;
    }
  });
}

function getSessionSecret() {
  return normalizeString(process.env.ADMIN_SESSION_SECRET) || "change-me-in-env";
}

function getAdminUsername() {
  return normalizeString(process.env.ADMIN_USERNAME) || "admin";
}

function getAdminPassword() {
  return String(process.env.ADMIN_PASSWORD ?? "admin123");
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function signSessionId(sessionId) {
  return crypto.createHmac("sha256", getSessionSecret()).update(sessionId).digest("hex");
}

function createSessionValue(sessionId) {
  return `${sessionId}.${signSessionId(sessionId)}`;
}

function parseCookies(req) {
  return cookie.parse(String(req.headers.cookie ?? ""));
}

function readAdminSession(req) {
  const cookies = parseCookies(req);
  const raw = normalizeString(cookies[ADMIN_COOKIE_NAME]);
  if (!raw.includes(".")) return null;

  const [sessionId, signature] = raw.split(".");
  if (!sessionId || !signature) return null;
  if (!safeEqual(signSessionId(sessionId), signature)) return null;

  const session = adminSessions.get(sessionId);
  if (!session) return null;
  if (session.expiresAt <= Date.now()) {
    adminSessions.delete(sessionId);
    return null;
  }

  session.expiresAt = Date.now() + ADMIN_SESSION_TTL_MS;
  return session;
}

function setAdminCookie(res, value) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(ADMIN_COOKIE_NAME, value, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(ADMIN_SESSION_TTL_MS / 1000),
      secure: process.env.NODE_ENV === "production",
    }),
  );
}

function clearAdminCookie(res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(ADMIN_COOKIE_NAME, "", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      secure: process.env.NODE_ENV === "production",
    }),
  );
}

function requireAdmin(req, res, next) {
  const session = readAdminSession(req);
  if (!session) return res.status(401).json({ status: "error", message: "Unauthorized." });
  req.adminSession = session;
  next();
}

function handleUploadError(err, req, res, next) {
  if (!err) return next();
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ status: "error", message: "Image must be 5MB or smaller." });
  }
  return res.status(400).json({ status: "error", message: err.message || "Upload failed." });
}

function buildDisplayRole(clientRole, companyName) {
  const role = normalizeString(clientRole);
  const company = normalizeString(companyName);
  if (role && company) return `${role}, ${company}`;
  return role || company;
}

function validateTestimonialInput(body) {
  const clientName = normalizeString(body.clientName);
  const clientRole = normalizeString(body.clientRole);
  const companyName = normalizeString(body.companyName);
  const imageUrl = normalizeString(body.imageUrl);
  const testimonial = normalizeString(body.testimonial);
  const rating = Math.min(5, Math.max(1, normalizeInteger(body.rating, 5)));
  const sortOrder = Math.max(0, normalizeInteger(body.sortOrder, 0));
  const isActive = body.isActive === false || String(body.isActive).toLowerCase() === "false" ? 0 : 1;

  if (!clientName) {
    return { error: "Client name is required." };
  }
  if (!testimonial) {
    return { error: "Testimonial text is required." };
  }

  return {
    value: {
      client_name: clientName,
      client_role: clientRole,
      company_name: companyName,
      image_url: imageUrl,
      testimonial,
      rating,
      is_active: isActive,
      sort_order: sortOrder,
    },
  };
}

function validateSiteSettingsInput(body) {
  const next = {};
  for (const key of Object.keys(defaultSiteSettings)) {
    next[key] = normalizeString(body[key]);
  }
  return next;
}

const lastSubmitByKey = new Map();
function checkRateLimit(key, seconds) {
  const now = Date.now();
  const last = lastSubmitByKey.get(key) ?? 0;
  if (last > 0 && now - last < seconds * 1000) return false;
  lastSubmitByKey.set(key, now);
  return true;
}

function pickRecipient() {
  const to = process.env.HRMETRICS_LEAD_TO ?? process.env.MAIL_TO ?? "";
  return normalizeString(to);
}

function validEmail(email) {
  const v = normalizeString(email);
  if (!v) return false;
  // pragmatic (not RFC perfect)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function normalizePhone(phone) {
  const cleaned = normalizeString(phone).replace(/[^0-9+()\-\s]/g, "");
  if (cleaned.length < 7 || cleaned.length > 20) return null;
  return cleaned;
}

function toArray(value) {
  if (value === undefined || value === null) return [];
  if (Array.isArray(value)) return value.map(normalizeString).filter(Boolean);
  const s = normalizeString(value);
  return s ? [s] : [];
}

async function handleBookDemo(req, res) {
  const asJson = isJsonPreferred(req);

  const honeypot = normalizeString(req.body.website);
  if (honeypot) return respond(req, res, 200, { status: "ok", message: "Thanks." });

  const ip = getClientIp(req);
  const key = `${ip}:bookdemo`;
  if (!checkRateLimit(key, 20)) {
    return respond(req, res, 429, { status: "error", message: "Please wait a moment and try again." });
  }

  const name = normalizeString(req.body.name);
  const company = normalizeString(req.body.company);
  const email = normalizeString(req.body.email);
  const phoneRaw = normalizeString(req.body.phone);
  const employees = normalizeString(req.body.employees);

  if (!name || !company || !email || !phoneRaw || !employees) {
    return respond(req, res, 400, { status: "error", message: "Missing required fields." });
  }
  if (!validEmail(email)) {
    return respond(req, res, 400, { status: "error", message: "Invalid email address." });
  }
  const phone = normalizePhone(phoneRaw);
  if (!phone) {
    return respond(req, res, 400, { status: "error", message: "Invalid phone number." });
  }

  const to = pickRecipient();
  if (!to) {
    return respond(req, res, 500, { status: "error", message: "Server mail recipient is not configured." });
  }
  const subject = "HRMetricS Lead - Book Demo / Try Free";

  const userAgent = normalizeString(req.get("user-agent"));
  const origin = normalizeString(req.get("origin"));
  const referer = normalizeString(req.get("referer"));

  const lines = [
    "New lead received:",
    "",
    `Name: ${name}`,
    `Company: ${company}`,
    `Official Email: ${email}`,
    `Phone: ${phone}`,
    `Employees: ${employees}`,
    "",
    "Meta:",
    `IP: ${ip}`,
    `User-Agent: ${userAgent}`,
    `Origin: ${origin}`,
    `Referer: ${referer}`,
    `Time (server): ${new Date().toISOString()}`,
  ];
  const text = `${lines.join("\r\n")}\r\n`;
  const html = `<pre style="font:14px/1.4 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; white-space:pre-wrap;">${escapeHtml(
    lines.join("\n"),
  )}</pre>`;

  try {
    await sendEmail({ to, subject, text, html, replyTo: `${name} <${email}>` });
  } catch (err) {
    console.error("sendMail failed:", err);
    return respond(req, res, 500, { status: "error", message: "Unable to send email right now. Please try again later." });
  }

  if (!asJson) {
    const returnUrl = safeSameOriginReturnUrl(req);
    const sep = returnUrl.includes("?") ? "&" : "?";
    return res.redirect(303, `${returnUrl}${sep}mail=success`);
  }

  return respond(req, res, 200, { status: "ok", message: "Submitted successfully." });
}

async function handleScheduleDemo(req, res) {
  const asJson = isJsonPreferred(req);

  const honeypot = normalizeString(req.body.website);
  if (honeypot) return respond(req, res, 200, { status: "ok", message: "Thanks." });

  const ip = getClientIp(req);
  const key = `${ip}:schedule`;
  if (!checkRateLimit(key, 20)) {
    return respond(req, res, 429, { status: "error", message: "Please wait a moment and try again." });
  }

  const name = normalizeString(req.body.name);
  const company = normalizeString(req.body.company);
  const email = normalizeString(req.body.email);
  const phoneRaw = normalizeString(req.body.phone);
  const employees = normalizeString(req.body.employees);
  const interestedModules = toArray(req.body["interested_modules[]"] ?? req.body.interested_modules);
  const challenges = normalizeString(req.body.challenges);

  if (!name || !company || !email || !phoneRaw || !employees) {
    return respond(req, res, 400, { status: "error", message: "Missing required fields." });
  }
  if (!validEmail(email)) {
    return respond(req, res, 400, { status: "error", message: "Invalid email address." });
  }
  const phone = normalizePhone(phoneRaw);
  if (!phone) {
    return respond(req, res, 400, { status: "error", message: "Invalid phone number." });
  }

  const to = pickRecipient();
  if (!to) {
    return respond(req, res, 500, { status: "error", message: "Server mail recipient is not configured." });
  }
  const subject = "HRMetricS Lead - Schedule a Demo";

  const userAgent = normalizeString(req.get("user-agent"));
  const origin = normalizeString(req.get("origin"));
  const referer = normalizeString(req.get("referer"));

  const lines = [
    "New demo schedule request received:",
    "",
    `Name: ${name}`,
    `Company: ${company}`,
    `Official Email: ${email}`,
    `Phone: ${phone}`,
    `Employees: ${employees}`,
    `Interested Modules: ${interestedModules.length ? interestedModules.join(", ") : "(not provided)"}`,
    `Challenges: ${challenges || "(not provided)"}`,
    "",
    "Meta:",
    `IP: ${ip}`,
    `User-Agent: ${userAgent}`,
    `Origin: ${origin}`,
    `Referer: ${referer}`,
    `Time (server): ${new Date().toISOString()}`,
  ];
  const text = `${lines.join("\r\n")}\r\n`;
  const html = `<pre style="font:14px/1.4 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; white-space:pre-wrap;">${escapeHtml(
    lines.join("\n"),
  )}</pre>`;

  try {
    await sendEmail({ to, subject, text, html, replyTo: `${name} <${email}>` });
  } catch (err) {
    console.error("sheduleMail failed:", err);
    return respond(req, res, 500, { status: "error", message: "Unable to send email right now. Please try again later." });
  }

  if (!asJson) {
    const returnUrl = safeSameOriginReturnUrl(req);
    const sep = returnUrl.includes("?") ? "&" : "?";
    return res.redirect(303, `${returnUrl}${sep}mail=success`);
  }

  return respond(req, res, 200, { status: "ok", message: "Submitted successfully." });
}

// Backwards-compatible routes (match existing <form action="..."> values)
app.post("/sendMail.php", handleBookDemo);
app.post("/sheduleMail.php", handleScheduleDemo);

// Cleaner API aliases (optional)
app.post("/api/send-mail", handleBookDemo);
app.post("/api/schedule-mail", handleScheduleDemo);

app.get("/api/testimonials", (req, res) => {
  res.json({ status: "ok", data: listPublicTestimonials() });
});

app.get("/api/site-settings", (req, res) => {
  res.json({ status: "ok", data: getAllSiteSettings() });
});

app.post("/api/admin/login", (req, res) => {
  const username = normalizeString(req.body.username);
  const password = String(req.body.password ?? "");

  if (!safeEqual(username, getAdminUsername()) || !safeEqual(password, getAdminPassword())) {
    return res.status(401).json({ status: "error", message: "Invalid username or password." });
  }

  const sessionId = crypto.randomBytes(24).toString("hex");
  const session = {
    id: sessionId,
    username,
    expiresAt: Date.now() + ADMIN_SESSION_TTL_MS,
  };

  adminSessions.set(sessionId, session);
  setAdminCookie(res, createSessionValue(sessionId));

  return res.json({ status: "ok", data: { username } });
});

app.post("/api/admin/logout", (req, res) => {
  const session = readAdminSession(req);
  if (session) adminSessions.delete(session.id);
  clearAdminCookie(res);
  res.json({ status: "ok" });
});

app.get("/api/admin/session", (req, res) => {
  const session = readAdminSession(req);
  if (!session) return res.status(401).json({ status: "error", message: "Unauthorized." });
  res.json({ status: "ok", data: { username: session.username } });
});

app.get("/api/admin/testimonials", requireAdmin, (req, res) => {
  res.json({ status: "ok", data: listAllTestimonials() });
});

app.get("/api/admin/site-settings", requireAdmin, (req, res) => {
  res.json({ status: "ok", data: getAllSiteSettings() });
});

function handleSaveSiteSettings(req, res) {
  const settings = saveSiteSettings(validateSiteSettingsInput(req.body));
  res.json({ status: "ok", data: settings });
}

app.put("/api/admin/site-settings", requireAdmin, handleSaveSiteSettings);
app.post("/api/admin/site-settings", requireAdmin, handleSaveSiteSettings);

app.post("/api/admin/uploads/testimonial-image", requireAdmin, upload.single("image"), handleUploadError, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: "error", message: "Please choose an image file." });
  }

  const imageUrl = `/uploads/testimonials/${req.file.filename}`;
  return res.status(201).json({
    status: "ok",
    data: {
      imageUrl,
      originalName: req.file.originalname,
      size: req.file.size,
    },
  });
});

app.post("/api/admin/testimonials", requireAdmin, (req, res) => {
  const parsed = validateTestimonialInput(req.body);
  if (parsed.error) return res.status(400).json({ status: "error", message: parsed.error });

  const testimonial = createTestimonial(parsed.value);
  res.status(201).json({ status: "ok", data: testimonial });
});

app.put("/api/admin/testimonials/:id", requireAdmin, (req, res) => {
  const id = normalizeInteger(req.params.id, 0);
  if (!id || !getTestimonial(id)) {
    return res.status(404).json({ status: "error", message: "Testimonial not found." });
  }

  const parsed = validateTestimonialInput(req.body);
  if (parsed.error) return res.status(400).json({ status: "error", message: parsed.error });

  const testimonial = saveTestimonial(id, parsed.value);
  res.json({ status: "ok", data: testimonial });
});

app.delete("/api/admin/testimonials/:id", requireAdmin, (req, res) => {
  const id = normalizeInteger(req.params.id, 0);
  if (!id || !getTestimonial(id)) {
    return res.status(404).json({ status: "error", message: "Testimonial not found." });
  }

  removeTestimonial(id);
  res.json({ status: "ok" });
});

// Basic health check
app.get("/api/health", (req, res) =>
  res.json({
    ok: true,
    adminUser: getAdminUsername(),
    testimonialFields: ["clientName", "clientRole", "companyName", "imageUrl", "testimonial", "rating", "isActive", "sortOrder"],
  }),
);

// Serve built site in production (optional)
const distDir = path.resolve(__dirname, "..", "dist");
const publicDir = path.resolve(__dirname, "..", "public");
app.use("/uploads", express.static(path.join(publicDir, "uploads")));
app.use(express.static(distDir));
// SPA fallback (avoid Express route patterns; works in Express 5).
app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") return next();
  res.sendFile(path.join(distDir, "index.html"));
});

const port = Number.parseInt(process.env.PORT ?? "3001", 10) || 3001;
const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`Mail server listening on http://localhost:${port}`);
});

function shutdown(signal) {
  httpServer.close(() => {
    process.exit(0);
  });

  setTimeout(() => {
    process.exit(0);
  }, 5000).unref();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
