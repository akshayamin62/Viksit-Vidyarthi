"use client";

import { useState, type ReactNode } from "react";
import { useEnquiry } from "@/components/enquiry";
import { Ico } from "@/components/icons";
import { btnSaffron } from "@/lib/ui";

const items: { title: string; copy: string; plate: string; icon: ReactNode }[] = [
  {
    title: "Potential and readiness assessments",
    copy: "The Centre of Excellence may offer: student potential and career-readiness assessments.",
    plate: "bg-[#fff1e0] text-[#d96a00]",
    icon: <><circle cx="11" cy="11" r="6" /><path d="m20 20-3.5-3.5M11 8v3l2 1.5" /></>,
  },
  {
    title: "Education and career profiles",
    copy: "The Centre of Excellence may offer: individual Education and Career Development Profiles.",
    plate: "bg-[#e8eeff] text-[#2742e0]",
    icon: <><rect x="4" y="3" width="16" height="18" rx="2" /><circle cx="12" cy="9" r="2.2" /><path d="M8 16c.8-1.4 2.2-2 4-2s3.2.6 4 2" /></>,
  },
  {
    title: "Education activity portfolios",
    copy: "The Centre of Excellence may offer: personalised Education Activity Portfolios.",
    plate: "bg-[#e2f5ea] text-[#0a6e3d]",
    icon: <><path d="M4 7.5 12 4l8 3.5L12 11 4 7.5Z" /><path d="M4 12.5 12 16l8-3.5" /><path d="M4 16.5 12 20l8-3.5" /></>,
  },
  {
    title: "Long-term roadmaps",
    copy: "The Centre of Excellence may offer: long-term academic and career development roadmaps.",
    plate: "bg-[#fff1e0] text-[#d96a00]",
    icon: <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 7.5c4 0 4 9 8 9" /></>,
  },
  {
    title: "Skill and profile building",
    copy: "The Centre of Excellence may offer: skill-development and profile-building activities.",
    plate: "bg-[#e8eeff] text-[#2742e0]",
    icon: <><path d="M12 3.5 13.6 8H18l-3.6 2.7 1.4 4.3L12 12.8 8.2 15l1.4-4.3L6 8h4.4L12 3.5Z" /></>,
  },
  {
    title: "Higher-education guidance",
    copy: "The Centre of Excellence may offer: national and international higher-education guidance.",
    plate: "bg-[#e2f5ea] text-[#0a6e3d]",
    icon: <><path d="M3 10 12 6l9 4-9 4-9-4Z" /><path d="M7 12v4c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5v-4" /><path d="M21 10v6" /></>,
  },
  {
    title: "Study-abroad readiness",
    copy: "The Centre of Excellence may offer: career-focused study-abroad readiness and preparation.",
    plate: "bg-[#fff1e0] text-[#d96a00]",
    icon: <><circle cx="12" cy="12" r="8" /><path d="M4 12h16M12 4c2.2 2.4 3.3 5.1 3.3 8S14.2 17.6 12 20c-2.2-2.4-3.3-5.1-3.3-8S9.8 6.4 12 4Z" /></>,
  },
  {
    title: "Progress monitoring",
    copy: "The Centre of Excellence may offer: student progress monitoring and periodic development reviews.",
    plate: "bg-[#e8eeff] text-[#2742e0]",
    icon: <><path d="M4 19V5" /><path d="M4 19h16" /><path d="m7 14 3.2-3.2 2.4 2.2L18 7" /></>,
  },
];

const hero =
  "relative isolate overflow-hidden rounded-[32px] text-white [background:radial-gradient(60%_80%_at_8%_0%,rgba(255,138,31,.42),transparent_60%),radial-gradient(55%_70%_at_100%_100%,rgba(15,157,88,.42),transparent_60%),radial-gradient(40%_50%_at_70%_10%,rgba(39,66,224,.35),transparent_70%),#0a1030]";

export default function CentrePage() {
  const { open } = useEnquiry();
  const [active, setActive] = useState<number | null>(null);

  return (
    <main>
      <section className={`${hero} mx-3 mt-3 px-4 py-12 sm:px-6 sm:py-16`}>
        <div className="mx-auto w-full max-w-[1200px]">
          <h1 className="font-display text-[clamp(2.3rem,5vw,4rem)] font-semibold tracking-tight">Center of Excellence</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/80">A structured, long-term ecosystem for student development, education planning and career readiness within the institution. Select an item to see more.</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-6 py-20">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => {
            const selected = active === index;
            return (
              <button key={item.title} className={`group flex min-h-[230px] flex-col rounded-[28px] p-6 text-left transition hover:-translate-y-1 ${selected ? "bg-ink text-white shadow-[0_18px_40px_-22px_rgba(10,16,48,.7)]" : "bg-white text-ink shadow-[0_16px_40px_-28px_rgba(10,16,48,.55)] ring-1 ring-ink/8"}`} type="button" aria-pressed={selected} onClick={() => setActive(index)}>
                <span className={`grid size-12 place-items-center rounded-2xl ${selected ? "bg-saffron text-[#1f1000]" : item.plate}`}>
                  <Ico className="size-6">{item.icon}</Ico>
                </span>
                <h3 className="mt-5 font-display text-[1.45rem] leading-tight font-semibold">{item.title}</h3>
                <span className={`mt-auto pt-5 text-sm font-semibold ${selected ? "text-saffron" : "text-[#d96a00]"}`}>Read more</span>
              </button>
            );
          })}
        </div>
        {active !== null ? (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-6 rounded-[32px] bg-ink p-8 text-white md:p-10">
            <div className="flex min-w-0 items-start gap-4 sm:gap-5">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-saffron text-[#1f1000]">
                <Ico className="size-7">{items[active].icon}</Ico>
              </span>
              <div>
                <h3 className="font-display text-3xl font-semibold">{items[active].title}</h3>
                <p className="mt-2 max-w-2xl text-lg text-white/85">{items[active].copy}</p>
              </div>
            </div>
            <button className={btnSaffron} type="button" onClick={open}>Discuss this with us</button>
          </div>
        ) : null}
        <p className="mt-6 rounded-[20px] bg-[#fff1e0] px-6 py-5 shadow-[inset_4px_0_0_#ff8a1f]">The Centre of Excellence is optional. Scope, resources, responsibilities and commercial arrangements are defined separately through institutional collaboration.</p>
      </section>

      <section className="px-3 pb-3">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-8 rounded-[28px] bg-ink px-5 py-10 text-white sm:rounded-[32px] sm:px-8 sm:py-14 md:px-14">
          <div>
            <h2 className="max-w-xl font-display text-[clamp(1.8rem,4vw,2.25rem)] font-semibold tracking-tight">Explore a Centre of Excellence for your institution.</h2>
            <p className="mt-3 text-white/80">Scope and arrangements are defined together, through institutional collaboration.</p>
          </div>
          <button className={btnSaffron} type="button" onClick={open}>Start a Conversation</button>
        </div>
      </section>
    </main>
  );
}
