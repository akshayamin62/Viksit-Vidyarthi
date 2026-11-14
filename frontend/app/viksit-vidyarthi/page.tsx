"use client";

import { useEffect, useState } from "react";
import { useEnquiry } from "@/components/enquiry";
import { Check } from "@/components/icons";
import { SectionHead } from "@/components/section-head";
import { btnSaffron } from "@/lib/ui";

const hero =
  "relative isolate overflow-hidden rounded-[32px] text-white [background:radial-gradient(60%_80%_at_8%_0%,rgba(255,138,31,.42),transparent_60%),radial-gradient(55%_70%_at_100%_100%,rgba(15,157,88,.42),transparent_60%),radial-gradient(40%_50%_at_70%_10%,rgba(39,66,224,.35),transparent_70%),#0a1030]";

const pillars = {
  student: {
    objective: "Develop self-aware, responsible, capable and career-conscious students.",
    delivery: "Student seminars, interactive workshops, development activities and guided counselling sessions.",
    items: [
      ["“I Before AI”", "Understanding human intelligence, personal potential and responsible use of artificial intelligence."],
      ["Digital Discipline", "Managing screen time, digital distractions and technology dependence."],
      ["Learning Beyond Examinations", "Encouraging curiosity, critical thinking, independent learning and knowledge application."],
      ["Deal with Adversity", "Empowering students to face challenges with resilience and confidence."],
    ],
  },
  teacher: {
    objective: "Enable teachers to become effective facilitators of academic, behavioural and personal development.",
    delivery: "Faculty development workshops, interactive training sessions and practical classroom strategies.",
    items: [
      ["Teaching Tomorrow", "Understanding Gen Z and Gen Alpha: equips educators to engage and inspire these learners."],
      ["Partners in Progress", "Building strong parent–teacher connections to support every student’s growth."],
      ["Discipline with Dignity", "Building respectful, well-managed classrooms through trust and positive guidance."],
      ["Managing Diversity", "Embracing differences and creating inclusive classrooms where every learner belongs."],
    ],
  },
  parent: {
    objective: "Strengthen parents’ capabilities as developmental partners in their children’s education and career journey.",
    delivery: "Parenting workshops, awareness programmes, interactive discussions and guided developmental resources.",
    items: [
      ["Scientific and mindful parenting", "Evidence-informed routines, expectations and reflective parenting at home."],
      ["Addressing digital dependency", "Shared screen habits, device boundaries and meaningful offline time as a family."],
      ["Effective parent–child communication", "Listening, open questions and conversations children can trust."],
      ["Academic pressure and peer influence", "Realistic expectations and support without comparison with others."],
    ],
  },
} as const;

const challenges = [
  ["Student & parent", "Gap between achievement and readiness", "Students may do well in exams yet struggle with critical thinking, problem-solving, communication and applying knowledge.", "from exam-oriented education to learning-oriented development."],
  ["Student & parent", "Lack of early career planning", "Many students choose streams, subjects and careers without awareness of their abilities, interests or opportunities.", "informed, structured exploration from the middle-school years."],
  ["Student & parent", "Digital distraction", "Excess recreational screen time and fragmented attention can undermine disciplined learning.", "digital responsibility and self-regulation, not just restriction."],
  ["Educator", "Changing classroom dynamics", "Teachers face diverse learning preferences, behavioural challenges and evolving student–teacher relationships.", "engaging contemporary learners while keeping discipline and mutual respect."],
  ["Student & parent", "Parenting in a changing world", "Parents are unsure about academic choices, emerging careers, peer influence and technology.", "from pressure-driven supervision to informed developmental guidance."],
  ["Educator", "Employability and future skills", "Qualifications alone do not guarantee competence. Industries need technological literacy, communication, creativity, collaboration and continuous learning.", "career readiness well before the job market."],
];

const studentRows = [
  ["Self-discovery and developmental assessments", "Better understanding of abilities, interests and development needs", "Increased self-awareness and more informed decisions"],
  ["Education and career awareness", "Early exposure to academic pathways and career opportunities", "Greater clarity and direction"],
  ["Life-skills development", "Builds communication, resilience and problem-solving abilities", "Better personal and social readiness"],
  ["Digital discipline programmes", "Encourages responsible technology habits", "Improved attention management and learning habits"],
  ["Structured Education Activity Portfolio", "Connects activities with developmental objectives", "Stronger individual profiles and documented progress"],
  ["Career-readiness programmes", "Introduces future skills and industry expectations", "Improved preparation for higher education and employment"],
  ["Guided mentoring and reviews", "Provides structured feedback and support", "Greater accountability and confidence"],
];

const institutionRows = [
  ["Integrated student-development ecosystem", "Extends institutional support beyond academics", "Stronger holistic education proposition"],
  ["Student awareness programmes", "Addresses important developmental concerns", "Better-informed and more engaged students"],
  ["Teacher empowerment workshops", "Enhances educators’ ability to address changing learning needs", "Improved teaching practices and classroom engagement"],
  ["Parent development programmes", "Encourages alignment between home and institution", "Stronger parent–institution collaboration"],
  ["Centre of Excellence", "Creates a dedicated platform for structured student development", "Institutional differentiation and expanded student support"],
  ["Assessment and progress tracking", "Supports evidence-informed developmental interventions", "Better visibility into student needs and progress"],
  ["Career and higher-education readiness", "Connects academic education with future opportunities", "Stronger guidance capabilities and institutional value proposition"],
];

const stages = [
  ["Awareness", "Conduct student seminars, teacher workshops and parent orientation programmes to create awareness and identify developmental priorities."],
  ["Institutional needs assessment", "Understand the institution’s student profile, existing support systems, developmental concerns and where additional interventions would help."],
  ["Development programme design", "Create a customised institutional activity calendar based on age groups, educational levels and identified needs."],
  ["Structured intervention", "Deliver targeted developmental activities, teacher training, parenting programmes and individual student support where appropriate."],
  ["Centre of Excellence", "Where mutually agreed, establish a dedicated framework for long-term education planning, career guidance, profile development and student-readiness services."],
  ["Review and continuous improvement", "Periodically assess participation, programme effectiveness, developmental progress and stakeholder feedback."],
];

const advantages = [
  "Strengthen their commitment to holistic education.",
  "Offer differentiated developmental opportunities to students.",
  "Build teacher capability through focused professional development.",
  "Improve parent engagement and institutional relationships.",
  "Introduce structured education and career guidance.",
  "Establish long-term support through a Centre of Excellence.",
  "Show alignment with India’s aspirations for Viksit Bharat @2047.",
];

export default function ViksitPage() {
  const { open } = useEnquiry();
  const [pillar, setPillar] = useState<keyof typeof pillars>("student");
  const [filter, setFilter] = useState("all");
  const [audience, setAudience] = useState<"students" | "institution">("students");
  const [stage, setStage] = useState(0);
  const current = pillars[pillar];
  const rows = audience === "students" ? studentRows : institutionRows;

  useEffect(() => {
    const map: Record<string, keyof typeof pillars> = {
      "pillars-student": "student",
      "pillars-teacher": "teacher",
      "pillars-parent": "parent",
    };
    function applyHash() {
      const hash = window.location.hash.replace("#", "");
      if (!map[hash]) return;
      setPillar(map[hash]);
      document.getElementById("pillars")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <main>
      <section className={`${hero} mx-3 mt-3 px-4 py-12 sm:px-6 sm:py-16`}>
        <div className="mx-auto w-full max-w-[1200px]">
          <h1 className="max-w-4xl font-display text-[clamp(2.3rem,5vw,4rem)] leading-tight font-semibold tracking-tight">Viksit Vidyarthi for Viksit Bharat</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/80">A comprehensive educational development initiative that prepares students, empowers teachers, engages parents and strengthens institutions to contribute to the national vision of Viksit Bharat 2047.</p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1200px] gap-12 px-6 py-24 lg:grid-cols-2">
        <p className="flex items-center justify-center rounded-[32px] bg-ink p-10 text-center font-display text-[clamp(1.7rem,3vw,2.5rem)] leading-tight font-bold text-white [background:radial-gradient(60%_80%_at_0%_0%,rgba(255,138,31,.4),transparent_60%),#0a1030]">“A developed nation begins with a developed student.”</p>
        <div className="grid content-center gap-5 text-lg text-mute">
          <p>India’s aspiration to become a developed nation by 2047 requires more than academic excellence. It needs young people who are intellectually capable, emotionally resilient, socially responsible, technologically adaptable and professionally competent.</p>
          <p>Conventional approaches often weigh examination performance more heavily than the overall potential of students. This initiative bridges that gap by building a structured Student Development and Career Readiness Ecosystem inside schools and colleges.</p>
        </div>
      </section>

      <section id="pillars" className="mx-auto w-full max-w-[1200px] scroll-mt-28 px-6 pb-24">
        <SectionHead
          title={
            <>
              Three pillars,
              <span className="block">progress interconnected</span>
            </>
          }
          text="A flexible, institution-integrated programme. The goal is not another extracurricular activity, but a measurable, sustainable support system inside the educational environment."
        />
        <div className="flex max-w-full flex-wrap gap-1 rounded-full bg-ink/10 p-1" role="tablist">
          {([
            ["student", "Student development", "bg-saffron text-[#1f1000]", "bg-[#fff1e0] text-[#9a4e00]"],
            ["teacher", "Teacher empowerment", "bg-white text-ink shadow", "bg-white/70 text-ink/70"],
            ["parent", "Parent engagement", "bg-green text-white", "bg-[#e2f5ea] text-[#0a6e3d]"],
          ] as const).map(([key, label, active, idle]) => (
            <button key={key} className={`rounded-full px-5 py-3 font-semibold ${pillar === key ? active : idle}`} type="button" aria-selected={pillar === key} onClick={() => setPillar(key)}>
              {label}
            </button>
          ))}
        </div>
        <p className="mt-6 max-w-3xl font-display text-2xl font-semibold text-ink"><span className="text-mute">Objective: </span>{current.objective}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {current.items.map(([title, text]) => (
            <article key={title} className="rounded-[20px] bg-white p-7 shadow-[inset_0_0_0_1px_rgba(10,16,48,.1)]">
              <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
              <p className="mt-2 text-mute">{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 rounded-[20px] bg-[#fff1e0] px-6 py-5 shadow-[inset_4px_0_0_#ff8a1f]"><strong>Delivery:</strong> {current.delivery}</p>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-6 pb-24">
        <SectionHead
          title={
            <>
              Why this
              <span className="block">initiative matters</span>
            </>
          }
          text="India needs young people who can turn education into competence, character, contribution and meaningful careers. These challenges stand in the way."
        />
        <div className="flex flex-wrap gap-2">
          {["all", "Student & parent", "Educator"].map((value) => (
            <button key={value} className={`rounded-full px-5 py-2.5 font-semibold ${filter === value ? "bg-ink text-white" : "bg-white text-mute shadow-[inset_0_0_0_1px_rgba(10,16,48,.1)]"}`} type="button" onClick={() => setFilter(value)}>
              {value === "all" ? "All" : value}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {challenges.filter((item) => filter === "all" || item[0] === filter).map(([tag, title, body, shift]) => (
            <article key={title} className="rounded-[20px] bg-white p-7 shadow-[inset_0_0_0_1px_rgba(10,16,48,.1)]">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tag === "Educator" ? "bg-[#e2f5ea] text-[#0a6e3d]" : "bg-[#fff1e0] text-[#d96a00]"}`}>{tag}</span>
              <h3 className="mt-4 font-display text-xl font-bold text-ink">{title}</h3>
              <p className="mt-2 text-mute">{body}</p>
              <p className="mt-4 border-t border-dashed border-ink/10 pt-4 text-ink"><b className={tag === "Educator" ? "text-[#0a6e3d]" : "text-[#d96a00]"}>The shift: </b>{shift}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 rounded-[20px] bg-[#fff1e0] px-6 py-5 shadow-[inset_4px_0_0_#ff8a1f]"><strong>Why institutions must take the lead.</strong> Schools and colleges reach students in their most formative years. Addressing these challenges systematically lets them become centres of holistic development, complementing the aims of India’s National Education Policy 2020: holistic development, experiential learning, critical thinking and multidisciplinary education.</p>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-6 pb-24">
        <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold tracking-tight text-ink">
          Features, advantages
          <span className="block">and benefits</span>
        </h2>
        <div className="mt-6 inline-flex max-w-full flex-wrap gap-1 rounded-full bg-ink/10 p-1">
          <button className={`rounded-full px-5 py-3 font-semibold ${audience === "students" ? "bg-white shadow" : "text-mute"}`} type="button" onClick={() => setAudience("students")}>For students</button>
          <button className={`rounded-full px-5 py-3 font-semibold ${audience === "institution" ? "bg-white shadow" : "text-mute"}`} type="button" onClick={() => setAudience("institution")}>For your institution</button>
        </div>
        <div className="mt-5 hidden grid-cols-3 gap-2 md:grid">
          {["Features", "Advantages", "Benefits"].map((label, index) => (
            <span key={label} className={`rounded-xl px-5 py-3 text-sm font-semibold ${index === 0 ? "bg-saffron text-[#1f1000]" : index === 2 ? "bg-green text-white" : "bg-ink text-white"}`}>{label}</span>
          ))}
        </div>
        <div className="mt-2 grid gap-2">
          {rows.map((row) => (
            <div key={row[0]} className="grid gap-2 md:grid-cols-3">
              {row.map((cell, index) => (
                <span key={cell} className={`rounded-xl px-5 py-4 ${index === 0 ? "bg-[#fff1e0] font-display font-bold text-[#1f1000]" : index === 2 ? "bg-[#e2f5ea] text-[#0a6e3d]" : "bg-white text-mute shadow-[inset_0_0_0_1px_rgba(10,16,48,.1)]"}`}>
                  <span className="mb-1 block text-xs font-semibold tracking-wide uppercase md:hidden">{["Feature", "Advantage", "Benefit"][index]}</span>
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto w-full max-w-[1200px] scroll-mt-28 px-6 pb-24">
        <SectionHead
          title={
            <>
              How it works
              <span className="block">in your institution</span>
            </>
          }
          text="A progressive engagement model in six stages. Choose a stage to read it."
        />
        <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-2.5">
            {stages.map(([title], index) => (
              <button key={title} className={`flex items-center gap-4 rounded-[20px] px-4 py-4 text-left font-semibold ${stage === index ? "bg-ink text-white" : "bg-white shadow-[inset_0_0_0_1px_rgba(10,16,48,.1)]"}`} type="button" onClick={() => setStage(index)}>
                <span className={`grid size-10 shrink-0 place-items-center rounded-xl font-display ${stage === index ? "bg-saffron text-[#1f1000]" : "bg-paper"}`}>{index + 1}</span>
                <span className="min-w-0">{title}</span>
              </button>
            ))}
          </div>
          <div className="flex min-h-[320px] flex-col rounded-[32px] bg-ink p-8 text-white md:p-10">
            <p className="text-white/70">Stage {stage + 1} of 6</p>
            <h3 className="mt-2 font-display text-4xl font-semibold tracking-tight">{stages[stage][0]}</h3>
            <p className="mt-4 max-w-xl text-lg text-white/85">{stages[stage][1]}</p>
            <div className="mt-auto pt-8">
              {stage < 5 ? (
                <button className="inline-flex min-h-[50px] items-center rounded-full bg-white px-6 font-semibold text-ink" type="button" onClick={() => setStage(stage + 1)}>Next stage</button>
              ) : (
                <button className={btnSaffron} type="button" onClick={open}>Discuss your institution</button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-6 pb-24">
        <SectionHead
          title={
            <>
              The advantages
              <span className="block">in a nutshell</span>
            </>
          }
          text="Institutions move from providing education to becoming active partners in building students’ futures."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {advantages.map((item) => (
            <article key={item} className="flex min-h-[140px] flex-col gap-4 rounded-[20px] bg-white p-6 shadow-[inset_0_0_0_1px_rgba(10,16,48,.1)]">
              <span className="grid size-10 place-items-center rounded-full bg-[#e2f5ea] text-[#0a6e3d]"><Check /></span>
              <p className="font-display text-lg font-semibold text-ink">{item}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 rounded-[20px] bg-[#fff1e0] px-6 py-5 shadow-[inset_4px_0_0_#ff8a1f]">The initiative complements your existing academic framework. It does not replace your curriculum or teaching systems.</p>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-6 pb-24">
        <SectionHead
          title={
            <>
              Our vision. Your partnership.
              <span className="block">Students’ futures.</span>
            </>
          }
          text="Meaningful educational development begins with understanding the student as an individual. Our philosophy is built around five progressive outcomes."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {["Discover potential", "Develop capabilities", "Build character", "Prepare for the future", "Contribute to the nation"].map((item, index) => (
            <div key={item} className="rounded-[20px] bg-white p-5 shadow-[inset_0_0_0_1px_rgba(10,16,48,.1)]">
              <span className={`mb-8 grid size-11 place-items-center rounded-full font-display font-bold text-white ${index === 0 ? "bg-saffron text-[#1f1000]" : index === 4 ? "bg-green" : "bg-ink"}`}>{index + 1}</span>
              <strong className="font-display text-lg text-ink">{item}</strong>
            </div>
          ))}
        </div>
        <p className="mt-8 rounded-[32px] bg-ink p-10 font-display text-[clamp(1.3rem,2.4vw,1.9rem)] leading-snug font-bold text-white">“Viksit Bharat” cannot be built through infrastructure and economic growth alone. It must also be built through capable, conscious and future-ready citizens.</p>
      </section>

      <section className="px-3 pb-3">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-8 rounded-[28px] bg-ink px-5 py-10 text-white sm:rounded-[32px] sm:px-8 sm:py-14 md:px-14">
          <div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.25rem)] font-semibold tracking-tight">Bring this to your institution.</h2>
            <p className="mt-3 text-white/80">Tell us about your school or college and we will get in touch.</p>
          </div>
          <button className={btnSaffron} type="button" onClick={open}>Start a Conversation</button>
        </div>
      </section>
    </main>
  );
}
