"use client";

import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import OtherSection from "@/components/OtherSection";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  // ================= MOUSE SPOTLIGHT =================
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--y", `${e.clientY - rect.top}px`);
    };

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  // ================= SEND MESSAGE =================
  const sendMessage = async (text?: string) => {
    const messageToSend = text ?? input;
    if (!messageToSend.trim()) return;

    try {
      setLoading(true);
      setReply("");

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageToSend,
        }),
      });

      const data = await res.json();
      setReply(data.reply);
      setInput("");
    } catch (err) {
      setReply("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      ref={ref}
      className="
        group relative min-h-screen overflow-hidden
        bg-bgLight dark:bg-heroDark
        text-black dark:text-white
        transition-colors duration-300
      "
    >
      {/* DOT GRID */}
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-70" />

      {/* VIGNETTE GLOW */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_60%)]" />

      {/* HOVER SPOTLIGHT */}
      <div className="hover-spotlight" />

      <Navbar onBookCall={() => setContactOpen(true)} />

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="
          relative min-h-[90vh] sm:min-h-screen
          px-4 sm:px-6
          pt-24 sm:pt-32 md:pt-36
          flex flex-col items-center text-center
        "
      >
        {/* MEMOJI */}
        <img
          src="/memoji.png"
          alt="Memoji"
          className="
            w-[100px] sm:w-[130px] md:w-[160px]
            -translate-y-6 sm:-translate-y-10 md:-translate-y-12
            rotate-6 translate-x-2
            transition-transform duration-300 ease-out
            group-hover:-translate-y-2
            drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)]
          "
        />

        {/* HEADING */}
        <h1
          className="
            mt-[-2.5rem] sm:mt-[-5rem] md:mt-[-8rem]
            text-2xl sm:text-4xl md:text-5xl
            font-semibold tracking-tight leading-tight
          "
        >
          Hi, I'm <span className="name-shine">Deon Jose</span>
        </h1>

        {/* SUBTEXT */}
        <p className="mt-3 text-sm sm:text-base text-black/60 dark:text-white/60 max-w-xl px-2">
          Ask me anything about my work, skills, or projects.
        </p>

        {/* ================= CHATBOT BOX ================= */}
        <div className="mt-10 sm:mt-14 w-full max-w-4xl">
          <div
            className="
              rounded-2xl sm:rounded-3xl border
              border-black/10 dark:border-white/10
              bg-white/70 dark:bg-white/[0.05]
              backdrop-blur-2xl
              p-6 sm:p-10 md:p-12
              shadow-[0_20px_60px_rgba(0,0,0,0.12)]
              dark:shadow-[0_30px_100px_rgba(0,0,0,0.55)]
            "
          >
            <p className="text-black/50 dark:text-white/50 text-sm mb-6 min-h-[24px]">
              {loading
                ? "Thinking..."
                : reply || "Ask me anything about Deon..."}
            </p>

            {/* QUICK BUTTONS */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              {["Work", "About me", "Skills", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => sendMessage(item)}
                  className="
                    px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border
                    border-black/10 dark:border-white/10
                    bg-black/[0.03] dark:bg-white/[0.04]
                    text-xs sm:text-sm text-black/70 dark:text-white/70
                    hover:bg-black/[0.06] dark:hover:bg-white/[0.10]
                    transition
                  "
                >
                  {item}
                </button>
              ))}
            </div>

            {/* ✅ INPUT WITH SEND BUTTON */}
            <div className="relative w-full">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask anything about Deon..."
                className="
                  w-full rounded-full
                  bg-white dark:bg-black/50
                  border border-black/10 dark:border-white/10
                  pl-5 pr-14 py-3 sm:py-4 text-sm outline-none
                  placeholder:text-black/30 dark:placeholder:text-white/30
                  focus:border-primary/50
                "
              />

              {/* SEND BUTTON */}
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="
                  absolute right-2 top-1/2 -translate-y-1/2
                  w-10 h-10 rounded-full
                  flex items-center justify-center
                  bg-primary text-white
                  hover:bg-primary/80
                  disabled:opacity-40 disabled:cursor-not-allowed
                  transition
                "
              >
                <FiSend size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center text-black/40 dark:text-white/40">
          <span className="text-xs sm:text-sm mb-2">Scroll to explore</span>
          <svg
            className="animate-bounce"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* SECTIONS */}
      <div className="relative z-10">
        <div className="w-full h-px bg-black/10 dark:bg-white/5 max-w-6xl mx-auto mb-16" />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <OtherSection />
      </div>

      {/* CONTACT MODAL */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </main>
  );
}