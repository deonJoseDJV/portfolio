"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        w-12 h-12 rounded-full
        backdrop-blur-xl
        bg-white/70 dark:bg-white/5
        border border-black/10 dark:border-white/10
        flex items-center justify-center
        hover:scale-110 transition
      "
    >
      {isDark ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}