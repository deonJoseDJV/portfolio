"use client";

import { useState } from "react";
import { FiX, FiCalendar, FiMail, FiGithub, FiLinkedin, FiCopy, FiCheck } from "react-icons/fi";
import BookingModal from './BookingModal';// ✅ This should now work

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [showBooking, setShowBooking] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("deonjose27@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookCall = () => {
    setShowBooking(true);
  };

  const handleCloseBooking = () => {
    setShowBooking(false);
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* MAIN CONTACT MODAL */}
      {!showBooking && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center px-4">
          <div
            className="
              relative w-full max-w-md
              rounded-3xl
              bg-[#0b0b0f]/90
              border border-white/10
              backdrop-blur-2xl
              shadow-[0_40px_120px_rgba(0,0,0,0.7)]
              p-8
              animate-in zoom-in-95 fade-in duration-300
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition"
            >
              <FiX size={20} />
            </button>

            {/* HEADER */}
            <h2 className="text-3xl font-bold text-white mb-2">
              Get in touch
            </h2>
            <p className="text-white/50 mb-8">
              Let's build something great together.
            </p>

            {/* ACTIONS */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Book call */}
              <button
                onClick={handleBookCall}
                className="group rounded-2xl border border-white/10 p-5 bg-white/[0.03] hover:bg-white/[0.06] transition text-left"
              >
                <FiCalendar className="text-purple-400 mb-3" size={22} />
                <div className="text-white font-medium">Book a call</div>
                <div className="text-white/40 text-sm">30 MIN CALL</div>
              </button>

              {/* Email */}
              <a
                href="mailto:deonjose27@gmail.com"
                className="group rounded-2xl border border-white/10 p-5 bg-white/[0.03] hover:bg-white/[0.06] transition block"
              >
                <FiMail className="text-purple-400 mb-3" size={22} />
                <div className="text-white font-medium">Email me</div>
                <div className="text-white/40 text-sm">OPEN GMAIL</div>
              </a>
            </div>

            {/* FOOTER with Copy Email */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 text-white/40 hover:text-white transition"
              >
                <span className="text-sm">Copy gmail address</span>
                {copied ? <FiCheck className="text-green-400" size={14} /> : <FiCopy size={14} />}
              </button>

              <div className="flex gap-4 text-white/40">
                <a href="https://github.com/deonJoseDJV" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  <FiGithub size={18} />
                </a>
                <a href="https://www.linkedin.com/in/deon-jose" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  <FiLinkedin size={18} />
                </a>
                <a href="mailto:deonjose27@gmail.com" className="hover:text-white transition">
                  <FiMail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={showBooking}
        onClose={handleCloseBooking}
      />
    </>
  );
}