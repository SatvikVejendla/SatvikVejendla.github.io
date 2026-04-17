"use client";

import { useEffect, useState } from "react";

type ParticleData = {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  tx: number;
  ty: number;
};

const PARTICLE_COLORS = [
  "rgba(34,211,238,0.7)",
  "rgba(168,85,247,0.7)",
  "rgba(74,222,128,0.5)",
  "rgba(249,115,22,0.5)",
];

function makeParticles(): ParticleData[] {
  return Array.from({ length: 80 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 5 + 4,
    delay: -(Math.random() * 6), // negative = start mid-cycle, no stagger wait
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    tx: (Math.random() - 0.5) * 24,
    ty: (Math.random() - 0.5) * 24,
  }));
}

export default function GpuBackground() {
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    setParticles(makeParticles());
  }, []);

  return (
    <>
      {/* Particle field — CSS animations, compositor-only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              willChange: "transform, opacity",
              animation: `gpu-particle ${p.duration}s ${p.delay}s infinite ease-in-out`,
              // inline custom properties so each particle gets its own translate target
              ["--tx" as string]: `${p.tx}px`,
              ["--ty" as string]: `${p.ty}px`,
            }}
          />
        ))}
      </div>

      {/* Fine cyan grid */}
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

      {/* Coarse purple grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "180px 180px",
        }}
      />
    </>
  );
}
