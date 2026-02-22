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
        <h2 className="text-5xl md:text-6xl font-semibold text-black dark:text-white mb-6">
          More to{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Explore
          </span>
        </h2>

        <p className="text-black/60 dark:text-white/60 text-lg max-w-xl mx-auto">
          Check out these additional resources and connect with me
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
        {exploreItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item.link)}
            className="
              group relative rounded-3xl p-12 flex flex-col items-center text-center cursor-pointer
              
              bg-white/[0.03] dark:bg-white/[0.02]
              backdrop-blur-xl
              border border-black/10 dark:border-white/10
              
              shadow-xl dark:shadow-none
              transition-all duration-500 ease-out
              
              hover:scale-105
              hover:border-black/20 dark:hover:border-white/20
              hover:bg-white/[0.06] dark:hover:bg-white/[0.04]
              hover:shadow-2xl dark:hover:shadow-2xl
            "
          >
            {/* ICON BOX */}
            <div
              className={`
                mb-8 rounded-2xl p-5
                bg-gradient-to-br ${item.color}/20
                border border-black/10 dark:border-white/10
                backdrop-blur-md
                group-hover:scale-110 group-hover:-translate-y-1
                transition-all duration-300
              `}
            >
              <item.Icon className="w-8 h-8 text-black dark:text-white" />
            </div>

            {/* TITLE */}
            <h3
              className={`text-4xl font-bold mb-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
            >
              {item.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-black/60 dark:text-white/60 text-base leading-relaxed max-w-sm">
              {item.description}
            </p>

            {/* EXPLORE LINK */}
            <div className="
              mt-8 flex items-center justify-center gap-2
              text-black/70 dark:text-white/70 
              group-hover:text-black dark:group-hover:text-white
              font-medium
              transition-all
            ">
              <span className="text-base">Explore</span>
              <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </div>

            {/* INNER GLOW */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="border-t border-black/10 dark:border-white/10 pt-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-black/40 dark:text-white/40 text-sm">
            PS • © 2026 Deon Jose
          </div>

          <div className="text-black/40 dark:text-white/40 text-sm">
            Built with ❤️ using{" "}
            <span className="text-purple-500 dark:text-purple-400">Next.js</span> &{" "}
            <span className="text-purple-500 dark:text-purple-400">Tailwind</span>
          </div>

          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/40 dark:text-white/40 hover:text-primary transition"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}