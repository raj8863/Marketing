import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCheck, FaCircleNotch, FaTimes, FaArrowRight, FaGlobe, 
  FaPhoneAlt, FaUser, FaEnvelope, FaShieldAlt, FaRocket 
} from "react-icons/fa";
import Herolayout from "../../components/herolayout/Herolayout.jsx";

const Pricing = () => {
  const [plansData, setPlansData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", website: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/pricing/plans")
      .then(res => setPlansData(res.data))
      .catch(err => console.error("Sync_Error:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/pricing/enquire", { 
        ...formData, 
        planChosen: selectedPlan 
      });
      setIsSubmitted(true);
      setShowForm(false);
      setTimeout(() => setIsSubmitted(false), 4000);
      setFormData({ name: "", email: "", phone: "", website: "" });
    } catch (err) { 
      alert("Transmission_Protocol_Failed."); 
    }
    setLoading(false);
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-950">
      <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
      <span className="font-mono text-emerald-500 text-xs tracking-[0.5em] animate-pulse uppercase">Syncing_Nodes...</span>
    </div>
  );

  return (
    <main className="bg-[#fcfcfd] min-h-screen pb-32 font-sans selection:bg-emerald-500 selection:text-white overflow-hidden">
      {/* Background Decor Nodes */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-900 to-transparent opacity-[0.03] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />

      <Herolayout 
        title="PPC SCALING PROTOCOLS" 
        subtitle="Data-driven strategies engineered for market dominance." 
        light 
      />
      
      <section className="max-w-7xl mx-auto px-6 mt-[-100px] relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plansData.map((plan) => (
            <motion.div 
              key={plan._id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }} 
              className={`group relative bg-white border rounded-[3.5rem] p-10 flex flex-col transition-all duration-500 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] ${
                plan.popular ? 'border-emerald-500 ring-8 ring-emerald-500/5 z-10' : 'border-slate-100 hover:border-emerald-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-[10px] font-black uppercase px-6 py-2 rounded-full tracking-[0.2em] shadow-[0_10px_20px_rgba(16,185,129,0.3)]">
                  Highly Targeted
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 group-hover:text-emerald-600 transition-colors">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-emerald-500 font-black text-sm uppercase tracking-widest">{plan.price}</span>
                </div>
              </div>

              <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium min-h-[60px] border-l-2 border-slate-100 pl-4">
                {plan.desc}
              </p>
              
              <div className="space-y-4 mb-12 flex-grow">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Included Protocol Nodes</p>
                {plan.features?.map((f, i) => (
                  <div key={i} className={`flex items-start gap-4 transition-all duration-300 ${f.isAvailable ? 'opacity-100' : 'opacity-20'}`}>
                    <div className={`mt-1 p-1 rounded-md ${f.isAvailable ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                        <FaCheck size={10} />
                    </div>
                    <div>
                      <p className={`text-[13px] font-bold tracking-tight ${f.isAvailable ? 'text-slate-800' : 'text-slate-400 line-through'}`}>
                        {f.name}
                      </p>
                      {f.info && f.isAvailable && <p className="text-[9px] text-slate-400 uppercase mt-1 font-bold">{f.info}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => { setSelectedPlan(plan.name); setShowForm(true); }} 
                className={`w-full py-5 rounded-[2rem] font-black uppercase text-[11px] tracking-[0.15em] transition-all duration-500 flex items-center justify-center gap-3 group/btn shadow-lg shadow-slate-200 ${
                  plan.popular ? 'bg-slate-900 text-white hover:bg-emerald-600 hover:shadow-emerald-200' : 'bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white'
                }`}
              >
                Establish Link <FaArrowRight className="transition-transform group-hover/btn:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRO ENQUIRY MODAL */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 backdrop-blur-2xl p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="bg-white p-8 md:p-14 rounded-[4rem] w-full max-w-2xl relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-white"
            >
              <button 
                onClick={() => setShowForm(false)} 
                className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-rose-500 hover:rotate-90 rounded-full transition-all duration-500"
              >
                <FaTimes size={20}/>
              </button>

              <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-4">
                    <FaShieldAlt className="text-emerald-600 text-xs" />
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest text-center">Secure Transmission Link</span>
                </div>
                <h2 className="text-4xl font-black uppercase italic text-slate-900 tracking-tighter">
                    {selectedPlan} <span className="text-emerald-500">Enquiry</span>
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-4 tracking-widest">Full Name Identity</label>
                  <div className="relative group">
                    <FaUser className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input placeholder="Ex: John Verto" className="w-full pl-14 p-5 bg-slate-50 border-2 border-transparent rounded-[1.8rem] outline-none focus:bg-white focus:border-emerald-500 font-bold transition-all text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-4 tracking-widest">Neural Email</label>
                  <div className="relative group">
                    <FaEnvelope className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input type="email" placeholder="agent@domain.com" className="w-full pl-14 p-5 bg-slate-50 border-2 border-transparent rounded-[1.8rem] outline-none focus:bg-white focus:border-emerald-500 font-bold transition-all text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-4 tracking-widest">Phone Node</label>
                  <div className="relative group">
                    <FaPhoneAlt className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input placeholder="+91..." className="w-full pl-14 p-5 bg-slate-50 border-2 border-transparent rounded-[1.8rem] outline-none focus:bg-white focus:border-emerald-500 font-bold transition-all text-sm" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-4 tracking-widest">Entity Website</label>
                  <div className="relative group">
                    <FaGlobe className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input placeholder="https://..." className="w-full pl-14 p-5 bg-slate-50 border-2 border-transparent rounded-[1.8rem] outline-none focus:bg-white focus:border-emerald-500 font-bold transition-all text-sm" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} required />
                  </div>
                </div>

                <button className="col-span-1 md:col-span-2 w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.25em] text-[11px] hover:bg-emerald-600 shadow-2xl shadow-slate-300 transition-all flex items-center justify-center gap-4 mt-4 overflow-hidden relative group">
                  <span className="relative z-10">{loading ? "Synchronizing..." : "Deploy Enquiry Protocol"}</span>
                  {!loading && <FaRocket className="relative z-10 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUCCESS MESSAGE */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-white/95 backdrop-blur-3xl p-6">
            <div className="text-center max-w-lg">
              <motion.div 
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-32 h-32 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-[3rem] flex items-center justify-center mx-auto mb-10 text-white shadow-2xl shadow-emerald-200"
              >
                <FaCheck size={50} />
              </motion.div>
              <h2 className="text-5xl font-black italic uppercase text-slate-900 mb-6 tracking-tighter">Mission <span className="text-emerald-500">Locked.</span></h2>
              <p className="text-slate-500 font-bold uppercase text-xs tracking-[0.3em] leading-loose">The signal has been received. Our analysts are processing your data nodes. Expected response within 24 standard hours.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Pricing;