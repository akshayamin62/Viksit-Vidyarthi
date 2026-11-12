"use client";

import { useState } from "react";
import { useEnquiry } from "@/components/enquiry";
import { btnSaffron } from "@/lib/ui";

const items = [
  ["Potential and readiness assessments", "The Centre of Excellence may offer: student potential and career-readiness assessments."],
  ["Education and career profiles", "The Centre of Excellence may offer: individual Education and Career Development Profiles."],
  ["Education activity portfolios", "The Centre of Excellence may offer: personalised Education Activity Portfolios."],
  ["Long-term roadmaps", "The Centre of Excellence may offer: long-term academic and career development roadmaps."],
  ["Skill and profile building", "The Centre of Excellence may offer: skill-development and profile-building activities."],
  ["Higher-education guidance", "The Centre of Excellence may offer: national and international higher-education guidance."],
  ["Study-abroad readiness", "The Centre of Excellence may offer: career-focused study-abroad readiness and preparation."],
  ["Progress monitoring", "The Centre of Excellence may offer: student progress monitoring and periodic development reviews."],
];

const hero =
  "relative isolate overflow-hidden rounded-[32px] text-white [background:radial-gradient(60%_80%_at_8%_0%,rgba(255,138,31,.42),transparent_60%),radial-gradient(55%_70%_at_100%_100%,rgba(15,157,88,.42),transparent_60%),radial-gradient(40%_50%_at_70%_10%,rgba(39,66,224,.35),transparent_70%),#0a1030]";

export default function CentrePage() {
  const { open } = useEnquiry();
  const [active, setActive] = useState<number | null>(null);

  return (
    <main>
      <section className={`${hero} mx-3 mt-3 px-6 py-16`}>
        <div className="mx-auto w-full max-w-[1200px]">
          <h1 className="font-display text-[clamp(2.3rem,5vw,4rem)] font-semibold tracking-tight">Center of Excellence</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/80">A structured, long-term ecosystem for student development, education planning and career readiness within the institution. Select an item to see more.</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-6 py-20">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map(([title], index) => (
            <button key={title} className={`min-h-[180px] rounded-[20px] p-7 text-left ${active === index ? "bg-ink text-white" : "bg-white text-ink shadow-[inset_0_0_0_1px_rgba(10,16,48,.1)]"}`} type="button" onClick={() => setActive(index)}>
              <h3 className="font-display text-xl font-bold">{title}</h3>
              <p className={`mt-3 text-sm font-semibold ${active === index ? "text-saffron" : "text-[#d96a00]"}`}>Select to read more</p>
            </button>
          ))}
        </div>
        {active !== null ? (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-6 rounded-[32px] bg-ink p-8 text-white md:p-10">
            <div>
              <h3 className="font-display text-3xl font-semibold">{items[active][0]}</h3>
              <p className="mt-2 max-w-2xl text-lg text-white/85">{items[active][1]}</p>
            </div>
            <button className={btnSaffron} type="button" onClick={open}>Discuss this with us</button>
          </div>
        ) : null}
        <p className="mt-6 rounded-[20px] bg-[#fff1e0] px-6 py-5 shadow-[inset_4px_0_0_#ff8a1f]">The Centre of Excellence is optional. Scope, resources, responsibilities and commercial arrangements are defined separately through institutional collaboration.</p>
      </section>

      <section className="px-3 pb-3">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-8 rounded-[32px] bg-ink px-8 py-14 text-white md:px-14">
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-tight">Explore a Centre of Excellence for your institution.</h2>
            <p className="mt-3 text-white/80">Scope and arrangements are defined together, through institutional collaboration.</p>
          </div>
          <button className={btnSaffron} type="button" onClick={open}>Start a Conversation</button>
        </div>
      </section>
    </main>
  );
}
