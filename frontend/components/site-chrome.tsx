"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { EnquiryProvider, useEnquiry } from "@/components/enquiry";
import { btnInk, headerBtn } from "@/lib/ui";

const links = [
  { href: "/", label: "Home" },
  { href: "/viksit-vidyarthi", label: "Viksit Vidyarthi" },
  { href: "/center-of-excellence", label: "Center of Excellence" },
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <EnquiryProvider>
      <Header />
      {children}
      <Footer />
    </EnquiryProvider>
  );
}

function Header() {
  const pathname = usePathname();
  const { open } = useEnquiry();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenu(false);
    }
    function onPointer(event: MouseEvent) {
      const target = event.target as Node | null;
      const header = document.querySelector("[data-site-header]");
      if (header && target && !header.contains(target)) setMenu(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onPointer);
    };
  }, []);

  return (
    <header data-site-header className="pointer-events-none sticky top-0 z-50">
      <div className="pointer-events-auto relative border-b border-ink/10 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[5.25rem] max-w-[1440px] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:min-h-[6.5rem] lg:px-8">
          <Link href="/" className="min-w-0 max-w-[58%] shrink sm:max-w-none">
            <img
              src="/logo.png"
              alt="Viksit Vidyarthi"
              className="h-[clamp(3.25rem,4.8vw+1.25rem,5.25rem)] w-auto max-w-[min(100%,20rem)] object-contain object-left lg:max-w-[22.5rem]"
            />
          </Link>
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-ink/10 bg-white p-1.5 shadow-[0_3px_16px_rgba(10,16,48,0.12)] lg:flex" aria-label="Main">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={`rounded-full px-4 py-2.5 text-sm whitespace-nowrap transition xl:px-5 ${active ? "bg-ink font-semibold text-white" : "font-medium text-mute hover:bg-ink/5 hover:text-ink"}`}>
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-1">
            <button className={`${btnInk} ${headerBtn} !hidden lg:!inline-flex`} type="button" onClick={open}>
              Start a Conversation
            </button>
            <button className="flex size-11 shrink-0 flex-col items-center justify-center gap-1 rounded-full border border-ink/10 bg-white shadow-sm transition duration-200 hover:border-ink/20 hover:bg-paper hover:shadow-md active:scale-95 lg:hidden" type="button" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu((value) => !value)}>
              <span className="block h-0.5 w-[18px] bg-ink" />
              <span className="block h-0.5 w-[18px] bg-ink" />
              <span className="block h-0.5 w-[18px] bg-ink" />
            </button>
          </div>
        </div>
        <nav className={`${menu ? "absolute inset-x-3 top-[calc(100%+8px)] flex flex-col gap-1 rounded-3xl border border-ink/10 bg-white p-2.5 shadow-xl" : "hidden"} lg:hidden`} aria-label="Mobile">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} onClick={() => setMenu(false)} className={`rounded-full px-4 py-3 text-sm font-medium ${active ? "bg-ink text-white" : "text-mute hover:bg-ink/5 hover:text-ink"}`}>
                {link.label}
              </Link>
            );
          })}
          <button className={`${btnInk} ${headerBtn} mt-1.5 w-full`} type="button" onClick={() => { setMenu(false); open(); }}>
            Start a Conversation
          </button>
        </nav>
      </div>
    </header>
  );
}

function FooterLegalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="font-medium text-ink transition hover:text-ink-2 hover:underline" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="mt-3 rounded-t-[32px] border-t border-ink/8 bg-white px-4 py-12 text-mute shadow-[0_-12px_40px_-28px_rgba(10,16,48,0.18)] sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-9 flex flex-wrap items-center justify-between gap-6 border-b border-ink/10 pb-9">
          <Link href="/" className="shrink-0">
            <img src="/footer-logo.png" alt="ADMITra" className="h-14 w-auto max-w-[220px] object-contain" />
          </Link>
          <nav className="flex flex-wrap gap-x-7 gap-y-2" aria-label="Footer">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="font-medium text-ink transition hover:text-ink-2 hover:underline">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <strong className="font-display text-lg text-ink">ADMITra CORE Systems Pvt. Ltd.</strong>
          <p className="mt-2 text-mute"># 413, Rajshree Center, Opposite Hotel Effotel, Near Kalaghoda, Vadodara – 390020</p>
          <p className="mt-2 text-mute">
            <a className="font-medium text-ink transition hover:text-ink-2 hover:underline" href="tel:+919601139256">
              +91 9601139256
            </a>
            {" · "}
            <a className="font-medium text-ink transition hover:text-ink-2 hover:underline" href="mailto:hello@admitra.io">
              hello@admitra.io
            </a>
          </p>
          <p className="mt-4 max-w-2xl text-mute">
            An independent institutional student development initiative. No government endorsement is implied.
          </p>
        </div>
        <div className="mt-10 border-t border-ink/10 pt-6 text-sm text-mute">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-2">
            <span className="text-ink">© 2026 ADMITra. All Rights Reserved.</span>
            <span className="hidden text-ink/25 sm:inline" aria-hidden="true">
              |
            </span>
            <FooterLegalLink href="https://admitra.io/privacy-policy.html">Privacy Policy</FooterLegalLink>
            <span className="text-ink/25" aria-hidden="true">
              |
            </span>
            <FooterLegalLink href="https://admitra.io/disclaimer.html">Disclaimer</FooterLegalLink>
            <span className="text-ink/25" aria-hidden="true">
              |
            </span>
            <FooterLegalLink href="https://admitra.io/cookies.html">Cookies</FooterLegalLink>
            <span className="text-ink/25" aria-hidden="true">
              |
            </span>
            <FooterLegalLink href="https://admitra.io/sitemap.html">Sitemap</FooterLegalLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
