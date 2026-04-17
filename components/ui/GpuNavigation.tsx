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
      const probe = window.scrollY + window.innerHeight / 2;
      let current = NAV_ITEMS[0].id;
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= probe) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Mobile: fixed top bar (hidden on md+) ── */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            key="mobile-nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
            className="md:hidden fixed top-0 left-0 right-0 z-[1000] flex flex-row items-center justify-around px-2 py-2"
            style={{
              background: "rgba(5,8,14,0.75)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid rgba(34,211,238,0.12)",
            }}
            aria-label="Section Navigation"
          >
            {NAV_ITEMS.map(({ id, short }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  className="flex flex-col items-center gap-1 py-1 px-1 min-w-0"
                  onClick={() => handleClick(id)}
                >
                  <motion.div
                    animate={{
                      boxShadow: isActive
                        ? "0 0 8px var(--cyan), 0 0 16px rgba(34,211,238,0.45)"
                        : "none",
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                      width: isActive ? "16px" : "8px",
                      height: "8px",
                      borderRadius: "2px",
                      background: isActive ? "var(--cyan)" : "var(--border-bright)",
                      transition: "height 0.2s, background 0.2s",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.55rem",
                      letterSpacing: "0.08em",
                      fontFamily: "var(--font-geist-mono)",
                      color: isActive ? "var(--cyan)" : "var(--muted-bright)",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      transition: "color 0.2s",
                    }}
                  >
                    {short}
                  </span>
                </button>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Desktop: fixed right side (hidden below md) ── */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            key="desktop-nav"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-[1000] flex-col gap-0 items-end"
            aria-label="GPU Section Navigation"
          >
            <div style={{ marginBottom: "16px", borderBottom: "1px solid var(--muted)" }} className="w-6" />

            {NAV_ITEMS.map(({ id, label }) => {
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
                      width: "8px",
                      height: "16px",
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

            <div style={{ marginTop: "16px", borderTop: "1px solid var(--muted)" }} className="w-6" />
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
