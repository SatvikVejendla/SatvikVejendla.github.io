"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "SATVIK VEJENDLA GPU ARCHITECTURE v2026.1", delay: 0, color: "var(--muted)" },
  { text: "Copyright (C) 2026 Satvik Vejendla. All rights reserved.", delay: 400, color: "var(--muted)" },
  { text: "", delay: 700 },
  { text: "Detecting compute cores.......... [16,384 CUDA / 512 Tensor]", delay: 900, color: "var(--green)" },
  { text: "Verifying VRAM.................. [96 GB HBM4 @ 5.2 TB/s   ]", delay: 1400, color: "var(--green)" },
  { text: "Calibrating AI Engine........... [9.8 PFLOPS FP8 Sparse    ]", delay: 1900, color: "var(--cyan)" },
  { text: "Loading ML Frameworks........... [TensorFlow / PyTorch / LLM]", delay: 2300, color: "var(--cyan)" },
  { text: "Establishing PCIe link.......... [x16 Gen 6 @ 128 GB/s     ]", delay: 2700, color: "var(--purple)" },
  { text: "", delay: 3000 },
  { text: "System ready. Launching portfolio interface...", delay: 3200, color: "var(--orange)" },
];

const SPEC_METRICS = [
  { label: "Languages", value: "12+", bar: 92, color: "var(--cyan)" },
  { label: "Frameworks", value: "15+", bar: 88, color: "var(--purple)" },
  { label: "Internships", value: "3", bar: 75, color: "var(--green)" },
  { label: "LLM / AI Ops", value: "Expert", bar: 95, color: "var(--pink)" },
  { label: "CUDA / Compute", value: "Deep", bar: 80, color: "var(--orange)" },
];

function useTerminalBoot() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    BOOT_LINES.forEach(({ delay }, idx) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, idx]);
      }, delay);
    });
    setTimeout(() => setBootDone(true), 3800);
  }, []);

  return { visibleLines, bootDone };
}

function Particle({ x, y, size, duration, delay, color }: ParticleData) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
      animate={{
        y: [0, -20, 10, -5, 0],
        x: [0, 8, -5, 3, 0],
        opacity: [0.2, 0.8, 0.4, 0.9, 0.2],
        scale: [1, 1.4, 0.8, 1.2, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

const PARTICLE_COLORS = [
  "rgba(34,211,238,0.7)",
  "rgba(168,85,247,0.7)",
  "rgba(74,222,128,0.5)",
  "rgba(249,115,22,0.5)",
];

type ParticleData = {
  x: number; y: number; size: number; duration: number; delay: number; color: string;
};

function makeParticles(): ParticleData[] {
  return Array.from({ length: 40 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 4,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
  }));
}

function GpuDieArt() {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Outer chip package */}
      <rect x="10" y="10" width="300" height="300" rx="8" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" />
      <rect x="20" y="20" width="280" height="280" rx="4" fill="rgba(7,7,26,0.8)" stroke="rgba(34,211,238,0.15)" strokeWidth="1" />

      {/* Compute clusters - GPC rows */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3, 4].map((col) => (
          <rect
            key={`core-${row}-${col}`}
            x={30 + col * 38}
            y={30 + row * 38}
            width={30}
            height={30}
            rx="2"
            fill="rgba(34,211,238,0.06)"
            stroke="rgba(34,211,238,0.2)"
            strokeWidth="0.5"
          />
        ))
      )}

      {/* Memory controllers - right column */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={`mem-${i}`}
          x={232}
          y={30 + i * 30}
          width={58}
          height={22}
          rx="1"
          fill="rgba(168,85,247,0.08)"
          stroke="rgba(168,85,247,0.25)"
          strokeWidth="0.5"
        />
      ))}

      {/* Bottom compute row */}
      {[0, 1, 2, 3].map((col) => (
        <rect
          key={`bot-${col}`}
          x={30 + col * 50}
          y={204}
          width={42}
          height={42}
          rx="2"
          fill="rgba(74,222,128,0.05)"
          stroke="rgba(74,222,128,0.2)"
          strokeWidth="0.5"
        />
      ))}

      {/* Command processor (center-bottom) */}
      <rect x="30" y="258" width="192" height="40" rx="3"
        fill="rgba(249,115,22,0.07)"
        stroke="rgba(249,115,22,0.25)"
        strokeWidth="0.8"
      />
      <text x="126" y="282" textAnchor="middle" fill="rgba(249,115,22,0.6)" fontSize="7" fontFamily="monospace">COMMAND PROCESSOR</text>

      {/* Cache label */}
      <text x="261" y="216" textAnchor="middle" fill="rgba(168,85,247,0.5)" fontSize="6" fontFamily="monospace">L3 CACHE</text>

      {/* Memory label */}
      <rect x="232" y="210" width="58" height="48" rx="2"
        fill="rgba(168,85,247,0.08)"
        stroke="rgba(168,85,247,0.25)"
        strokeWidth="0.5"
      />
      <text x="261" y="238" textAnchor="middle" fill="rgba(168,85,247,0.5)" fontSize="5.5" fontFamily="monospace">HBM4</text>
      <text x="261" y="248" textAnchor="middle" fill="rgba(168,85,247,0.4)" fontSize="5" fontFamily="monospace">96 GB</text>

      {/* PCIe connector at bottom */}
      {Array.from({ length: 18 }).map((_, i) => (
        <rect
          key={`pcie-${i}`}
          x={30 + i * 13}
          y={302}
          width={8}
          height={6}
          fill="rgba(34,211,238,0.3)"
          stroke="rgba(34,211,238,0.5)"
          strokeWidth="0.3"
        />
      ))}
      <text x="160" y="315" textAnchor="middle" fill="rgba(34,211,238,0.3)" fontSize="5" fontFamily="monospace">PCIe Gen 6 x16</text>

      {/* Animated data flow lines */}
      <line x1="30" y1="160" x2="225" y2="160" stroke="rgba(34,211,238,0.08)" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="160" y1="30" x2="160" y2="255" stroke="rgba(34,211,238,0.08)" strokeWidth="0.5" strokeDasharray="4 4" />

      {/* Corner accent marks */}
      <path d="M10 30 L10 10 L30 10" stroke="var(--cyan)" strokeWidth="1.5" fill="none" />
      <path d="M290 10 L310 10 L310 30" stroke="var(--cyan)" strokeWidth="1.5" fill="none" />
      <path d="M10 290 L10 310 L30 310" stroke="var(--cyan)" strokeWidth="1.5" fill="none" />
      <path d="M290 310 L310 310 L310 290" stroke="var(--cyan)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function MetricBar({ label, value, bar, color, delay }: {
  label: string; value: string; bar: number; color: string; delay: number;
}) {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 4200 + delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center" style={{ fontSize: "0.8rem" }}>
        <span style={{ color: "var(--muted-bright)", letterSpacing: "0.08em" }}>{label}</span>
        <span style={{ color, fontWeight: 700 }}>{value}</span>
      </div>
      <div className="gpu-progress-bar">
        <div
          className="gpu-progress-fill"
          style={{
            width: filled ? `${bar}%` : "0%",
            background: `linear-gradient(90deg, ${color}44, ${color})`,
            boxShadow: `0 0 6px ${color}`,
            transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { visibleLines, bootDone } = useTerminalBoot();
  const [showContent, setShowContent] = useState(false);
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    setParticles(makeParticles());
  }, []);

  useEffect(() => {
    if (bootDone) setTimeout(() => setShowContent(true), 300);
  }, [bootDone]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Particle field */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}
      </div>

      {/* Circuit trace overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Boot terminal (pre-animation) */}
      <AnimatePresence>
        {!bootDone && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="absolute inset-0 flex items-center justify-center z-20 p-8"
            style={{ background: "var(--bg)" }}
          >
            <div
              className="w-full max-w-2xl"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.75rem",
                lineHeight: "1.8",
              }}
            >
              {BOOT_LINES.map(({ text, color }, idx) => (
                <AnimatePresence key={idx}>
                  {visibleLines.includes(idx) && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: color ?? "transparent", minHeight: "1.3em" }}
                    >
                      {text}
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
              {!bootDone && (
                <div
                  className="cursor-blink mt-2"
                  style={{ color: "var(--cyan)", fontSize: "0.75rem" }}
                >
                  &gt;
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main hero content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col min-h-screen"
          >
            {/* Top bar */}
            <div
              className="flex items-center justify-between px-8 py-4 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <span className="led led-cyan" />
                <span
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.3em",
                    color: "var(--muted)",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  SV.GPU // ARCHITECTURE v2026
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4"
              >
                {["RESUME", "GITHUB", "LINKEDIN"].map((label) => (
                  <a
                    key={label}
                    href={
                      label === "RESUME"
                        ? "#contact"
                        : label === "GITHUB"
                        ? "https://github.com/satvejendla"
                        : "https://linkedin.com/in/satvikvejendla"
                    }
                    target={label !== "RESUME" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      color: "var(--muted-bright)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--cyan)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--muted-bright)")
                    }
                  >
                    [{label}]
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Main content */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left: Identity */}
              <div className="flex flex-col justify-center px-8 md:px-16 py-12">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="section-label mb-6"
                >
                  HARDWARE PROFILE // UNIT-001
                </motion.div>

                {/* Name - Glitch */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                  className="mb-2"
                >
                  <h1
                    className="glitch"
                    data-text="SATVIK"
                    style={{
                      fontSize: "clamp(4.5rem, 10vw, 9.5rem)",
                      fontWeight: 900,
                      letterSpacing: "-0.03em",
                      lineHeight: 0.88,
                      color: "var(--text)",
                      fontFamily: "var(--font-geist-sans)",
                    }}
                  >
                    SATVIK
                  </h1>
                  <h1
                    className="glitch"
                    data-text="VEJENDLA"
                    style={{
                      fontSize: "clamp(4.5rem, 10vw, 9.5rem)",
                      fontWeight: 900,
                      letterSpacing: "-0.03em",
                      lineHeight: 0.88,
                      color: "var(--cyan)",
                      fontFamily: "var(--font-geist-sans)",
                      textShadow:
                        "0 0 60px rgba(34,211,238,0.5), 0 0 120px rgba(34,211,238,0.2)",
                    }}
                  >
                    VEJENDLA
                  </h1>
                </motion.div>

                {/* Tagline */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 flex flex-col gap-2"
                >
                  <div
                    style={{
                      fontSize: "1rem",
                      color: "var(--muted-bright)",
                      letterSpacing: "0.12em",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    M.S. Computer Science · Artificial Intelligence
                  </div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--muted)",
                      letterSpacing: "0.08em",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    Northwestern University · Expected Dec 2027
                  </div>
                </motion.div>

                {/* Current roles */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="mt-8 flex flex-wrap gap-2"
                >
                  {[
                    { text: "SWE @ TeachShare", color: "var(--cyan)" },
                    { text: "SWE @ J.P. Morgan", color: "var(--purple)" },
                    { text: "CUDA Engineer", color: "var(--orange)" },
                  ].map(({ text, color }) => (
                    <span
                      key={text}
                      className="gpu-tag"
                      style={{
                        borderColor: color,
                        color,
                        fontSize: "0.75rem",
                        letterSpacing: "0.12em",
                        padding: "4px 12px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          background: color,
                          marginRight: "4px",
                          boxShadow: `0 0 4px ${color}`,
                        }}
                      />
                      {text}
                    </span>
                  ))}
                </motion.div>

                {/* Scroll cue */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="mt-12 flex flex-col gap-2"
                >
                  <div
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.3em",
                      color: "var(--muted)",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    SCROLL TO INITIALIZE
                  </div>
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ color: "var(--cyan)", fontSize: "1.2rem" }}
                  >
                    ↓
                  </motion.div>
                </motion.div>
              </div>

              {/* Right: GPU Spec Card + Die Art */}
              <div className="flex flex-col items-center justify-center px-8 py-12 gap-8">
                {/* GPU Die art */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
                  className="relative w-56 h-56 md:w-80 md:h-80"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(34,211,238,0.3))",
                  }}
                >
                  <GpuDieArt />
                  {/* Rotating glow ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-8px] rounded-lg"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 70%, rgba(34,211,238,0.3) 85%, transparent 100%)",
                    }}
                  />
                </motion.div>

                {/* Spec metrics panel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="gpu-panel gpu-panel-cyan corner-marks w-full max-w-lg p-6"
                >
                  <div
                    className="flex items-center justify-between mb-4 pb-3"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <span
                      style={{
                        fontSize: "0.8rem",
                        letterSpacing: "0.2em",
                        color: "var(--cyan)",
                        fontFamily: "var(--font-geist-mono)",
                      }}
                    >
                      PERFORMANCE METRICS
                    </span>
                    <span className="led" />
                  </div>
                  <div className="flex flex-col gap-3">
                    {SPEC_METRICS.map((m, i) => (
                      <MetricBar key={m.label} {...m} delay={i * 150} />
                    ))}
                  </div>
                  <div
                    className="mt-4 pt-3 flex items-center justify-between"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--muted)",
                        letterSpacing: "0.08em",
                        fontFamily: "var(--font-geist-mono)",
                      }}
                    >
                      PROCESS: Northwestern + Rutgers
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--green)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      ● READY
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom status bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="px-8 py-3 flex items-center justify-between border-t"
              style={{ borderColor: "var(--border)", fontSize: "0.6rem" }}
            >
              <div className="flex items-center gap-4" style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
                <span style={{ color: "var(--cyan)" }}>SV.GPU</span>
                <span>|</span>
                <span>satvej1@gmail.com</span>
                <span>|</span>
                <span>satvikvejendla.com</span>
              </div>
              <div className="flex items-center gap-3" style={{ color: "var(--muted)" }}>
                <span className="led led-cyan" style={{ width: "4px", height: "4px" }} />
                <span style={{ letterSpacing: "0.2em" }}>ALL SYSTEMS OPERATIONAL</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
