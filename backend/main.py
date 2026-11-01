import os
from pathlib import Path

import aiosmtplib
from dotenv import load_dotenv
from email.message import EmailMessage
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr, Field

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
ENV_FILE = ROOT / ".env"
load_dotenv(ENV_FILE)


def mail_settings():
    load_dotenv(ENV_FILE, override=True)
    smtp_user = os.getenv("MAIL_SMTP_USER", "").strip()
    smtp_password = os.getenv("MAIL_SMTP_PASSWORD", "").strip()
    mail_from = os.getenv("MAIL_FROM", "").strip() or smtp_user
    return {
        "host": os.getenv("MAIL_SMTP_HOST", "smtp.gmail.com"),
        "port": int(os.getenv("MAIL_SMTP_PORT", "587")),
        "user": smtp_user,
        "password": smtp_password,
        "mail_from": mail_from,
        "mail_to": os.getenv("MAIL_TO", "akshay.amin.62@gmail.com").strip(),
    }

INSTITUTION_TYPES = {"school", "college", "other"}
START_OPTIONS = {
    "student programmes",
    "parent programmes",
    "teacher workshops",
    "center of excellence",
}

app = FastAPI(title="Viksit Vidyarthi enquiry")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"],
)


class Enquiry(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    institution: str = Field(min_length=2, max_length=200)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=20)
    institution_type: str
    start_with: str
    website: str = ""


@app.post("/api/enquiry")
async def send_enquiry(payload: Enquiry):
    if payload.website:
        return {"ok": True}

    institution_type = payload.institution_type.strip().lower()
    start_with = payload.start_with.strip().lower()

    if institution_type not in INSTITUTION_TYPES:
        raise HTTPException(status_code=400, detail="Invalid institution type.")
    if start_with not in START_OPTIONS:
        raise HTTPException(status_code=400, detail="Invalid starting option.")

    settings = mail_settings()
    if not settings["user"] or not settings["password"]:
        raise HTTPException(
            status_code=503,
            detail="Mail is not configured. Add MAIL_SMTP_USER and MAIL_SMTP_PASSWORD in .env.",
        )

    message = EmailMessage()
    message["From"] = settings["mail_from"]
    message["To"] = settings["mail_to"]
    message["Reply-To"] = payload.email
    message["Subject"] = f"Institutional enquiry from {payload.institution}"
    message.set_content(
        "\n".join(
            [
                "New institutional conversation request",
                "",
                f"Name: {payload.name.strip()}",
                f"Institution: {payload.institution.strip()}",
                f"Email: {payload.email}",
                f"Phone: {payload.phone.strip()}",
                f"Institution type: {institution_type}",
                f"Where they would like to start: {start_with}",
            ]
        )
    )

    try:
        await aiosmtplib.send(
            message,
            hostname=settings["host"],
            port=settings["port"],
            username=settings["user"],
            password=settings["password"],
            start_tls=True,
        )
    except Exception:
        raise HTTPException(
            status_code=502,
            detail="Could not send the enquiry email. Check SMTP settings.",
        ) from None

    return {"ok": True}


app.mount("/", StaticFiles(directory=PUBLIC, html=True), name="site")
