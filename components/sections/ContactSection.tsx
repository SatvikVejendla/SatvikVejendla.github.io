"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TERMINAL_LINES = [
  { text: "> KERNEL LAUNCHED", color: "var(--green)", delay: 0 },
  { text: "> DEVICE MEMORY ALLOCATED", color: "var(--muted-bright)", delay: 400 },
  { text: "> WARP USAGE: OPTIMAL", color: "var(--green)", delay: 800 },
  { text: "> BANDWIDTH UTILIZATION: 90%", color: "var(--cyan)", delay: 1200 },
];

const LINKS = [
  {
    label: "EMAIL",
    value: "satvej1@gmail.com",
    href: "mailto:satvej1@gmail.com",
    color: "var(--cyan)",
    icon: "◈",
    description: "Primary channel",
    copyable: true,
  },
  {
    label: "PHONE",
    value: "(609) 578-8198",
    href: "tel:6095788198",
    color: "var(--green)",
    icon: "◈",
    description: "Direct line",
    copyable: true,
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/satvikvejendla",
    href: "https://linkedin.com/in/satvikvejendla",
    color: "var(--purple)",
    icon: "◈",
    description: "Professional network",
    copyable: false,
  },
  {
    label: "GITHUB",
    value: "github.com/satvikvejendla",
    href: "https://github.com/satvikvejendla",
    color: "var(--orange)",
    icon: "◈",
    description: "Open source",
    copyable: false,
  },
];

function TerminalOutput() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    TERMINAL_LINES.forEach(({ delay }, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, delay);
    });
  }, []);

  return (
    <div
      style={{
        fontFamily: "var(--font-geist-mono)",
        fontSize: "0.9rem",
        lineHeight: "1.8",
      }}
    >
      {TERMINAL_LINES.map(({ text, color }, i) =>
        visibleLines.includes(i) ? (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{ color }}
          >
            {text}
          </motion.div>
        ) : null
      )}
    </div>
  );
}

export default function ContactSection() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)",
        }}
      />

      {/* CRT glow from center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top frame */}
        <div
          className="px-8 md:px-16 pt-12 pb-6 flex items-center justify-between"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="section-label">
            DISPLAY OUT // SIGNAL OUTPUT
          </div>
          <div className="flex items-center gap-3">
            {["R", "G", "B"].map((ch, i) => (
              <div
                key={ch}
                className="flex items-center gap-1.5"
                style={{ fontSize: "0.55rem", fontFamily: "var(--font-geist-mono)", color: "var(--muted)" }}
              >
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity }}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: ch === "R" ? "#ef4444" : ch === "G" ? "#4ade80" : "#22d3ee",
                  }}
                />
                <span>{ch}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 py-16">
          {/* CRT monitor frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-full max-w-6xl"
          >
            {/* Monitor outer frame */}
            <div
              className="relative p-8 md:p-14"
              style={{
                border: "2px solid var(--border-bright)",
                background: "var(--surface)",
                boxShadow:
                  "inset 0 0 60px rgba(0,0,0,0.5), 0 0 40px rgba(34,211,238,0.08), 0 20px 60px rgba(0,0,0,0.6)",
              }}
            >
              {/* Corner accents */}
              {[
                { top: "-2px", left: "-2px", borderTop: "3px solid var(--cyan)", borderLeft: "3px solid var(--cyan)" },
                { top: "-2px", right: "-2px", borderTop: "3px solid var(--cyan)", borderRight: "3px solid var(--cyan)" },
                { bottom: "-2px", left: "-2px", borderBottom: "3px solid var(--cyan)", borderLeft: "3px solid var(--cyan)" },
                { bottom: "-2px", right: "-2px", borderBottom: "3px solid var(--cyan)", borderRight: "3px solid var(--cyan)" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{ position: "absolute", width: "20px", height: "20px", ...s }}
                />
              ))}

              {/* Monitor top bar */}
              <div
                className="flex items-center justify-between mb-8 pb-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-3">
                  <span className="led" />
                  <span
                    style={{
                      fontSize: "0.8rem",
                      letterSpacing: "0.25em",
                      color: "var(--cyan)",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    DISPLAY OUT // FRAME BUFFER ACTIVE
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    fontFamily: "var(--font-geist-mono)",
                    letterSpacing: "0.15em",
                  }}
                >
                  1920×1080 @144Hz
                </div>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left: Title + terminal */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2
                      style={{
                        fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                        fontWeight: 900,
                        letterSpacing: "-0.02em",
                        color: "var(--text)",
                        fontFamily: "var(--font-geist-sans)",
                        lineHeight: 1,
                        marginBottom: "8px",
                      }}
                    >
                      ESTABLISH
                      <br />
                      <span
                        style={{
                          color: "var(--cyan)",
                          textShadow: "0 0 40px rgba(34,211,238,0.5)",
                        }}
                      >
                        CONNECTION
                      </span>
                    </h2>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--muted-bright)",
                        fontFamily: "var(--font-geist-mono)",
                        lineHeight: 1.8,
                        marginTop: "20px",
                        marginBottom: "28px",
                      }}
                    >
                      Open to internship and full-time opportunities in AI engineering,
                      systems, and full-stack. Always up to talk compute, CUDA, or LLMs.
                    </p>
                    <TerminalOutput />
                  </motion.div>
                </div>

                {/* Right: Contact links */}
                <div className="flex flex-col gap-3">
                  {LINKS.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative"
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {link.copyable ? (
                        /* Copyable row — entire area triggers copy, no navigation */
                        <div
                          className="flex items-center gap-5 p-5"
                          onClick={() => handleCopy(link.value, link.label)}
                          style={{
                            border: "1px solid",
                            borderColor: hoveredLink === link.label
                              ? `color-mix(in srgb, ${link.color} 60%, var(--border))`
                              : "var(--border)",
                            background: hoveredLink === link.label
                              ? `color-mix(in srgb, ${link.color} 6%, var(--surface))`
                              : "var(--surface)",
                            cursor: "pointer",
                            transition: "border-color 0.2s, background 0.2s",
                          }}
                        >
                          <motion.span
                            animate={{
                              color: hoveredLink === link.label ? link.color : "var(--muted)",
                              textShadow: hoveredLink === link.label ? `0 0 8px ${link.color}` : "none",
                            }}
                            style={{ fontSize: "1.3rem", flexShrink: 0 }}
                          >
                            {link.icon}
                          </motion.span>
                          <div className="flex-1 min-w-0">
                            <div
                              style={{
                                fontSize: "0.7rem",
                                letterSpacing: "0.2em",
                                color: link.color,
                                fontFamily: "var(--font-geist-mono)",
                                opacity: 0.7,
                                marginBottom: "3px",
                              }}
                            >
                              {link.label} // {link.description}
                            </div>
                            <div
                              style={{
                                fontSize: "0.85rem",
                                color: hoveredLink === link.label ? link.color : "var(--text)",
                                fontFamily: "var(--font-geist-mono)",
                                transition: "color 0.2s",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {link.value}
                            </div>
                          </div>
                          <motion.span
                            animate={{ opacity: hoveredLink === link.label ? 1 : 0 }}
                            style={{
                              fontSize: "0.7rem",
                              color: copied === link.label ? "var(--green)" : link.color,
                              fontFamily: "var(--font-geist-mono)",
                              letterSpacing: "0.1em",
                              border: `1px solid ${copied === link.label ? "var(--green)" : link.color}`,
                              padding: "2px 8px",
                              flexShrink: 0,
                            }}
                          >
                            {copied === link.label ? "COPIED" : "COPY"}
                          </motion.span>
                        </div>
                      ) : (
                        /* Link row — navigates to href */
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-5 p-5"
                          style={{
                            border: "1px solid",
                            borderColor: hoveredLink === link.label
                              ? `color-mix(in srgb, ${link.color} 60%, var(--border))`
                              : "var(--border)",
                            background: hoveredLink === link.label
                              ? `color-mix(in srgb, ${link.color} 6%, var(--surface))`
                              : "var(--surface)",
                            textDecoration: "none",
                            transition: "border-color 0.2s, background 0.2s",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <motion.span
                            animate={{
                              color: hoveredLink === link.label ? link.color : "var(--muted)",
                              textShadow: hoveredLink === link.label ? `0 0 8px ${link.color}` : "none",
                            }}
                            style={{ fontSize: "1.3rem", flexShrink: 0 }}
                          >
                            {link.icon}
                          </motion.span>
                          <div className="flex-1 min-w-0">
                            <div
                              style={{
                                fontSize: "0.7rem",
                                letterSpacing: "0.2em",
                                color: link.color,
                                fontFamily: "var(--font-geist-mono)",
                                opacity: 0.7,
                                marginBottom: "3px",
                              }}
                            >
                              {link.label} // {link.description}
                            </div>
                            <div
                              style={{
                                fontSize: "0.85rem",
                                color: hoveredLink === link.label ? link.color : "var(--text)",
                                fontFamily: "var(--font-geist-mono)",
                                transition: "color 0.2s",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {link.value}
                            </div>
                          </div>
                          <motion.span
                            animate={{
                              x: hoveredLink === link.label ? 4 : 0,
                              color: hoveredLink === link.label ? link.color : "var(--muted)",
                            }}
                            style={{ fontSize: "1.1rem", flexShrink: 0 }}
                          >
                            →
                          </motion.span>
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Status bar */}
              <div
                className="mt-8 pt-6 flex items-center justify-between flex-wrap gap-4"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-4" style={{ fontSize: "0.8rem", color: "var(--muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.1em" }}>
                  <div className="flex items-center gap-2">
                    <span className="led" style={{ width: "7px", height: "7px" }} />
                    <span>AVAILABLE FOR OPPORTUNITIES</span>
                  </div>
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted-bright)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.1em" }}>
                  SATVIK VEJENDLA · 2026
                </div>
              </div>
            </div>

            {/* Monitor stand shadow */}
            <div
              style={{
                height: "20px",
                background: "linear-gradient(to bottom, var(--border), transparent)",
                marginTop: "0",
                opacity: 0.5,
              }}
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
