"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
        <div className="mx-auto flex h-[88px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0">
            <img src="/logo.jpeg" alt="Viksit Vidyarthi" className="h-14 w-auto max-w-[200px] object-contain object-left mix-blend-multiply lg:h-[68px] lg:max-w-[250px]" />
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
            <button className={`${btnInk} ${headerBtn} hidden lg:inline-flex`} type="button" onClick={open}>
              Start a Conversation
            </button>
            <button className="flex size-11 flex-col items-center justify-center gap-1 rounded-full border border-ink/10 bg-white shadow-sm lg:hidden" type="button" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu((value) => !value)}>
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

function Footer() {
  return (
    <footer className="mt-3 rounded-t-[32px] bg-ink px-6 py-16 text-[#c9d0ee]">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-9 flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-9">
          <Link href="/" className="rounded-[14px] bg-white px-3 py-2">
            <img src="/logo.jpeg" alt="Viksit Vidyarthi" className="h-10 w-auto max-w-[200px] object-contain" />
          </Link>
          <nav className="flex flex-wrap gap-x-7 gap-y-2" aria-label="Footer">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="font-medium text-white hover:underline">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <strong className="font-display text-lg text-white">ADMITra CORE Systems Pvt. Ltd.</strong>
            <p className="mt-2 text-[#9aa3cc]"># 412, Rajshree Center, Opposite Hotel Effotel, Near Kalaghoda, Vadodara – 390020</p>
            <p className="mt-2 text-[#9aa3cc]">
              <a className="text-white" href="tel:+917045919074">+91 70 459 19 074</a>
              {" · "}
              <a className="text-white" href="mailto:hello@admitra.io">hello@admitra.io</a>
            </p>
          </div>
          <p className="self-end text-[#9aa3cc]">An independent institutional student development initiative. No government endorsement is implied.</p>
        </div>
      </div>
    </footer>
  );
}
