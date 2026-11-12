"use client";

import Link from "next/link";
import { useEnquiry } from "@/components/enquiry";
import { Arrow, Ico } from "@/components/icons";
import { SectionHead } from "@/components/section-head";
import { btnGlass, btnInk, btnSaffron } from "@/lib/ui";

const hero =
  "relative isolate overflow-hidden rounded-[32px] text-white [background:radial-gradient(60%_80%_at_8%_0%,rgba(255,138,31,.42),transparent_60%),radial-gradient(55%_70%_at_100%_100%,rgba(15,157,88,.42),transparent_60%),radial-gradient(40%_50%_at_70%_10%,rgba(39,66,224,.35),transparent_70%),#0a1030]";

export default function HomePage() {
  const { open } = useEnquiry();
  return (
    <main>
      <section className={`${hero} mx-3 mt-3 flex min-h-[calc(100svh-6.75rem)] items-center px-6 py-6`}>
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="font-display text-[clamp(2.15rem,4.4vw,3.7rem)] leading-[1.02] font-semibold tracking-tight">
              Developing students.
              <span className="block">Building a developed India.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              A proposal to set up a structured ecosystem for student development, teacher empowerment and parent engagement, built for an employable career.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className={btnSaffron} href="/viksit-vidyarthi">
                Explore the programme <Arrow />
              </Link>
              <Link className={btnGlass} href="/center-of-excellence">
                Center of Excellence
              </Link>
            </div>
          </div>
          <div className="relative grid h-[min(36vh,320px)] min-h-[180px] place-items-center overflow-hidden rounded-[32px] bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,.25)]">
            <div className="px-7 text-center">
              <span className="mx-auto grid size-[84px] place-items-center rounded-full bg-saffron text-[#1f1000] shadow-[0_0_0_12px_rgba(255,138,31,.2)]">
                <Ico className="ml-1 size-8">
                  <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />
                </Ico>
              </span>
              <p className="mx-auto mt-4 max-w-xs text-white/75">Your film will play here. Add it to public and set the player source.</p>
            </div>
            <span className="absolute inset-x-0 bottom-0 h-[5px] bg-[linear-gradient(90deg,#ff8a1f_33%,#fff_33%_66%,#0f9d58_66%)]" />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-6 py-24">
        <SectionHead
          title={
            <>
              One ecosystem.
              <span className="block">Three pillars that grow together.</span>
            </>
          }
          text="Built to sit alongside your curriculum, not replace it. Progress in one pillar strengthens the other two."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          <Tile href="/viksit-vidyarthi#pillars-student" className="bg-saffron text-[#1f1000]" title="Student development" text="Self-aware, responsible and career-conscious students, from digital discipline to resilience." />
          <Tile href="/viksit-vidyarthi#pillars-teacher" className="bg-white text-ink shadow-[inset_0_0_0_1px_rgba(10,16,48,.1)]" title="Teacher empowerment" text="Educators equipped to guide Gen Z and Gen Alpha with dignity, diversity and trust." />
          <Tile href="/viksit-vidyarthi#pillars-parent" className="bg-green text-white" title="Parent engagement" text="Parents as developmental partners in a child’s education and career journey." />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-6 pb-24">
        <SectionHead
          title={
            <>
              From a first seminar
              <span className="block">to a Centre of Excellence.</span>
            </>
          }
          text="A progressive engagement model in six stages, shaped around your institution’s needs."
        />
        <ol className="mb-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {["Awareness", "Institutional needs assessment", "Development programme design", "Structured intervention", "Centre of Excellence", "Review and continuous improvement"].map((item, index) => (
            <li key={item} className={`rounded-[20px] p-5 pt-16 text-[0.98rem] shadow-[inset_0_0_0_1px_rgba(10,16,48,.1)] ${index === 4 ? "bg-ink text-white" : "bg-white"}`}>
              <span className={`mb-4 grid size-9 place-items-center rounded-full font-display font-bold ${index === 4 ? "bg-saffron text-[#1f1000]" : "bg-paper text-ink"}`}>{index + 1}</span>
              <b>{item}</b>
            </li>
          ))}
        </ol>
        <Link className={btnInk} href="/viksit-vidyarthi#how-it-works">
          See how it works <Arrow />
        </Link>
      </section>

      <section className="px-3 pb-3">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-8 rounded-[32px] bg-ink px-8 py-14 text-white [background:radial-gradient(50%_120%_at_0%_0%,rgba(255,138,31,.5),transparent_60%),radial-gradient(50%_120%_at_100%_100%,rgba(15,157,88,.5),transparent_60%),#0a1030] md:px-14">
          <div>
            <h2 className="max-w-xl font-display text-[clamp(1.7rem,3.2vw,2.6rem)] leading-tight font-semibold tracking-tight">Ready to build a student-development ecosystem in your institution?</h2>
            <p className="mt-3 max-w-xl text-white/80">Start with student programmes, teacher workshops, parent programmes or a Centre of Excellence. Tell us about your institution and we will get in touch.</p>
          </div>
          <button className={btnSaffron} type="button" onClick={open}>Start a Conversation</button>
        </div>
      </section>
    </main>
  );
}

function Tile({ href, className, title, text }: { href: string; className: string; title: string; text: string }) {
  return (
    <Link href={href} className={`flex min-h-[280px] flex-col rounded-[32px] p-8 transition hover:-translate-y-1.5 ${className}`}>
      <h3 className="mt-auto mb-2 font-display text-3xl font-bold tracking-tight">{title}</h3>
      <p className="mb-6 opacity-85">{text}</p>
      <span className="inline-flex items-center gap-2 font-semibold">Explore <Arrow /></span>
    </Link>
  );
}
