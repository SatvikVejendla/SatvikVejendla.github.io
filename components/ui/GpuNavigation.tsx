"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "hero", label: "HOME", short: "Home" },
  { id: "about", label: "ABOUT", short: "About" },
  { id: "experience", label: "EXPERIENCE", short: "Experience" },
  { id: "projects", label: "PROJECTS", short: "Projects" },
  { id: "skills", label: "SKILLS", short: "Skills" },
  { id: "contact", label: "CONTACT", short: "Contact" },
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
    const handleScroll = () => {
      // Use the midpoint of the viewport as the probe point
      const probe = window.scrollY + window.innerHeight / 2;

      let current = NAV_ITEMS[0].id;
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= probe) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set correct state on mount
    return () => window.removeEventListener("scroll", handleScroll);
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
          className="fixed right-6 top-1/2 -translate-y-1/2 z-[1000] flex flex-col gap-0 items-end"
          aria-label="GPU Section Navigation"
        >          
          <div style={{ marginBottom: "16px", borderBottom: "1px solid var(--muted)" }} className="w-6"></div>

          {NAV_ITEMS.map(({ id, label, short }) => {
            const isActive = activeSection === id;
            const isHovered = hoveredItem === id;

            return (
              <div
                key={id}
                className="flex items-center gap-3 cursor-pointer py-4"
                onMouseEnter={() => (isActive ? undefined : setHoveredItem(id))}
                onMouseLeave={() => (isActive ? undefined : setHoveredItem(null))}
                onClick={() => handleClick(id)}
              >
                {/* Label area (always rendered to prevent flicker) */}
                <div
                  style={{
                    width: "16ch",
                    pointerEvents: "none",
                    textAlign: "right",
                    overflow: "visible",
                  }}
                >
                  <motion.span
                    animate={{
                      opacity: isHovered || isActive ? 1 : 0,
                      x: isHovered ? 0 : 6,
                      color: isActive ? "var(--cyan)" : "var(--muted-bright)",
                    }}
                    transition={{ duration: 0.15 }}
                    style={{
                      display: "inline-block",
                      fontSize: "1.1rem",
                      letterSpacing: "0.18em",
                      whiteSpace: "nowrap",
                      fontFamily: "var(--font-geist-mono)",
                      paddingRight: "8px",
                    }}
                  >
                    {label}
                  </motion.span>
                </div>

                {/* LED Dot */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    boxShadow: isActive
                      ? "0 0 8px var(--cyan), 0 0 16px rgba(34,211,238,0.5)"
                      : isHovered
                      ? "0 0 4px var(--cyan)"
                      : "none",
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: isActive ? "8px" : "8px",
                    height: isActive ? "16px" : "16px",
                    borderRadius: "2px",
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
          <div style={{ marginTop: "16px", borderTop: "1px solid var(--muted)" }} className="w-6"></div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
