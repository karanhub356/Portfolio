"use client";

import React from "react";
import { Terminal, Mail, ExternalLink, GitBranch, Share2, Sparkles } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
const LINKS = {
  email: "mailto:mkaran030506@gmail.com",
  github: "https://github.com/karanhub356",
  linkedin: "https://linkedin.com/in/karan-m356",
};

const GLASS =
  "backdrop-blur-2xl bg-white/[0.03] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]";

// Add a repo URL to any project and a GitHub link appears on its card.
const PROJECTS = [
  {
    kind: "NLP / DASHBOARD", badge: "SBERT", color: "#00F0FF",
    title: "AI-Powered Resume Screener",
    desc: "Ranks resumes against a job description using Sentence-BERT similarity and a weighted score across semantic match, skills, experience and education. Streamlit dashboard with radar charts and a skill-gap heatmap.",
    stack: ["Python", "SBERT", "NLP", "Streamlit"], repo: "",
  },
  {
    kind: "ML RESEARCH", badge: "ICCET 2026", color: "#A855F7",
    title: "Crop Recommendation with Explainable AI",
    desc: "Compares six ML models with GridSearchCV and cross-validation (Random Forest performs best) on 2,200 samples and 7 soil and climate features. Returns Top-3 crops and uses DiCE counterfactuals to show what would change the ranking.",
    stack: ["Python", "scikit-learn", "DiCE", "XAI"], repo: "",
  },
 
  {
    kind: "OOP + SQL", badge: "SQLITE", color: "#A855F7",
    title: "Fleet Service Management System",
    desc: "Models vehicle service lifecycles with abstract base classes, inheritance and a Strategy pattern for service-tier pricing. Normalized SQLite schema with CTE queries for overdue vehicles and technician workload.",
    stack: ["Python", "SQLite", "Design Patterns"], repo: "",
  },
  {
    kind: "FRONTEND", badge: "REACT", color: "#EC4899",
    title: "React Authentication System",
    desc: "Client-side auth with Context API for global state, protected routes and local JSON-backed sessions. No Redux, no external backend.",
    stack: ["React", "Context API", "JavaScript"], repo: "",
  },
  {
    kind: "WEB APP", badge: "REACT", color: "#00F0FF",
    title: "Hall Booking System",
    desc: "Web app for scheduling and managing hall bookings, with booking-conflict handling and structured request state.",
    stack: ["React", "JavaScript"], repo: "",
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
  { when: "2026", color: "#00F0FF", title: "B.Tech Graduate & ICCET 2026 Paper",
    body: "Graduated in AI & Data Science. Paper on a crop recommendation framework at ICCET 2026. Completed Google Cloud Gen AI Leader and Anthropic MCP credentials." },
  { when: "Jun – Jul 2024", color: "#A855F7", title: "Data Science & Analytics Intern, Coimbatore Institute of Technology",
    body: "Applied preprocessing, exploratory data analysis and predictive modelling on structured datasets using Python and pandas." },
  { when: "2022 – 2026", color: "#EC4899", title: "B.Tech, Artificial Intelligence & Data Science",
    body: "Sri Krishna College of Engineering and Technology (SKCET), Coimbatore." },
];

const CONTACTS = [
  { href: LINKS.email, Icon: Mail, label: "Email" },
  { href: LINKS.github, Icon: GitBranch, label: "GitHub" },
  { href: LINKS.linkedin, Icon: Share2, label: "LinkedIn" },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#060812] text-[#D4D4D8] font-sans selection:bg-[#00F0FF] selection:text-black relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none z-0" />

      <header className="sticky top-4 z-50 max-w-6xl mx-auto px-4">
        <div className={`${GLASS} rounded-2xl px-6 h-16 flex items-center justify-between font-mono text-xs`}>
          <a href="#hero" className="font-bold text-white tracking-wider hover:text-[#00F0FF] transition-colors">KARAN M</a>
          <nav className="hidden md:flex items-center gap-8 text-[#94A3B8]">
            {[["about", "About"], ["projects", "Projects"], ["experience", "Experience"], ["contact", "Contact"]].map(([id, label]) => (
              <a key={id} href={`#${id}`} className="hover:text-[#00F0FF] transition-colors">{label}</a>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 relative z-10">
        <section id="hero" className="py-24 md:py-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 text-[#00F0FF] font-mono text-xs mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open to SDE, Data Analyst and ML/AI roles</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Machine learning that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#EC4899]">explains itself</span>,
            <br />built on solid engineering.
          </h1>
          <p className="max-w-2xl text-lg text-[#A1A1AA] leading-relaxed mb-10">
            B.Tech graduate in Artificial Intelligence & Data Science (SKCET, 2026). I build ML systems with explainability and fairness
            checks, backed by OOP, SQL and React fundamentals.
          </p>
          <div className="flex flex-wrap gap-4 font-mono text-sm">
            <a href="#projects" className="px-7 py-3.5 bg-gradient-to-r from-[#00F0FF] to-[#0088FF] text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all flex items-center gap-2">
              <Terminal className="w-4 h-4" /> View projects
            </a>
            <a href="#contact" className={`${GLASS} px-7 py-3.5 rounded-xl text-white hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all flex items-center gap-2`}>
              <Mail className="w-4 h-4" /> Get in touch
            </a>
          </div>
        </section>

        <section id="about" className="py-20 border-t border-white/10">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-10">About</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-5 text-[#A1A1AA] leading-relaxed">
              <p>
                My projects share one theme: models should be able to justify their output. I have built explainable crop recommendations
                (DiCE counterfactuals), fairness-audited prediction pipelines, and a semantic resume screener with a recruiter-readable dashboard.
              </p>
              <p>
                Alongside ML, I work on the engineering side: object-oriented design with design patterns, normalized SQL schemas, and
                React front ends. My crop recommendation paper was presented at ICCET 2026.
              </p>
              <div className="pt-4 space-y-4">
                {SKILLS.map(([group, items]) => (
                  <div key={group}>
                    <h4 className="font-mono text-xs text-white mb-2">{group}</h4>
                    <div className="flex flex-wrap gap-2 font-mono text-xs">
                      {items.map((s) => (
                        <span key={s} className="px-3 py-1.5 bg-white/[0.05] border border-white/10 rounded-xl text-[#E4E4E7]">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${GLASS} p-6 rounded-2xl font-mono text-xs space-y-5 h-fit`}>
              {[
                ["Name", "Karan M"],
                ["Education", "B.Tech AI & Data Science, SKCET (2026)"],
                ["Research", "ICCET 2026 paper"],
                ["Credentials", "Google Cloud Gen AI Leader, Anthropic MCP"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[#71717A] mb-1">{k}</div>
                  <div className="text-white font-semibold">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 border-t border-white/10">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-10">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((p, i) => (
<motion.div
  key={p.title}
  initial={{ opacity: 0, y: 28 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  whileHover={{ y: -8 }}
  transition={{ type: "spring", stiffness: 240, damping: 22, delay: (i % 2) * 0.08 }}
  className={`${GLASS} rounded-3xl p-7 flex flex-col justify-between hover:border-white/30 transition-colors`}
>                <div>
                  <div className="flex justify-between items-start font-mono text-xs text-[#71717A] mb-4">
                    <span>{p.kind}</span>
                    <span className="px-2.5 py-0.5 rounded-full border" style={{ color: p.color, borderColor: `${p.color}55`, background: `${p.color}18` }}>{p.badge}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                  <p className="text-sm text-[#A1A1AA] mb-6 leading-relaxed">{p.desc}</p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 font-mono text-xs text-[#A1A1AA]">
                    {p.stack.map((s) => <span key={s} className="px-2 py-1 bg-white/5 rounded-md">{s}</span>)}
                  </div>
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-white hover:text-[#00F0FF] transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" /> View code
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="experience" className="py-20 border-t border-white/10">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-12">Experience & education</h2>
          <div className="space-y-6">
            {TIMELINE.map((t) => (
              <div key={t.title} className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 border-l-4" style={{ borderLeftColor: t.color }}>
                <div className="font-mono text-xs font-bold mb-1" style={{ color: t.color }}>{t.when}</div>
                <h3 className="text-lg font-bold text-white">{t.title}</h3>
                <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
          <h3 className="font-mono text-xs text-white mt-12 mb-4">Certifications</h3>
          <div className="flex flex-wrap gap-2.5 font-mono text-xs">
            {CERTS.map((c) => <span key={c} className="px-3.5 py-1.5 bg-white/[0.05] border border-white/10 rounded-xl text-[#E4E4E7]">{c}</span>)}
          </div>
        </section>

        <section id="contact" className="py-20 border-t border-white/10">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Contact</h2>
          <p className="text-[#A1A1AA] max-w-xl mb-10">Hiring for an SDE, data analyst or ML/AI role? I would like to hear about it.</p>
          <div className="grid md:grid-cols-3 gap-5 font-mono text-xs">
            {CONTACTS.map(({ href, Icon, label }) => (
              <a key={label} href={href} target={label === "Email" ? undefined : "_blank"} rel="noreferrer"
                 className={`${GLASS} p-5 rounded-2xl text-white hover:border-[#00F0FF] hover:text-[#00F0FF] flex items-center gap-3.5 transition-all`}>
                <Icon className="w-4 h-4 text-[#00F0FF]" /> <span>{label}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center font-mono text-xs text-[#71717A] relative z-10">
        <p>© 2026 Karan M</p>
      </footer>
    </div>
  );
}