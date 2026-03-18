const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sendEmail } = require("./mailer.cjs");

dotenv.config();

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "100kb" }));

function normalizeString(value) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ");
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

// Basic health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Serve built site in production (optional)
const distDir = path.resolve(__dirname, "..", "dist");
app.use(express.static(distDir));
// SPA fallback (avoid Express route patterns; works in Express 5).
app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") return next();
  res.sendFile(path.join(distDir, "index.html"));
});

const port = Number.parseInt(process.env.PORT ?? "3001", 10) || 3001;
app.listen(port, () => {
  console.log(`Mail server listening on http://localhost:${port}`);
});
