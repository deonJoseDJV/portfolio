"use client";

import { useState } from "react";
import {
  FiX,
  FiCalendar,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import BookingModal from "./BookingModal";

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

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 z-[100] bg-black/40 dark:bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {!showBooking && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center px-4">
          <div
            className="
              relative w-full max-w-md
              rounded-3xl
              bg-white/90 dark:bg-[#0b0b0f]/90
              border border-black/10 dark:border-white/10
              backdrop-blur-2xl
              shadow-[0_40px_120px_rgba(0,0,0,0.25)]
              p-8
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4
                text-black/40 dark:text-white/40
                hover:text-black dark:hover:text-white transition"
            >
              <FiX size={20} />
            </button>

            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              Get in touch
            </h2>

            <p className="text-black/50 dark:text-white/50 mb-8">
              Let's build something great together.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setShowBooking(true)}
                className="group rounded-2xl
                  border border-black/10 dark:border-white/10
                  p-5
                  bg-black/[0.03] dark:bg-white/[0.03]
                  hover:bg-black/[0.06] dark:hover:bg-white/[0.06]
                  transition text-left"
              >
                <FiCalendar className="text-purple-400 mb-3" size={22} />
                <div className="text-black dark:text-white font-medium">
                  Book a call
                </div>
                <div className="text-black/40 dark:text-white/40 text-sm">
                  30 MIN CALL
                </div>
              </button>

              <a
                href="mailto:deonjose27@gmail.com"
                className="group rounded-2xl
                  border border-black/10 dark:border-white/10
                  p-5
                  bg-black/[0.03] dark:bg-white/[0.03]
                  hover:bg-black/[0.06] dark:hover:bg-white/[0.06]
                  transition block"
              >
                <FiMail className="text-purple-400 mb-3" size={22} />
                <div className="text-black dark:text-white font-medium">
                  Email me
                </div>
                <div className="text-black/40 dark:text-white/40 text-sm">
                  OPEN GMAIL
                </div>
              </a>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-black/10 dark:border-white/10">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2
                  text-black/40 dark:text-white/40
                  hover:text-black dark:hover:text-white transition"
              >
                <span className="text-sm">Copy gmail address</span>
                {copied ? (
                  <FiCheck className="text-green-400" size={14} />
                ) : (
                  <FiCopy size={14} />
                )}
              </button>

              <div className="flex gap-4 text-black/40 dark:text-white/40">
                <FiGithub size={18} />
                <FiLinkedin size={18} />
                <FiMail size={18} />
              </div>
            </div>
          </div>
        </div>
      )}

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </>
  );
}