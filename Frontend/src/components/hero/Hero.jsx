import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  FiZap, FiCheckCircle, FiChevronRight, FiLoader, 
  FiAlertCircle, FiShield, FiBarChart2, FiGlobe, FiTarget
} from "react-icons/fi";

const SERVICES = [
  { 
    id: 1, 
    stats: "+124% ROI", 
    label: "Growth Index", 
    accent: "#10b981", 
    color: "from-emerald-400", 
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" 
  },
  { 
    id: 2, 
    stats: "50k+ Leads", 
    label: "Inbound Pipeline", 
    accent: "#3b82f6", 
    color: "from-blue-400", 
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" 
  },
  { 
    id: 3, 
    stats: "99.9% Uptime", 
    label: "Protocol Stability", 
    accent: "#8b5cf6", 
    color: "from-purple-500", 
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80" 
  },
  { 
    id: 4, 
    stats: "0.4s Latency", 
    label: "Global Edge Speed", 
    accent: "#f59e0b", 
    color: "from-amber-400", 
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80" 
  },
  { 
    id: 5, 
    stats: "Zero-Trust", 
    label: "Security Architecture", 
    accent: "#ef4444", 
    color: "from-red-500", 
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" 
  },
  { 
    id: 6, 
    stats: "-40% Costs", 
    label: "Cloud Optimization", 
    accent: "#06b6d4", 
    color: "from-cyan-400", 
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80" 
  },
  { 
    id: 7, 
    stats: "24/7 Neural", 
    label: "Autonomous Monitoring", 
    accent: "#ec4899", 
    color: "from-pink-500", 
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80" 
  },
  { 
    id: 8, 
    stats: "API First", 
    label: "Headless Integration", 
    accent: "#64748b", 
    color: "from-slate-400", 
    image: "https://images.unsplash.com/photo-1518433278988-d95c653a9214?auto=format&fit=crop&q=80" 
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formState, setFormState] = useState({ url: "", email: "" });
  const [errors, setErrors] = useState({});

  // --- MOUSE PARALLAX EFFECT ---
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });
  };

  // --- AI SIMULATION LOGIC ---
  const simulateAudit = useCallback(async () => {
    const steps = ["Initializing Neural Scan...", "Crawling DNS Layers...", "Benchmarking Vitals...", "Finalizing AI Report..."];
    for (let i = 0; i < steps.length; i++) {
      setStatusText(steps[i]);
      setProgress(((i + 1) / steps.length) * 100);
      await new Promise(r => setTimeout(r, 900));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isVerifying) setIndex((prev) => (prev + 1) % SERVICES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isVerifying]);

  const handleAuditSubmit = async (e) => {
    e.preventDefault();
    // Simple Validation
    if (!formState.url.includes(".")) {
      setErrors({ url: "Valid domain required" });
      return;
    }
    setErrors({});
    setIsVerifying(true);
    await simulateAudit();
    setIsSubmitted(true);
    setIsVerifying(false);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#020202] text-white flex items-center overflow-hidden selection:bg-emerald-500/30"
    >
      {/* 1. LAYERED BACKGROUND SYSTEM */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={`bg-${index}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-cover bg-center grayscale"
            style={{ backgroundImage: `url(${SERVICES[index].image})` }}
          />
        </AnimatePresence>
        
        {/* Dynamic Glows that follow the mouse slightly */}
        <motion.div 
          animate={{ 
            x: (mousePos.x - window.innerWidth/2) * 0.05,
            y: (mousePos.y - window.innerHeight/2) * 0.05
          }}
          className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
          style={{ background: SERVICES[index].accent }}
        />
        
        {/* Grain Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-24">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* 2. LEFT CONTENT: TEXT & FORM */}
       {/* 2. LEFT CONTENT: TEXT & FORM */}
<div className="lg:col-span-7 relative">
  {/* The Zig-Zag Connector Line (SVG) */}
  <svg
    className="absolute left-[20px] top-[100px] w-[100px] h-[calc(100%-150px)] hidden md:block pointer-events-none z-0"
    viewBox="0 0 100 400"
    fill="none"
  >
    <motion.path
      d="M10 0 v50 c0 20 40 20 40 40 v100 c0 20 -40 20 -40 40 v100"
      stroke="url(#gradient-line)"
      strokeWidth="2"
      strokeDasharray="8 8"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.3 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <defs>
      <linearGradient id="gradient-line" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
  </svg>

  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="space-y-12 relative z-10"
  >
    {/* Step 1: Tag */}
    <div className="flex items-start gap-6">
      <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
        <span className="text-emerald-500 text-xs font-bold">01</span>
      </div>
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
          <FiZap className="text-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/70">
            Enterprise Intelligence v2.0
          </span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black leading-[0.85] tracking-tighter">
          Scale Your <br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${SERVICES[index].color} via-white to-white/50`}>
            Digital Empire
          </span>
        </h1>
      </div>
    </div>

    {/* Step 2: Description */}
    <div className="flex items-start gap-6 ml-4 md:ml-12">
      <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
        <span className="text-blue-500 text-xs font-bold">02</span>
      </div>
      <p className="text-white/40 text-lg md:text-xl max-w-lg leading-relaxed font-light">
        Our proprietary AI engine performs a <span className="text-white">deep-stack audit</span> of your SEO, security, and load-speeds in real-time.
      </p>
    </div>

    {/* Step 3: Form */}
    <div className="flex items-start gap-6 ml-0 md:ml-2">
      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-4">
        <span className="text-white text-xs font-bold">03</span>
      </div>
      
      <div className="max-w-md w-full relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 to-blue-500/50 rounded-[2rem] blur opacity-25 group-hover:opacity-100 transition duration-500" />
        <div className="relative bg-[#080808] border border-white/10 rounded-[2rem] p-3 shadow-2xl">
          <form onSubmit={handleAuditSubmit} className="space-y-2">
            <div className="flex flex-col gap-1 px-4 py-2">
              <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Target Domain</label>
              <input 
                required
                type="text" 
                placeholder="example.com"
                className="bg-transparent border-none outline-none text-white text-lg placeholder:text-white/10 w-full"
                value={formState.url}
                onChange={(e) => setFormState({...formState, url: e.target.value})}
              />
            </div>
            
            <div className="h-[1px] bg-white/5 w-full" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-1">
              <input 
                required
                type="email" 
                placeholder="Work email"
                className="bg-transparent border-none outline-none text-white text-sm px-4 flex-1 placeholder:text-white/10 w-full"
                value={formState.email}
                onChange={(e) => setFormState({...formState, email: e.target.value})}
              />
              <button 
                disabled={isVerifying}
                className="w-full md:w-auto bg-white text-black h-14 px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-400 hover:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isVerifying ? <FiLoader className="animate-spin" /> : "Analyze"} <FiChevronRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </motion.div>
</div>

          {/* 3. RIGHT CONTENT: THE 3D STATS CARD */}
          <motion.div 
            className="lg:col-span-5 hidden lg:block perspective-1000"
            style={{
              rotateY: (mousePos.x - window.innerWidth/2) * 0.01,
              rotateX: (mousePos.y - window.innerHeight/2) * -0.01,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-16 rounded-[4rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden group"
              >
                {/* Internal Card Decoration */}
                <div className="absolute top-0 right-0 p-8">
                  <FiTarget className="text-white/10 text-6xl rotate-12 group-hover:rotate-45 transition-transform duration-700" />
                </div>

                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }} 
                  transition={{ repeat: Infinity, duration: 4 }}
                  className={`text-8xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-b ${SERVICES[index].color} to-white`}
                >
                  {SERVICES[index].stats}
                </motion.div>
                
                <p className="text-white/40 uppercase tracking-[0.4em] text-[10px] mt-4 font-bold">
                  {SERVICES[index].label}
                </p>

                <div className="grid grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/10">
                  <StatMini icon={<FiShield />} label="Secure" color="text-emerald-500" />
                  <StatMini icon={<FiBarChart2 />} label="Scalable" color="text-blue-500" />
                  <StatMini icon={<FiGlobe />} label="Global" color="text-purple-500" />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* 4. SCANNING MODAL OVERLAY */}
      <AnimatePresence>
        {isVerifying && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex items-center justify-center"
          >
            <div className="text-center space-y-6 p-12 bg-white/5 border border-white/10 rounded-[3rem] max-w-sm w-full mx-6">
              <div className="relative inline-block">
                <FiLoader className="text-6xl text-emerald-500 animate-spin" />
                <div className="absolute inset-0 blur-xl bg-emerald-500/50 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tighter">AI Deep Scan</h3>
                <p className="text-white/40 text-xs mt-1">{statusText}</p>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                  className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. SUCCESS FULL SCREEN TAKEOVER */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-0 z-[110] bg-emerald-500 flex flex-col items-center justify-center text-black"
          >
            <FiCheckCircle className="text-[12rem] mb-8" />
            <h2 className="text-6xl font-black tracking-tighter uppercase">Audit Generated</h2>
            <p className="text-black/60 font-medium text-xl mt-4">Blueprint sent to <span className="underline">{formState.email}</span></p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="mt-12 px-12 py-5 bg-black text-white rounded-2xl font-bold uppercase tracking-widest hover:scale-110 transition-transform"
            >
              Close Intelligence
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Helper Component for the Card Stats
const StatMini = ({ icon, label, color }) => (
  <div className="flex flex-col items-center gap-2 group cursor-crosshair">
    <span className={`text-xl ${color} group-hover:scale-125 transition-transform`}>{icon}</span>
    <span className="text-[8px] uppercase tracking-widest text-white/30 font-bold">{label}</span>
  </div>
);

export default Hero;