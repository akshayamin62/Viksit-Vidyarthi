"use client";

import { createContext, useContext, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { btnSaffron } from "@/lib/ui";

type EnquiryContextValue = { open: () => void; close: () => void };

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiry() {
  const value = useContext(EnquiryContext);
  if (!value) throw new Error("Enquiry provider is missing.");
  return value;
}

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <EnquiryContext.Provider value={{ open, close }}>
      {children}
      {isOpen ? <EnquiryModal /> : null}
    </EnquiryContext.Provider>
  );
}

function localPhoneDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

function isIndianPhone(value: string) {
  return /^[1-9]\d{9}$/.test(localPhoneDigits(value));
}

function EnquiryModal() {
  const { close } = useEnquiry();
  const [status, setStatus] = useState("");
  const [ok, setOk] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const phone = form.elements.namedItem("phone");
    if (phone instanceof HTMLInputElement) {
      phone.setCustomValidity(isIndianPhone(phone.value) ? "" : "Enter a valid 10-digit phone number, with or without +91.");
      if (!phone.checkValidity()) {
        phone.reportValidity();
        setOk(false);
        setStatus("Enter a valid 10-digit phone number.");
        return;
      }
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setOk(false);
    setStatus("Sending enquiry…");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || "").trim(),
          institution: String(data.get("institution") || "").trim(),
          email: String(data.get("email") || "").trim(),
          phone: String(data.get("phone") || "").trim(),
          institution_type: data.get("institution_type"),
          start_with: data.get("start_with"),
          website: data.get("website") || "",
        }),
      });
      const body = (await response.json().catch(() => ({}))) as { detail?: string };
      if (!response.ok) throw new Error(body.detail || "Could not send enquiry. The mail server did not accept it.");
      form.reset();
      setOk(true);
      setStatus("Enquiry sent. We will get in touch.");
    } catch (error) {
      setOk(false);
      setStatus(error instanceof Error ? error.message : "Could not send enquiry.");
    }
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
      <button className="absolute inset-0 bg-ink/60 backdrop-blur-sm" aria-label="Close" onClick={close} />
      <div className="relative max-h-[92vh] w-full max-w-[620px] overflow-auto rounded-[32px] bg-white p-9 shadow-[0_30px_60px_-20px_rgba(10,16,48,0.28)]">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#ff8a1f_33%,#fff_33%_66%,#0f9d58_66%)]" />
        <button className="absolute top-5 right-4 grid size-10 place-items-center rounded-full bg-paper text-2xl leading-none hover:bg-ink hover:text-white" type="button" onClick={close} aria-label="Close">
          ×
        </button>
        <h2 id="enquiry-title" className="mt-1.5 mr-10 font-display text-3xl font-semibold tracking-tight text-ink">
          Begin an institutional conversation
        </h2>
        <p className="mt-2 text-mute">
          Schools, colleges and educational leaders are invited to collaborate with ADMITra CORE Systems Pvt. Ltd. Tell us about your institution and we will get in touch.
        </p>
        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
          <input className="absolute -left-[9999px]" name="website" tabIndex={-1} autoComplete="off" />
          <Field label="Your name" name="name" autoComplete="name" minLength={2} />
          <Field label="Institution" name="institution" autoComplete="organization" minLength={2} />
          <Field label="Email" name="email" type="email" autoComplete="email" />
          <Field label="Phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" minLength={10} maxLength={16} placeholder="9876543210" onInput={(event) => event.currentTarget.setCustomValidity("")} />
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Institution type <span className="text-[#c0281c]">*</span></span>
            <Select name="institution_type">
              <option value="">Select</option>
              <option value="school">School</option>
              <option value="college">College</option>
              <option value="other">Other educational institution</option>
            </Select>
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Where would you like to start? <span className="text-[#c0281c]">*</span></span>
            <Select name="start_with">
              <option value="">Select</option>
              <option value="student programmes">Student programmes</option>
              <option value="teacher workshops">Teacher workshops</option>
              <option value="parent programmes">Parent programmes</option>
              <option value="center of excellence">Centre of Excellence</option>
            </Select>
          </label>
          <button className={`${btnSaffron} sm:col-span-2`} type="submit">
            Send enquiry
          </button>
          <p className={`min-h-5 text-sm font-semibold sm:col-span-2 ${ok ? "text-[#0a6e3d]" : "text-[#c0281c]"}`} role="status">
            {status}
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", autoComplete, minLength, maxLength, placeholder, inputMode, onInput }: { label: string; name: string; type?: string; autoComplete?: string; minLength?: number; maxLength?: number; placeholder?: string; inputMode?: "tel" | "email" | "text"; onInput?: (event: FormEvent<HTMLInputElement>) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label} <span className="text-[#c0281c]">*</span></span>
      <input className="h-[50px] w-full rounded-xl bg-paper px-4 shadow-[inset_0_0_0_1px_rgba(10,16,48,0.1)] outline-none focus:bg-white focus:shadow-[inset_0_0_0_2px_#2742e0]" name={name} type={type} required autoComplete={autoComplete} minLength={minLength} maxLength={maxLength} placeholder={placeholder} inputMode={inputMode} onInput={onInput} />
    </label>
  );
}

function Select({ name, children }: { name: string; children: ReactNode }) {
  return (
    <select className="h-[50px] w-full rounded-xl bg-paper px-4 shadow-[inset_0_0_0_1px_rgba(10,16,48,0.1)] outline-none focus:bg-white focus:shadow-[inset_0_0_0_2px_#2742e0]" name={name} required>
      {children}
    </select>
  );
}
