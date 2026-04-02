import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getIconComponent } from '../../utils/iconMapper';

const ServiceForm = ({ initialData = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      serviceId: "",
      title: "",
      slug: "",
      icon: "Activity", 
      heroImage: "",
      mainImage: "",
      description: "",
      points: [""],
      process: [{ stepId: 1, title: "", icon: "Zap", text: "" }]
    }
  );

  // --- ⚙️ ENGINE: AUTO SLUG GENERATOR ---
  useEffect(() => {
    if (!initialData && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, initialData]);

  // --- ⚙️ ENGINE: UNIVERSAL INPUT HANDLER ---
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // --- ⚙️ ENGINE: NODE LOGIC HANDLER (CRITICAL FIX) ---
  const handleProcessChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedProcess = prev.process.map((step, i) => 
        i === index ? { ...step, [field]: field === 'stepId' ? Number(value) : value } : step
      );
      return { ...prev, process: updatedProcess };
    });
  };

  const addProcessStep = () => {
    setFormData((prev) => ({
      ...prev,
      process: [
        ...prev.process, 
        { stepId: prev.process.length + 1, title: "", icon: "Cpu", text: "" }
      ]
    }));
  };

  const removeProcessStep = (index) => {
    setFormData((prev) => ({ 
      ...prev, 
      process: prev.process.filter((_, i) => i !== index) 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clean data: remove empty steps or points before sending to DB
    const cleanedData = { 
      ...formData, 
      points: formData.points.filter(p => p.trim() !== ""), 
      process: formData.process.filter(s => s.title.trim() !== "") 
    };
    
    const url = initialData ? `https://marketing-b3je.onrender.com/api/services/${initialData._id}` : `https://marketing-b3je.onrender.com/api/services`;
    try {
      const response = await fetch(url, {
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      });
      if (response.ok) onSave();
    } catch (err) { 
      alert("🔴 SYSTEM_CRITICAL: COMMIT_FAILED"); 
    }
  };

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 max-w-6xl mx-auto overflow-hidden font-sans border-b-[12px] border-b-slate-900">
      
      {/* 🟢 HEADER: SYSTEM STATUS BAR */}
      <div className="bg-slate-950 px-10 py-12 flex justify-between items-center relative overflow-hidden">
        {/* Background Visual: Dynamic Ghost Initials */}
        <div className="absolute -top-4 -right-4 opacity-5 text-white text-[12rem] font-black italic select-none pointer-events-none">
           {formData.icon.substring(0, 2).toUpperCase()}
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_#10b981]"/>
            <span className="text-emerald-500 font-mono text-[10px] uppercase tracking-[0.5em]">System_Status: Operational</span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">
            {initialData ? "Reconfigure_Node" : "Initialize_Core"}
          </h2>
        </div>

        <button 
          type="button"
          onClick={onCancel} 
          className="relative z-10 bg-white/5 hover:bg-rose-600 transition-all px-8 py-4 rounded-2xl text-white font-black text-xs uppercase tracking-widest border border-white/10 group active:scale-95"
        >
          Abort_Session
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 md:p-16 space-y-24">
        
        {/* 🟢 SECTION 01: GLOBAL CONFIGURATION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rotate-45" /> Identity_Label
                  </label>
                  <input required name="title" value={formData.title} onChange={handleInputChange} placeholder="E.g. Technical SEO" className="w-full text-xl font-black text-slate-900 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-5 rounded-2xl transition-all outline-none" />
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rotate-45" /> Transmission_Slug
                  </label>
                  <input required name="slug" value={formData.slug} onChange={handleInputChange} className="w-full text-sm font-mono font-bold text-emerald-600 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-5 rounded-2xl transition-all outline-none" />
               </div>
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-emerald-500 rotate-45" /> Architectural_Description
               </label>
               <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" className="w-full text-base font-medium text-slate-600 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-6 rounded-[2.5rem] transition-all outline-none resize-none leading-relaxed" placeholder="Inject core infrastructural objectives..." />
            </div>
          </div>

          {/* 🟢 THE TERMINAL: GLOBAL ICON PREVIEW */}
          <div className="lg:col-span-5 bg-slate-950 rounded-[4rem] p-12 text-center relative overflow-hidden group shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#10b98120_0%,transparent_70%)]" />
              
              <div className="relative z-10 mb-10">
                <div className="w-32 h-32 bg-white/5 rounded-[3rem] mx-auto flex items-center justify-center text-emerald-400 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-[0_0_50px_rgba(16,185,129,0.15)] text-6xl">
                   {getIconComponent(formData.icon) || <span className="font-mono text-xl opacity-20">NULL</span>}
                </div>
                <div className="mt-6 inline-block px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                   <p className="text-[10px] font-mono text-emerald-500 font-black uppercase tracking-[0.4em]">Core_Symbol_Active</p>
                </div>
              </div>

              <div className="relative z-10 space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Input_Symbol_Ref</label>
                  <div className="relative">
                    <input name="icon" value={formData.icon} onChange={handleInputChange} placeholder="e.g. Shield, Cpu, Activity" className="w-full text-center bg-white/5 border-2 border-white/5 focus:border-emerald-500/50 focus:bg-white/10 transition-all font-mono text-white font-black outline-none p-5 rounded-2xl text-base" />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                  </div>
              </div>
          </div>
        </section>

        {/* 🟢 SECTION 02: OPERATIONAL LOGIC (DYNAMIC NODES) */}
        <section className="space-y-12">
          <div className="flex justify-between items-end border-b-2 border-slate-100 pb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-[2px] bg-emerald-500" />
                <span className="text-[10px] font-mono text-emerald-500 font-black uppercase tracking-[0.5em]">Process_Architecture</span>
              </div>
              <h3 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Operational Logic</h3>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              type="button" 
              onClick={addProcessStep} 
              className="bg-slate-900 text-white px-10 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 transition-all group"
            >
              <span className="text-emerald-400 text-xl font-black group-hover:rotate-90 transition-transform duration-300">+</span>
              <span className="uppercase text-xs font-black tracking-widest">Append_Node</span>
            </motion.button>
          </div>

          <div className="space-y-10">
            <AnimatePresence mode="popLayout">
              {formData.process.map((step, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={index} 
                  className="relative group bg-white rounded-[4rem] border border-slate-200 shadow-sm transition-all hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:border-emerald-200 overflow-hidden"
                >
                  {/* Dynamic Sidebar Accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-slate-100 group-hover:bg-emerald-500 transition-all duration-500" />

                  <button 
                    type="button" 
                    onClick={() => removeProcessStep(index)} 
                    className="absolute top-8 right-10 text-[10px] font-black uppercase text-slate-300 hover:text-rose-500 transition-colors z-20 flex items-center gap-2"
                  >
                    <span>Remove_Node</span>
                    <span className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center text-[8px]">X</span>
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    
                    {/* NODE SYMBOL PREVIEW */}
                    <div className="lg:col-span-3 bg-slate-50/50 p-12 border-r border-slate-100 flex flex-col items-center justify-center space-y-8">
                        <div className="relative group/subicon">
                           <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-0 group-hover/subicon:scale-150 transition-transform duration-1000"></div>
                           <div className="relative w-28 h-28 bg-slate-950 rounded-[2.5rem] flex items-center justify-center text-emerald-400 shadow-2xl border border-white/5 transition-all group-hover/subicon:scale-110 group-hover/subicon:-rotate-12 text-5xl">
                              {getIconComponent(step.icon) || <span className="text-[10px] font-mono opacity-20 uppercase tracking-tighter">no_ref</span>}
                           </div>
                        </div>
                        <div className="w-full space-y-3 text-center">
                           <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Node_Symbol_Ref</label>
                           <input 
                              type="text" 
                              value={step.icon} 
                              onChange={(e) => handleProcessChange(index, 'icon', e.target.value)} 
                              className="w-full bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs font-black text-center outline-none border border-white/5 focus:border-emerald-500/50 transition-all" 
                              placeholder="e.g. FaRocket" 
                           />
                        </div>
                    </div>

                    {/* NODE DATA INPUTS */}
                    <div className="lg:col-span-9 p-12 md:p-16 space-y-10">
                       <div className="grid grid-cols-12 gap-8 items-end">
                          <div className="col-span-3 md:col-span-2">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 block">Seq_ID</label>
                            <div className="text-6xl font-black text-slate-100 font-mono italic select-none">
                               {String(index + 1).padStart(2, '0')}
                            </div>
                          </div>
                          <div className="col-span-9 md:col-span-10">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 block">Node_Heading_Label</label>
                            <input 
                               type="text" 
                               value={step.title} 
                               onChange={(e) => handleProcessChange(index, 'title', e.target.value)} 
                               className="w-full text-3xl font-black text-slate-900 bg-transparent border-b-4 border-slate-100 focus:border-emerald-500 outline-none transition-all pb-3 placeholder:text-slate-100" 
                               placeholder="Assign Logical Step Title..." 
                            />
                          </div>
                       </div>

                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                             Detail_Execution_Parameters
                          </label>
                          <textarea 
                             value={step.text} 
                             onChange={(e) => handleProcessChange(index, 'text', e.target.value)} 
                             rows="3" 
                             className="w-full p-8 bg-slate-50 border border-slate-100 rounded-[3rem] font-medium text-slate-600 outline-none focus:bg-white focus:border-emerald-500 focus:shadow-xl transition-all resize-none leading-relaxed text-lg" 
                             placeholder="Describe the operational procedure for this node..." 
                          />
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* 🟢 FOOTER: DEPLOYMENT HUB */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-10 border-t-2 border-slate-100">
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 font-black text-sm border-2 border-slate-200">
                  {formData.process.length}
               </div>
               <div>
                 <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Ready_to_Deploy</p>
                 <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mt-1">Status: All nodes verified and optimized</p>
               </div>
            </div>
            
            <div className="flex items-center gap-6 w-full md:w-auto">
               <button 
                type="button" 
                onClick={onCancel} 
                className="flex-1 md:flex-none font-black text-slate-300 uppercase text-xs tracking-[0.3em] hover:text-rose-600 transition-all active:scale-90"
               >
                Discard_Changes
               </button>
               
               <button 
                type="submit" 
                className="flex-1 md:flex-none px-16 py-7 bg-emerald-500 text-slate-950 font-black rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)] flex items-center justify-center gap-4 hover:bg-slate-900 hover:text-white transition-all transform active:scale-95 group"
               >
                 <span className="uppercase text-sm tracking-[0.3em]">Commit_and_Deploy</span>
                 <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
               </button>
            </div>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
