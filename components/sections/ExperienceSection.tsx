"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GpuBackground from "@/components/ui/GpuBackground";

/** Vertical scroll budget: one step between adjacent cards; padding covers sticky header/footer. */
const EXPERIENCE_SCROLL_VH_PER_STEP = 72;
const EXPERIENCE_SECTION_PAD_VH = 108;

const EXPERIENCES = [
  {
    company: "TeachShare",
    role: "Software Engineer Intern",
    period: "Jun 2025 – Present",
    type: "SWE",
    team: "Backed by Reach Capital · Pear VC",
    color: "#22d3ee",
    colorDim: "rgba(34,211,238,0.15)",
    bullets: [
      "Orchestrated a unified multimodal grading pipeline with rubric-aware prompting and structured feedback generation",
      "Engineered HTML parsing and chunking to reduce LLM token usage on large Polotno JSON inputs",
      "Developed backend services and evaluation workflows using Solid.js, Vertex AI, and Zod schema validation",
      "Implemented chained multi-step tool-calling for an LLM-powered chat system supporting dynamic task execution",
    ],
    stack: ["Solid.js", "Vertex AI", "Typescript", "Zod", "Vercel AI SDK"],
    lane: "THREAD 0",
  },
  {
    company: "J.P. Morgan Chase",
    role: "Software Engineer Intern",
    period: "Jun 2025 – Aug 2025",
    type: "ML SWE",
    team: "Asset & Wealth Management AI Team",
    color: "#a855f7",
    colorDim: "rgba(168,85,247,0.15)",
    bullets: [
      "Developed and deployed an LLM Evaluation & Regression Testing framework for internal teams with support for Phoenix and Langsmith",
      "Provided an asynchronous modular pipeline with trace-level observability and LLM-as-judge evaluation for firm-wide LLM workflow benchmarking",
      "Built a generalized document Q&A pipeline for high-volume workflows (RFPs, compliance) via procedural chunking and retrieval-augmented generation",
    ],
    stack: ["Phoenix", "LangSmith", "Python", "FastAPI", "Typescript", "Next.js", "Pydantic", "Langchain"],
    lane: "THREAD 1",
  },
  {
    company: "Hone Health",
    role: "Software Engineer Intern",
    period: "Jan 2025 – May 2025",
    type: "Data Engineer",
    team: "Data & Machine Learning Team",
    color: "#4ade80",
    colorDim: "rgba(74,222,128,0.15)",
    bullets: [
      "Developed a custom content-injection Azure DevOps extension for processing ticket similarity with vector embedding search to display similar work items",
      "Engineered Azure ETL pipelines to ingest Customer.Io webhook data to Azure Blob Storage into KQL eventhouse",
      "Architected a migration pipeline for bulk SQL scripts to transfer staging data to a production history database",
    ],
    stack: ["C#/.NET", "Azure DevOps", "SQL", "Python", "Microsoft Fabric"],
    lane: "THREAD 2",
  },
  {
    company: "Depton LLC",
    role: "Software Engineer Intern",
    period: "May 2024 - Aug 2024",
    type: "SWE",
    team: "Internal Software Team",
    color: "#f97316",
    colorDim: "rgba(249,115,22,0.15)",
    bullets: [
      "Engineered a distributed web scraping framework for real-time stock ticker aggregation, processing 2k data points daily.",
      "Led the end-to-end development of the company’s main internal web platform using Next.js, including authentication, API integration, component design, and deployment",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Puppeteer"],
    lane: "THREAD 3",
  },
  {
    company: "Rutgers University",
    role: "Undergraduate Research Assistant",
    period: "Sep 2023 - May 2024",
    type: "Research Assistant",
    team: "Engineering Lab Assistant",
    color: "#f91616",
    colorDim: "rgba(249,115,22,0.15)",
    bullets: [
      "Assisted with the development of a pose estimation robotic arm control system",
      "Managed puppeteer scripts for automatic inventory document management",
    ],
    stack: ["Puppeteer", "Python"],
    lane: "THREAD 4",
  },
  {
    company: "VEX 750B Robotics Team",
    role: "Captain & Lead Programmer",
    period: "Sep 2020 - Aug 2023",
    type: "Captain & Lead Programmer",
    team: "VEX 750B Robotics Team",
    color: "#f9d316",
    colorDim: "rgba(249,115,22,0.15)",
    bullets: [
      "Designed a modular robot control framework with PID motion tuning, Odometry, and Pure Pursuit path tracking.",
      "Programmed a completely autonomous skills routine which got 1st place in the NJ State competition of 50+ teams, qualifying for the VEX Worlds Competition for the first time in 4 years",
      "Developed a React Native scouting app with optimized heuristics to predict match performance from live telemetry data",
    ],
    stack: ["PROS", "C++", "React Native", "Typescript", "Python"],
    lane: "THREAD 5",
  }
];

function ExperienceCard({ exp, index }: { exp: typeof EXPERIENCES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative flex-shrink-0 flex flex-col"
      style={{
        width: "clamp(320px, 38vw, 520px)",
        height: "100%",
      }}
    >
      {/* Lane label */}
      <div
        style={{
          fontSize: "0.55rem",
          letterSpacing: "0.35em",
          color: exp.color,
          fontFamily: "var(--font-geist-mono)",
          marginBottom: "12px",
          opacity: 0.7,
        }}
      >
        {exp.lane} // {exp.type}
      </div>

      {/* Card */}
      <div
        className="flex-1 gpu-panel flex flex-col overflow-hidden"
        style={{
          borderColor: `color-mix(in srgb, ${exp.color} 35%, var(--border))`,
          background: `linear-gradient(135deg, ${exp.colorDim} 0%, var(--surface) 55%)`,
        }}
      >
        {/* Top stripe */}
        <div
          style={{
            height: "3px",
            background: `linear-gradient(90deg, color-mix(in srgb, ${exp.color} 75%, transparent), ${exp.colorDim} 65%, transparent)`,
            boxShadow: `0 0 10px color-mix(in srgb, ${exp.color} 50%, transparent)`,
          }}
        />

        <div className="flex-1 px-6 py-8 flex flex-col gap-3">
          {/* Header */}
          <div>
            <div className="flex flex-col">
              <h3
                style={{
                  fontSize: "clamp(1.1rem, 3.5vw, 1.8rem)",
                  letterSpacing: "0.05em",
                  fontWeight: 800,
                  color: "var(--text)",
                  fontFamily: "var(--font-geist-sans)",
                  lineHeight: 1.1,
                }}
              >
                {exp.company}
              </h3>

              <div className="flex items-baseline justify-between gap-4">
                <div
                  style={{
                    fontSize: "clamp(0.7rem, 2vw, 1rem)",
                    color: exp.color,
                    fontFamily: "var(--font-geist-mono)",
                    marginTop: "2px",
                  }}
                >
                  {exp.role}
                </div>

                <div
                  style={{
                    fontSize: "clamp(0.7rem, 2vw, 1rem)",
                    color: "var(--muted-bright)",
                    fontFamily: "var(--font-geist-mono)",
                    letterSpacing: "0.05em",
                    lineHeight: 1.2,
                    flexShrink: 0,
                    textAlign: "right",
                  }}
                >
                  {exp.period}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {[exp.team].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "clamp(0.65rem, 1.8vw, 0.9rem)",
                    padding: "2px 8px",
                    border: `1px solid color-mix(in srgb, ${exp.color} 30%, var(--border))`,
                    color: "var(--muted-bright)",
                    letterSpacing: "0.05em",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--border)" }} />

          {/* Bullets */}
          <ul className="flex flex-col gap-3 flex-1">
            {exp.bullets.map((b, i) => (
              <li
                key={i}
                className="flex gap-3"
                style={{
                  fontSize: "clamp(0.7rem, 2vw, 1rem)",
                  color: "var(--muted-bright)",
                  fontFamily: "var(--font-geist-mono)",
                  lineHeight: "1.6",
                }}
              >
                <span style={{ color: exp.color, flexShrink: 0, marginTop: "2px" }}>▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--border)" }} />

          {/* Tech stack (pinned to bottom) */}
          <div className="flex flex-col gap-2">
            <div
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                color: "var(--muted)",
                fontFamily: "var(--font-geist-mono)",
                textTransform: "uppercase",
              }}
            >
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {exp.stack.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "0.75rem",
                    padding: "2px 8px",
                    border: `1px solid color-mix(in srgb, ${exp.color} 22%, var(--border))`,
                    color: "var(--muted-bright)",
                    letterSpacing: "0.04em",
                    fontFamily: "var(--font-geist-mono)",
                    background: "color-mix(in srgb, var(--surface) 85%, transparent)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Dynamically compute the horizontal travel distance based on actual card widths
  const [xEndVw, setXEndVw] = useState((EXPERIENCES.length - 1) * 25);

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const cardMinW = 320;
      const cardMaxW = 520;
      const cardVwFrac = 0.38;
      const gapPx = 24; // gap-6
      const plPx = vw >= 768 ? 64 : 32; // pl-8 / md:pl-16
      const prPx = 64; // pr-16
      const cardW = Math.min(Math.max(cardMinW, vw * cardVwFrac), cardMaxW);
      const totalTrackW = plPx + EXPERIENCES.length * cardW + (EXPERIENCES.length - 1) * gapPx + prPx;
      const travel = Math.max(0, totalTrackW - vw);
      setXEndVw(travel / vw * 100);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Translate the track horizontally as user scrolls
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["2vw", `calc(-${xEndVw}vw)`]
  );

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.05, 0.97, 1], [0, 1, 1, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    /* Tall section for scroll space */
    <div
      id="experience"
      ref={containerRef}
      style={{
        height: `${Math.max(1, EXPERIENCES.length - 1) * EXPERIENCE_SCROLL_VH_PER_STEP + EXPERIENCE_SECTION_PAD_VH}vh`,
        position: "relative",
      }}
    >
      {/* Sticky viewport */}
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="sticky top-0 h-screen overflow-hidden"
      >
        <div
          className="h-full relative"
          style={{ background: "var(--bg)" }}
        >
          <GpuBackground />

          {/* Header */}
          <div className="px-8 md:px-16 pt-12 pb-6 flex items-end justify-between">
            <div>
              <div className="section-label mb-3">
                Warp Threads // Memory Interfaces
              </div>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: "var(--text)",
                  fontFamily: "var(--font-geist-sans)",
                  lineHeight: 1,
                }}
              >
                EXPERIENCE
              </h2>
            </div>
            <div
              className="hidden md:flex flex-col items-end gap-1"
              style={{
                fontSize: "0.6rem",
                color: "var(--muted)",
                fontFamily: "var(--font-geist-mono)",
                letterSpacing: "0.1em",
              }}
            >
              <div>← SCROLL VERTICALLY TO TRAVERSE →</div>
              <div style={{ color: "var(--orange)" }}>{EXPERIENCES.length} ACTIVE WARPS</div>
            </div>
          </div>

          {/* Horizontal card track */}
          <div className="relative overflow-hidden" style={{ height: "calc(100vh - 180px)" }}>
            <motion.div
              style={{ x }}
              className="absolute top-0 bottom-8 flex gap-6 pl-8 md:pl-16 pr-16 items-stretch"
            >
              {EXPERIENCES.map((exp, i) => (
                <ExperienceCard key={exp.company+exp.role} exp={exp} index={i} />
              ))}

            </motion.div>
          </div>

          {/* Scroll progress bar */}
          <div
            className="absolute bottom-8 left-8 right-16"
            style={{ height: "2px", background: "var(--border)" }}
          >
            <motion.div
              style={{
                width: progressWidth,
                height: "100%",
                background: "linear-gradient(90deg, var(--orange-dim), var(--orange))",
                boxShadow: "0 0 6px var(--orange)",
              }}
            />
            <div
              className="flex justify-between mt-2"
              style={{
                fontSize: "0.55rem",
                color: "var(--muted)",
                letterSpacing: "0.1em",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              <span>DATA TRANSFER IN PROGRESS</span>
              <span>DRAM</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
