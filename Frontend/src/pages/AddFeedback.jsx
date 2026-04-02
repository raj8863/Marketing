import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiSend, FiUser, FiBriefcase, FiCheckCircle, FiLoader, FiCpu, FiMessageSquare } from "react-icons/fi";

const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState("idle"); 
  const [formData, setFormData] = useState({ name: "", role: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a satisfaction index (stars)");
    
    setStatus("sending");

    try {
      // Logic for your MERN Backend
      // await axios.post("http://localhost:5000/api/feedback", { ...formData, rating });
      
      await new Promise((r) => setTimeout(r, 2000)); // Simulated lag
      setStatus("success");
      
      setTimeout(() => {
        setStatus("idle");
        setRating(0);
        setFormData({ name: "", role: "", message: "" });
      }, 4000);
    } catch (error) {
      setStatus("idle");
      alert("Transmission failed. Please check your connection.");
    }
  };

  return (
    <section className="relative py-24 px-6 flex flex-col items-center justify-center overflow-hidden bg-[#050505] min-h-screen">
      
      {/* 🔹 Background Decor - More prominent but clean */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_50%_0%,#10b98115_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      {/* 🔹 Header */}
      <div className="relative z-10 text-center mb-12">
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-black tracking-[0.2em] text-emerald-400 uppercase mb-4"
        >
          <FiCpu className="animate-pulse" /> Feedback Protocol
        </motion.div>
        
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight">
          Establish <span className="text-emerald-500 italic">Calibration</span>
        </h2>
      </div>

      {/* 🔹 Main Form Card - Increased visibility with higher contrast */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative w-full max-w-4xl bg-[#0c0c0c] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_-12px_rgba(16,185,129,0.1)] overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {status !== "success" ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onSubmit={handleSubmit} 
              className="grid lg:grid-cols-2 gap-10"
            >
              {/* LEFT SIDE */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1">01. Identity Node</label>
                  <div className="relative group">
                    <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-emerald-500 transition-colors" />
                    <input 
                      required type="text" placeholder="Full Name"
                      className="w-full pl-14 pr-6 py-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-emerald-500/50 focus:bg-white/[0.05] outline-none transition-all text-white placeholder:text-white/20 font-bold"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1">02. Occupation</label>
                  <div className="relative group">
                    <FiBriefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-emerald-500 transition-colors" />
                    <input 
                      required type="text" placeholder="Designation / Role"
                      className="w-full pl-14 pr-6 py-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-emerald-500/50 focus:bg-white/[0.05] outline-none transition-all text-white placeholder:text-white/20 font-bold"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1 block mb-3">03. Satisfaction Index</label>
                  <div className="flex gap-3 bg-white/[0.02] w-fit p-3 rounded-2xl border border-white/5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star} type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className="transition-transform hover:scale-110 active:scale-90"
                      >
                        <FiStar 
                          size={24}
                          fill={(hover || rating) >= star ? "#10b981" : "transparent"} 
                          className={`transition-all duration-300 ${(hover || rating) >= star ? "text-emerald-400 drop-shadow-[0_0_10px_#10b981]" : "text-white/10"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1">04. Experience Log</label>
                <div className="relative flex-1 flex flex-col group">
                  <FiMessageSquare className="absolute left-5 top-5 text-white/30 group-focus-within:text-emerald-500 transition-colors" />
                  <textarea 
                    required
                    placeholder="Provide details of our collaboration..."
                    className="flex-1 w-full pl-14 pr-6 py-5 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-emerald-500/50 focus:bg-white/[0.05] outline-none transition-all text-white placeholder:text-white/20 font-medium min-h-[180px] resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                
                <button 
                  disabled={status === "sending"}
                  className="mt-6 w-full py-5 bg-white text-black rounded-xl font-black uppercase tracking-[0.2em] text-[12px] flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all hover:shadow-[0_0_30px_-5px_#10b981] disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {status === "sending" ? (
                    <>Processing Transmission <FiLoader className="animate-spin" /></>
                  ) : (
                    <>Deploy Data <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                  )}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center"
            >
              <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheckCircle className="text-5xl text-emerald-500" />
              </div>
              <h3 className="text-3xl font-black text-white uppercase italic mb-2 tracking-tighter">Transmission Successful</h3>
              <p className="text-white/40 text-sm font-medium">Your data node has been synced with our excellence registry.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default FeedbackSection;