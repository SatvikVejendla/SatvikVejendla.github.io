"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EDUCATION = [
  {
    school: "Northwestern University",
    degree: "M.S. Computer Science",
    focus: "Concentration: AI / Machine Learning",
    period: "Expected Dec 2027",
    location: "Evanston, IL",
    color: "var(--purple)",
    icon: "▣",
  },
  {
    school: "Rutgers University – Honors College",
    degree: "B.S. Computer Science",
    focus: "Dean's List · Honors College Scholar with Distinction",
    period: "Sep 2023 – May 2026",
    location: "New Brunswick, NJ",
    color: "var(--cyan)",
    icon: "▣",
  },
];

const COURSES = [
  "Data Structures",
  "Computer Architecture",
  "Algorithms",
  "Artificial Intelligence",
  "Statistical Inference",
  "Data Science",
  "Computational Robotics",
  "Brain-Inspired Computing",
  "Reinforcement Learning",
  "Discrete Math",
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Zoom in from small
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65], [0.75, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.35], [60, 0]);

  // Background die zooms in opposite
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1.4, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7], [0, 0.12, 0.06]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      {/* Giant die background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ scale: bgScale, opacity: bgOpacity }}
      >
        <svg viewBox="0 0 600 600" className="w-full max-w-3xl" fill="none">
          {/* Die grid */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
              <rect
                key={`bg-${row}-${col}`}
                x={20 + col * 70}
                y={20 + row * 70}
                width={60}
                height={60}
                rx="3"
                fill="rgba(34,211,238,0.04)"
                stroke="rgba(34,211,238,0.12)"
                strokeWidth="0.5"
              />
            ))
          )}
          {/* Center processor */}
          <rect x="190" y="190" width="220" height="220" rx="8"
            fill="rgba(168,85,247,0.06)"
            stroke="rgba(168,85,247,0.2)"
            strokeWidth="1"
          />
          <text x="300" y="306" textAnchor="middle" fill="rgba(168,85,247,0.3)" fontSize="10" fontFamily="monospace">SHADER ARRAY</text>
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ scale, opacity, y }}
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-16"
      >
        {/* Header */}
        <div className="mb-16">
          <div className="section-label mb-4">
            SHADER ARRAY // UNIT PROFILE
          </div>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              fontFamily: "var(--font-geist-sans)",
              lineHeight: 1,
            }}
          >
            ARCHITECTURE
            <br />
            <span style={{ color: "var(--purple)", textShadow: "0 0 40px rgba(168,85,247,0.4)" }}>
              OVERVIEW
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Bio terminal */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="gpu-panel gpu-panel-purple p-6"
            >
              <div
                className="flex items-center gap-3 mb-4 pb-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span className="led led-cyan" style={{ width: "6px", height: "6px" }} />
                <span
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.3em",
                    color: "var(--purple)",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  BIO.SH // OUTPUT
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.85rem",
                  lineHeight: "1.8",
                  color: "var(--muted-bright)",
                }}
              >
                <p>
                  <span style={{ color: "var(--cyan)" }}>$&gt;</span>{" "}
                  <span style={{ color: "var(--green)" }}>whoami</span>
                </p>
                <p className="mt-2" style={{ color: "var(--text)" }}>
                  I&apos;m a software engineer who thinks at the intersection of
                  AI systems, distributed infrastructure, and raw compute.
                </p>
                <p className="mt-3" style={{ color: "var(--text)" }}>
                  From architecting LLM pipelines that cut evaluation time from
                  hours to minutes at J.P. Morgan, to building CUDA kernels that
                  saturate Blackwell-era memory bandwidth — I work at every
                  layer of the stack.
                </p>
                <p className="mt-3" style={{ color: "var(--text)" }}>
                  Currently pursuing M.S. CS (AI/ML) at Northwestern while
                  shipping production code at{" "}
                  <span style={{ color: "var(--cyan)" }}>TeachShare</span>.
                </p>
                <p className="mt-4">
                  <span style={{ color: "var(--cyan)" }}>$&gt;</span>{" "}
                  <span style={{ color: "var(--green)" }}>interests</span>
                </p>
                <p className="mt-2">
                  {[
                    "LLM Systems",
                    "CUDA / Parallel Computing",
                    "RAG Architectures",
                    "RL / Robotics",
                    "Edge AI",
                  ].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        display: "inline-block",
                        marginRight: "8px",
                        marginBottom: "4px",
                        padding: "1px 8px",
                        border: "1px solid rgba(168,85,247,0.3)",
                        color: "var(--purple)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </p>
              </div>
            </motion.div>

            {/* Coursework */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="gpu-panel gpu-panel-cyan p-6"
            >
              <div
                className="flex items-center gap-3 mb-4"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  color: "var(--cyan)",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                <span>LOADED MODULES</span>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "var(--border)",
                    marginLeft: "8px",
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {COURSES.map((course, i) => (
                  <motion.span
                    key={course}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    whileHover={{ scale: 1.05, color: "var(--cyan)" }}
                    style={{
                      padding: "3px 10px",
                      border: "1px solid var(--border)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.08em",
                      color: "var(--muted-bright)",
                      cursor: "default",
                      fontFamily: "var(--font-geist-mono)",
                      transition: "color 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.4)";
                      (e.currentTarget as HTMLElement).style.color = "var(--cyan)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLElement).style.color = "var(--muted-bright)";
                    }}
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Education cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="gpu-panel corner-marks p-6"
                style={{
                  borderColor: `color-mix(in srgb, ${edu.color} 30%, var(--border))`,
                  boxShadow: `inset 0 0 20px color-mix(in srgb, ${edu.color} 5%, transparent)`,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    style={{
                      fontSize: "1.5rem",
                      color: edu.color,
                      opacity: 0.6,
                    }}
                  >
                    {edu.icon}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      color: "var(--muted)",
                      letterSpacing: "0.1em",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    {edu.period}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    letterSpacing: "0.05em",
                    fontFamily: "var(--font-geist-mono)",
                    marginBottom: "4px",
                  }}
                >
                  {edu.school}
                </h3>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: edu.color,
                    fontFamily: "var(--font-geist-mono)",
                    marginBottom: "4px",
                  }}
                >
                  {edu.degree}
                </div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--muted-bright)",
                    fontFamily: "var(--font-geist-mono)",
                    marginBottom: "8px",
                  }}
                >
                  {edu.focus}
                </div>
                <div
                  style={{
                    fontSize: "0.6rem",
                    color: "var(--muted)",
                    letterSpacing: "0.1em",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  ◎ {edu.location}
                </div>
              </motion.div>
            ))}

            {/* Fun stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="gpu-panel gpu-panel-orange p-5"
            >
              <div
                className="section-label mb-3"
                style={{ fontSize: "0.55rem" }}
              >
                CHIP CHARACTERISTICS
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Process", value: "AI/ML" },
                  { label: "TDP", value: "∞ Coffee" },
                  { label: "Interface", value: "Full-Stack" },
                  { label: "Clock", value: "24/7" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div
                      style={{
                        fontSize: "0.55rem",
                        color: "var(--muted)",
                        letterSpacing: "0.1em",
                        fontFamily: "var(--font-geist-mono)",
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--orange)",
                        fontFamily: "var(--font-geist-mono)",
                        fontWeight: 600,
                      }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
