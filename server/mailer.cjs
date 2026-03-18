const nodemailer = require("nodemailer");

function env(name, fallback = "") {
  return process.env[name] ?? fallback;
}

function parsePort(value, fallback) {
  const port = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(port) ? port : fallback;
}

function parseBool(value, fallback = false) {
  if (value === undefined || value === null || value === "") return fallback;
  const v = String(value).toLowerCase().trim();
  if (["1", "true", "yes", "y", "on"].includes(v)) return true;
  if (["0", "false", "no", "n", "off"].includes(v)) return false;
  return fallback;
}

function createTransporter() {
  const host = env("SMTP_HOST", "smtp.gmail.com");
  const port = parsePort(env("SMTP_PORT"), 587);
  const secure = parseBool(env("SMTP_SECURE"), false);
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");

  if (!user || !pass) {
    throw new Error("Missing SMTP_USER / SMTP_PASS env vars.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

async function sendEmail({ to, subject, text, html, replyTo }) {
  const transporter = createTransporter();

  const fromEmail = env("MAIL_FROM_EMAIL", env("SMTP_USER"));
  const fromName = env("MAIL_FROM_NAME", "HRMetricS Website");

  const info = await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject,
    text,
    html,
    replyTo,
  });

  return info;
}

module.exports = { sendEmail };

