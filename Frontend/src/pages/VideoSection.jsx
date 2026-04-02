import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiPlay, FiPause, FiMaximize, FiVolume2, FiCpu, FiShield, FiActivity, FiYoutube } from "react-icons/fi";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // --- 1. PRO 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleGlobalMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(relativeX);
      y.set(relativeY);
    }
  };

  // Replace this ID with your actual YouTube Video ID
  const VIDEO_ID = "dQw4w9WgXcQ"; 

  return (
    <section 
      onMouseMove={handleGlobalMouseMove}
      className="relative py-32 px-6 flex flex-col items-center justify-center overflow-hidden bg-white min-h-screen"
    >
      {/* Background Overlays */}
      <div className="absolute inset-0 z-[1] opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10 pointer-events-none"></div>

      {/* 🔹 HEADER CONTENT */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-[10px] uppercase tracking-[0.3em] text-emerald-600 mb-6 backdrop-blur-md font-bold">
          <FiYoutube className="text-red-500" /> Founder Testimonial // V4.0
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-5 italic uppercase">
          Hear from our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Visionary</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
          Discover the story behind Alpha Engine and how we are redefining 
          cloud infrastructure for the next generation of developers.
        </p>
      </motion.div>

      {/* 🔹 THE PRO PLAYER CONTAINER */}
      <motion.div
        ref={containerRef}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-5xl group cursor-none z-10"
      >
        {/* Soft Shadow Frame */}
        <div className="absolute -inset-4 bg-slate-200/50 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
        
        <div className="relative aspect-video bg-black border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)]">
          
          {/* YouTube Iframe Wrapper */}
          <div className="absolute inset-0 w-full h-full">
            {isPlaying ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&controls=0&modestbranding=1&rel=0`}
                title="Founder Testimonial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="scale-[1.01]" // Tiny scale to hide potential iframe borders
              ></iframe>
            ) : (
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale brightness-[0.4]"
                style={{ backgroundImage: `url('https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg')` }}
              />
            )}
          </div>

          {/* HUD Overlay (Only shows when NOT playing or on Hover) */}
          <div className={`absolute inset-0 pointer-events-none p-6 md:p-10 flex flex-col justify-between z-20 transition-opacity duration-500 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
            <div className="flex justify-between items-start">
               <div className="space-y-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-xl border border-white/10 text-[9px] font-mono text-emerald-400">
                    <FiCpu /> STATUS: {isPlaying ? "FEED_LIVE" : "READY_TO_STREAM"}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-xl border border-white/10 text-[9px] font-mono text-white/60">
                    <FiShield /> ENCRYPTED_LINK: ACTIVE
                  </div>
               </div>
               <div className="text-right font-mono text-[9px] text-white/40">
                  PTU-CSE-NETWORK <br />
                  QUALITY: 4K_UHD
               </div>
            </div>

            {/* Bottom Controls */}
            <div className="pointer-events-auto">
               <div className="flex items-center gap-6 bg-white/10 backdrop-blur-2xl border border-white/20 p-4 rounded-2xl shadow-2xl">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                    className="w-12 h-12 rounded-xl bg-white text-slate-900 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-lg"
                  >
                    {isPlaying ? <FiPause size={20}/> : <FiPlay size={20} className="ml-1"/>}
                  </button>
                  
                  <div className="flex-1 space-y-2">
                     <div className="flex justify-between text-[8px] text-white/60 uppercase font-black tracking-widest">
                        <span>Playback Stream</span>
                        <span>{isPlaying ? "LIVE" : "0:00"}</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          animate={{ width: isPlaying ? "100%" : "0%" }}
                          transition={{ duration: 30, ease: "linear" }}
                          className="h-full bg-emerald-400 shadow-[0_0_15px_#34d399]" 
                        />
                     </div>
                  </div>

                  <div className="flex items-center gap-4 text-white/60">
                    <FiVolume2 />
                    <FiMaximize />
                  </div>
               </div>
            </div>
          </div>

          {/* Central Play Button (Only visible when paused) */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-2xl hover:bg-emerald-500 hover:text-white transition-all z-30"
              >
                <FiPlay size={32} className="ml-1" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* 🔹 CUSTOM CURSOR FOLLOWER */}
        <motion.div
            className="fixed top-0 left-0 w-10 h-10 rounded-full border border-slate-900/30 pointer-events-none z-[100] flex items-center justify-center hidden lg:flex"
            animate={{ 
                x: mousePos.x - 20, 
                y: mousePos.y - 20,
                scale: isPlaying ? 0.6 : 1,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
        >
          <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VideoSection;