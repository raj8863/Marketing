import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheck,
  FaArrowRight,
  FaPhoneAlt,
  FaChevronDown,
  FaArrowLeft,
  FaTerminal,
  FaShieldAlt,
  FaGlobe
} from "react-icons/fa";
import { getIconComponent } from "../utils/iconMapper";

const ServiceDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchServiceData = async () => {
      setLoading(true);
      try {
        const [singleResponse, allResponse] = await Promise.all([
          fetch(`https://marketing-b3je.onrender.com/api/services/slug/${slug}`),
          fetch(`https://marketing-b3je.onrender.com/api/services`),
        ]);
        if (singleResponse.ok) setService(await singleResponse.json());
        if (allResponse.ok) setAllServices(await allResponse.json());
      } catch (error) {
        console.error("Critical Node Failure:", error);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchServiceData();
  }, [slug]);

  if (loading) return (
    <div className="h-screen w-full bg-[#030712] flex flex-col items-center justify-center font-sans">
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
        transition={{ repeat: Infinity, duration: 1.5 }} 
        className="w-16 h-16 border-t-2 border-emerald-500 rounded-full border-white/5" 
      />
      <p className="mt-8 text-emerald-500 font-mono text-[10px] tracking-[0.5em] animate-pulse">SYNCING_CORE...</p>
    </div>
  );

  if (!service) return (
    <div className="h-screen flex items-center justify-center bg-[#030712] text-white">
        <div className="text-center">
          <h2 className="text-2xl font-black mb-6 tracking-widest uppercase">404_DATA_NOT_FOUND</h2>
          <button onClick={() => navigate('/')} className="px-8 py-3 bg-emerald-500 text-black font-bold uppercase text-[10px] tracking-widest rounded-full hover:bg-white transition-all">
             Return to Root
          </button>
        </div>
    </div>
  );

  return (
    <main className="bg-white font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      
      {/* --- NEXT-GEN HERO: FLUID TEXT & BALANCED ALIGNMENT --- */}
   <section className="relative min-h-[85vh] flex items-center pt-24 pb-20 overflow-hidden bg-[#020617]">
  {/* --- BACKGROUND LAYER: DEPTH & FX --- */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <motion.div 
      initial={{ scale: 1.15, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.4 }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      className="h-full w-full"
    >
      <img 
        src={service.heroImage} 
        alt={service.title} 
        className="w-full h-full object-cover mix-blend-luminosity" 
      />
    </motion.div>
    
    {/* Professional Cinematic Overlays */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-transparent opacity-80"></div>
    
    {/* Dynamic Scan Line: Moves top to bottom for industrial feel */}
    <motion.div 
      animate={{ top: ["-10%", "110%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className="absolute left-0 w-full h-[2px] bg-emerald-500/20 shadow-[0_0_20px_#10b981] z-10"
    />
  </div>

  {/* --- CONTENT LAYER --- */}
  <div className="relative z-10 container mx-auto px-6 lg:px-20">
    <div className="max-w-6xl">
      
      {/* Floating Status Badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="inline-flex items-center gap-4 py-2 px-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl mb-10 group"
      >
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
        <span className="text-emerald-400 font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em]">
          Deployment_Active_v4.5
        </span>
        <span className="hidden md:block h-3 w-px bg-white/20 ml-2"></span>
        <span className="hidden md:block text-slate-500 font-mono text-[9px] uppercase tracking-widest">
          Auth_Key: {service._id?.substring(0, 8)}
        </span>
      </motion.div>
      
      {/* Fluid Heading with Staggered Entrance */}
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-[clamp(4rem,10vw,10rem)] font-black text-white leading-[0.85] tracking-tighter uppercase italic"
        >
          {service.title}<span className="text-emerald-500 not-italic block md:inline md:ml-2">_</span>
        </motion.h1>
      </div>

      {/* Modern Breadcrumb & CTA Group */}
      <div className="mt-12 flex flex-col md:flex-row md:items-center gap-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-3 text-[11px] text-slate-400 font-black uppercase tracking-[0.3em] group"
        >
          <Link to="/" className="hover:text-emerald-500 transition-all">Root</Link>
          <span className="opacity-20 text-xl font-thin">//</span>
          <span className="text-white bg-emerald-500/10 px-3 py-1 border border-emerald-500/20 rounded">
            {service.title}
          </span>
        </motion.div>

        {/* Floating Scroll Indicator (Optional but Pro) */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1 }}
           className="hidden lg:flex items-center gap-4 ml-auto"
        >
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Scroll to Explore</span>
          <div className="w-12 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div 
              animate={{ left: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-0 w-1/2 h-full bg-emerald-500"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </div>
  
  {/* Side Decoration (Industry Level Aesthetic) */}
  <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 hidden xl:block opacity-10 pointer-events-none">
     <h2 className="text-[20rem] font-black text-white leading-none rotate-90 select-none">
       ALPHA
     </h2>
  </div>
</section>
      {/* --- CONTENT MATRIX: BALANCED SIDEBAR & CENTERED DELIVERABLES --- */}
      <section className="py-20 md:py-32 px-6 lg:px-16 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

          {/* LEFT: PRIMARY INTEL */}
          <div className="lg:col-span-8 space-y-20 md:space-y-32">
            
            {/* Visual Preview */}
            <motion.div 
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="rounded-3xl overflow-hidden shadow-2xl aspect-video border border-slate-100 group bg-slate-100"
            >
              <img src={service.mainImage} alt="Main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            </motion.div>

            {/* Architectural Overview */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="h-10 w-1.5 bg-emerald-500 rounded-full"></span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">Overview_</h2>
              </div>
              <p className="text-slate-600 text-base md:text-xl leading-relaxed font-medium text-justify">
                {service.description}
              </p>
            </div>

          
           
          </div>

          {/* RIGHT SIDEBAR: DASHBOARD STYLE */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              {/* Directory Navigation */}
              <div className="bg-[#030712] p-2 rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden">
                <div className="p-8 pb-4 flex items-center gap-3">
                  <FaTerminal className="text-emerald-500 text-sm" />
                  <h3 className="text-white font-black text-[10px] uppercase tracking-[0.4em]">Service_Index</h3>
                </div>
                <nav className="p-2 space-y-1">
                  {allServices.map((item) => (
                    <Link
                      key={item._id}
                      to={`/service/${item.slug}`}
                      className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-[10px] uppercase tracking-widest ${
                        item.slug === slug
                          ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                          : "text-slate-500 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item.title} <FaArrowRight size={10} className={item.slug === slug ? "opacity-100" : "opacity-0"} />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Action Card */}
              <div className="relative rounded-[2.5rem] bg-emerald-500 p-10 overflow-hidden group shadow-[0_20px_50px_rgba(16,185,129,0.2)]">
                <FaShieldAlt className="absolute -bottom-6 -right-6 text-slate-950/10 text-[12rem] transition-transform group-hover:scale-110" />
                <div className="relative z-10">
                  <h3 className="text-slate-950 font-black text-2xl uppercase tracking-tighter italic mb-8 leading-none">Ready for Deployment?</h3>
                  <a href="tel:+918863907523" className="flex items-center justify-center gap-3 bg-slate-950 text-white w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                    Initiate Now <FaArrowRight />
                  </a>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </section>
     <div className="pt-20 pb-10">
  {/* Header for Deliverables */}
  <div className="text-center mb-16 px-4">
    <p className="text-emerald-600 font-mono font-black text-[10px] uppercase tracking-[0.5em] mb-4">
      Core_Deliverables
    </p>
    <div className="h-[1px] w-24 bg-slate-200 mx-auto"></div>
  </div>

  {/* Grid Container - Fixed Margins and Standardized Gaps */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto px-6">
    {service.points?.map((point, index) => (
      <motion.div
        key={index}
        whileHover={{ 
          y: -5, 
          transition: { duration: 0.2, ease: "easeOut" } 
        }}
        className="relative group p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-100 flex flex-col items-center text-center gap-6 transition-all duration-300 shadow-sm hover:shadow-2xl hover:border-emerald-500/30 overflow-hidden"
      >
        {/* Subtle Background Glow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon Container */}
        <div className="relative z-10 w-14 h-14 rounded-2xl bg-slate-950 text-emerald-400 flex items-center justify-center shadow-xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 transform group-hover:-rotate-12">
          <FaCheck size={16} />
        </div>

        {/* Text Styling - Industrial & Clean */}
        <span className="relative z-10 font-black text-slate-800 text-xs md:text-sm uppercase tracking-wider leading-relaxed max-w-[250px]">
          {point}
        </span>
      </motion.div>
    ))}
  </div>
</div>


      {/* --- INDUSTRIAL PROCESS: DARK UI --- */}
      <section className="bg-[#030712] py-24 md:py-32 px-6 lg:px-16 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-20 text-center md:text-left">
            <p className="text-emerald-500 font-mono font-bold text-[10px] uppercase tracking-[0.5em] mb-4">Phase_Operational_Logic</p>
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">Execution_Cycle<span className="text-emerald-500">_</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-10">
            {service.process?.map((step, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -10 }}
                className="group p-10 bg-white/[0.02] rounded-[3rem] border border-white/10 hover:border-emerald-500/50 transition-all duration-500 relative overflow-hidden"
              >
                <div className="text-6xl font-black text-white/[0.03] absolute top-6 right-8 group-hover:text-emerald-500/10 transition-colors">
                  0{idx + 1}
                </div>
                <div className="w-14 h-14 bg-emerald-500 text-slate-950 rounded-xl flex items-center justify-center text-2xl mb-12 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                   {getIconComponent(step.icon)}
                </div>
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{step.title}</h4>
                <p className="text-slate-400 font-medium leading-relaxed text-sm md:text-base">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ BUFFER: SLEEK & BALANCED --- */}
      <section className="py-24 md:py-32 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter italic">FAQ Buffer</h3>
          <div className="h-1.5 w-24 bg-emerald-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="space-y-3">
          {[
            { q: `Why choose deployment for ${service.title}?`, a: "Using industrial-grade MERN architecture and neural performance patterns, we ensure your infrastructure is future-proof." },
            { q: "Technical sprint duration?", a: "Standard operational cycles range from 4-8 development weeks depending on module complexity." },
            { q: "Encryption and Node security?", a: "We implement multi-layer JWT authentication and end-to-end sanitized data flows for zero-vulnerability deployment." }
          ].map((item, idx) => (
            <div key={idx} className="rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                className={`w-full flex items-center justify-between p-8 md:p-10 transition-all duration-300 ${
                  activeAccordion === idx ? "bg-slate-950 text-white" : "bg-white text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span className="font-black uppercase text-[10px] md:text-xs tracking-widest text-left pr-6">{item.q}</span>
                <FaChevronDown className={`flex-shrink-0 transition-transform duration-500 ${activeAccordion === idx ? "rotate-180 text-emerald-500" : ""}`} />
              </button>
              <AnimatePresence>
                {activeAccordion === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-slate-50"
                  >
                    <div className="p-10 text-slate-500 text-sm md:text-base leading-relaxed font-medium border-t border-slate-200">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* --- INDUSTRIAL FOOTER --- */}
      <footer className="py-16 text-center bg-[#f8fafc] border-t border-slate-200">
        <div className="flex flex-col items-center gap-4">
          <div className="px-6 py-2 bg-slate-200 rounded-full text-[9px] font-black uppercase tracking-[0.5em] text-slate-500">
            Node_v4.5.1 // Build_Operational
          </div>
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.6em]">
            SYSTEM_ID_{service._id?.substring(0, 10)}
          </p>
        </div>
      </footer>

    </main>
  );
};

export default ServiceDetails;
