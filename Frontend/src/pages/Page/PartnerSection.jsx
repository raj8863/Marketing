import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUser, FiMail, FiPhoneCall, FiClock, 
  FiCheckCircle, FiChevronRight, FiGlobe, FiActivity, FiShield, FiTarget 
} from "react-icons/fi";
import { SiGooglemeet } from "react-icons/si";
import Herolayout from "../../components/herolayout/Herolayout";

const PartnerSection = () => {
  const [bookingType, setBookingType] = useState("call"); // 'call' or 'meet'
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "SEO Strategy"
  });
const handleBooking = async (e) => {
    e.preventDefault();
    
    // Combine your form data with the active toggle (call or meet)
    const payload = {
      ...formData,
      bookingType
    };

    try {
      // Send data to your Node.js backend
      const response = await fetch('https://marketing-b3je.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true); // Triggers the success screen
      } else {
        alert(`Error: ${data.message || 'Something went wrong.'}`);
      }
    } catch (error) {
      console.error("Backend Connection Error:", error);
      alert("Failed to connect to the server. Is your backend running?");
    }
  };


  const resetSystem = () => {
    setIsSubmitted(false);
    setFormData({ name: "", email: "", phone: "", date: "", service: "SEO Strategy" });
  };

  return (
    <main className="bg-white">
      <Herolayout
        title="Book A Meeting"
        subtitle="Engineering search dominance through technical precision and algorithmic integrity."
      />

      <section className="relative py-24 px-6 lg:px-20 overflow-hidden border-t border-slate-50">
        {/* --- AMBIENT DESIGN LAYER --- */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 xl:gap-24 items-start">
            
            {/* --- LEFT SIDE: THE AUTHORITY BLOCK --- */}
            <div className="lg:col-span-6 space-y-12">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-100 bg-emerald-50 mb-8">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 font-mono">Partner_Protocol_v4.0</span>
                </div>

                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-10 uppercase">
                  Partner with <br />
                  <span className="text-emerald-500 italic underline decoration-slate-200 underline-offset-8">Authority.</span>
                </h2>

                <p className="max-w-xl text-lg text-slate-500 font-medium leading-relaxed mb-12">
                  Join forces with a recognized digital agency that treats SEO as a 
                  precision engineering task. Connect directly with our lead architects 
                  to discuss high-velocity scaling and global node deployment.
                </p>

                {/* Technical Features Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100 text-emerald-600">
                         <FiShield size={20} />
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-1">Zero-Risk Protocol</h4>
                         <p className="text-[11px] text-slate-400 font-medium leading-relaxed uppercase">White-hat techniques backed by algorithmic data.</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 text-blue-600">
                         <FiTarget size={20} />
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-1">ROI Focused</h4>
                         <p className="text-[11px] text-slate-400 font-medium leading-relaxed uppercase">Engineering conversion funnels that scale with traffic.</p>
                      </div>
                   </div>
                </div>

                {/* Status Board */}
                <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-100">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Node Location</span>
                    <div className="flex items-center gap-2 text-slate-900 font-black uppercase tracking-tight">
                      <FiGlobe className="text-emerald-500" /> Bihar, India (HQ)
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">System Status</span>
                    <div className="flex items-center gap-2 text-slate-900 font-black uppercase tracking-tight">
                      <FiActivity className="text-emerald-500" /> Operational 24/7
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* --- RIGHT SIDE: THE BOOKING ENGINE --- */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end lg:sticky lg:top-24">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[550px] bg-slate-900 rounded-[3rem] p-8 md:p-14 text-white shadow-2xl relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      
                      {/* HUB TOGGLE */}
                      <div className="flex bg-white/5 p-1.5 rounded-2xl mb-12 border border-white/10 relative z-10">
                          <button 
                              type="button"
                              onClick={() => setBookingType('call')}
                              className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${bookingType === 'call' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                          >
                              Quick Callback
                          </button>
                          <button 
                              type="button"
                              onClick={() => setBookingType('meet')}
                              className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${bookingType === 'meet' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                          >
                              Strategy Meet
                          </button>
                      </div>

                      <form onSubmit={handleBooking} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="relative group">
                            <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                            <input required type="text" placeholder="NAME" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-xs font-bold outline-none focus:border-emerald-500 transition-all uppercase tracking-widest placeholder:opacity-30" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                          </div>
                          <div className="relative group">
                            <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                            <input required type="email" placeholder="EMAIL" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-xs font-bold outline-none focus:border-emerald-500 transition-all uppercase tracking-widest placeholder:opacity-30" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                          </div>
                        </div>

                        <div className="relative group">
                          <FiPhoneCall className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                          <input required type="tel" placeholder="PHONE NUMBER" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-xs font-bold outline-none focus:border-emerald-500 transition-all uppercase tracking-widest placeholder:opacity-30" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                        </div>

                        {bookingType === 'meet' && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="relative group">
                              <FiClock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                              <input required type="datetime-local" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-xs font-bold outline-none focus:border-emerald-500 transition-all uppercase tracking-widest text-white/50" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                          </motion.div>
                        )}

                        <button 
                          type="submit"
                          className="w-full py-5 bg-emerald-500 text-slate-900 font-black rounded-2xl uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-3 active:scale-95"
                        >
                          {bookingType === 'call' ? 'Request Immediate Sync' : 'Confirm Strategy Meet'} 
                          {bookingType === 'call' ? <FiPhoneCall /> : <SiGooglemeet />}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 relative z-10">
                      <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-10 border border-emerald-500/40">
                        <FiCheckCircle className="text-emerald-500 text-5xl" />
                      </div>
                      <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter leading-none">Transmission <br /> Success.</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-12 font-medium">
                        Acknowledged, <span className="text-white font-bold">{formData.name}</span>. <br />
                        Our lead engineer will initiate contact via <span className="text-emerald-400 font-bold">{formData.email}</span> shortly.
                      </p>
                      <button 
                        onClick={resetSystem}
                        className="px-10 py-4 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all flex items-center gap-2 mx-auto"
                      >
                        Return to System <FiChevronRight />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Decorative Mainframe Pattern */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PartnerSection;
