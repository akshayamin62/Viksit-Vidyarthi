import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Viksit Vidyarthi – Viksit Bharat",
  description: "A structured ecosystem for student development, teacher empowerment and parent engagement.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable} antialiased`}>
      <body className="font-sans text-[1.0625rem] leading-relaxed">
        <div className="grid h-[5px] grid-cols-3" aria-hidden="true">
          <span className="bg-saffron" />
          <span className="bg-white" />
          <span className="bg-green" />
        </div>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
