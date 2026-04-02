import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

// Image Imports
import googleImg from "../assets/images/Google.jpg";
import clutchImg from "../assets/images/Clutch.jpg";
import isoImg from "../assets/images/ISO9001Certified.jpg";
import metaImg from "../assets/images/Meta.jpg";
import semrushImg from "../assets/images/SEMrush.jpg";

const Certifications = () => {
  const badges = [
    { name: "Google Ads", provider: "Partner Premier", img: googleImg },
    { name: "Clutch SEO", provider: "Global Top 100", img: clutchImg },
    { name: "ISO 9001", provider: "Quality Audit", img: isoImg },
    { name: "Meta Business", provider: "Global Partner", img: metaImg },
    { name: "SEMrush", provider: "Certified Entity", img: semrushImg },
  ];

  const BadgeItem = ({ badge }) => (
    <motion.div 
      className="flex items-center gap-10 px-12 md:px-20 border-r border-slate-100 last:border-none shrink-0 cursor-default"
      whileHover={{ y: -5 }} 
      transition={{ duration: 0.3 }}
    >
      {/* Badge Image - Increased Size & Pro Visibility */}
      <div className="w-32 h-24 flex-shrink-0 flex items-center justify-center">
        <img
          src={badge.img}
          alt={badge.name}
          className="max-h-full max-w-full object-contain pointer-events-none" 
        />
      </div>

      {/* Info Section - No color changes */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Verified Node</span>
            <ShieldCheck size={14} className="text-emerald-500" strokeWidth={3} />
        </div>
        <h4 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tighter leading-none">
          {badge.name}
        </h4>
        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-2">
          {badge.provider}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section className="bg-white py-24 border-y border-slate-100 overflow-hidden relative">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Centered Heading Layout */}
        <div className="flex flex-col items-center text-center mb-16 px-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-4"
            >
                <div className="h-[2px] w-8 bg-emerald-500 rounded-full" />
                <span className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-900">
                    Industry Credentials
                </span>
                <div className="h-[2px] w-8 bg-emerald-500 rounded-full" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                Authorized Node <span className="text-emerald-500">Registry</span>
            </h2>
        </div>

        {/* Marquee Wrapper - Optimized for all devices */}
        <div className="relative flex items-center overflow-hidden py-6">
          
          {/* Advanced Gradient Fades for Pro Look */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex shrink-0 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 30, // Perfectly balanced speed
              ease: "linear",
            }}
          >
            {/* Duplicated for seamless loop on any screen resolution */}
            {[...badges, ...badges, ...badges].map((badge, i) => (
              <BadgeItem key={i} badge={badge} />
            ))}
          </motion.div>
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-16 flex justify-center px-12">
            <div className="h-[1px] w-full max-w-4xl bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Certifications;