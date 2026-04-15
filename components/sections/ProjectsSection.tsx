"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: "cuda-gpt",
    name: "CUDA GPT",
    tagline: "Transformer engine from bare metal",
    tech: ["CUDA", "C++", "Nsight Compute", "RTX 5080"],
    color: "#f97316",
    colorDim: "rgba(249,115,22,0.12)",
    category: "COMPUTE",
    bank: "BANK-0",
    capacity: "96 GB",
    bandwidth: "5.2 TB/s",
    bullets: [
      "GPT-style Transformer inference & training engine in pure C++/CUDA — zero PyTorch/TF/Thrust",
      "Fused Multi-Head Attention & LayerNorm reducing global memory round-trips and maximizing arithmetic intensity",
      "GEMM optimization via shared memory tiling, double buffering, vectorized float4 loads to saturate memory BW",
      "Warp-level Softmax & Cross-Entropy with intra-warp reductions for memory-efficient backprop",
      "Profiled on NVIDIA Blackwell (RTX 5080) via Nsight Compute — resolved cache bottlenecks",
    ],
    links: { github: "#" },
    status: "ACTIVE",
  },
  {
    id: "reflev",
    name: "Reflevapp.com",
    tagline: "AI journaling with mood intelligence",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Llama 3.2", "Zustand"],
    color: "#a855f7",
    colorDim: "rgba(168,85,247,0.12)",
    category: "AI / FULLSTACK",
    bank: "BANK-1",
    capacity: "64 GB",
    bandwidth: "3.2 TB/s",
    bullets: [
      "AI-driven journaling with automatic mood classification and semantic tag extraction using Llama 3.2",
      "LLM companion with context-aware responses via RAG and semantic embedding search pipelines",
      "Query restructuring pipeline transforming free-form messages into structured semantic outputs for reliable intent extraction",
    ],
    links: { live: "https://reflevapp.com" },
    status: "LIVE",
  },
  {
    id: "vex",
    name: "VEX 750B",
    tagline: "Competition robot with autonomous path tracking",
    tech: ["C++", "PROS", "PID", "React Native"],
    color: "#22d3ee",
    colorDim: "rgba(34,211,238,0.12)",
    category: "ROBOTICS",
    bank: "BANK-2",
    capacity: "32 GB",
    bandwidth: "1.8 TB/s",
    bullets: [
      "Modular robot control framework with PID motion tuning, Odometry, and Pure Pursuit path tracking",
      "React Native scouting app with optimized heuristics to predict match performance from live telemetry data",
    ],
    links: { github: "#" },
    status: "COMPLETE",
  },
  {
    id: "melm",
    name: "MeLM",
    tagline: "Fine-tuned LLM replicating personal style",
    tech: ["Python", "LangChain", "LoRA", "Llama 3.1 8B"],
    color: "#f472b6",
    colorDim: "rgba(244,114,182,0.12)",
    category: "AI / NLP",
    bank: "BANK-3",
    capacity: "48 GB",
    bandwidth: "2.4 TB/s",
    bullets: [
      "Reverse-engineered iMessage SQLite schema with SQL-based data extraction pipelines for entity data",
      "Fine-tuned Llama 3.1 8B with LoRA on RTX A4500 to replicate personal linguistic style",
    ],
    links: { github: "#" },
    status: "RESEARCH",
  },
];

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "var(--green)",
  LIVE: "var(--cyan)",
  COMPLETE: "var(--purple)",
  RESEARCH: "var(--orange)",
};

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
      className="relative"
      style={{ perspective: "1200px", cursor: "pointer", minHeight: "380px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        style={{ transformStyle: "preserve-3d", height: "100%", minHeight: "380px" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 gpu-panel flex flex-col overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            borderColor: `color-mix(in srgb, ${project.color} 35%, var(--border))`,
            background: `linear-gradient(135deg, ${project.colorDim} 0%, var(--surface) 50%)`,
          }}
        >
          {/* Top accent */}
          <div
            style={{
              height: "2px",
              background: `linear-gradient(90deg, ${project.color}, transparent)`,
              boxShadow: `0 0 8px ${project.color}`,
            }}
          />

          <div className="p-5 flex flex-col gap-3 flex-1">
            {/* Bank label */}
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.3em",
                  color: project.color,
                  fontFamily: "var(--font-geist-mono)",
                  opacity: 0.7,
                }}
              >
                {project.bank} // {project.category}
              </span>
              <span
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  color: STATUS_COLORS[project.status],
                  fontFamily: "var(--font-geist-mono)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: STATUS_COLORS[project.status],
                    boxShadow: `0 0 4px ${STATUS_COLORS[project.status]}`,
                    display: "inline-block",
                  }}
                />
                {project.status}
              </span>
            </div>

            {/* Name */}
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 900,
                color: "var(--text)",
                fontFamily: "var(--font-geist-sans)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {project.name}
            </h3>
            <p
              style={{
                fontSize: "0.72rem",
                color: "var(--muted-bright)",
                fontFamily: "var(--font-geist-mono)",
                lineHeight: 1.5,
              }}
            >
              {project.tagline}
            </p>

            {/* Memory specs */}
            <div className="flex gap-4 mt-1">
              {[
                { label: "CAPACITY", value: project.capacity },
                { label: "BANDWIDTH", value: project.bandwidth },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: project.color,
                      fontFamily: "var(--font-geist-mono)",
                      textShadow: `0 0 8px ${project.color}`,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.5rem",
                      color: "var(--muted)",
                      letterSpacing: "0.2em",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mt-auto pt-3" style={{ borderTop: "1px solid var(--border)" }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "0.6rem",
                    padding: "2px 6px",
                    border: `1px solid color-mix(in srgb, ${project.color} 25%, var(--border))`,
                    color: "var(--muted-bright)",
                    letterSpacing: "0.08em",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Click hint */}
            <div
              style={{
                fontSize: "0.55rem",
                color: "var(--muted)",
                letterSpacing: "0.2em",
                textAlign: "center",
                fontFamily: "var(--font-geist-mono)",
                marginTop: "4px",
              }}
            >
              CLICK TO READ SPECS →
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 gpu-panel flex flex-col overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            rotateY: "180deg",
            transform: "rotateY(180deg)",
            borderColor: `color-mix(in srgb, ${project.color} 35%, var(--border))`,
            background: `linear-gradient(135deg, var(--surface) 0%, ${project.colorDim} 100%)`,
          }}
        >
          <div
            style={{
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${project.color})`,
              boxShadow: `0 0 8px ${project.color}`,
            }}
          />
          <div className="p-5 flex flex-col gap-3 flex-1 overflow-y-auto">
            <div
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
                color: project.color,
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              DETAILED SPECS // {project.name}
            </div>
            <ul className="flex flex-col gap-2.5 flex-1">
              {project.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex gap-2"
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--muted-bright)",
                    fontFamily: "var(--font-geist-mono)",
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: project.color, flexShrink: 0 }}>▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {/* Links */}
            <div className="flex gap-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
              {project.links.github && (
                <a
                  href={project.links.github}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontSize: "0.6rem",
                    color: project.color,
                    textDecoration: "none",
                    letterSpacing: "0.15em",
                    border: `1px solid ${project.color}`,
                    padding: "3px 10px",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  [GITHUB]
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontSize: "0.6rem",
                    color: project.color,
                    textDecoration: "none",
                    letterSpacing: "0.15em",
                    border: `1px solid ${project.color}`,
                    padding: "3px 10px",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  [LIVE DEMO]
                </a>
              )}
            </div>
            <div
              style={{
                fontSize: "0.55rem",
                color: "var(--muted)",
                letterSpacing: "0.2em",
                textAlign: "center",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              ← CLICK TO FLIP BACK
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.7], [0.7, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const blurPx = useTransform(scrollYProgress, [0, 0.5], [8, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-24 overflow-hidden"
      style={{ background: "var(--surface-2)" }}
    >
      {/* Background memory pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      <motion.div
        style={{ scale, opacity, filter }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-16"
      >
        {/* Header */}
        <div className="mb-12">
          <div className="section-label mb-4">
            VRAM BANKS // ALLOCATED MEMORY
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
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
              PROJECTS
              <br />
              <span
                style={{
                  color: "var(--purple)",
                  textShadow: "0 0 40px rgba(168,85,247,0.4)",
                }}
              >
                ALLOCATED
              </span>
            </h2>
            <div
              style={{
                fontSize: "0.65rem",
                color: "var(--muted)",
                fontFamily: "var(--font-geist-mono)",
                letterSpacing: "0.1em",
              }}
            >
              <div>CLICK CARDS TO FLIP FOR DETAILS</div>
              <div style={{ color: "var(--purple)", marginTop: "4px" }}>
                {PROJECTS.length} BANKS ACTIVE · MORE LOADING...
              </div>
            </div>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Memory address bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex items-center gap-4 overflow-x-auto"
          style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem" }}
        >
          <span style={{ color: "var(--muted)", letterSpacing: "0.2em", flexShrink: 0 }}>
            MEM ADDR:
          </span>
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              style={{
                padding: "4px 12px",
                border: `1px solid color-mix(in srgb, ${p.color} 30%, var(--border))`,
                color: p.color,
                letterSpacing: "0.1em",
                flexShrink: 0,
              }}
            >
              0x{(i * 0x1000 + 0xA000).toString(16).toUpperCase()} [{p.bank}]
            </div>
          ))}
          <span style={{ color: "var(--muted)", opacity: 0.5 }}>...</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
