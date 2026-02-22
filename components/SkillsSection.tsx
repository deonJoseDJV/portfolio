"use client";
import { useState, useEffect } from "react";
import SkillsGlobe from "./SkillsGlobe";

export default function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="skills"
      className="relative w-full max-w-6xl mx-auto px-5 py-24 min-h-screen flex flex-col items-center"
    >
      {/* ================= HEADER ================= */}
      <div className="text-center mb-16">
        <p className="text-black/50 dark:text-white/50 tracking-[0.35em] text-xl mb-4">
          TECH STACK
        </p>

        <h2 className="text-4xl sm:text-8xl md:text-7xl font-semibold tracking-tight">
          <span className="text-black dark:text-white">My </span>
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            Skills
          </span>
        </h2>
      </div>

      <SkillsGlobe />
    </section>
  );
}