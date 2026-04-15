"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EXPERIENCES = [
  {
    company: "TeachShare",
    role: "Software Engineer Intern",
    period: "Jun 2025 – Present",
    type: "EdTech Startup",
    funding: "Reach Capital · Pear VC",
    scale: "100K+ weekly users · $500K+ ARR",
    color: "#22d3ee",
    colorDim: "rgba(34,211,238,0.15)",
    bullets: [
      "Orchestrated a unified multimodal grading pipeline with rubric-aware prompting and structured feedback generation",
      "Engineered HTML parsing, chunking, and summarization to reduce LLM token usage by 70% on large Polotno JSON inputs",
      "Implemented chained multi-step tool-calling for an LLM-powered chat system supporting dynamic task execution",
    ],
    metrics: [
      { label: "Token Reduction", value: "70%", color: "#22d3ee" },
      { label: "Weekly Users", value: "100K+", color: "#4ade80" },
      { label: "ARR", value: "$500K+", color: "#f97316" },
    ],
    lane: "LANE 0",
  },
  {
    company: "J.P. Morgan Chase",
    role: "Software Engineer Intern",
    period: "Jun 2025 – Aug 2025",
    type: "Asset & Wealth Mgmt AI",
    funding: "Global Investment Bank",
    scale: "Firm-wide LLM deployment",
    color: "#a855f7",
    colorDim: "rgba(168,85,247,0.15)",
    bullets: [
      "Designed and deployed an LLM evaluation and regression framework reducing evaluation setup time from hours to minutes",
      "Integrated Phoenix and LangSmith for async modular pipeline with trace-level observability and drift detection",
      "Engineered document automation pipeline for high-volume Q&A workflows (RFPs, compliance) cutting turnaround by 70%",
    ],
    metrics: [
      { label: "Eval Setup", value: "hrs→min", color: "#a855f7" },
      { label: "Turnaround", value: "−70%", color: "#f472b6" },
      { label: "Scope", value: "Firm-Wide", color: "#22d3ee" },
    ],
    lane: "LANE 1",
  },
  {
    company: "Hone Health",
    role: "Software Engineer Intern",
    period: "Jan 2025 – May 2025",
    type: "HealthTech",
    funding: "Series B",
    scale: "10K+ historical tickets analyzed",
    color: "#4ade80",
    colorDim: "rgba(74,222,128,0.15)",
    bullets: [
      "Engineered Azure DevOps extension analyzing 10K+ historical tickets via semantic embedding models with real-time similarity surfacing",
      "Built incremental load ETL pipeline for webhook ingestion achieving 9x faster data load and 99.8% storage reduction (2TB → 4GB)",
      "Architected SQL migration automation system to version-control production data for complex bulk queries",
    ],
    metrics: [
      { label: "ETL Speedup", value: "9×", color: "#4ade80" },
      { label: "Storage Cut", value: "99.8%", color: "#22d3ee" },
      { label: "Tickets", value: "10K+", color: "#f97316" },
    ],
    lane: "LANE 2",
  },
];

function DataPacket({ delay, color }: { delay: number; color: string }) {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        width: "6px",
        height: "3px",
        background: color,
        boxShadow: `0 0 6px ${color}, 0 0 12px ${color}`,
        left: 0,
      }}
      animate={{ left: ["0%", "100%"] }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

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
        {exp.lane} // PCIe × 16
      </div>

      {/* Card */}
      <div
        className="flex-1 gpu-panel corner-marks flex flex-col overflow-hidden"
        style={{
          borderColor: `color-mix(in srgb, ${exp.color} 35%, var(--border))`,
          background: `linear-gradient(135deg, ${exp.colorDim} 0%, var(--surface) 40%)`,
        }}
      >
        {/* Top stripe */}
        <div
          style={{
            height: "3px",
            background: `linear-gradient(90deg, ${exp.color}, transparent)`,
            boxShadow: `0 0 12px ${exp.color}`,
          }}
        />

        {/* Bus animation bar */}
        <div className="relative h-[1px] overflow-hidden mx-6 mt-4" style={{ background: "var(--border)" }}>
          {[0, 1.2, 2.4].map((d) => (
            <DataPacket key={d} delay={d} color={exp.color} />
          ))}
        </div>

        <div className="flex-1 p-6 flex flex-col gap-4">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "var(--text)",
                    fontFamily: "var(--font-geist-sans)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1,
                  }}
                >
                  {exp.company}
                </h3>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: exp.color,
                    fontFamily: "var(--font-geist-mono)",
                    marginTop: "2px",
                  }}
                >
                  {exp.role}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: "0.6rem",
                    color: "var(--muted-bright)",
                    fontFamily: "var(--font-geist-mono)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {exp.period}
                </div>
                <div
                  style={{
                    fontSize: "0.55rem",
                    color: "var(--muted)",
                    fontFamily: "var(--font-geist-mono)",
                    marginTop: "2px",
                  }}
                >
                  {exp.type}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {[exp.funding, exp.scale].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.58rem",
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
                  fontSize: "0.72rem",
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

          {/* Metrics */}
          <div
            className="grid grid-cols-3 gap-3 pt-4"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {exp.metrics.map((m) => (
              <div key={m.label} className="flex flex-col gap-1">
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: m.color,
                    fontFamily: "var(--font-geist-mono)",
                    textShadow: `0 0 10px ${m.color}`,
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    fontSize: "0.55rem",
                    color: "var(--muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  {m.label}
                </div>
              </div>
            ))}
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

  // Translate the track horizontally as user scrolls
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["2vw", `calc(-${(EXPERIENCES.length - 1) * 42}vw)`]
  );

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    /* Tall section for scroll space */
    <div
      id="experience"
      ref={containerRef}
      style={{ height: `${EXPERIENCES.length * 100 + 20}vh`, position: "relative" }}
    >
      {/* Sticky viewport */}
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="sticky top-0 h-screen overflow-hidden"
      >
        <div
          className="h-full"
          style={{ background: "var(--bg)" }}
        >
          {/* Header */}
          <div className="px-8 md:px-16 pt-12 pb-6 flex items-end justify-between">
            <div>
              <div className="section-label mb-3">
                PCIe BUS // TRANSFER LOG
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
                <br />
                <span
                  style={{
                    color: "var(--orange)",
                    textShadow: "0 0 30px rgba(249,115,22,0.4)",
                  }}
                >
                  PIPELINE
                </span>
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
              <div style={{ color: "var(--orange)" }}>3 ACTIVE LANES</div>
            </div>
          </div>

          {/* PCIe bus visual track */}
          <div
            className="mx-8 md:mx-16 mb-4 relative overflow-hidden"
            style={{ height: "2px", background: "var(--border)" }}
          >
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 h-full w-32"
              style={{
                background: "linear-gradient(90deg, transparent, var(--orange), transparent)",
                boxShadow: "0 0 8px var(--orange)",
              }}
            />
          </div>

          {/* Horizontal card track */}
          <div className="relative overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
            <motion.div
              style={{ x }}
              className="absolute top-0 bottom-0 flex gap-6 pl-8 md:pl-16 pr-16 items-stretch"
            >
              {EXPERIENCES.map((exp, i) => (
                <ExperienceCard key={exp.company} exp={exp} index={i} />
              ))}

              {/* End marker */}
              <div
                className="flex-shrink-0 flex flex-col justify-center items-center"
                style={{ width: "160px" }}
              >
                <div
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.3em",
                    color: "var(--muted)",
                    fontFamily: "var(--font-geist-mono)",
                    writingMode: "vertical-lr",
                    textOrientation: "mixed",
                  }}
                >
                  MORE COMING SOON
                </div>
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    marginTop: "16px",
                    width: "1px",
                    height: "60px",
                    background: "linear-gradient(to bottom, var(--muted), transparent)",
                  }}
                />
              </div>
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
              <span>PCIe SLOT 0</span>
              <span>DATA TRANSFER IN PROGRESS</span>
              <span>SLOT {EXPERIENCES.length - 1}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
