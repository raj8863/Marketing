import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { FaChevronUp } from "react-icons/fa";

const UtilityController = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate total scrollable height
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      
      setScrollProgress(currentProgress);
      
      // Deployment Logic
      setIsVisible(window.scrollY > 400); // Show WhatsApp after Hero
      setShowTopBtn(window.scrollY > 800); // Show Back-to-Top after About
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const phoneNumber = "918863907523"; // Replace with your number
  const message = "System Access: I am interested in your digital services.";

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] flex flex-col items-center gap-4">
      
      {/* 1. BACK TO TOP (With Progress Ring) */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 20 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="relative w-12 h-12 md:w-14 md:h-14 bg-white text-slate-900 rounded-2xl 
                       flex items-center justify-center shadow-2xl border border-slate-100 group"
          >
            {/* SVG Progress Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 p-1">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-100"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="100"
                strokeDashoffset={100 - scrollProgress}
                className="text-emerald-500"
                transition={{ type: "spring", stiffness: 50 }}
              />
            </svg>
            <FaChevronUp className="relative z-10 group-hover:animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. WHATSAPP (Direct Alpha Line) */}
      <AnimatePresence>
        {isVisible && (
          <motion.a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 20 }}
            whileHover={{ scale: 1.1 }}
            className="relative w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-2xl 
                       flex items-center justify-center shadow-[0_20px_40px_rgba(37,211,102,0.3)] 
                       border-2 border-white/20 group overflow-visible"
          >
            {/* Pulse Effect */}
            <span className="absolute inset-0 rounded-2xl bg-[#25D366] animate-ping opacity-20 group-hover:hidden" />
            
            <SiWhatsapp size={28} className="relative z-10" />

            {/* Technical Tooltip */}
            <div className="absolute right-20 bg-slate-900 text-white px-4 py-2 rounded-xl 
                            text-[9px] font-black uppercase tracking-[0.2em] opacity-0 
                            group-hover:opacity-100 transition-all pointer-events-none 
                            whitespace-nowrap border border-white/10 translate-x-4 group-hover:translate-x-0">
              <span className="text-emerald-400 mr-2">●</span> Direct_Consultation_Active
            </div>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UtilityController;