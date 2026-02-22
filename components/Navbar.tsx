"use client";

import ThemeToggle from "./ThemeToggle";
import { Calendar, Menu } from "lucide-react";
import { useState, useEffect } from "react";

interface NavbarProps {
  onBookCall: () => void; // ⭐ IMPORTANT
}

export default function Navbar({ onBookCall }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  // ✅ Scroll spy
  useEffect(() => {
    const sections = ["home", "about", "projects", "skills", "other"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ✅ Smooth scroll
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4">
        
        {/* LEFT — THEME */}
        <div className="absolute left-4 sm:left-6">
          <ThemeToggle />
        </div>

        {/* CENTER — DESKTOP NAV */}
        <nav className="hidden sm:flex backdrop-blur-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full px-6 py-3 gap-6 text-sm text-black/70 dark:text-white/80 shadow-lg">
          
          {["home","about","projects","skills","other"].map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`px-3 py-1.5 rounded-full transition ${
                active === id
                  ? "bg-white/20 text-black dark:text-white"
                  : "hover:text-black dark:hover:text-white"
              }`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </nav>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden backdrop-blur-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full w-12 h-12 flex items-center justify-center"
        >
          <Menu size={22} />
        </button>

        {/* ⭐ RIGHT — BOOK CALL (DESKTOP) */}
        <div className="absolute right-4 sm:right-6">
          <button
            onClick={onBookCall}
            className="backdrop-blur-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2 text-sm hover:scale-105 transition"
          >
            <Calendar size={22} />
            <span className="hidden sm:inline">Book a Call</span>
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="fixed inset-0 z-40 sm:hidden">
          
          {/* BACKDROP */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* MENU PANEL */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[92%] max-w-md rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl p-6 flex flex-col gap-4 text-center">
            
            {["home","about","projects","skills","other"].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`py-3 rounded-full transition ${
                  active === id
                    ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}

            {/* ⭐ MOBILE BOOK CALL */}
            <button
              onClick={() => {
                setOpen(false);
                onBookCall();
              }}
              className="mt-4 w-full rounded-full border border-white/10 bg-white/5 py-3 flex items-center justify-center gap-2 text-white"
            >
              <Calendar size={22} />
              Book a Call
            </button>
          </div>
        </div>
      )}
    </>
  );
}