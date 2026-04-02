import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import { ClipboardCheck, Star, Users, Award } from "lucide-react";

/* ===== DATA ===== */
const features = [
  { 
    id: 1,
    icon: ClipboardCheck, 
    value: 150, 
    label: "Projects Completed",
    suffix: "+",
    desc: "Delivered on time & budget"
  },
  { 
    id: 2,
    icon: Star, 
    value: 2150, 
    label: "Satisfied Clients", 
    suffix: "+",
    desc: "Across 30+ countries"
  },
  { 
    id: 3,
    icon: Users, 
    value: 120, 
    label: "Expert Team Members", 
    suffix: "",
    desc: "Dedicated to your success"
  },
  { 
    id: 4,
    icon: Award, 
    value: 50, 
    label: "Industry Awards", 
    suffix: "+",
    desc: "Recognized for excellence"
  },
];

/* ===== PRO COUNTER COMPONENT ===== */
const Counter = ({ value, direction = "up" }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          Math.floor(latest)
        );
      }
    });
  }, [springValue]);

  return <span ref={ref} />;
};

/* ===== MAIN COMPONENT ===== */
const Features = () => {
  return (
    <section className="relative bg-white py-24 lg:py-32 px-6 overflow-hidden">
      
      {/* --- BACKGROUND FX --- */}
      {/* Noise Texture */}
      <div className="absolute inset-0 z-[1] opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>


      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
       
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 tracking-tight"
          >
            NUMBERS THAT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
              DEFINE EXCELLENCE.
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg leading-relaxed"
          >
             We pride ourselves on delivering consistent quality and measurable impact.
             Our track record speaks for itself.
          </motion.p>
        </div>

        {/* --- CARDS GRID --- */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="group relative"
        >
          {/* Subtle Outer Card */}
          <div className="relative h-full bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 flex flex-col items-center text-center overflow-hidden">
            
            {/* Animated Background Element (Industrial Tech Look) */}
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
               <span className="text-8xl font-black italic">0{index + 1}</span>
            </div>

            {/* Icon Container - Now cleaner and more sophisticated */}
            <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl rotate-6 group-hover:rotate-12 group-hover:bg-emerald-500/20 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-white rounded-3xl border border-slate-100 shadow-sm z-10 flex items-center justify-center text-slate-800 group-hover:text-emerald-600 transition-colors duration-300">
                <item.icon size={32} strokeWidth={1.5} />
              </div>
            </div>

            {/* Metrics Section */}
            <div className="relative z-20">
              <h3 className="flex items-start justify-center text-6xl font-black text-slate-900 tracking-tighter mb-2">
                <Counter value={item.value} />
                <span className="text-emerald-500 text-2xl font-bold mt-1 ml-1">{item.suffix}</span>
              </h3>

              <div className="inline-block px-3 py-1 bg-slate-50 rounded-full border border-slate-100 mb-4">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                  {item.label}
                </p>
              </div>

              {/* Description with improved line height and color */}
              <p className="text-slate-500 text-sm leading-relaxed px-2 font-medium">
                {item.desc}
              </p>
            </div>

            {/* Bottom Accent Bar */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-emerald-500 group-hover:w-full transition-all duration-700 ease-in-out"></div>
          </div>
        </motion.div>
      ))}
    </div>

      </div>
    </section>
  );
};

export default Features;