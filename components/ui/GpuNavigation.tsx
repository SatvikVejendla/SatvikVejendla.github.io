"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "hero", label: "COMMAND PROCESSOR", short: "CMD" },
  { id: "about", label: "SHADER ARRAY", short: "SHD" },
  { id: "experience", label: "PCIe BUS", short: "PCIe" },
  { id: "projects", label: "VRAM BANKS", short: "VRAM" },
  { id: "skills", label: "COMPUTE UNITS", short: "CU" },
  { id: "contact", label: "DISPLAY OUT", short: "DSP" },
];

export default function GpuNavigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { threshold: 0.4 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.6 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-[1000] flex flex-col gap-4 items-end"
          aria-label="GPU Section Navigation"
        >
          {/* Architecture label */}
          <div
            className="section-label mb-2 rotate-0"
            style={{ fontSize: "0.55rem", letterSpacing: "0.4em", color: "var(--muted)" }}
          >
            GPU/ARCH
          </div>

          {NAV_ITEMS.map(({ id, label, short }) => {
            const isActive = activeSection === id;
            const isHovered = hoveredItem === id;

            return (
              <div
                key={id}
                className="flex items-center gap-3 cursor-pointer"
                onMouseEnter={() => setHoveredItem(id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleClick(id)}
              >
                {/* Label */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, width: 0 }}
                      animate={{ opacity: 1, x: 0, width: "auto" }}
                      exit={{ opacity: 0, x: 10, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <span
                        style={{
                          fontSize: "0.6rem",
                          letterSpacing: "0.2em",
                          color: isActive ? "var(--cyan)" : "var(--muted-bright)",
                          whiteSpace: "nowrap",
                          fontFamily: "var(--font-geist-mono)",
                          display: "block",
                          paddingRight: "8px",
                        }}
                      >
                        {label}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Short label - always visible on active */}
                {!isHovered && (
                  <span
                    style={{
                      fontSize: "0.5rem",
                      letterSpacing: "0.15em",
                      color: isActive ? "var(--cyan)" : "transparent",
                      fontFamily: "var(--font-geist-mono)",
                      transition: "color 0.3s",
                      minWidth: "24px",
                      textAlign: "right",
                    }}
                  >
                    {short}
                  </span>
                )}

                {/* LED Dot */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.3 : 1,
                    boxShadow: isActive
                      ? "0 0 8px var(--cyan), 0 0 16px rgba(34,211,238,0.5)"
                      : isHovered
                      ? "0 0 4px var(--cyan)"
                      : "none",
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: isActive ? "10px" : "6px",
                    height: isActive ? "10px" : "6px",
                    borderRadius: "50%",
                    background: isActive
                      ? "var(--cyan)"
                      : isHovered
                      ? "rgba(34,211,238,0.6)"
                      : "var(--border-bright)",
                    transition: "width 0.2s, height 0.2s, background 0.2s",
                    flexShrink: 0,
                  }}
                />
              </div>
            );
          })}

          {/* Bottom status */}
          <div
            className="mt-2 flex flex-col items-end gap-1"
            style={{ fontSize: "0.5rem", color: "var(--muted)", letterSpacing: "0.1em" }}
          >
            <div className="flex items-center gap-1.5">
              <span className="led led-cyan" style={{ width: "4px", height: "4px" }} />
              <span>ACTIVE</span>
            </div>
            <span style={{ color: "var(--muted)", opacity: 0.6 }}>SV.GPU v1.0</span>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
