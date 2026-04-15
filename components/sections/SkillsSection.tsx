"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SKILL_CLUSTERS = [
  {
    id: "languages",
    label: "LANGUAGES",
    sublabel: "SM CLUSTER A",
    color: "#22d3ee",
    position: { col: 0, row: 0, colSpan: 2, rowSpan: 2 },
    skills: [
      "JavaScript", "TypeScript", "Python", "Java",
      "C", "C++", "SQL", "R",
      "CUDA", "Bash", "HTML", "CSS",
    ],
  },
  {
    id: "frameworks",
    label: "FRAMEWORKS",
    sublabel: "SM CLUSTER B",
    color: "#a855f7",
    position: { col: 2, row: 0, colSpan: 2, rowSpan: 1 },
    skills: [
      "React", "Next.js", "Node.js", "Flask",
      "FastAPI", "Express", "PySpark", "TensorFlow",
    ],
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    sublabel: "TENSOR CORE",
    color: "#f472b6",
    position: { col: 2, row: 1, colSpan: 1, rowSpan: 1 },
    skills: [
      "LLMs", "RAG", "LoRA Fine-tuning",
      "LangChain", "HuggingFace",
      "Transformers", "Reinforcement Learning",
    ],
  },
  {
    id: "libraries",
    label: "LIBRARIES",
    sublabel: "SM CLUSTER C",
    color: "#f97316",
    position: { col: 3, row: 1, colSpan: 1, rowSpan: 1 },
    skills: [
      "Pandas", "NumPy", "Matplotlib",
      "OpenCV", "scikit-learn",
      "Puppeteer", "Selenium", "jQuery",
    ],
  },
  {
    id: "cloud",
    label: "CLOUD & DB",
    sublabel: "MEMORY CTRL",
    color: "#4ade80",
    position: { col: 0, row: 2, colSpan: 2, rowSpan: 1 },
    skills: [
      "AWS", "Azure", "Google Cloud",
      "MongoDB", "PostgreSQL", "Redis",
      "Docker", "Kubernetes",
    ],
  },
  {
    id: "devtools",
    label: "DEV TOOLS",
    sublabel: "COMMAND PROC",
    color: "#facc15",
    position: { col: 2, row: 2, colSpan: 2, rowSpan: 1 },
    skills: [
      "Git", "Graphite", "CI/CD",
      "Jenkins", "VS Code", "Jira",
      "Agile/Scrum", "Nsight Compute",
    ],
  },
];

function SkillCore({ skill, color, delay }: { skill: string; color: string; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Core square */}
      <motion.div
        animate={{
          background: hovered ? color : `color-mix(in srgb, ${color} 20%, var(--surface))`,
          boxShadow: hovered
            ? `0 0 8px ${color}, 0 0 16px ${color}40`
            : `0 0 2px ${color}30`,
          scale: hovered ? 1.15 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: "10px",
          height: "10px",
          border: `1px solid ${color}60`,
          cursor: "pointer",
          flexShrink: 0,
        }}
      />

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.9 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--surface-2)",
              border: `1px solid ${color}60`,
              color,
              fontSize: "0.6rem",
              padding: "3px 8px",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-geist-mono)",
              letterSpacing: "0.05em",
              zIndex: 100,
              pointerEvents: "none",
            }}
          >
            {skill}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ClusterBlock({ cluster, isActive, onClick }: {
  cluster: typeof SKILL_CLUSTERS[0];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="gpu-panel relative overflow-hidden cursor-pointer"
      onClick={onClick}
      animate={{
        borderColor: isActive
          ? `color-mix(in srgb, ${cluster.color} 60%, var(--border))`
          : `color-mix(in srgb, ${cluster.color} 20%, var(--border))`,
        boxShadow: isActive
          ? `inset 0 0 30px color-mix(in srgb, ${cluster.color} 10%, transparent), 0 0 20px ${cluster.color}20`
          : "none",
      }}
      style={{
        background: isActive
          ? `linear-gradient(135deg, color-mix(in srgb, ${cluster.color} 8%, var(--surface)), var(--surface))`
          : "var(--surface)",
        transition: "background 0.3s",
        height: "100%",
        minHeight: "140px",
      }}
    >
      {/* Color stripe */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.4 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${cluster.color}, transparent)`,
          boxShadow: isActive ? `0 0 8px ${cluster.color}` : "none",
        }}
      />

      <div className="p-4 h-full flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div
              style={{
                fontSize: "0.55rem",
                color: cluster.color,
                letterSpacing: "0.3em",
                fontFamily: "var(--font-geist-mono)",
                opacity: 0.7,
                marginBottom: "2px",
              }}
            >
              {cluster.sublabel}
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: isActive ? cluster.color : "var(--text)",
                fontFamily: "var(--font-geist-mono)",
                letterSpacing: "0.05em",
                transition: "color 0.3s",
              }}
            >
              {cluster.label}
            </div>
          </div>
          <motion.div
            animate={{
              background: isActive ? cluster.color : "var(--border-bright)",
              boxShadow: isActive ? `0 0 8px ${cluster.color}` : "none",
            }}
            style={{ width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0, marginTop: "2px" }}
          />
        </div>

        {/* Core grid visualization */}
        <div className="flex flex-wrap gap-[3px] flex-1">
          {cluster.skills.map((skill, i) => (
            <SkillCore
              key={skill}
              skill={skill}
              color={cluster.color}
              delay={i * 0.04}
            />
          ))}
        </div>

        {/* Count */}
        <div
          style={{
            fontSize: "0.6rem",
            color: "var(--muted)",
            fontFamily: "var(--font-geist-mono)",
            letterSpacing: "0.1em",
          }}
        >
          {cluster.skills.length} UNITS LOADED
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);

  const active = SKILL_CLUSTERS.find((c) => c.id === activeCluster);

  const toggleCluster = (id: string) => {
    setActiveCluster((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="skills"
      className="relative py-24 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Large die background art */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="mb-12">
          <div className="section-label mb-4">
            COMPUTE UNITS // SHADER ARRAY
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
              TECHNICAL
              <br />
              <span
                style={{
                  color: "var(--green)",
                  textShadow: "0 0 40px rgba(74,222,128,0.4)",
                }}
              >
                SPECS
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
              <div>HOVER CORES FOR DETAILS</div>
              <div style={{ color: "var(--green)", marginTop: "4px" }}>
                CLICK CLUSTER TO HIGHLIGHT
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* GPU Die grid */}
          <div className="lg:col-span-2">
            {/* Die container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-4"
              style={{
                border: "1px solid var(--border-bright)",
                background: "var(--surface)",
              }}
            >
              {/* Corner marks */}
              {[
                { top: "-1px", left: "-1px", borderTop: "2px solid var(--cyan)", borderLeft: "2px solid var(--cyan)" },
                { top: "-1px", right: "-1px", borderTop: "2px solid var(--cyan)", borderRight: "2px solid var(--cyan)" },
                { bottom: "-1px", left: "-1px", borderBottom: "2px solid var(--cyan)", borderLeft: "2px solid var(--cyan)" },
                { bottom: "-1px", right: "-1px", borderBottom: "2px solid var(--cyan)", borderRight: "2px solid var(--cyan)" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: "12px",
                    height: "12px",
                    ...s,
                  }}
                />
              ))}

              <div
                style={{
                  fontSize: "0.55rem",
                  color: "var(--muted)",
                  letterSpacing: "0.3em",
                  fontFamily: "var(--font-geist-mono)",
                  marginBottom: "12px",
                  textAlign: "center",
                }}
              >
                SV-GPU DIE SHOT // ARCHITECTURE 2026 // 5nm EUV
              </div>

              {/* Cluster grid - 4 cols × 3 rows */}
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridTemplateRows: "repeat(3, auto)",
                }}
              >
                {SKILL_CLUSTERS.map((cluster) => (
                  <div
                    key={cluster.id}
                    style={{
                      gridColumn: `${cluster.position.col + 1} / span ${cluster.position.colSpan}`,
                      gridRow: `${cluster.position.row + 1} / span ${cluster.position.rowSpan}`,
                    }}
                  >
                    <ClusterBlock
                      cluster={cluster}
                      isActive={activeCluster === cluster.id}
                      onClick={() => toggleCluster(cluster.id)}
                    />
                  </div>
                ))}
              </div>

              {/* PCIe row at bottom */}
              <div
                className="flex items-center gap-1 mt-3 px-1"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, delay: i * 0.04, repeat: Infinity }}
                    style={{
                      flex: 1,
                      height: "8px",
                      background: "rgba(34,211,238,0.15)",
                      border: "1px solid rgba(34,211,238,0.2)",
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "0.5rem",
                  color: "rgba(34,211,238,0.3)",
                  fontFamily: "var(--font-geist-mono)",
                  letterSpacing: "0.3em",
                  marginTop: "4px",
                }}
              >
                PCIe Gen 6 × 16 // 128 GB/s
              </div>
            </motion.div>
          </div>

          {/* Right panel: Active cluster details OR architecture summary */}
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="gpu-panel p-5 flex-1"
                  style={{
                    borderColor: `color-mix(in srgb, ${active.color} 40%, var(--border))`,
                    boxShadow: `0 0 20px ${active.color}15`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.55rem",
                      color: active.color,
                      letterSpacing: "0.3em",
                      fontFamily: "var(--font-geist-mono)",
                      marginBottom: "4px",
                    }}
                  >
                    {active.sublabel}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: active.color,
                      fontFamily: "var(--font-geist-mono)",
                      marginBottom: "16px",
                      textShadow: `0 0 20px ${active.color}`,
                    }}
                  >
                    {active.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {active.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04 }}
                        style={{
                          padding: "4px 10px",
                          border: `1px solid ${active.color}40`,
                          color: active.color,
                          fontSize: "0.7rem",
                          fontFamily: "var(--font-geist-mono)",
                          letterSpacing: "0.05em",
                          background: `${active.color}08`,
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                  <div
                    className="mt-4 pt-4"
                    style={{ borderTop: "1px solid var(--border)", fontSize: "0.6rem", color: "var(--muted)", fontFamily: "var(--font-geist-mono)" }}
                  >
                    {active.skills.length} compute units active · Cluster {active.id.toUpperCase()}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="gpu-panel gpu-panel-cyan p-5 flex-1"
                >
                  <div className="section-label mb-4" style={{ fontSize: "0.55rem" }}>
                    ARCHITECTURE SUMMARY
                  </div>
                  <div className="flex flex-col gap-4">
                    {[
                      { label: "Total Skills", value: `${SKILL_CLUSTERS.reduce((a, c) => a + c.skills.length, 0)}+`, color: "var(--cyan)" },
                      { label: "Clusters", value: `${SKILL_CLUSTERS.length}`, color: "var(--purple)" },
                      { label: "YoE", value: "3+", color: "var(--green)" },
                      { label: "Active Projects", value: `${4}`, color: "var(--orange)" },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span style={{ fontSize: "0.65rem", color: "var(--muted-bright)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" }}>
                          {label}
                        </span>
                        <span style={{ fontSize: "1.1rem", fontWeight: 700, color, fontFamily: "var(--font-geist-mono)", textShadow: `0 0 8px ${color}` }}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="mt-6"
                    style={{ fontSize: "0.6rem", color: "var(--muted)", fontFamily: "var(--font-geist-mono)", lineHeight: 1.8, letterSpacing: "0.05em" }}
                  >
                    <div>← CLICK A CLUSTER IN THE</div>
                    <div style={{ color: "var(--cyan)" }}>   DIE SHOT TO INSPECT</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cluster legend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="gpu-panel p-4"
            >
              <div className="section-label mb-3" style={{ fontSize: "0.5rem" }}>
                CLUSTER MAP
              </div>
              <div className="flex flex-col gap-2">
                {SKILL_CLUSTERS.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => toggleCluster(c.id)}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        background: activeCluster === c.id ? c.color : `${c.color}40`,
                        boxShadow: activeCluster === c.id ? `0 0 6px ${c.color}` : "none",
                        flexShrink: 0,
                        transition: "background 0.2s, box-shadow 0.2s",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.6rem",
                        color: activeCluster === c.id ? c.color : "var(--muted-bright)",
                        fontFamily: "var(--font-geist-mono)",
                        letterSpacing: "0.1em",
                        transition: "color 0.2s",
                      }}
                    >
                      {c.label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.55rem",
                        color: "var(--muted)",
                        fontFamily: "var(--font-geist-mono)",
                        marginLeft: "auto",
                      }}
                    >
                      {c.skills.length}u
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
