"use client";
import { useState } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      number: "01",
      type: "WEB APP",
      title: "Lost And Found Tracker",
      description:
        "Full-stack MERN application that helps users report, search, and recover lost items through a centralized real-time tracking system.",
      tags: ["MongoDB", "Express", "React", "Node.js"],
      image: "/lostFound.png",
      github: "https://github.com/deonJoseDJV/LostAndFoundTracker2",
      live: "#",
    },
    {
      id: 2,
      number: "02",
      type: "AI WEB APP",
      title: "GPT Chat Application",
      description:
        "Full-stack AI chat application powered by OpenAI Chat Completions API, enabling real-time conversational responses with a clean and responsive UI.",
      tags: ["OpenAI API", "Next.js", "React", "Node.js"],
      image: "/gpt.png",
      github: "https://github.com/deonJoseDJV/GPT",
      live: "#",
    },
    {
      id: 3,
      number: "03",
      type: "WEB APP",
      title: "Zoom Clone",
      description:
        "Full-stack video conferencing web application with real-time communication, authentication, and meeting rooms.",
      tags: ["MongoDB", "Express", "React", "Node.js", "WebRTC", "Socket.io"],
      image: "/zoom.png",
      github: "https://github.com/deonJoseDJV/zoomCloneFinal",
      live: "#",
    },
  ];

  return (
    <section
      id="projects"
      className="relative w-full max-w-6xl mx-auto px-6 py-28"
    >
      {/* ===== PREMIUM HEADER ===== */}
      <div className="mb-20 text-center">
        <p className="text-primary/80 text-xs tracking-[0.35em] font-mono mb-4">
          PORTFOLIO
        </p>

        <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
          Featured{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-violet-500 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>

        <p className="text-black/60 dark:text-white/60 text-lg max-w-2xl mx-auto">
          A curated selection of projects that made me confident in building software.
        </p>
      </div>

      {/* ===== PROJECT GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            className="
              group relative rounded-3xl overflow-hidden cursor-pointer
              bg-white/[0.6] dark:bg-white/[0.03]
              backdrop-blur-xl
              border border-black/10 dark:border-white/10
              shadow-[0_0_40px_rgba(139,92,246,0.08)]
              hover:border-purple-400/40
              transition-all duration-500
            "
          >
            {/* ===== IMAGE ===== */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  hoveredProject === project.id
                    ? "scale-110 rotate-1"
                    : "scale-100"
                }`}
              />

              {/* overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* number */}
              <div className="absolute top-4 left-4 text-4xl font-bold text-white/20">
                {project.number}
              </div>

              {/* type badge */}
              <div
                className="
                  absolute top-4 right-4 px-3 py-1 rounded-full text-xs
                  bg-white/60 dark:bg-white/10
                  backdrop-blur-md
                  border border-black/20 dark:border-white/20
                  text-primary
                "
              >
                {project.type}
              </div>
            </div>

            {/* ===== CONTENT ===== */}
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      text-black/50 dark:text-white/40
                      text-xs px-3 py-1 rounded-full
                      border border-black/10 dark:border-white/10
                      bg-black/[0.03] dark:bg-white/[0.03]
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* links */}
              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  className="text-black/50 dark:text-white/40 hover:text-primary transition"
                >
                  <FiGithub size={18} />
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  className="text-black/50 dark:text-white/40 hover:text-primary transition"
                >
                  <FiExternalLink size={18} />
                </a>
              </div>
            </div>

            {/* ===== PREMIUM HOVER GLOW ===== */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                hoveredProject === project.id ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10" />
            </div>
          </div>
        ))}
      </div>

      {/* ===== CTA BUTTON ===== */}
      <div className="text-center mt-16">
        <a
          href="https://github.com/deonJoseDJV"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2
            bg-black/[0.05] dark:bg-white/[0.04]
            backdrop-blur-xl
            border border-black/10 dark:border-white/10
            hover:border-purple-400/40
            px-8 py-3 rounded-full
            text-black/80 dark:text-white/80
            hover:text-black dark:hover:text-white
            transition-all duration-300
          "
        >
          Explore all projects on GitHub
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  );
}