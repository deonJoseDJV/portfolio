'use client'

import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowLeft,
  FiExternalLink
} from 'react-icons/fi'
import Link from 'next/link'

export default function LinksPage() {
  const links = [
    {
      name: 'GitHub',
      icon: FiGithub,
      url: 'https://github.com/deonJoseDJV',
      description: 'Check out my code and projects'
    },
    {
      name: 'LinkedIn',
      icon: FiLinkedin,
      url: 'https://www.linkedin.com/in/deon-jose',
      description: 'Connect with me professionally'
    },
    {
      name: 'Email',
      icon: FiMail,
      url: 'mailto:deonjose27@gmail.com',
      description: 'Send me a message'
    }
  ]

  return (
    <div className="min-h-screen bg-heroDark relative overflow-hidden">
      {/* 🌌 BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_60%)]" />

      <div className="relative max-w-3xl mx-auto px-6 py-16">

        {/* 🔙 BACK */}
        <Link
          href="/#other"
          className="inline-flex items-center gap-2 text-white/40 hover:text-primary transition-colors mb-10 group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition" />
          <span>Back to home</span>
        </Link>

        {/* 🏷️ MINI LABEL */}
        <p className="text-blue-400/80 text-xs tracking-[0.35em] font-mono text-center mb-4">
          CONNECT WITH ME
        </p>

        {/* 🧠 BIG TITLE */}
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          <span className="text-white">My </span>
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Links
          </span>
        </h1>

        {/* SUBTEXT */}
        <p className="text-white/60 text-center mb-14">
          Find me across the web and social platforms
        </p>

        {/* 🔗 LINKS */}
        <div className="space-y-5">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div
                className="
                relative
                rounded-2xl
                p-6
                flex
                items-center
                justify-between
                backdrop-blur-xl
                bg-white/[0.04]
                border border-white/10
                hover:border-blue-400/40
                hover:bg-white/[0.06]
                transition-all duration-300
                hover:scale-[1.015]
                shadow-[0_0_0_rgba(0,0,0,0)]
                hover:shadow-[0_0_35px_rgba(59,130,246,0.15)]
              "
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  {/* ICON BADGE */}
                  <div className="
                    w-12 h-12
                    rounded-xl
                    flex items-center justify-center
                    border border-blue-400/30
                    bg-blue-500/10
                    group-hover:bg-blue-500/20
                    transition
                  ">
                    <link.icon className="w-6 h-6 text-blue-400" />
                  </div>

                  {/* TEXT */}
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {link.name}
                    </h3>
                    <p className="text-white/50 text-sm">
                      {link.description}
                    </p>
                  </div>
                </div>

                {/* RIGHT ICON */}
                <FiExternalLink className="text-white/30 group-hover:text-blue-400 transition" />
              </div>
              
            </a>
            
          ))}
        </div>
        
      </div>
    </div>
    
  )
  
}