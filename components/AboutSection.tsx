"use client";

import {
  SiTypescript,
  SiFlutter,
  SiPython,
  SiNodedotjs,
  SiTailwindcss,
  SiDocker,
  SiGit,
} from "react-icons/si";
import { useState, useEffect } from "react";

export default function AboutSection() {
  const [hoverImage, setHoverImage] = useState("/deonImage.jpeg");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const images = ["/img11.jpeg", "/img2.png", "/img3.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = (image: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setHoverImage(image);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  const handleMouseLeave = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setHoverImage("/deonImage.jpeg");
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  return (
    <section
      id="about"
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-5 pb-20 sm:pb-28 pt-10 sm:pt-14"
    >
      {/* ================= TOP GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

        {/* TOP LEFT */}
        <div
          className="md:col-span-1 rounded-2xl glass-card overflow-hidden cursor-pointer group h-[200px] sm:h-[240px]"
          onMouseEnter={() => handleMouseEnter("/deonImage.jpeg")}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/bio3.jpeg"
            alt="Deon Jose bio"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* TOP RIGHT */}
        <div
          className="md:col-span-2 rounded-2xl glass-card p-4 sm:p-5 flex flex-col relative overflow-visible cursor-pointer"
          onMouseEnter={() => handleMouseEnter("/univ.png")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[7px] sm:text-[8px] tracking-[0.2em] text-primary border border-primary/30 px-3 py-0.5 rounded-full bg-primary/5 whitespace-nowrap z-20">
            HOVER TO READ MORE
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                title: "UNIVERSITY",
                desc: "Computer Science undergraduate at CET, focused on scalable systems and strong problem-solving.",
              },
              {
                title: "PROJECTS & ENGINEERING",
                desc: "Building real-world full-stack, AI/ML, and data-driven applications using Next.js and MERN.",
              },
              {
                title: "COMPETITIONS",
                desc: "Competitive programmer and hackathon enthusiast with podium finishes including IEDC Summit Code Battle.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl glass-card p-4 flex flex-col subcard-hover relative z-10 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-sm font-semibold text-black dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-black/60 dark:text-white/60 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= BOTTOM ROW ================= */}
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

          {/* LEFT — MINDSET */}
          <div
            className="rounded-2xl glass-card p-5 sm:p-6 flex flex-col"
            onMouseEnter={() => handleMouseEnter("/gym.png")}
            onMouseLeave={handleMouseLeave}
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Mindset</h3>

            <p className="text-black/70 dark:text-white/70 text-sm leading-relaxed mb-4">
              Building more than software. My passions provide the discipline and focus I need to grow.
            </p>

            {/* ✅ MOBILE FIXED IMAGE */}
            <div className="relative w-full h-[180px] md:flex-1 overflow-hidden rounded-xl">
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Mindset activity ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    index === imageIndex
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                />
              ))}
            </div>

            <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed mt-4">
              Mastering body and mind is my path to excellence.
            </p>
          </div>

          {/* CENTER COLUMN */}
          <div className="flex flex-col gap-3">

            {/* ✅ MAIN IMAGE FIX */}
            <div className="relative rounded-2xl glass-card overflow-hidden h-[300px] md:flex-[3]">
              <img
                key={hoverImage}
                src={hoverImage}
                alt="Dynamic content"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
              />
            </div>

            {/* LOCATION */}
            <div
              className="relative rounded-2xl glass-card overflow-hidden h-[120px] md:flex-[1]"
              onMouseEnter={() => handleMouseEnter("/trivandrumImage.png")}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src="/loc.jpeg"
                alt="India location"
                className="absolute inset-0 w-full h-full object-covermb-4"
              />

             
            </div>
          </div>

          {/* RIGHT — CRAFT */}
          <div
            className="rounded-2xl glass-card p-5 flex flex-col"
            onMouseEnter={() => handleMouseEnter("/craft2.png")}
            onMouseLeave={handleMouseLeave}
          >
            <h3 className="text-3xl font-bold text-primary mb-3">Craft</h3>

            <p className="text-black/80 dark:text-white/80 text-base leading-relaxed italic mb-2">
              "Building scalable apps, websites, and automations."
            </p>

            <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed mb-4">
              I understand what advantages modern tech can provide, helping me advise on the solutions a business actually needs.
            </p>

            {/* FLOAT STRIP */}
            <div
              className="relative w-full mb-4 py-2 overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              }}
            >
              <div className="flex gap-3 items-center animate-float w-max">
                {[
                  { icon: SiTypescript, color: "text-blue-400", name: "TS" },
                  { icon: SiFlutter, color: "text-blue-500", name: "FLUTTER" },
                  { icon: SiPython, color: "text-yellow-400", name: "PYTHON" },
                  { icon: SiNodedotjs, color: "text-green-500", name: "NODE" },
                  { icon: SiTailwindcss, color: "text-cyan-400", name: "TAILWIND" },
                  { icon: SiDocker, color: "text-blue-600", name: "DOCKER" },
                  { icon: SiGit, color: "text-orange-500", name: "GIT" },
                ].map((tech, i) => (
                  <span
                    key={i}
                    className="text-white/70 text-xs border border-white/15 bg-black/40 px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm hover:bg-black/60 hover:border-primary/30 transition-all duration-300"
                  >
                    <tech.icon className={`${tech.color} text-sm`} />
                    <span>{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-2">
              <p className="text-black/60 dark:text-white/60 text-xs leading-relaxed">
                Active hackathon competitor focused on AI/ML, Data Science, and full-stack. Open to meaningful collaborations.
              </p>

              <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-2 text-black/70 dark:text-white/70 text-xs font-medium border border-primary/20">
                ● Open to collaboration & freelance
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}