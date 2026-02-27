"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiAward } from "react-icons/fi";

export default function AchievementsPage() {
  const achievements = [
    {
      id: 1,
      title: "Google Cloud Agentic AI Day",
      description:
        "Participated in Google Cloud Agentic AI Day powered by Hack2skill.",
      image: "/Hack2skill-Certificate.png",
      featured: true,
    },
    {
      id: 2,
      title: "AlgoUniversity Nature Camp",
      description:
        "Completed CS Basics, Competitive Programming & AI Tools workshop.",
      image: "/algo.png",
    },
    {
      id: 3,
      title: "TATA Crucible Campus Quiz",
      description:
        "Participated in Tata Crucible Campus Quiz representing CET.",
      image: "/tata.png",
    },
    {
      id: 4,
      title: "Adobe India Hackathon",
      description:
        "Participated in Round 1 Online MCQ + Coding Assessment.",
      image: "/adobe.png",
    },
    {
      id: 5,
      title: "Nation Building Initiative",
      description:
        "Successfully completed Nation Building program participation.",
      image: "/nation.png",
    },
    {
      id: 6,
      title: "kHacks Participation",
      description: "Participated in kHacks technical innovation event.",
      image: "/khacks.png",
    },
    {
      id: 7,
      title: "Kharagpur Data Science Hackathon",
      description:
        "Successfully participated in the 6th edition of Kharagpur Data Science Hackathon organized by IIT Kharagpur.",
      image: "/kharagpur.png",
    },
    {
      id: 8,
      title: "IEDC Summit Code Battle — 2nd Prize 🥈",
      description:
        "Secured 2nd place in the Code Battle Competition at IEDC Summit 2023.",
      image: "/iedc.png",
    },
    {
      id: 9,
      title: "DotSlash Unity Unbound",
      description:
        "Successfully completed Unity Unbound: Game Development workshop.",
      image: "/gamedev.png",
    },
    {
      id: 10,
      title: "Google Foundations of Cybersecurity",
      description:
        "Completed Google's Foundations of Cybersecurity via Coursera.",
      image: "/cybersec.jpeg",
    },
    {
      id: 11,
      title: "AlgoQuest Competitive Programming",
      description:
        "Completed AlgoQuest: Exploring Competitive Programming workshop.",
      image: "/compprog.png",
    },
    {
  id: 12,
  title: "Get Started with Databricks in Machine Learning",
  description:
    "Completed the 'Get Started with Databricks in Machine Learning' course, gaining hands-on experience with the Databricks platform for building and managing ML workflows.",
  image: "/databrick.jpeg",
}
  ];

  const featuredAchievement = achievements.find((a) => a.featured);
  const otherAchievements = achievements.filter((a) => !a.featured);

  return (
    <div className="min-h-screen bg-heroDark relative overflow-hidden">
      {/* 🌌 BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* 🔙 BACK */}
        <Link
          href="/#other"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition mb-12 group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition" />
          Back to home
        </Link>

        {/* 🏆 HERO */}
        <div className="text-center mb-20">
          <p className="text-orange-400 tracking-[0.25em] text-sm mb-4">
            MILESTONES & VICTORIES
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
              Achievements
            </span>
          </h1>

          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            From code to peaks, every achievement tells a story of dedication.
          </p>

          {/* ✨ PREMIUM DIVIDER */}
          <div className="mt-10 h-px w-40 mx-auto bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />
        </div>

        {/* ⭐ FEATURED */}
        {featuredAchievement && (
          <div className="mb-20">
            <div className="group grid md:grid-cols-2 gap-10 items-center rounded-3xl p-6 md:p-10 bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_25px_90px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-500">

              {/* IMAGE */}
              <div className="relative w-full aspect-[16/10] bg-black/20 rounded-2xl overflow-hidden">
                <Image
                  src={featuredAchievement.image}
                  alt={featuredAchievement.title}
                  fill
                  className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />

                {/* ⭐ BADGE */}
                <div className="absolute top-3 left-3 flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-orange-500/90 text-white backdrop-blur">
                  <FiAward size={12} />
                  Featured
                </div>
              </div>

              {/* TEXT */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {featuredAchievement.title}
                </h2>

                <p className="text-white/60 leading-relaxed text-lg">
                  {featuredAchievement.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 🧩 GRID */}
        <div className="grid md:grid-cols-2 gap-12">
          {otherAchievements.map((item) => (
            <div key={item.id} className="group">
              <div className="rounded-2xl p-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_25px_80px_rgba(0,0,0,0.6)] hover:-translate-y-2 transition-all duration-500">

                {/* IMAGE */}
                <div className="relative w-full aspect-[16/10] bg-black/20 rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              <h3 className="mt-5 text-2xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="text-white/60 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}