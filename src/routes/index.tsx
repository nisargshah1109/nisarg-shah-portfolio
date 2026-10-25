import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowRight,
  ArrowUp,
  Brain,
  Check,
  Code2,
  Copy,
  Database,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Layout,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { contact, profile, projects, skillGroups, type Project } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nisarg Shah | Computer Science & AI/ML Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Nisarg Shah, Computer Science Engineering student at KPGU Vadodara specializing in AI/ML, RAG, Python, and full-stack software development.",
      },
      { property: "og:title", content: "Nisarg Shah | Computer Science & AI/ML Portfolio" },
      {
        property: "og:description",
        content:
          "Computer Science Engineering student at KPGU Vadodara building AI/ML, document question-answering systems, and responsive web applications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "approach", label: "Approach" },
  { id: "contact", label: "Contact" },
];

function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const ring =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function Index() {
  useReveal();

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-primary/10 selection:text-primary">
      {/* Subtle light-mode background decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[800px] bg-grid opacity-75" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-[520px] w-[min(900px,100vw)] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/10 via-accent/5 to-transparent blur-[120px]"
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main" className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Approach />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setActive(e.target.id);
            }
          });
        },
        { rootMargin: "-35% 0px -55% 0px" },
      );

      NAV.forEach((n) => {
        const el = document.getElementById(n.id);
        if (el) io?.observe(el);
      });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled || open
          ? "border-b border-border bg-card/85 backdrop-blur-md shadow-subtle"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Primary navigation" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className={`flex items-center gap-2.5 rounded-lg ${ring}`} aria-label="Nisarg Shah, back to top">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card font-mono text-sm font-bold text-gradient shadow-subtle">
            NS
          </span>
          <span className="font-semibold text-foreground tracking-tight sm:inline">
            {profile.shortName}
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? "true" : undefined}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${ring} ${
                    active === n.id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-4 w-px bg-border" aria-hidden="true" />

          {/* External Social Profiles in Header */}
          <div className="flex items-center gap-2">
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className={`grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors ${ring}`}
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors ${ring}`}
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className={`grid h-10 w-10 place-items-center rounded-lg border border-border bg-card text-foreground md:hidden ${ring}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div id="mobile-menu" className="border-t border-border bg-card/95 px-5 py-4 backdrop-blur-md md:hidden">
          <ul className="space-y-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === n.id ? "true" : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${ring} ${
                    active === n.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground ${ring}`}
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground ${ring}`}
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function Btn({
  href,
  children,
  variant = "primary",
  target,
  rel,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  target?: string;
  rel?: string;
  ariaLabel?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-150 " + ring;

  if (variant === "primary") {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={`${base} bg-gradient-brand text-primary-foreground shadow-subtle hover:brightness-105 hover:shadow-card active:scale-[0.98]`}
      >
        {children}
      </a>
    );
  }

  if (variant === "secondary") {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={`${base} border border-border bg-card text-foreground shadow-subtle hover:bg-secondary hover:border-slate-300 active:scale-[0.98]`}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={`${base} text-muted-foreground hover:bg-secondary hover:text-foreground`}
    >
      {children}
    </a>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-12 sm:px-8 md:pt-20 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="reveal min-w-0">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-subtle">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span>{profile.status}</span>
        </div>

        <h1 className="mt-5 text-4xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Building practical AI experiences{" "}
          <span className="text-gradient">from data to interface.</span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          I'm <span className="font-semibold text-foreground">Nisarg Shah</span>, a Computer Science Engineering student at KPGU
          Vadodara. I specialize in Artificial Intelligence, Machine Learning, Retrieval-Augmented Generation (RAG), and modern
          full-stack software development.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Btn href="#projects">
            Explore Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Btn>
          <Btn href="#contact" variant="secondary">
            Get in Touch
          </Btn>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary" /> {profile.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4 text-primary" /> KPGU Vadodara
          </span>
        </div>
      </div>

      <HeroVisual />
    </section>
  );
}

function HeroVisual() {
  const chips = [
    { label: "Python", pos: "left-2 top-2" },
    { label: "RAG", pos: "right-2 top-2" },
    { label: "FastAPI", pos: "left-2 bottom-2" },
    { label: "React", pos: "right-2 bottom-2" },
    { label: "FAISS", pos: "hidden sm:inline left-[42%] bottom-0" },
  ];

  return (
    <div className="reveal relative mx-auto w-full max-w-md px-2 py-8" aria-hidden="true">
      {/* Soft background glow */}
      <div className="absolute inset-4 rounded-3xl bg-primary/10 blur-2xl" />

      {/* Main card */}
      <div className="relative rounded-2xl border border-border bg-card p-5 shadow-card">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-border pb-3.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">retrieve.py</span>
          <div className="w-10" />
        </div>

        {/* Code Snippet in Light Mode */}
        <pre className="mt-4 overflow-x-auto rounded-lg bg-secondary/70 p-3.5 font-mono text-xs leading-relaxed text-foreground">
          <code>
            <span className="font-semibold text-primary">def</span>{" "}
            <span className="text-accent font-semibold">answer_query</span>(question: str):
            {"\n"}
            {"  "}chunks = index.<span className="text-primary">search</span>(embed(question))
            {"\n"}
            {"  "}context = rank(chunks, k=<span className="text-emerald-600 font-semibold">4</span>)
            {"\n"}
            {"  "}
            <span className="font-semibold text-primary">return</span> generate(question, context)
          </code>
        </pre>

        {/* Pipeline SVG Diagram */}
        <div className="mt-4 rounded-lg border border-border/80 bg-background/80 p-3">
          <svg viewBox="0 0 320 120" className="w-full">
            <defs>
              <linearGradient id="hg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
            </defs>
            {/* Connecting lines */}
            {[
              [45, 60, 115, 28],
              [45, 60, 115, 92],
              [115, 28, 195, 60],
              [115, 92, 195, 60],
              [195, 60, 275, 60],
              [115, 28, 115, 92],
            ].map(([x1, y1, x2, y2], i) => (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#hg)"
                strokeWidth="1.5"
                className="animate-dash"
                opacity="0.6"
              />
            ))}
            {/* Nodes */}
            {[
              [45, 60, "Query"],
              [115, 28, "Doc"],
              [115, 92, "Vector"],
              [195, 60, "Context"],
              [275, 60, "Answer"],
            ].map(([x, y, label]) => (
              <g key={String(label)}>
                <circle
                  cx={x as number}
                  cy={y as number}
                  r="18"
                  fill="var(--card)"
                  stroke="var(--border)"
                  strokeWidth="1.5"
                />
                <text
                  x={x as number}
                  y={(y as number) + 4}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="600"
                  fill="var(--foreground)"
                  fontFamily="var(--font-mono)"
                >
                  {label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Floating Technology Chips */}
      {chips.map(({ label, pos }, i) => (
        <span
          key={label}
          className={`animate-float absolute ${pos} rounded-full border border-border bg-card px-3 py-1 font-mono text-xs font-medium text-foreground shadow-card`}
          style={{ animationDelay: `${i * 0.9}s` }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="reveal mb-10 max-w-2xl">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {children && <p className="mt-3.5 text-base leading-relaxed text-muted-foreground">{children}</p>}
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`reveal rounded-2xl border border-border bg-card p-6 shadow-subtle transition-all duration-200 hover:border-primary/40 hover:shadow-card ${className}`}
    >
      {children}
    </div>
  );
}

function About() {
  const pillars = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Focused applications applying ML, generative AI, and vector embeddings to practical problem solving.",
    },
    {
      icon: Search,
      title: "Retrieval Systems (RAG)",
      description: "Grounding responses in verified documents and curated institutional knowledge bases using FAISS.",
    },
    {
      icon: Layout,
      title: "Modern Web Software",
      description: "Clean, accessible interfaces built with React and Tailwind that make AI systems simple to use on any device.",
    },
  ];

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <SectionHead eyebrow="01 — About" title="Engineering intelligent systems from foundation to frontend.">
        I approach software and AI with a practical mindset: start from real user needs, organize the underlying data,
        implement clean retrieval and model pipelines, and deliver intuitive, responsive user experiences.
      </SectionHead>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_2fr]">
        {/* Education Card */}
        <Card className="flex flex-col justify-between border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card">
          <div>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-foreground">B.Tech in Computer Science Engineering</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Drs. Kiran &amp; Pallavi Patel Global University (KPGU), Vadodara, Gujarat, India
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary">
                Currently pursuing
              </span>
              <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
                Vadodara, Gujarat
              </span>
            </div>
          </div>
          <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground leading-relaxed">
            Focused on core CS fundamentals, AI/ML, data structures, web technologies, and database architecture.
          </p>
        </Card>

        {/* Technical Focus Pillars */}
        <div className="grid gap-5 sm:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="flex flex-col">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <SectionHead eyebrow="02 — Skills" title="Technical toolkit & areas of study.">
        Organized by domain based on practical project implementation and university coursework, without arbitrary
        percentages.
      </SectionHead>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <Card key={g.title} className="flex flex-col">
            <h3 className="text-base font-semibold text-foreground">{g.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{g.note}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li
                  key={s}
                  className="rounded-lg border border-border bg-secondary px-2.5 py-1 font-mono text-xs font-medium text-secondary-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ProjectArt({ kind }: { kind: Project["art"] }) {
  return (
    <div aria-hidden className="relative h-44 overflow-hidden rounded-xl border border-border bg-secondary/50">
      <div className="absolute inset-0 bg-grid opacity-50" />
      {kind === "pdf" ? (
        <svg viewBox="0 0 300 160" className="relative h-full w-full">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${40 + i * 14} ${26 + i * 8})`}>
              <rect width="80" height="100" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              {[18, 30, 42, 54, 66].map((y) => (
                <rect
                  key={y}
                  x="12"
                  y={y}
                  width={y === 42 ? 56 : 40}
                  height="4"
                  rx="2"
                  fill={i === 2 && y === 42 ? "var(--primary)" : "#e2e8f0"}
                />
              ))}
            </g>
          ))}
          <path
            d="M160 95 C190 95 190 68 215 68"
            stroke="var(--primary)"
            strokeWidth="1.5"
            fill="none"
            className="animate-dash"
          />
          <rect x="215" y="48" width="70" height="40" rx="8" fill="#ffffff" stroke="var(--primary)" strokeWidth="1.5" />
          <text
            x="250"
            y="72"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--foreground)"
            fontFamily="var(--font-mono)"
          >
            answer
          </text>
        </svg>
      ) : (
        <svg viewBox="0 0 300 160" className="relative h-full w-full">
          {[[150, 80], [70, 40], [70, 120], [230, 40], [230, 120], [150, 20], [150, 140]].map(
            ([x, y], i) =>
              i > 0 && (
                <line
                  key={i}
                  x1="150"
                  y1="80"
                  x2={x}
                  y2={y}
                  stroke="var(--primary)"
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                  className="animate-dash"
                />
              ),
          )}
          {[
            [70, 40, "admit"],
            [70, 120, "fees"],
            [230, 40, "courses"],
            [230, 120, "campus"],
            [150, 20, "FAQ"],
            [150, 140, "events"],
          ].map(([x, y, t]) => (
            <g key={String(t)}>
              <rect
                x={(x as number) - 28}
                y={(y as number) - 11}
                width="56"
                height="22"
                rx="6"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="1"
              />
              <text
                x={x as number}
                y={(y as number) + 4}
                textAnchor="middle"
                fontSize="10"
                fontWeight="500"
                fill="#475569"
                fontFamily="var(--font-mono)"
              >
                {t}
              </text>
            </g>
          ))}
          <circle cx="150" cy="80" r="22" fill="#ffffff" stroke="var(--primary)" strokeWidth="2" />
          <text
            x="150"
            y="84"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            fill="var(--foreground)"
            fontFamily="var(--font-mono)"
          >
            KPGU
          </text>
        </svg>
      )}
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <SectionHead eyebrow="03 — Projects" title="Featured technical projects.">
        Document intelligence and knowledge retrieval systems built to solve real information accessibility challenges.
      </SectionHead>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.id}
            className="reveal group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-subtle transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-card sm:p-6"
          >
            <ProjectArt kind={p.art} />
            <p className="mt-5 font-mono text-xs font-semibold text-primary">{p.label}</p>
            <h3 className="mt-2 flex items-center gap-2 text-xl font-bold text-foreground">
              {p.art === "pdf" ? (
                <FileText className="h-5 w-5 text-primary shrink-0" />
              ) : (
                <Database className="h-5 w-5 text-primary shrink-0" />
              )}
              {p.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-lg border border-border bg-secondary px-2.5 py-1 font-mono text-xs font-medium text-secondary-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
              <ProjectDialog project={p} />
              {p.repoUrl && (
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary ${ring}`}
                >
                  <Github className="h-4 w-4" /> View Code
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectDialog({ project: p }: { project: Project }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={`inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-subtle transition-all hover:brightness-105 ${ring}`}
      >
        Project details <ArrowRight className="h-4 w-4" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[80] max-h-[85vh] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-card-hover data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:p-7">
          <p className="font-mono text-xs font-semibold text-primary">{p.label}</p>
          <Dialog.Title className="mt-2 pr-8 text-2xl font-bold text-foreground">{p.title}</Dialog.Title>
          <Dialog.Description className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.summary}</Dialog.Description>

          <div className="mt-6 space-y-5 border-t border-border pt-5">
            <div>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono">Problem</h4>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.problem}</p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono">Approach</h4>
              <ol className="mt-2 space-y-2 text-sm text-muted-foreground">
                {p.approach.map((a, i) => (
                  <li key={a} className="flex gap-3">
                    <span className="font-mono font-bold text-primary">{i + 1}.</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ol>
            </div>

            {p.features && (
              <div>
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono">Key Features</h4>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono">Technology Stack</h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-lg border border-border bg-secondary px-2.5 py-1 font-mono text-xs font-medium text-secondary-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <p className="rounded-lg border border-border bg-secondary/60 p-3.5 text-xs text-muted-foreground leading-relaxed">
              {p.note}
            </p>

            {p.repoUrl && (
              <div className="pt-2">
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-subtle hover:brightness-105 transition-all ${ring}`}
                >
                  <Github className="h-4 w-4" /> View Repository on GitHub
                  <ExternalLink className="h-3.5 w-3.5 ml-1 opacity-70" />
                </a>
              </div>
            )}
          </div>

          <Dialog.Close
            className={`absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground ${ring}`}
            aria-label="Close project details"
          >
            <X className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Approach() {
  const steps = [
    {
      icon: Search,
      title: "Understand the problem & data",
      description: "Clarify what information users need, examine source documents, and establish clean retrieval objectives.",
    },
    {
      icon: Code2,
      title: "Build focused, modular pipelines",
      description: "Extract, embed, index, retrieve, and synthesize — connecting robust backends with responsive user interfaces.",
    },
    {
      icon: ShieldCheck,
      title: "Validate outputs & refine UX",
      description: "Check responses against source text, state limitations honestly, and build smooth, accessible web experiences.",
    },
  ];

  return (
    <section id="approach" aria-labelledby="approach-heading" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="reveal mb-10 max-w-2xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">04 — Approach</p>
        <h2 id="approach-heading" className="mt-2.5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          How I build.
        </h2>
      </div>

      <ol className="grid gap-5 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, description }, i) => (
          <li key={title} className="reveal relative rounded-2xl border border-border bg-card p-6 shadow-subtle">
            <span className="font-mono text-4xl font-extrabold text-gradient">0{i + 1}</span>
            <Icon className="absolute right-6 top-6 h-5 w-5 text-primary" />
            <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="reveal relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-card sm:p-14">
        {/* Subtle decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[min(600px,90vw)] -translate-x-1/2 rounded-full bg-primary/10 blur-[90px]"
        />

        <div className="relative">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">05 — Contact</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Let's connect.</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            I'm open to software engineering internships, AI/ML research collaborations, and project discussions.
            Feel free to reach out via email, phone, or connect through LinkedIn and GitHub.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {/* Direct Email Link */}
            {contact.email && (
              <>
                <Btn href={`mailto:${contact.email}`}>
                  <Mail className="h-4 w-4" /> Email Me
                </Btn>
                <button
                  type="button"
                  onClick={copyEmail}
                  className={`inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-subtle hover:bg-secondary ${ring}`}
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
                  {copied ? "Copied" : "Copy email"}
                </button>
                <span className="sr-only" aria-live="polite">
                  {copied ? "Email copied to clipboard" : ""}
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className={`inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary ${ring}`}
                >
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="break-all">{contact.email}</span>
                </a>
              </>
            )}

            {/* Phone Link */}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className={`inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-subtle hover:bg-secondary ${ring}`}
              >
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+91 {contact.phone}</span>
              </a>
            )}

            {/* GitHub Profile */}
            {contact.github && (
              <Btn href={contact.github} variant="secondary" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </Btn>
            )}

            {/* LinkedIn Profile */}
            {contact.linkedin && (
              <Btn href={contact.linkedin} variant="secondary" target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </Btn>
            )}
          </div>

          <p className="mt-8 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" /> Based in {profile.location}
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:px-8">
        <p className="text-center sm:text-left">
          Designed &amp; built by <span className="font-semibold text-foreground">{profile.name}</span> • B.Tech CSE (KPGU Vadodara)
        </p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className={`text-muted-foreground hover:text-foreground ${ring}`}
                aria-label="GitHub profile"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`text-muted-foreground hover:text-foreground ${ring}`}
                aria-label="LinkedIn profile"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
          </div>
          <a
            href="#top"
            className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium hover:text-foreground ${ring}`}
          >
            Back to top <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
