"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";

const COLORS = {
  "orange": {
    color: "#f97316",
    colorDim: "rgba(249,115,22,0.12)",
  },
  "purple": {
    color: "#a855f7",
    colorDim: "rgba(168,85,247,0.12)",
  },
  "cyan": {
    color: "#22d3ee",
    colorDim: "rgba(34,211,238,0.12)",
  },
  "pink": {
    color: "#f472b6",
    colorDim: "rgba(244,114,182,0.12)",
  },
}
const PROJECTS = [
  {
    id: "cuda-gpt",
    name: "CUDA GPT",
    tagline: "GPT-style Transformer built in raw C++/CUDA",
    tech: ["CUDA", "C++", "Nsight Compute", "Transformers", "RTX 5080"],
    color: COLORS.orange.color,
    colorDim: COLORS.orange.colorDim,
    category: "COMPUTE",
    bank: "BANK-0",
    capacity: "96 GB",
    size: "large" as const,
    bullets: [
      "GPT-style Transformer inference and training engine from the ground up in C++/CUDA, bypassing high-level libraries (PyTorch/TensorFlow/Thrust)",
      "Fused Multi-Head Attention & LayerNorm reducing global memory round-trips and maximizing arithmetic intensity",
      "GEMM optimization via shared memory tiling, double buffering, vectorized float4 loads",
      "Softmax & Cross-Entropy with intra-warp reductions for memory-efficient backprop",
      "Profiled on NVIDIA Blackwell (RTX 5080) via Nsight Compute — resolved cache bottlenecks",
    ],
    links: { github: "#" },
    status: "IN_PROGRESS",
  },
  {
    id: "sqlengine",
    name: "GPU-Accelerated SQL Query Engine",
    tagline: "GPU-accelerated SQL query engine for large-scale data processing",
    tech: ["CUDA", "C++", "SQL", "Nsight Compute", "Transformers", "RTX 5080"],
    color: COLORS.orange.color,
    colorDim: COLORS.orange.colorDim,
    category: "COMPUTE",
    bank: "BANK-1",
    capacity: "64 GB",
    size: "large" as const,
    bullets: [
      "GPU-accelerated SQL query engine for large-scale data processing",
      "Profiled on NVIDIA Blackwell (RTX 5080) via Nsight Compute — resolved cache bottlenecks",
    ],
    links: {},
    status: "IN_PROGRESS",

  },
  {
    id: "gemma",
    name: "DebugERR",
    tagline: "Fine-tuned LLM for automatically detecting errors and providing actionable fixes",
    tech: ["Python", "LangChain", "LoRA", "Gemma 4", "Testing"],
    color: COLORS.pink.color,
    colorDim: COLORS.pink.colorDim,
    category: "LLM",
    bank: "BANK-2",
    capacity: "48 GB",
    size: "medium" as const,
    bullets: [
      "Fine-tuned Gemma 4 model with QLoRA and RLHF for error detection and code repair in software codebases",
      "Developed a pipeline that maps stack traces and error messages to likely root causes and generates targeted code fixes using the fine-tuned model",
    ],
    links: {},
    status: "IN_PROGRESS",
  },
  {
    id: "melm",
    name: "MeLM",
    tagline: "Fine-tuned LLM replicating personal style",
    tech: ["Python", "LangChain", "LoRA", "Llama 3.1 8B", "RTX A4500"],
    color: COLORS.pink.color,
    colorDim: COLORS.pink.colorDim,
    category: "LLM",
    bank: "BANK-3",
    capacity: "48 GB",
    size: "medium" as const,
    bullets: [
      "Reverse-engineered iMessage SQLite schema with SQL-based data extraction pipelines for entity data",
      "Fine-tuned Llama 3.1 8B with LoRA on RTX A4500 to replicate personal linguistic style",
    ],
    links: { github: "#" },
    status: "RESEARCH",
  },
  {
    id: "vex",
    name: "VEX 750B",
    tagline: "Competition robot with autonomous path tracking",
    tech: ["C++", "PROS", "PID", "React Native"],
    color: COLORS.cyan.color,
    colorDim: COLORS.cyan.colorDim,
    category: "ROBOTICS",
    bank: "BANK-4",
    capacity: "32 GB",
    size: "medium" as const,
    bullets: [
      "Modular robot control framework with PID motion tuning, Odometry, and Pure Pursuit path tracking",
      "React Native scouting app with optimized heuristics to predict match performance from live telemetry data",
    ],
    links: { github: "#" },
    status: "COMPLETE",
  },
  
  {
    id: "snn",
    name: "SNN Quadruped Locomotion",
    tagline: "Diffusion-generated quadruped locomotion with SNN temporal extractors",
    tech: ["Python", "Gymnasium", "Torch", "Mujoco", "PPO", "SNN"],
    color: COLORS.orange.color,
    colorDim: COLORS.orange.colorDim,
    category: "ROBOTICS",
    bank: "BANK-5",
    capacity: "32 GB",
    size: "medium" as const,
    bullets: [
      "Designed a hybrid locomotion system with adaptive spiking neural networks (ALIF) as temporal extractors",
      "Trained diffusion models on path trajectories in Mujoco quadruped environments",
      "Combined temporal extractors with PPO to generate efficient locomotion policies",
    ],
    links: { github: "#" },
    status: "RESEARCH",
  },
  {
    id: "reflev",
    name: "Reflevapp.com",
    tagline: "AI journaling with mood intelligence",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Llama 3.2", "Zustand"],
    color: COLORS.purple.color,
    colorDim: COLORS.purple.colorDim,
    category: "FULLSTACK",
    bank: "BANK-6",
    capacity: "64 GB",
    size: "medium" as const,
    bullets: [
      "AI-driven journaling platform with automatic mood classification and semantic tag extraction using Llama 3.2",
      "LLM companion with context-aware responses via RAG and semantic embedding search pipelines",
      "Query restructuring pipeline transforming free-form messages into structured semantic outputs for reliable intent extraction",
      "Personalized adaptive room space with mood-based lighting and customizable badge accessories",
    ],
    links: { live: "https://reflevapp.com" },
    status: "DEPLOYED",
  },
  {
    id: "kanzure",
    name: "Kanzure.com",
    tagline: "Modern productivity suite for integrated task management",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Supabase", "Vercel", "Google OAuth"],
    color: COLORS.purple.color,
    colorDim: COLORS.purple.colorDim,
    category: "FULLSTACK",
    bank: "BANK-7",
    capacity: "64 GB",
    size: "medium" as const,
    bullets: [
      "Jira-inspired productivity platform featuring time blocking, task management, and Kanban workflows",
      "Implemented custom OAuth2 authentication, user analytics, and calendar integrations with Google API",
      "Designed custom session tracking and role-based access control (RLS) to enforce data isolation",
    ],
    links: { live: "https://kanzure.com" },
    status: "DEPLOYED",
  },
  {
    id: "kernelsearch",
    name: "Kernel Configuration Search",
    tagline: "Automated CUDA kernel performance exploration",
    tech: ["CUDA", "C++", "Nsight Compute", "Transformers", "RTX 5080"],
    color: COLORS.orange.color,
    colorDim: COLORS.orange.colorDim,
    category: "COMPUTE",
    bank: "BANK-8",
    capacity: "64 GB",
    size: "medium" as const,
    bullets: [
      "Designed a CUDA kernel performance exploration system that automates structured parameter sweeps across execution configurations",
      "Supports block size, warp scheduling, memory tiling hierarchy, and grid decomposition strategies",
    ],
    links: {},
    status: "IN_PROGRESS",
  },
  {
    id: "mentalth",
    name: "Mentalth",
    tagline: "AI-powered Discord moderation bot for mental health",
    tech: ["Node.js", "Python", "Keras", "TensorFlow.js", "Word2Vec", "LSTM", "NLP", "Discord.js"],
    color: COLORS.pink.color,
    colorDim: COLORS.pink.colorDim,
    category: "NLP",
    bank: "BANK-9",
    capacity: "48 GB",
    size: "medium" as const,
    bullets: [
      "Built Mentalth, an AI-powered Discord bot for real-time detection of cyberbullying and mental health risk signals across user conversations",
      "Developed a dual-model architecture combining a TensorFlow toxicity classifier (Node.js) and a custom NLP pipeline (Python + Keras) for depression and suicide risk detection",
      "Trained a hybrid NLP model (Word2Vec embeddings + CNN + LSTM) on combined Twitter and sentiment datasets to classify depressive language patterns",
      "Implemented end-to-end data pipeline including data collection, preprocessing (stemming, tokenization), embedding generation, and model serialization for production use",
    ],
    links: { github: "https://github.com/SatvikVejendla/Mentalth" },
    status: "COMPLETE",
  },
  {
    id: "neatjs",
    name: "Neat.js",
    tagline: "NeuroEvolution of Augmenting Topologies from Scratch in JavaScript",
    tech: ["JavaScript", "Node.js"],
    color: COLORS.cyan.color,
    colorDim: COLORS.cyan.colorDim,
    category: "AI",
    bank: "BANK-10",
    capacity: "48 GB",
    size: "medium" as const,
    bullets: [
      "Implemented NeuroEvolution of Augmenting Topologies (NEAT) from scratch in JavaScript, creating a flexible and extensible framework for evolving artificial neural networks",
      "Built genetic algorithm components including mutation, crossover, and speciation to evolve neural network architectures over generations",
      "Designed dynamic network topology evolution, enabling models to grow in complexity through node and connection mutations",
      "Packaged and published as an npm module for reusable experimentation with evolutionary AI methods",
    ],
    links: { github: "https://github.com/SatvikVejendla/neat-js" },
    status: "COMPLETE",
  }
];

const STATUS_COLORS: Record<string, string> = {
  IN_PROGRESS: "var(--green)",
  DEPLOYED: "var(--cyan)",
  COMPLETE: "var(--purple)",
  RESEARCH: "var(--orange)",
};

type Project = typeof PROJECTS[0];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 120, damping: 18 }}
        className="relative gpu-panel w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
        style={{
          borderRadius: "5px",
          borderColor: `color-mix(in srgb, ${project.color} 45%, var(--border))`,
          boxShadow: `0 0 20px color-mix(in srgb, ${project.color} 20%, transparent), 0 25px 50px rgba(0,0,0,0.6)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div
          style={{
            height: "2px",
            boxShadow: `0 0 10px ${project.color}`,
            flexShrink: 0,
          }}
        />

        <div className="p-6 flex flex-col gap-4 overflow-y-auto flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.3em",
                  color: project.color,
                  fontFamily: "var(--font-geist-mono)",
                  opacity: 0.8,
                }}
              >
                {project.bank} // {project.category}
              </span>
              <h3
                style={{
                  fontSize: "1.8rem",
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
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
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
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: STATUS_COLORS[project.status],
                    boxShadow: `0 0 6px ${STATUS_COLORS[project.status]}`,
                    display: "inline-block",
                  }}
                />
                {project.status.replace("_", " ")}
              </span>
              <div>
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: project.color,
                    fontFamily: "var(--font-geist-mono)",
                    lineHeight: 1,
                    textAlign: "right",
                  }}
                >
                  {project.capacity}
                </div>
                <div
                  style={{
                    fontSize: "0.5rem",
                    color: "var(--muted)",
                    letterSpacing: "0.2em",
                    fontFamily: "var(--font-geist-mono)",
                    textAlign: "right",
                  }}
                >
                  VRAM ALLOC
                </div>
              </div>
            </div>
          </div>

          {/* Bullets */}
          <div
            style={{
              fontSize: "0.55rem",
              letterSpacing: "0.3em",
              color: project.color,
              fontFamily: "var(--font-geist-mono)",
              opacity: 0.7,
            }}
          >
            DETAILED SPECS
          </div>
          <ul className="flex flex-col gap-3">
            {project.bullets.map((b, i) => (
              <li
                key={i}
                className="flex gap-3"
                style={{
                  fontSize: "0.7rem",
                  color: "var(--muted-bright)",
                  fontFamily: "var(--font-geist-mono)",
                  lineHeight: 1.65,
                }}
              >
                <span style={{ color: project.color, flexShrink: 0, marginTop: "1px" }}>▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          
          {/* Full tech stack */}
          <div
            className="flex flex-wrap gap-1.5 py-3"
            style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
          >
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "0.6rem",
                  padding: "3px 8px",
                  border: `1px solid color-mix(in srgb, ${project.color} 35%, var(--border))`,
                  color: project.color,
                  letterSpacing: "0.08em",
                  fontFamily: "var(--font-geist-mono)",
                  background: `color-mix(in srgb, ${project.color} 8%, transparent)`,
                }}
              >
                {t}
              </span>
            ))}
          </div>


          {/* Footer: links + close */}
          <div className="flex items-center justify-between pt-3 mt-auto" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex gap-3">
              {"github" in project.links && project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.6rem",
                    color: project.color,
                    textDecoration: "none",
                    letterSpacing: "0.15em",
                    border: `1px solid ${project.color}`,
                    padding: "4px 12px",
                    fontFamily: "var(--font-geist-mono)",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = `color-mix(in srgb, ${project.color} 15%, transparent)`)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  [GITHUB]
                </a>
              )}
              {"live" in project.links && project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.6rem",
                    color: project.color,
                    textDecoration: "none",
                    letterSpacing: "0.15em",
                    border: `1px solid ${project.color}`,
                    padding: "4px 12px",
                    fontFamily: "var(--font-geist-mono)",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = `color-mix(in srgb, ${project.color} 15%, transparent)`)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  [LIVE DEMO]
                </a>
              )}
            </div>
            <button
              onClick={onClose}
              style={{
                fontSize: "0.6rem",
                color: "var(--muted)",
                letterSpacing: "0.2em",
                background: "none",
                border: "1px solid var(--border)",
                padding: "4px 12px",
                fontFamily: "var(--font-geist-mono)",
                cursor: "pointer",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--muted)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              [ESC] CLOSE
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const visibleTech = project.tech.slice(0, 3);
  const hiddenCount = project.tech.length - 3;
  const isLarge = project.size === "large";
  const isMedium = project.size === "medium";
  const minH = isLarge ? "280px" : isMedium ? "260px" : "220px";
  const nameSize = isLarge ? "1.6rem" : isMedium ? "1.35rem" : "1.15rem";
  const capacitySize = isLarge ? "1.5rem" : isMedium ? "1.2rem" : "1rem";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 100 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="relative gpu-panel flex flex-col overflow-hidden cursor-pointer h-full"
      style={{
        borderColor: hovered
          ? `color-mix(in srgb, ${project.color} 55%, var(--border))`
          : `color-mix(in srgb, ${project.color} 30%, var(--border))`,
        background: `linear-gradient(135deg, ${project.colorDim} 0%, var(--surface) 60%)`,
        minHeight: minH,
        boxShadow: hovered ? `0 0 24px color-mix(in srgb, ${project.color} 15%, transparent)` : "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      {/* Top accent */}
      <div
        style={{
          height: "2px",
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
          boxShadow: `0 0 8px ${project.color}`,
          flexShrink: 0,
        }}
      />

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Top row: bank/category + status */}
        <div className="flex items-center justify-between">
          <span
            style={{
              fontSize: "0.55rem",
              letterSpacing: "0.25em",
              color: project.color,
              fontFamily: "var(--font-geist-mono)",
              opacity: 0.75,
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
                boxShadow: `0 0 5px ${STATUS_COLORS[project.status]}`,
                display: "inline-block",
              }}
            />
            {project.status.replace("_", " ")}
          </span>
        </div>

        {/* Name + tagline */}
        <div className="flex flex-col gap-1.5">
          <h3
            style={{
              fontSize: nameSize,
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
              fontSize: "0.68rem",
              color: "var(--muted-bright)",
              fontFamily: "var(--font-geist-mono)",
              lineHeight: 1.5,
            }}
          >
            {project.tagline}
          </p>
        </div>

        {/* Capacity stat */}
        <div className="mt-1">
          <div
            style={{
              fontSize: capacitySize,
              fontWeight: 700,
              color: project.color,
              fontFamily: "var(--font-geist-mono)",
              textShadow: `0 0 0px ${project.color}`,
              lineHeight: 1,
            }}
          >
            {project.capacity}
          </div>
          <div
            style={{
              fontSize: "0.48rem",
              color: "var(--muted)",
              letterSpacing: "0.2em",
              fontFamily: "var(--font-geist-mono)",
              marginTop: "2px",
            }}
          >
            VRAM ALLOC
          </div>
        </div>

        {/* Tech tags (first 3 + overflow badge) */}
        <div
          className="flex flex-wrap items-center gap-1.5 mt-auto pt-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {visibleTech.map((t) => (
            <span
              key={t}
              style={{
                fontSize: "0.58rem",
                padding: "2px 7px",
                border: `1px solid color-mix(in srgb, ${project.color} 22%, var(--border))`,
                color: "var(--muted-bright)",
                letterSpacing: "0.07em",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              {t}
            </span>
          ))}
          {hiddenCount > 0 && (
            <span
              style={{
                fontSize: "0.55rem",
                padding: "2px 7px",
                border: `1px solid color-mix(in srgb, ${project.color} 22%, var(--border))`,
                color: project.color,
                letterSpacing: "0.07em",
                fontFamily: "var(--font-geist-mono)",
                opacity: 0.8,
              }}
            >
              +{hiddenCount}
            </span>
          )}
        </div>

        {/* Expand hint */}
        <div
          className="flex items-center gap-1.5"
          style={{
            fontSize: "0.5rem",
            color: "var(--muted)",
            letterSpacing: "0.2em",
            fontFamily: "var(--font-geist-mono)",
            marginTop: "6px",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          <span style={{ color: project.color }}>▸</span>
          CLICK TO EXPAND
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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
          <div className="section-label mb-4">VRAM BANKS // ALLOCATED MEMORY</div>
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
              <div>CLICK A CARD TO LOAD FULL SPECS</div>
              <div style={{ color: "var(--purple)", marginTop: "4px" }}>
                {PROJECTS.length} BANKS ACTIVE · MORE LOADING...
              </div>
            </div>
          </div>
        </div>

        {/* Project grid — 6 cols at xl, 3 cols at md, 1 col at sm */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-5">
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className={
                project.size === "large"
                  ? "md:col-span-3 xl:col-span-3 h-full"
                  : project.size === "medium"
                  ? "md:col-span-2 xl:col-span-2 h-full"
                  : "md:col-span-1 xl:col-span-1 h-full"
              }
            >
              <ProjectCard
                project={project}
                index={i}
                onOpen={() => setActiveProject(project)}
              />
            </div>
          ))}
        </div>

      </motion.div>

      {/* Modal portal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
