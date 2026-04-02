import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiStar, FiArrowRight, FiLayers } from "react-icons/fi";

/* ================= LONG-FORM DATA (100+ Words each) ================= */
const TESTIMONIALS = [
  {
    id: 1,
    projectNo: "PRJ-9942",
    stars: 5,
    content: "Working with Verto Digital has been a transformative experience for our infrastructure. We were struggling with massive layout shifts and a crawl budget that was effectively being wasted on non-canonical URLs. Their team didn't just 'fix' our SEO; they re-engineered our entire MERN stack deployment pipeline. By implementing server-side rendering and optimizing our Time-to-First-Byte (TTFB) to under 200ms, our organic visibility spiked by 140% in just one quarter. Their mastery over computational linguistics and semantic entity mapping allowed us to dominate high-intent keywords that we previously thought were unreachable. A world-class engineering team that understands the intersection of code and commerce.",
    author: "Rajesh Kumar",
    role: "CTO @ TechBihar Solutions",
    stats: "+140% Visibility"
  },
  {
    id: 2,
    projectNo: "PRJ-8821",
    stars: 5,
    content: "The technical precision provided by Verto Digital is simply unmatched in the current market. We required a high-concurrency e-commerce platform built on React and Node.js that could handle over 50,000 active sessions during flash sales. Most agencies provide standard templates, but Verto engineered a custom elastic architecture that scaled flawlessly. Their attention to detail regarding Core Web Vitals meant our LCP dropped from a sluggish 3.5s to a blazing 0.9s. This performance increase directly correlated with a 40% jump in checkout conversions. They treat SEO like a DevOps process—continuous, data-driven, and highly resilient. Our domain authority has never been stronger.",
    author: "Ananya Singh",
    role: "Founder, Patna Mart",
    stats: "0.9s LCP"
  },
  {
    id: 3,
    projectNo: "PRJ-7756",
    stars: 5,
    content: "Transitioning our legacy systems to a modern headless architecture was a high-risk maneuver, but Verto Digital executed it with surgical precision. Their implementation of advanced JSON-LD Schema and hierarchical URL siloing fixed long-standing indexing issues that had plagued our brand for years. We now have a 1:1 map of organic user behavior thanks to their server-side GTM integration which bypasses modern ad-blockers. The level of transparency in their weekly performance audits is rare. They don't just report numbers; they provide strategic logic gates that help us stay ahead of Google's core algorithm updates. Truly an international standard agency operating at an elite level.",
    author: "Vikram Aditya",
    role: "Marketing Head @ GlobalNodes",
    stats: "3x Lead Flow"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // --- SLIDER LOGIC ---
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section 
      className="relative bg-white overflow-hidden border-b border-slate-100 -mt-20 pt-40 pb-24"
      style={{
        clipPath: "polygon(0 4%, 15% 2%, 30% 4%, 50% 2%, 70% 4%, 85% 2%, 100% 4%, 100% 100%, 0 100%)",
      }}
    >
   
          {/* --- BACKGROUND FX --- */}
      {/* Noise Texture */}
      <div className="absolute inset-0 z-[1] opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Validated_Infrastructure</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              Client <span className="text-emerald-500 italic">Validation</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-slate-900 font-black text-2xl leading-none">4.9/5</p>
              <p className="text-slate-400 text-[9px] uppercase font-bold tracking-widest mt-1">Average Rating</p>
            </div>
            <div className="flex text-emerald-500 gap-0.5">
               {[...Array(5)].map((_, i) => <FiStar key={i} fill="currentColor" size={14}/>)}
            </div>
          </div>
        </div>

        {/* INTERACTIVE SLIDER AREA */}
        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden px-4 py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="min-h-[500px] md:min-h-[450px] w-full bg-slate-50 border border-slate-100 rounded-[3rem] p-8 md:p-16 flex flex-col justify-between relative shadow-xl shadow-slate-200/20"
              >
                {/* Card Top Branding */}
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-1">
                    <div className="flex text-emerald-500 gap-1 mb-2">
                       {[...Array(TESTIMONIALS[activeIndex].stars)].map((_, i) => <FiStar key={i} fill="currentColor" size={16}/>)}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-100">
                       {TESTIMONIALS[activeIndex].projectNo} // COMPLETED
                    </span>
                  </div>
                  <FiLayers size={32} className="text-slate-200" />
                </div>

                {/* Main Content (Justified & Bold) */}
                <p className="text-slate-700 text-lg md:text-xl leading-relaxed font-medium text-justify italic mb-10">
                  "{TESTIMONIALS[activeIndex].content}"
                </p>

                {/* Footer Data */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-slate-200/60">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl font-black shadow-lg">
                       {TESTIMONIALS[activeIndex].author[0]}
                    </div>
                    <div>
                       <h4 className="text-slate-900 font-black text-lg uppercase tracking-tighter leading-none">{TESTIMONIALS[activeIndex].author}</h4>
                       <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">{TESTIMONIALS[activeIndex].role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 px-6 py-3 bg-emerald-500 rounded-2xl text-slate-900 shadow-lg shadow-emerald-500/20 group cursor-pointer">
                    <FiCheckCircle size={18}/>
                    <span className="text-xs font-black uppercase tracking-widest">{TESTIMONIALS[activeIndex].stats}</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                
                {/* Decorative Alpha text */}
                <div className="absolute -bottom-6 -right-6 text-[10rem] font-black text-slate-900/5 select-none pointer-events-none italic">
                   {activeIndex + 1}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* DOT NAVIGATION (Manual & Auto indicator) */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-500 rounded-full h-2 ${
                  activeIndex === idx 
                    ? "w-12 bg-emerald-500 shadow-lg shadow-emerald-500/40" 
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;