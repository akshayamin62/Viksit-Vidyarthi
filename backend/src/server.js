import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env") });

const INSTITUTION_TYPES = new Set(["school", "college", "other"]);
const START_OPTIONS = new Set([
  "student programmes",
  "parent programmes",
  "teacher workshops",
  "center of excellence",
]);

function mailSettings() {
  dotenv.config({ path: path.join(root, ".env"), override: true });
  const user = (process.env.MAIL_SMTP_USER || "").trim();
  const password = (process.env.MAIL_SMTP_PASSWORD || "").trim();
  return {
    host: process.env.MAIL_SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.MAIL_SMTP_PORT || 587),
    user,
    password,
    from: (process.env.MAIL_FROM || "").trim() || user,
    to: (process.env.MAIL_TO || "akshay.amin.62@gmail.com").trim(),
  };
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  })
);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/enquiry", async (req, res) => {
  const body = req.body || {};
  if (String(body.website || "").trim()) {
    res.json({ ok: true });
    return;
  }

  const name = String(body.name || "").trim();
  const institution = String(body.institution || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const institutionType = String(body.institution_type || "").trim().toLowerCase();
  const startWith = String(body.start_with || "").trim().toLowerCase();

  if (name.length < 2 || name.length > 120) {
    res.status(400).json({ detail: "Please enter your name." });
    return;
  }
  if (institution.length < 2 || institution.length > 200) {
    res.status(400).json({ detail: "Please enter your institution." });
    return;
  }
  if (!isEmail(email)) {
    res.status(400).json({ detail: "Please enter a valid email." });
    return;
  }
  if (phone.length < 7 || phone.length > 20) {
    res.status(400).json({ detail: "Please enter a valid phone number." });
    return;
  }
  if (!INSTITUTION_TYPES.has(institutionType)) {
    res.status(400).json({ detail: "Invalid institution type." });
    return;
  }
  if (!START_OPTIONS.has(startWith)) {
    res.status(400).json({ detail: "Invalid starting option." });
    return;
  }

  const settings = mailSettings();
  if (!settings.user || !settings.password) {
    res.status(503).json({
      detail: "Mail is not configured. Add MAIL_SMTP_USER and MAIL_SMTP_PASSWORD in .env.",
    });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.port === 465,
    auth: { user: settings.user, pass: settings.password },
  });

  try {
    await transporter.sendMail({
      from: settings.from,
      to: settings.to,
      replyTo: email,
      subject: `Institutional enquiry from ${institution}`,
      text: [
        "New institutional conversation request",
        "",
        `Name: ${name}`,
        `Institution: ${institution}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Institution type: ${institutionType}`,
        `Where they would like to start: ${startWith}`,
      ].join("\n"),
    });
  } catch {
    res.status(502).json({
      detail: "Could not send the enquiry email. Check SMTP settings.",
    });
    return;
  }

  res.json({ ok: true });
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`Enquiry API running on http://127.0.0.1:${port}`);
});
