"use client";
import { 
  SiTypescript, 
  SiFlutter, 
  SiPython, 
  SiNodedotjs, 
  SiTailwindcss ,
  SiDocker,
  SiGit
} from "react-icons/si";
import { useState, useEffect } from "react";

export default function AboutSection() {
  // State for hover image
  const [hoverImage, setHoverImage] = useState("/deonImage.jpeg");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // State for rotating mindset images
  const [imageIndex, setImageIndex] = useState(0);
  
  // Array of mindset images
  const images = [
    "/img11.jpeg",
    "/img2.png",
    "/img3.png"
  ];

  // Rotate every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Handle mouse enter with transition effect
  const handleMouseEnter = (image: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setHoverImage(image);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 150);
  };

  // Reset to default image when not hovering
  const handleMouseLeave = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setHoverImage("/deonImage.jpeg");
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 150);
  };

  return (
    <section
      id="about"
      className="relative w-full max-w-6xl mx-auto px-5 pb-28 pt-14"
    >
      {/* ===== GRID WRAPPER ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[210px]">

        {/* ================= TOP LEFT — NAME & TITLE ================= */}
        <div 
          className="md:col-span-1 rounded-2xl glass-card p-0 overflow-hidden cursor-pointer group"
          onMouseEnter={() => handleMouseEnter("/deonImage.jpeg")}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/bio3.jpeg"
            alt="Deon Jose bio"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* ================= TOP RIGHT CARD - ENTIRE CARD HOVER ================= */}
        <div 
          className="md:col-span-2 rounded-2xl glass-card p-5 flex flex-col relative overflow-visible cursor-pointer"
          onMouseEnter={() => handleMouseEnter("/univ.png")}
          onMouseLeave={handleMouseLeave}
        >
          
          {/* hover pill - stays on top */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[8px] tracking-[0.2em] text-primary border border-primary/30 px-3 py-0.5 rounded-full bg-primary/5 whitespace-nowrap z-20 transition-all duration-300 hover:bg-primary/20">
            HOVER TO READ MORE
          </div>

          {/* Container for 3 subcards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-3 h-full relative">
            
            {/* SUBCARD 1: UNIVERSITY */}
            <div className="rounded-xl glass-card p-3 flex flex-col subcard-hover left-card relative z-10">
              <h3 className="text-base font-semibold text-white mb-2">UNIVERSITY</h3>
              <p className="text-white/60 text-[10px] leading-relaxed">
                Computer Science undergraduate at College of Engineering Trivandrum (CET), focused on building scalable software systems and mastering core problem-solving fundamentals.
                </p>
            </div>

            {/* SUBCARD 2: SCIENCE CLUB */}
            <div className="rounded-xl glass-card p-3 flex flex-col subcard-hover center-card relative z-10">
              <h3 className="text-base font-semibold text-white mb-2">PROJECTS & ENGINEERING</h3>
              <p className="text-white/60 text-[10px] leading-relaxed">
               Focused on building real-world full-stack, AI/ML, and data-driven applications using Next.js, MERN, and modern machine learning workflows.
              </p>
            </div>

            {/* SUBCARD 3: COMPETITIONS */}
            <div className="rounded-xl glass-card p-3 flex flex-col subcard-hover right-card relative z-10">
              <h3 className="text-base font-semibold text-white mb-2">COMPETITIONS</h3>
              <p className="text-white/60 text-[10px] leading-relaxed">
                Competitive programmer and hackathon enthusiast with podium finishes including 2nd place at IEDC Summit Code Battle and participation in national innovation events.
              </p>
            </div>
          </div>
        </div>

        {/* ================= LEFT COLUMN - MINDSET CARD WITH ROTATING IMAGES ================= */}
        <div 
          className="md:col-span-1 md:row-span-2 rounded-2xl glass-card p-6 flex flex-col relative overflow-hidden cursor-pointer group"
          onMouseEnter={() => handleMouseEnter("/gym.png")}
          onMouseLeave={handleMouseLeave}
        >
          
          {/* Static Header - Never Changes */}
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">Mindset</h3>
          
          {/* Static Description - Never Changes */}
          <p className="text-white/70 text-sm leading-relaxed mb-4 group-hover:text-white/80 transition-all duration-300">
            Building more than software. My passions provide the discipline and focus I need to grow.
          </p>
          
          {/* Rotating Images Section - ONLY THIS CHANGES */}
          <div className="relative w-full flex-1 min-h-[120px] my-2">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Mindset activity ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-in-out transform ${
                  index === imageIndex
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-95"
                }`}
              />
            ))}
          </div>
          
          {/* Static Footer - Never Changes */}
          <p className="text-white/60 text-sm leading-relaxed mt-4 group-hover:text-white/70 transition-colors duration-300">
            Mastering body and mind is my path to excellence.
          </p>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setImageIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === imageIndex
                    ? "w-5 bg-primary"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ================= MIDDLE COLUMN - DYNAMIC IMAGE WITH SMOOTH TRANSITION ================= */}
        <div className="md:col-span-1 md:row-span-2 flex flex-col gap-1 h-full">
          <div className="rounded-2xl glass-card p-0 overflow-hidden flex-1 relative" style={{ height: '75%' }}>
            {/* Overlay effect during transition */}
            <div className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent transition-opacity duration-300 pointer-events-none z-10 ${isTransitioning ? 'opacity-100' : 'opacity-0'}`} />
            
            {/* Current image */}
            <img
              key={hoverImage}
              src={hoverImage}
              alt="Dynamic content"
              className={`w-full h-full object-cover transition-all duration-700 ease-in-out transform ${
                isTransitioning ? 'scale-110 opacity-50 rotate-1' : 'scale-100 opacity-100 rotate-0'
              }`}
            />
            
            {/* Next image preload effect */}
            <div className={`absolute inset-0 bg-black/30 transition-opacity duration-700 ${isTransitioning ? 'opacity-30' : 'opacity-0'}`} />
          </div>
          
          {/* LOCATION CARD - TRIVANDRUM */}
          <div 
            className="rounded-2xl glass-card p-0 overflow-hidden cursor-pointer group relative" 
            style={{ height: '30%' }}
            onMouseEnter={() => handleMouseEnter("/trivandrumImage.png")}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src="/loc.jpeg"
              alt="India location"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        {/* ================= RIGHT COLUMN - CRAFT SECTION WITH FLOATING TAGS ================= */}
        <div 
          className="md:col-span-1 md:row-span-2 rounded-2xl glass-card p-5 flex flex-col relative overflow-hidden cursor-pointer group"
          onMouseEnter={() => handleMouseEnter("/craft2.png")}
          onMouseLeave={handleMouseLeave}
        >
          
          <h3 className="text-4xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">Craft</h3>
          
          <p className="text-white/80 text-xl leading-relaxed mb-2 group-hover:text-white/90 transition-all duration-300">
            Building scalable apps, websites, and automations.
          </p>
          
          <p className="text-white/60 text-xl leading-relaxed mb-4 group-hover:text-white/70 transition-all duration-300">
            I understand what advantages
            <br/> modern tech can provide, helping me advise on the solutions a<br/> business actually needs.
          </p>
          
          {/* Floating Tags Container */}
          <div className="relative w-full mb-4 py-2" style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
          }}>
            {/* Floating row - with icons */}
            <div className="flex gap-3 animate-float items-center " style={{ width: 'max-content' }}>
              {/* First set */}
              <span className="text-white/70 text-xs border border-white/15 bg-black/40 px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-white hover:scale-105">
                <SiTypescript className="text-blue-400 text-sm" />
                <span>TS</span>
              </span>
              <span className="text-white/70 text-xs border border-white/15 bg-black/40 px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-white hover:scale-105">
                <SiFlutter className="text-blue-500 text-sm" />
                <span>FLUTTER</span>
              </span>
              <span className="text-white/70 text-xs border border-white/15 bg-black/40 px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-white hover:scale-105">
                <SiPython className="text-yellow-400 text-sm" />
                <span>PYTHON</span>
              </span>
              <span className="text-white/70 text-xs border border-white/15 bg-black/40 px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-white hover:scale-105">
                <SiNodedotjs className="text-green-500 text-sm" />
                <span>NODE</span>
              </span>
              <span className="text-white/70 text-xs border border-white/15 bg-black/40 px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-white hover:scale-105">
                <SiTailwindcss className="text-cyan-400 text-sm" />
                <span>TAILWINDS</span>
              </span>
              <span className="text-white/70 text-xs border border-white/15 bg-black/40 px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-white hover:scale-105">
                <SiDocker className="text-blue-600 text-sm" />
                <span>DOCKER</span>
              </span>
              <span className="text-white/70 text-xs border border-white/15 bg-black/40 px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-white hover:scale-105">
                <SiGit className="text-orange-500 text-sm" />
                <span>GIT</span>
              </span>
              
              {/* Duplicate set */}
              <span className="text-white/70 text-xs border border-white/15 bg-black/40 px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-white hover:scale-105">
                <SiTypescript className="text-blue-400 text-sm" />
                <span>TS</span>
              </span>
              <span className="text-white/70 text-xs border border-white/15 bg-black/40 px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-white hover:scale-105">
                <SiFlutter className="text-blue-500 text-sm" />
                <span>FLUTTER</span>
              </span>
              <span className="text-white/70 text-xs border border-white/15 bg-black/40 px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-white hover:scale-105">
                <SiPython className="text-yellow-400 text-sm" />
                <span>PYTHON</span>
              </span>
              <span className="text-white/70 text-xs border border-white/15 bg-black/40 px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-white hover:scale-105">
                <SiNodedotjs className="text-green-500 text-sm" />
                <span>NODE</span>
              </span>
              <span className="text-white/70 text-xs border border-white/15 bg-black/40 px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-white hover:scale-105">
                <SiTailwindcss className="text-cyan-400 text-sm" />
                <span>TAILWINDS</span>
              </span>
              <span className="text-white/70 text-xs border border-white/15 bg-black/40 px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-white hover:scale-105">
                <SiDocker className="text-blue-600 text-sm" />
                <span>DOCKER</span>
              </span>
              <span className="text-white/70 text-xs border border-white/15 bg-black/40 px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:text-white hover:scale-105">
                <SiGit className="text-orange-500 text-sm" />
                <span>GIT</span>
              </span>
            </div>
          </div>
          
          <div className="mt-auto space-y-2 group-hover:translate-y-[-2px] transition-transform duration-300">
            <p className="text-white/60 text-xs leading-relaxed group-hover:text-white/70 ">
              Active hackathon competitor focused on AI/ML, Data Science, and full-stack. Open to meaningful collaborations.
              </p>
            <div className="text-white/50 text-xs font-medium group-hover:text-white/60 ">
              ● Open to collaboration & freelance
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}