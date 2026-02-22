"use client";

import {
  FiArrowRight,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";
import { BookOpen, Trophy, Link as LinkIcon } from "lucide-react";

export default function OtherSection() {
  const exploreItems = [
    {
      id: "guestbook",
      title: "Guestbook",
      description: "Leave your mark and see what others have to say",
      Icon: BookOpen,
      color: "from-purple-400 to-pink-500",
      link: "/guestbook",
    },
    {
      id: "achievements",
      title: "Achievements",
      description: "Milestones, certifications, and accomplishments",
      Icon: Trophy,
      color: "from-orange-400 to-yellow-500",
      link: "/achievements",
    },
    {
      id: "links",
      title: "My Links",
      description: "Find me across the web and social platforms",
      Icon: LinkIcon,
      color: "from-cyan-400 to-blue-500",
      link: "/links",
    },
  ];

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/deonJoseDJV", label: "GitHub" },
    { icon: FiTwitter, href: "#", label: "Twitter" },
    {
      icon: FiLinkedin,
      href: "https://www.linkedin.com/in/deon-jose",
      label: "LinkedIn",
    },
    { icon: FiMail, href: "mailto:deonjose27@gmail.com", label: "Email" },
  ];

  const handleCardClick = (link: string) => {
    window.location.href = link;
  };

  return (
    <section
      id="other"
      className="relative w-full max-w-7xl mx-auto px-6 py-28"
    >
      {/* HEADER */}
      <div className="mb-20 text-center">
        <h2 className="text-5xl md:text-6xl font-semibold text-white mb-6">
          More to{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Explore
          </span>
        </h2>

        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Check out these additional resources and connect with me
        </p>
      </div>

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {exploreItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item.link)}
            className="
              group relative rounded-3xl p-10 flex flex-col items-center text-center cursor-pointer
              
              /* ✨ PREMIUM GLASS */
              bg-white/[0.03]
              backdrop-blur-xl
              border border-white/10
              
              /* ✨ SOFT GLOW */
              shadow-[0_10px_40px_rgba(139,92,246,0.15)]
              
              /* ✨ HOVER MAGIC */
              transition-all duration-500
              hover:scale-[1.025]
              hover:border-white/20
              hover:bg-white/[0.05]
              hover:shadow-[0_20px_60px_rgba(139,92,246,0.25)]
            "
          >
            {/* ICON BOX */}
            <div
              className={`
                mb-6 rounded-2xl p-4
                bg-gradient-to-br ${item.color}/20
                border border-white/10
                backdrop-blur-md
                group-hover:scale-110
                transition-transform duration-300
              `}
            >
              <item.Icon className="w-7 h-7 text-white" />
            </div>

            {/* TITLE */}
            <h3
              className={`text-3xl font-semibold mb-3 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
            >
              {item.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {item.description}
            </p>

            {/* EXPLORE */}
            <div className="mt-6 flex items-center justify-center gap-2 text-white/70 group-hover:text-white transition">
              <span className="text-sm font-medium">Explore</span>
              <FiArrowRight className="group-hover:translate-x-1 transition" />
            </div>

            {/* ✨ SUBTLE INNER GLOW */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
          </div>
        ))}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="border-t border-white/10 pt-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-sm">
            PS • © 2026 Deon Jose
          </div>

          <div className="text-white/40 text-sm">
            Built with ❤️ using{" "}
            <span className="text-purple-400">Next.js</span> &{" "}
            <span className="text-purple-400">Tailwind</span>
          </div>

          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-primary transition"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}