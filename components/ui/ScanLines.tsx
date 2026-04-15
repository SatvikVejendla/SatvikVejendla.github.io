"use client";

import { useEffect, useRef } from "react";

export default function ScanLines() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duration = 9000;
    let start = 0;
    let raf: number;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = ((ts - start) % duration) / duration;
      if (lineRef.current) {
        lineRef.current.style.top = `${progress * 105 - 5}%`;
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9997] overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={lineRef}
        className="absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.3) 20%, rgba(34,211,238,0.8) 50%, rgba(34,211,238,0.3) 80%, transparent 100%)",
          boxShadow:
            "0 0 8px rgba(34,211,238,0.5), 0 0 20px rgba(34,211,238,0.2)",
          top: "-5%",
        }}
      />
    </div>
  );
}
