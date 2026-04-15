"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "SATVIK VEJENDLA v2026.1", delay: 0, color: "var(--muted)" },
  { text: "Copyright (C) 2026 Satvik Vejendla. All rights reserved.", delay: 400, color: "var(--muted)" },
  { text: "", delay: 700 },
  { text: "Detecting compute cores.......... [16,384 CUDA / 512 Tensor]", delay: 900, color: "var(--green)" },
  { text: "Verifying DRAM.................. [global memory online     ]", delay: 1400, color: "var(--green)" },
  { text: "Calibrating AI Engine........... [9.8 PFLOPS FP8 Sparse    ]", delay: 1900, color: "var(--cyan)" },
  { text: "Loading ML Frameworks........... [TensorFlow / PyTorch / LLM]", delay: 2300, color: "var(--cyan)" },
  { text: "Initializing schedulers......... [warp dispatch enabled    ]", delay: 2700, color: "var(--purple)" },
  { text: "", delay: 3000 },
  { text: "System ready. Launching portfolio interface...", delay: 3200, color: "var(--orange)" },
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
  return Array.from({ length: 400 }, () => ({
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
      <defs>
        <clipPath id="dieClip">
          <rect x="20" y="20" width="280" height="280" rx="5" />
        </clipPath>
      </defs>

      {/* Package */}
      <rect x="10" y="10" width="300" height="300" rx="8" fill="none" stroke="rgba(34,211,238,0.28)" strokeWidth="1.5" />
      <rect x="20" y="20" width="280" height="280" rx="5" fill="rgba(7,7,26,0.85)" stroke="rgba(34,211,238,0.12)" strokeWidth="1" />

      <g clipPath="url(#dieClip)">
        {/* Header labels (dedicated strip to avoid overlap) */}
        <rect x="20" y="20" width="280" height="22" fill="rgba(34,211,238,0.03)" />
        <text x="32" y="35" fill="rgba(34,211,238,0.55)" fontSize="7" fontFamily="monospace">
          NVIDIA GPU Architecture
        </text>

        {/* SM tiles area (5x3) */}
        {Array.from({ length: 15 }).map((_, idx) => {
          const col = idx % 5;
          const row = Math.floor(idx / 5);
          const x = 27 + col * 54;
          const y = 48 + row * 48;
          return (
            <g key={`sm-${idx}`}>
              <rect x={x} y={y} width="50" height="42" rx="5" fill="rgba(34,211,238,0.055)" stroke="rgba(34,211,238,0.20)" strokeWidth="0.8" />

              {/* Header strip in SM */}
              <rect x={x} y={y} width="50" height="10" rx="5" fill="rgba(34,211,238,0.04)" />
              <text x={x + 6} y={y + 8} fill="rgba(34,211,238,0.55)" fontSize="6" fontFamily="monospace">
                SM
              </text>
              <text x={x + 46} y={y + 8} textAnchor="end" fill="rgba(34,211,238,0.30)" fontSize="5" fontFamily="monospace">
                {idx}
              </text>

              {/* Tensor core block */}
              <rect x={x + 3} y={y + 14} width="20" height="10" rx="2.5" fill="rgba(244,114,182,0.05)" stroke="rgba(244,114,182,0.18)" strokeWidth="0.6" />
              {/* FP/INT pipes */}
              <rect x={x + 26} y={y + 14} width="21" height="10" rx="2.5" fill="rgba(34,211,238,0.04)" stroke="rgba(34,211,238,0.10)" strokeWidth="0.6" />

              {/* LD/ST */}
              <rect x={x + 3} y={y + 26} width="12" height="6" rx="2" fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.16)" strokeWidth="0.55" />
              {/* Shared memory */}
              <rect x={x + 17} y={y + 26} width="16" height="6" rx="2" fill="rgba(168,85,247,0.05)" stroke="rgba(168,85,247,0.16)" strokeWidth="0.55" />
              {/* Registers */}
              <rect x={x + 35} y={y + 26} width="12" height="6" rx="2" fill="rgba(74,222,128,0.04)" stroke="rgba(74,222,128,0.16)" strokeWidth="0.55" />

              {/* Tiny legend dots (no extra text => no overlap) */}
              {Array.from({ length: 6 }).map((_, d) => (
                <rect
                  key={`dot-${idx}-${d}`}
                  x={x + 3 + d * 7}
                  y={y + 34}
                  width="5"
                  height="5"
                  rx="1"
                  fill="rgba(34,211,238,0.035)"
                  stroke="rgba(34,211,238,0.08)"
                  strokeWidth="0.45"
                />
              ))}
            </g>
          );
        })}

        {/* Row 4: L2 cache (horizontal) */}
        <rect x="28" y="194" width="264" height="40" rx="6" fill="rgba(168,85,247,0.07)" stroke="rgba(168,85,247,0.26)" strokeWidth="0.9" />
        <text x="160" y="211" textAnchor="middle" fill="rgba(168,85,247,0.62)" fontSize="8.5" fontFamily="monospace">
          L2 CACHE
        </text>
        {Array.from({ length: 10 }).map((_, i) => (
          <rect
            key={`l2-${i}`}
            x={32 + i * 25.8}
            y="216"
            width="22.5"
            height="14"
            rx="3"
            fill="rgba(34,211,238,0.04)"
            stroke="rgba(34,211,238,0.10)"
            strokeWidth="0.6"
          />
        ))}

        {/* Row 5: DRAM (horizontal) */}
        <rect x="28" y="240" width="264" height="44" rx="6" fill="rgba(74,222,128,0.05)" stroke="rgba(74,222,128,0.24)" strokeWidth="0.9" />
        <text x="160" y="258" textAnchor="middle" fill="rgba(74,222,128,0.62)" fontSize="9" fontFamily="monospace">
          DRAM (GLOBAL MEMORY)
        </text>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={`dram-${i}`}
            x={32 + i * 21.6}
            y="264"
            width="17.5"
            height="14"
            rx="3"
            fill="rgba(74,222,128,0.03)"
            stroke="rgba(74,222,128,0.10)"
            strokeWidth="0.55"
          />
        ))}
      </g>

      {/* Corner accent marks */}
      <path d="M10 30 L10 10 L30 10" stroke="var(--cyan)" strokeWidth="1.5" fill="none" />
      <path d="M290 10 L310 10 L310 30" stroke="var(--cyan)" strokeWidth="1.5" fill="none" />
      <path d="M10 290 L10 310 L30 310" stroke="var(--cyan)" strokeWidth="1.5" fill="none" />
      <path d="M290 310 L310 310 L310 290" stroke="var(--cyan)" strokeWidth="1.5" fill="none" />
    </svg>
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
        className="absolute inset-0 pointer-events-none grid-fade"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none grid-fade animate-pulse infinite"
        style={{
          animationDelay: "1.6s",
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "180px 180px",
          mixBlendMode: "screen",
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

            {/* Main content */}
            <div className="flex-1 flex flex-col">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 p-8 w-[90%] mx-auto">
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
                      fontSize: "1.5rem",
                      color: "var(--muted-bright)",
                      letterSpacing: "0.12em",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    M.S. Computer Science · Artificial Intelligence
                  </div>
                  <div
                    style={{
                      fontSize: "1.4rem",
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
                  className="mt-8 flex flex-wrap gap-6"
                >
                  {[
                    { text: "SWE @ TeachShare", color: "var(--cyan)" },
                    { text: "Prev @ J.P. Morgan", color: "var(--purple)" },
                    { text: "CUDA Engineer", color: "var(--orange)" },
                  ].map(({ text, color }) => (
                    <span
                      key={text}
                      className="gpu-tag"
                      style={{
                        borderColor: color,
                        color,
                        fontSize: "1.3rem",
                        letterSpacing: "0.2em",
                        wordSpacing: "-0.4em",
                        padding: "4px 12px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          borderRadius: "50%",
                          background: color,
                          boxShadow: `0 0 4px ${color}`,
                        }}
                      />
                      {text}
                    </span>
                  ))}
                </motion.div>

              </div>

              {/* Right: GPU Die Art */}
              <div className="flex flex-col items-center justify-center px-8 py-12 gap-24">
                {/* GPU Die art */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 2 }}
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
              </div>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
