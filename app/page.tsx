"use client";

import React, { useState, useRef } from "react";
import {
  Terminal,
  Mail,
  ExternalLink,
  GitBranch,
  Share2,
  Sparkles,
  ArrowUpRight,
  Cpu,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";

const LINKS = {
  email: "mailto:mkaran030506@gmail.com",
  github: "https://github.com/karanhub356",
  linkedin: "https://linkedin.com/in/karan-m356",
};

const GLASS =
  "backdrop-blur-2xl bg-white/[0.03] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)]";

const PROJECTS = [
  {
    kind: "NLP / DASHBOARD",
    badge: "SBERT",
    color: "#00F0FF",
    metric: "Semantic + Weighted Scoring",
    title: "AI-Powered Resume Screener",
    desc: "Ranks resumes against a job description using Sentence-BERT similarity and a weighted score across semantic match, skills, experience and education. Streamlit dashboard with radar charts and a skill-gap heatmap.",
    stack: ["Python", "SBERT", "NLP", "Streamlit"],
    url: "https://github.com/karanhub356/ai-resume-screener",
  },
  {
    kind: "ML RESEARCH",
    badge: "ICCET 2026",
    color: "#A855F7",
    metric: "6 Models · 2,200 Samples · DiCE XAI",
    title: "Crop Recommendation with Explainable AI",
    desc: "Compares six ML models with GridSearchCV and cross-validation (Random Forest performs best) on 2,200 samples and 7 soil and climate features. Returns Top-3 crops and uses DiCE counterfactuals to show what would change the ranking.",
    stack: ["Python", "scikit-learn", "DiCE", "XAI"],
    url: "https://github.com/karanhub356/ensemble_AI-crop",
  },
  {
    kind: "OOP + SQL",
    badge: "SQLITE",
    color: "#38BDF8",
    metric: "Strategy Pattern · Normalized CTEs",
    title: "Fleet Service Management System",
    desc: "Models vehicle service lifecycles with abstract base classes, inheritance and a Strategy pattern for service-tier pricing. Normalized SQLite schema with CTE queries for overdue vehicles and technician workload.",
    stack: ["Python", "SQLite", "Design Patterns"],
    url: "https://github.com/karanhub356/fleet-service-management",
  },
  {
    kind: "FRONTEND",
    badge: "REACT",
    color: "#EC4899",
    metric: "Context API · Protected Routes",
    title: "React Authentication System",
    desc: "Client-side auth with Context API for global state, protected routes and local JSON-backed sessions. No Redux, no external backend.",
    stack: ["React", "Context API", "JavaScript"],
    url: "https://github.com/karanhub356/react-auth-system",
  },
  {
    kind: "WEB APP",
    badge: "REACT",
    color: "#00F0FF",
    metric: "Conflict Detection · State Engine",
    title: "Hall Booking System",
    desc: "Web app for scheduling and managing hall bookings, with booking-conflict handling and structured request state.",
    stack: ["React", "JavaScript"],
    url: "https://github.com/karanhub356/hallbookinSystem_app",
  },
];

const SKILLS: [string, string[]][] = [
  ["Languages", ["Python", "Java", "SQL", "JavaScript"]],
  ["ML & Explainability", ["scikit-learn", "pandas", "NumPy", "SHAP", "LIME", "DiCE", "SBERT"]],
  ["Web & Data", ["React", "Streamlit", "SQLite", "Power BI (learning)"]],
  ["Fundamentals", ["DSA", "OOP", "Design Patterns", "DBMS", "Git"]],
];

const CERTS = [
  "Google Cloud Gen AI Leader",
  "Anthropic: Introduction to Model Context Protocol",
  "Google AI Essentials",
  "Google Prompting Essentials",
  "Accenture Project Management Simulation",
];

const TIMELINE = [
  {
    when: "2026",
    color: "#00F0FF",
    title: "B.Tech Graduate & ICCET 2026 Paper",
    body: "Graduated in AI & Data Science. Paper on a crop recommendation framework at ICCET 2026. Completed Google Cloud Gen AI Leader and Anthropic MCP credentials.",
  },
  {
    when: "Jun – Jul 2024",
    color: "#A855F7",
    title: "Data Science & Analytics Intern, Coimbatore Institute of Technology",
    body: "Applied preprocessing, exploratory data analysis and predictive modelling on structured datasets using Python and pandas.",
  },
  {
    when: "2022 – 2026",
    color: "#EC4899",
    title: "B.Tech, Artificial Intelligence & Data Science",
    body: "Sri Krishna College of Engineering and Technology (SKCET), Coimbatore.",
  },
];

const CONTACTS = [
  { href: LINKS.email, Icon: Mail, label: "Email", sub: "mkaran030506@gmail.com" },
  { href: LINKS.github, Icon: GitBranch, label: "GitHub", sub: "@karanhub356" },
  { href: LINKS.linkedin, Icon: Share2, label: "LinkedIn", sub: "in/karan-m356" },
];

const TERMINAL_TABS = [
  {
    cmd: "whoami",
    output: [
      { label: "ENGINEER", val: "Karan M · B.Tech AI & Data Science (SKCET '26)" },
      { label: "LOCATION", val: "Coimbatore, Tamil Nadu, India" },
      { label: "FOCUS", val: "Explainable ML (XAI), NLP Pipelines & Clean Backend Systems" },
      { label: "STATUS", val: "Ready for SDE, Data Analyst & ML/AI roles" },
    ],
  },
  {
    cmd: "explain --crop-xai",
    output: [
      { label: "PUBLICATION", val: "ICCET 2026 Accepted Research Paper" },
      { label: "BENCHMARK", val: "6 ML models tuned via GridSearchCV (2,200 samples)" },
      { label: "WINNER", val: "Random Forest + DiCE Counterfactual Explanations" },
      { label: "IMPACT", val: "Shows exact soil/climate deltas needed to flip top crop" },
    ],
  },
  {
    cmd: "cat credentials.json",
    output: [
      { label: "CLOUD AI", val: "Google Cloud Gen AI Leader" },
      { label: "AGENTIC", val: "Anthropic: Model Context Protocol (MCP)" },
      { label: "FOUNDATION", val: "Google AI & Prompting Essentials" },
      { label: "DELIVERY", val: "Accenture Project Management Simulation" },
    ],
  },
];

/**
 * Liquid Glass Card with real-time cursor-tracking specular spotlight
 */
function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(0, 240, 255, 0.14)",
  href,
  target,
  rel,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  href?: string;
  target?: string;
  rel?: string;
  delay?: number;
}) {
  const cardRef = useRef<HTMLDivElement | HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const sharedProps = {
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setOpacity(1),
    onMouseLeave: () => setOpacity(0),
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    whileHover: { y: -6 },
    transition: { type: "spring" as const, stiffness: 260, damping: 24, delay },
    className: `relative overflow-hidden ${GLASS} ${className}`,
  };

  const inner = (
    <>
      {/* Specular Liquid Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(480px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 45%)`,
        }}
      />
      {/* Top Rim Highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={cardRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        {...sharedProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.div ref={cardRef as React.RefObject<HTMLDivElement>} {...sharedProps}>
      {inner}
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, restDelta: 0.001 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050711] text-[#D4D4D8] font-sans selection:bg-[#00F0FF] selection:text-black relative overflow-hidden">
      {/* Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC4899] origin-left z-[60]"
      />

      {/* Animated Liquid Ambient Light Orbs */}
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-12%] left-[-8%] w-[520px] h-[520px] bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -50, 30, 0], y: [0, 40, -25, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[28%] right-[-10%] w-[620px] h-[620px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, 35, -35, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-[-15%] left-[25%] w-[480px] h-[480px] bg-pink-500/10 rounded-full blur-[150px] pointer-events-none"
      />

      {/* Subtle Engineering Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none z-0" />

      {/* Floating Liquid Glass Header */}
      <header className="sticky top-4 z-50 max-w-6xl mx-auto px-4">
        <div className={`${GLASS} rounded-2xl px-6 h-16 flex items-center justify-between font-mono text-xs relative overflow-hidden`}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <a href="#hero" className="flex items-center gap-2.5 font-bold text-white tracking-wider hover:text-[#00F0FF] transition-colors">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F0FF]" />
            </span>
            <span>KARAN M</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-[#94A3B8]">
            {[
              ["about", "About"],
              ["projects", "Projects"],
              ["experience", "Experience"],
              ["contact", "Contact"],
            ].map(([id, label], idx) => (
              <a key={id} href={`#${id}`} className="hover:text-[#00F0FF] transition-colors flex items-center gap-1.5">
                <span className="text-[#00F0FF]/70">0{idx + 1}.</span>
                <span>{label}</span>
              </a>
            ))}
          </nav>
          <div className="md:hidden">
            <button
              className="hamburger cursor-pointer transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="hamburger-icon w-6 h-6 border-t border-b border-gray-600 block" />
              <span className="hamburger-icon w-6 h-6 border-t border-b border-gray-600 block absolute top-[-6px] left-0" />
              <span className="hamburger-icon w-6 h-6 border-t border-b border-gray-600 block absolute top-0 left-0" />
            </button>
          </div>
          {mobileMenuOpen && (
            <nav className="fixed inset-0 bg-[#050711] z-40 flex items-center justify-center pt-24">
              <div className={`${GLASS} rounded-3xl p-8 max-w-md w-full mx-auto text-center`}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-[#00F0FF] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
                <ul className="mt-8 space-y-4">
                  {[
                    ["#about", "About"],
                    ["#projects", "Projects"],
                    ["#experience", "Experience"],
                    ["#contact", "Contact"],
                  ].map(([href, label]) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-white text-lg font-medium hover:text-[#00F0FF] transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          )}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/10 text-white hover:border-[#00F0FF]/50 hover:text-[#00F0FF] transition-all flex items-center gap-1.5 hidden md:flex"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>Resume</span>
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/10 text-white hover:border-[#00F0FF]/50 hover:text-[#00F0FF] transition-all flex items-center gap-1.5"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>@karanhub356</span>
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Hero Section + Interactive Glass Terminal */}
        <section id="hero" className="py-20 md:py-28 grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-[#00F0FF] font-mono text-xs mb-8 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open to SDE, Data Analyst and ML/AI roles</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
              Machine learning that explains itself
            </h1>
            <p className="text-lg text-[#A1A1AA] leading-relaxed mb-10">
              Built on solid engineering.
            </p>

            <p className="max-w-xl text-lg text-[#A1A1AA] leading-relaxed mb-10">
              B.Tech graduate in Artificial Intelligence & Data Science (SKCET, 2026). I build ML systems with
              explainability and fairness checks, backed by OOP, SQL and React fundamentals.
            </p>

            <div className="flex flex-wrap gap-4 font-mono text-sm">
              <a
                href="#projects"
                className="px-7 py-3.5 bg-gradient-to-r from-[#00F0FF] to-[#0088FF] text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" /> View projects
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className={`${GLASS} px-7 py-3.5 rounded-xl text-white hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all hover:scale-[1.02] flex items-center gap-2`}
              >
                <ExternalLink className="w-4 h-4" /> View Resume
              </a>
              <a
                href="#contact"
                className={`${GLASS} px-7 py-3.5 rounded-xl text-white hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all hover:scale-[1.02] flex items-center gap-2`}
              >
                <Mail className="w-4 h-4" /> Get in touch
              </a>
            </div>
          </motion.div>

          {/* Interactive Glass Command Console */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className={`${GLASS} rounded-3xl overflow-hidden border border-white/15 relative`}>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/60 to-transparent" />
              {/* Window Title Bar */}
              <div className="px-5 py-3.5 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>
                <span className="font-mono text-[11px] text-[#8B8B98]">karan@skcet-ai:~</span>
              </div>

              {/* Interactive Command Switcher */}
              <div className="px-4 pt-3 pb-2 border-b border-white/5 flex flex-wrap gap-1.5 font-mono text-[11px]">
                {TERMINAL_TABS.map((tab, idx) => (
                  <button
                    key={tab.cmd}
                    onClick={() => setActiveTab(idx)}
                    className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                      activeTab === idx
                        ? "bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40"
                        : "text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <ChevronRight className="w-3 h-3" />
                    {tab.cmd}
                  </button>
                ))}
              </div>

              {/* Live Output Body */}
              <div className="p-6 font-mono text-xs space-y-3.5 min-h-[225px]">
                <div className="text-[#8B8B98] flex items-center gap-2">
                  <span className="text-[#00F0FF]">$</span>
                  <span className="text-white">{TERMINAL_TABS[activeTab].cmd}</span>
                </div>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3 pt-1"
                >
                  {TERMINAL_TABS[activeTab].output.map((row) => (
                    <div key={row.label} className="border-l-2 border-white/10 pl-3">
                      <div className="text-[10px] text-[#8B8B98] tracking-wider">{row.label}</div>
                      <div className="text-[#E4E4E7] mt-0.5 leading-snug">{row.val}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* About & Skills Matrix */}
        <section id="about" className="py-20 border-t border-white/10">
          <div className="font-mono text-xs text-[#00F0FF] mb-2 tracking-widest">01 // OVERVIEW</div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-10">About</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-5 text-[#A1A1AA] leading-relaxed">
              <p>
                My projects share one theme: models should be able to justify their output. I have built explainable
                crop recommendations (DiCE counterfactuals), fairness-audited prediction pipelines, and a semantic resume
                screener with a recruiter-readable dashboard.
              </p>
              <p>
                Alongside ML, I work on the engineering side: object-oriented design with design patterns, normalized
                SQL schemas, and React front ends. My crop recommendation paper was presented at ICCET 2026.
              </p>

              <div className="pt-4 grid sm:grid-cols-2 gap-4">
                {SKILLS.map(([group, items]) => (
                  <div key={group} className={`${GLASS} p-4 rounded-2xl`}>
                    <h3 className="font-mono text-xs text-[#00F0FF] mb-3 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" /> {group}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                      {items.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 bg-white/[0.05] border border-white/10 rounded-lg text-[#E4E4E7] hover:border-[#00F0FF]/50 hover:text-white transition-colors"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <SpotlightCard className="p-6 rounded-3xl font-mono text-xs h-fit" spotlightColor="rgba(168, 85, 247, 0.16)">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[#94A3B8]">PROFILE // SNAPSHOT</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                </div>
                {[
                  ["Name", "Karan M"],
                  ["Education", "B.Tech AI & Data Science, SKCET (2026)"],
                  ["Research", "ICCET 2026 Published Paper"],
                  ["Credentials", "Google Cloud Gen AI Leader · Anthropic MCP"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-[#8B8B98] mb-1">{k}</div>
                    <div className="text-white font-semibold leading-relaxed">{v}</div>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 border-t border-white/10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="font-mono text-xs text-[#00F0FF] mb-2 tracking-widest">02 // SELECTED WORK</div>
              <h2 className="text-2xl md:text-4xl font-bold text-white">Projects</h2>
            </div>
            <span className="font-mono text-xs text-[#94A3B8] px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
              Click any card to inspect repository ↗
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-7">
            {PROJECTS.map((p, i) => (
              <SpotlightCard
                key={p.title}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                delay={(i % 2) * 0.08}
                spotlightColor={`${p.color}24`}
                className="group rounded-3xl p-7 hover:border-white/30 transition-colors cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-center font-mono text-xs text-[#8B8B98] mb-4">
                    <span>{p.kind}</span>
                    <span
                      className="px-2.5 py-0.5 rounded-full border font-semibold"
                      style={{ color: p.color, borderColor: `${p.color}55`, background: `${p.color}18` }}
                    >
                      {p.badge}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                      {p.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-[#8B8B98] group-hover:text-[#00F0FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                  </div>

                  <div className="font-mono text-[11px] text-[#94A3B8] mb-4">{p.metric}</div>

                  <p className="text-sm text-[#A1A1AA] mb-6 leading-relaxed">{p.desc}</p>
                </div>

                <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/10">
                  <div className="flex flex-wrap gap-2 font-mono text-xs text-[#A1A1AA]">
                    {p.stack.map((s) => (
                      <span key={s} className="px-2.5 py-1 bg-white/[0.05] rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-xs text-[#94A3B8] group-hover:text-[#00F0FF] transition-colors shrink-0">
                    <ExternalLink className="w-3.5 h-3.5" /> Code
                  </span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Experience, Education & Certifications */}
        <section id="experience" className="py-20 border-t border-white/10">
          <div className="font-mono text-xs text-[#00F0FF] mb-2 tracking-widest">03 // TRACK RECORD</div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-12">Experience & education</h2>

          <div className="space-y-6">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`${GLASS} rounded-2xl p-6 border-l-4 hover:border-white/25 transition-all`}
                style={{ borderLeftColor: t.color }}
              >
                <div className="font-mono text-xs font-bold mb-1" style={{ color: t.color }}>
                  {t.when}
                </div>
                <h3 className="text-lg font-bold text-white">{t.title}</h3>
                <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed">{t.body}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="font-mono text-xs text-white uppercase tracking-wider mt-14 mb-4">Verified Certifications</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
            {CERTS.map((c) => (
              <div
                key={c}
                className={`${GLASS} px-4 py-3.5 rounded-2xl text-[#E4E4E7] flex items-center gap-2.5 hover:border-[#00F0FF]/40 transition-colors`}
              >
                <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 border-t border-white/10">
          <div className="font-mono text-xs text-[#00F0FF] mb-2 tracking-widest">04 // INITIATE</div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Contact</h2>
          <p className="text-[#A1A1AA] max-w-xl mb-10">
            Hiring for an SDE, data analyst or ML/AI role? I would like to hear about it.
          </p>

          <div className="grid md:grid-cols-3 gap-5 font-mono text-xs">
            {CONTACTS.map(({ href, Icon, label, sub }) => (
              <SpotlightCard
                key={label}
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel="noreferrer"
                className="p-5 rounded-2xl hover:border-[#00F0FF]/60 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/25 text-[#00F0FF]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-white font-bold group-hover:text-[#00F0FF] transition-colors">{label}</div>
                      <div className="text-[#8B8B98] text-[11px] mt-0.5">{sub}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#8B8B98] group-hover:text-[#00F0FF] transition-colors" />
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center font-mono text-xs text-[#8B8B98] relative z-10">
        <p>© 2026 Karan M · Built with Next.js & Tailwind CSS</p>
      </footer>
    </div>
  );
}