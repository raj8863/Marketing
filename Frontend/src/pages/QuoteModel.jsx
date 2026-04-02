import React, { useState, useEffect } from "react";
import { 
  FaTimes, FaPaperPlane, FaCheck, FaPhoneAlt, FaEnvelope, 
  FaUser, FaSpinner, FaBriefcase, FaMoneyBillWave 
} from "react-icons/fa";
import { FaArrowRightLong, FaRegMessage } from "react-icons/fa6";

const QuoteModal = ({ isOpen, onClose, servicesList = [], selectedServices = [], toggleService }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeBudget, setActiveBudget] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const budgets = ["< ₹25k", "₹50k - 2L", "₹2L - 5L", "> ₹5L"];

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      document.body.style.overflow = 'unset';
      setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
        setActiveBudget(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Capture form data using the 'name' attributes added below
    const formDataObj = new FormData(e.currentTarget);
    
    const quoteData = {
      name: formDataObj.get("name"),
      contact: formDataObj.get("contact"),
      details: formDataObj.get("details"),
      services: selectedServices,
      budget: activeBudget,
    };

    // 2. Validation Check (This will now pass because 'name' and 'contact' exist)
    if (!quoteData.name || !quoteData.contact) {
      alert("Please fill in your name and contact info.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://marketing-b3je.onrender.com/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData)
      });

      if (response.ok) {
        setIsSuccess(true);
        setActiveBudget(null);
      } else {
        throw new Error("Failed to send request");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please check if your backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-end md:items-center justify-center sm:p-4 ${isOpen ? "visible" : "invisible"}`}>
      
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-[#000000]/90 backdrop-blur-sm transition-opacity duration-500 ease-out ${isOpen ? "opacity-100" : "opacity-0"}`} 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className={`
          relative w-full max-w-[1100px] bg-[#0a0a0a] 
          md:rounded-[24px] rounded-t-[24px] shadow-2xl 
          border border-white/10 flex flex-col md:flex-row overflow-hidden
          transition-all duration-500 cubic-bezier(0.2, 0.8, 0.2, 1)
          ${isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-12 scale-95 opacity-0"}
          h-[90vh] md:h-[85vh] 
        `}
      >
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/5 blur-[100px] -z-10 pointer-events-none"></div>

        {/* LEFT PANEL */}
        <div className="hidden md:flex w-[35%] lg:w-[38%] bg-[#0e0e0e] relative flex-col justify-between p-8 lg:p-12 border-r border-white/5 z-10 shrink-0">
           <div className="absolute inset-0 opacity-[0.05]" 
                style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
           </div>

           <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-8 shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)] ring-1 ring-white/20">
                <FaPaperPlane className="text-white text-xl" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-[1] mb-6 tracking-tight">
                Let's Build <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">The Future.</span>
              </h2>
           </div>
           
           <div className="relative z-10 space-y-4">
             <div className="flex items-center gap-4 text-sm text-gray-400">
               <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-emerald-400">
                  <FaPhoneAlt size={12}/>
               </div>
               <div>
                 <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Call Us</p>
                 <span className="font-semibold text-sm">+91 98765 43210</span>
               </div>
             </div>
           </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 relative bg-[#0a0a0a] z-10 flex flex-col h-full min-w-0">
          <div className="flex items-center justify-between p-4 md:absolute md:top-4 md:right-4 md:z-50 md:p-0 w-full md:w-auto">
             <h2 className="md:hidden text-lg font-black text-white">Start Project</h2>
             <button onClick={onClose} className="group w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-all duration-300">
               <FaTimes className="text-gray-400 group-hover:text-white" />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0 p-6 md:p-10 pt-0 md:pt-10">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 min-h-[300px]">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 ring-1 ring-emerald-500/50">
                  <FaCheck className="text-3xl text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Received!</h3>
                <button onClick={onClose} className="px-8 py-3 rounded-xl bg-white/5 text-white text-xs font-bold uppercase tracking-widest">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="group space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Your Name</label>
                    <div className="relative">
                      {/* FIX: Added name="name" */}
                      <input 
                        name="name" 
                        required 
                        type="text" 
                        className="w-full bg-[#121212] text-white border border-white/10 rounded-lg pl-10 pr-4 py-3.5 outline-none focus:border-emerald-500/50 transition-all text-sm" 
                        placeholder="John Doe" 
                      />
                      <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 transition-colors text-xs" />
                    </div>
                  </div>
                  
                  <div className="group space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Contact Info</label>
                    <div className="relative">
                      {/* FIX: Added name="contact" */}
                      <input 
                        name="contact" 
                        required 
                        type="text" 
                        className="w-full bg-[#121212] text-white border border-white/10 rounded-lg pl-10 pr-4 py-3.5 outline-none focus:border-emerald-500/50 transition-all text-sm" 
                        placeholder="Email / Phone" 
                      />
                      <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 transition-colors text-xs" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <FaBriefcase className="text-emerald-500" /> Services
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {servicesList.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleService(s)}
                        className={`px-4 py-2.5 rounded-lg border text-xs font-bold transition-all duration-200 flex items-center gap-2
                          ${selectedServices.includes(s) ? "bg-emerald-500 text-black border-emerald-500" : "bg-[#121212] border-white/5 text-gray-400"}`}
                      >
                        {selectedServices.includes(s) && <FaCheck className="text-[9px]" />}
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <FaMoneyBillWave className="text-emerald-500" /> Budget
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setActiveBudget(b)}
                        className={`py-3 px-2 rounded-lg border text-xs font-bold text-center transition-all duration-200 ${
                          activeBudget === b ? "bg-white text-black border-white" : "bg-[#121212] text-gray-400 border-white/5"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Project Details</label>
                  <div className="relative">
                    {/* FIX: Added name="details" */}
                    <textarea 
                      name="details" 
                      rows="3" 
                      className="w-full bg-[#121212] text-white border border-white/10 rounded-lg p-4 pl-10 outline-none focus:border-emerald-500/50 transition-all resize-none text-sm"
                      placeholder="Project goals, timeline..."
                    ></textarea>
                    <FaRegMessage className="absolute left-3.5 top-4 text-gray-600 text-xs" />
                  </div>
                </div>

                <div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 p-[1px] shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-70"
                  >
                    <div className="relative h-full w-full bg-[#0a0a0a]/20 hover:bg-transparent rounded-xl transition-colors duration-300">
                       <div className="flex items-center justify-center gap-2 py-4 text-xs font-black text-black uppercase tracking-[0.2em]">
                          {isSubmitting ? <FaSpinner className="animate-spin text-lg" /> : "Send Request"}
                          {!isSubmitting && <FaArrowRightLong />}
                       </div>
                    </div>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default QuoteModal;
