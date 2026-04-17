"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";


const EDUCATION = [
  {
    school: "Northwestern University",
    degree: "M.S. Computer Science",
    focus: "Concentration: AI / Machine Learning",
    period: "Sep 2026 – May 2027 (Expected)",
    location: "Evanston, IL",
    color: "#3a1d57",
    icon: "/northwestern.png",
  },
  {
    school: "Rutgers University – Honors College",
    degree: "B.S. Computer Science · Minor in Data Science",
    focus: "Dean's List · Honors College Scholar with Distinction",
    period: "Sep 2023 – May 2026",
    location: "New Brunswick, NJ",
    color: "#570116",
    icon: "/rutgers.png",
  },
];

const COURSES = [
  "Data Structures",
  "Multivariable Calculus",
  "Computer Architecture",
  "Computer Algorithms",
  "Statistical Inference",
  "Data Science",
  "Artificial Intelligence (Grad)",
  "Computer Graphics (Grad)",
  "Computational Robotics (Grad)",
  "Brain-Inspired Computing (Grad)",
  "Reinforcement Learning (Grad)",
];

function SchoolLogo({ school, icon }: { school: string; icon: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 34,
        height: 34,
      }}
    >
      <Image
        src={icon}
        alt={`${school} logo`}
        width={34}
        height={34}
        style={{ borderRadius: 8, display: "block" }}
      />
    </div>
  );
}

const PERFORMANCE_METRICS = [
  { label: "Languages & Frameworks", value: "20+", color: "var(--purple)" },
  { label: "Projects", value: "30+", color: "var(--cyan)" },
  { label: "Internships", value: "14 months", color: "var(--green)" },
  { label: "Years of Coding", value: "7 years", color: "var(--orange)" },
];

function MetricBar({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center" style={{ fontSize: "0.75rem" }}>
        <span style={{ color: "var(--muted-bright)", letterSpacing: "0.08em", fontFamily: "var(--font-geist-mono)" }}>
          {label}
        </span>
        <span style={{ color, fontWeight: 800, fontFamily: "var(--font-geist-mono)", textShadow: `0 0 0px ${color}` }}>
          {value}
        </span>
      </div>
      <div className="gpu-progress-bar">
      </div>
    </div>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Overall section entrance
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.6], [0.9, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25], [50, 0]);

  // Background die zooms in opposite
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1.4, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7], [0, 0.12, 0.06]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 overflow-hidden"
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
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-16"
      >
        {/* Header */}
        <div className="mb-12">
          <div className="section-label mb-4">
            DEVICE SPECS // UNIT PROFILE
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
            <span style={{ color: "var(--purple)", textShadow: "0 0 40px rgba(168,85,247,0.4)" }}>
              OVERVIEW
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-8 gap-12">
          {/* Left: Bio terminal */}
          <div className="lg:col-span-4 flex flex-col gap-8">
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
                  I'm pursuing my Master's in Computer Science at Northwestern University,
                  focused on GPU systems and machine learning.
                  I've received my B.S. in Computer Science from Rutgers University Honors College.
                </p>
                <p className="mt-3" style={{ color: "var(--text)" }}>
                  I have experience working on production software systems in industry settings,
                  including machine learning pipelines, LLM evaluation frameworks, backend APIs,
                  and data infrastructure.

                </p>
                <p className="mt-3" style={{ color: "var(--text)" }}>
                  My passions sit at the intersection of systems and machine learning,
                  which I hope to explore further at Northwestern University. I'm
                  especially interested in working on optimizing GPU performance of ML models by bypassing high-level abstractions
                  to engage directly with performance and hardware efficiency.

                </p>
                <p className="mt-4">
                  <span style={{ color: "var(--cyan)" }}>$&gt;</span>{" "}
                  <span style={{ color: "var(--green)" }}>interests</span>
                </p>
                <p className="mt-2">
                  {[
                    "LLM Systems",
                    "Parallel Computing",
                    "GPU Optimization",
                    "RL / Robotics",
                    "Reinforcement Learning",
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

            {/* Performance metrics (moved under Bio) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="gpu-panel gpu-panel-purple corner-marks p-6 w-full"
            >
              <div
                className="flex items-center justify-between mb-4 pb-3"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.25em",
                    color: "var(--purple)",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  PERFORMANCE METRICS
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {PERFORMANCE_METRICS.map((m) => (
                  <MetricBar key={m.label} {...m} />
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right: Education + Coursework + Passions */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="section-label" style={{ marginBottom: "-6px" }}>
              EDUCATION
            </div>
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
                <div
                  className="mb-3"
                  style={{
                    padding: "12px",
                    border: "1px solid var(--border)",
                    background: `${edu.color}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <SchoolLogo school={edu.school} icon={edu.icon} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="flex items-baseline justify-between gap-3">
                        <h3
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: 800,
                            color: "var(--text)",
                            letterSpacing: "0.04em",
                            fontFamily: "var(--font-geist-mono)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {edu.school}
                        </h3>
                      </div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text)",
                          fontFamily: "var(--font-geist-mono)",
                          marginTop: "4px",
                        }}
                      >
                        {edu.degree}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Period moved below, outside the shared header background */}
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted-bright)",
                    letterSpacing: "0.08em",
                    fontFamily: "var(--font-geist-mono)",
                    marginBottom: "10px",
                  }}
                >
                  {edu.period}
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted-bright)",
                    fontFamily: "var(--font-geist-mono)",
                    marginBottom: "8px",
                  }}
                >
                  {edu.focus}
                </div>

                {/* Coursework (embedded into Rutgers card) */}
                {edu.school.includes("Rutgers") && (
                  <div className="mt-4" style={{ borderTop: "1px solid var(--border)", paddingTop: "10px" }}>
                    <div
                      style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.25em",
                        color: "var(--cyan)",
                        fontFamily: "var(--font-geist-mono)",
                        marginBottom: "8px",
                      }}
                    >
                      COURSEWORK
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {COURSES.map((course) => (
                        <span
                          key={course}
                          style={{
                            padding: "3px 8px",
                            border: "1px solid var(--border)",
                            fontSize: "0.62rem",
                            letterSpacing: "0.06em",
                            color: "var(--muted-bright)",
                            fontFamily: "var(--font-geist-mono)",
                          }}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {/* location moved to header right */}
              </motion.div>
            ))}

            {/* Passions (renamed from Chip Characteristics) */}
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
                FAVORITES
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Movie", value: "Dune: Part Two" },
                  { label: "Artist", value: "Kid Cudi" },
                  { label: "Game", value: "Hollow Knight: Silksong" },
                  { label: "Show", value: "Arcane" },
                  { label: ""}

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
