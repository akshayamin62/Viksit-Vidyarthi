import type { ReactNode } from "react";

export function SectionHead({ title, text }: { title: ReactNode; text: string }) {
  return (
    <div className="mb-11 grid items-center gap-x-12 gap-y-3 md:grid-cols-[1.15fr_.85fr]">
      <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold tracking-tight text-ink">{title}</h2>
      <p className="text-lg leading-relaxed text-mute">{text}</p>
    </div>
  );
}
