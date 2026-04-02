import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Save, HelpCircle, Globe, Image as ImageIcon, Workflow, ListChecks, Zap } from "lucide-react";
import { getIconComponent } from "../../utils/iconMapper";
import { motion, AnimatePresence } from "framer-motion";
const ServiceForm = ({ initialData = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      serviceId: "",
      title: "",
      slug: "",
      icon: "Settings",
      heroImage: "",
      mainImage: "",
      description: "",
      points: [""],
      process: [{ stepId: 1, title: "", icon: "Zap", text: "" }]
    }
  );

  // --- PRO FEATURE: Auto-Slug Generation ---
  useEffect(() => {
    if (!initialData && formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePointChange = (index, value) => {
    const newPoints = [...formData.points];
    newPoints[index] = value;
    setFormData((prev) => ({ ...prev, points: newPoints }));
  };

  const addPoint = () => setFormData((prev) => ({ ...prev, points: [...prev.points, ""] }));
  const removePoint = (index) => {
    if (formData.points.length > 1) {
      setFormData((prev) => ({ ...prev, points: prev.points.filter((_, i) => i !== index) }));
    }
  };

  const handleProcessChange = (index, field, value) => {
    const newProcess = [...formData.process];
    newProcess[index] = {
      ...newProcess[index],
      [field]: field === 'stepId' ? Number(value) : value
    };
    setFormData((prev) => ({ ...prev, process: newProcess }));
  };

  const addProcessStep = () => {
    setFormData((prev) => ({
      ...prev,
      process: [...prev.process, { stepId: prev.process.length + 1, title: "", icon: "Zap", text: "" }]
    }));
  };

  const removeProcessStep = (index) => {
    if (formData.process.length > 1) {
      setFormData((prev) => ({ ...prev, process: prev.process.filter((_, i) => i !== index) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      points: formData.points.filter(p => p.trim() !== ""),
      process: formData.process.filter(step => step.title.trim() !== "")
    };

    const url = initialData
      ? `http://localhost:5000/api/services/${initialData._id}`
      : `http://localhost:5000/api/services`;

    const method = initialData ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) throw new Error("Backend connection failed");
      onSave();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="bg-[#FDFDFD] rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-5xl mx-auto overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      {/* Header Area */}
      <div className="bg-slate-900 px-8 py-10 flex justify-between items-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white tracking-tighter italic">
            {initialData ? "UPDATE_SERVICE" : "DEPLOY_NEW_SERVICE"}
          </h2>
          <p className="text-indigo-400 font-mono text-[10px] uppercase tracking-[0.3em] mt-1">Verto Service Architecture v4.0</p>
        </div>
        <button onClick={onCancel} className="relative z-10 bg-white/10 p-3 rounded-2xl text-white hover:bg-rose-500 hover:rotate-90 transition-all duration-300">
          <X size={24} />
        </button>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-600/20 blur-[80px] rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
        
        {/* --- SECTION 1: IDENTITY & SEO --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-indigo-600 pl-4 mb-8">
             <Globe className="text-indigo-600" size={20}/>
             <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Global Identity</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-indigo-600 transition-colors">Service Identifier</label>
              <input required name="serviceId" value={formData.serviceId} onChange={handleInputChange} placeholder="e.g. 01" className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 rounded-2xl outline-none transition-all font-bold text-slate-700" />
            </div>
            <div className="md:col-span-2 space-y-2 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-indigo-600 transition-colors">Core Title</label>
              <input required name="title" value={formData.title} onChange={handleInputChange} placeholder="Service Name" className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 rounded-2xl outline-none transition-all font-bold text-slate-700" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">SEO URL (Slug)</label>
              <div className="flex items-center bg-slate-50 rounded-2xl border-2 border-transparent focus-within:border-indigo-100 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-50 transition-all overflow-hidden">
                 <span className="px-4 py-4 text-slate-400 text-xs border-r border-slate-200">verto.com/service/</span>
                 <input required name="slug" value={formData.slug} onChange={handleInputChange} placeholder="slug-url" className="flex-1 p-4 bg-transparent outline-none font-mono text-xs text-indigo-600 font-bold" />
              </div>
            </div>
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lucide Symbol</label>
              <div className="flex gap-2">
                <input name="icon" value={formData.icon} onChange={handleInputChange} placeholder="e.g. Activity" className="flex-1 p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl outline-none font-bold text-slate-700" />
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100 shadow-inner">
                  {getIconComponent ? getIconComponent(formData.icon) : <HelpCircle />}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: VISUAL ASSETS (Next Level Image Handling) --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-indigo-600 pl-4 mb-8">
             <ImageIcon className="text-indigo-600" size={20}/>
             <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Media Nodes</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hero Asset URL</label>
                <input required name="heroImage" value={formData.heroImage} onChange={handleInputChange} placeholder="https://unsplash.com/..." className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl outline-none transition-all text-xs font-mono" />
              </div>
              <div className="h-40 rounded-[2rem] bg-slate-100 border-2 border-dashed border-slate-200 overflow-hidden relative group">
                 {formData.heroImage ? (
                   <img src={formData.heroImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Hero Preview" />
                 ) : (
                   <div className="flex flex-col items-center justify-center h-full text-slate-300">
                      <ImageIcon size={32} strokeWidth={1}/>
                      <span className="text-[10px] font-black uppercase mt-2">Hero Preview Empty</span>
                   </div>
                 )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secondary Feature URL</label>
                <input required name="mainImage" value={formData.mainImage} onChange={handleInputChange} placeholder="https://unsplash.com/..." className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-2xl outline-none transition-all text-xs font-mono" />
              </div>
              <div className="h-40 rounded-[2rem] bg-slate-100 border-2 border-dashed border-slate-200 overflow-hidden relative group">
                 {formData.mainImage ? (
                   <img src={formData.mainImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Main Preview" />
                 ) : (
                   <div className="flex flex-col items-center justify-center h-full text-slate-300">
                      <ImageIcon size={32} strokeWidth={1}/>
                      <span className="text-[10px] font-black uppercase mt-2">Feature Preview Empty</span>
                   </div>
                 )}
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: CORE CONTENT --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-indigo-600 pl-4 mb-8">
             <ListChecks className="text-indigo-600" size={20}/>
             <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Logic & Features</h3>
          </div>
          <div className="space-y-2 group">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Deep Description</label>
            <textarea required name="description" value={formData.description} onChange={handleInputChange} rows="5" className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-[2rem] outline-none transition-all font-medium text-slate-700 leading-relaxed" placeholder="Detailed technical overview..."></textarea>
          </div>

          <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Key Performance Points</h4>
              <button type="button" onClick={addPoint} className="p-2 bg-indigo-600 text-white rounded-xl hover:rotate-90 transition-all duration-300 shadow-lg shadow-indigo-200">
                <Plus size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.points.map((point, index) => (
                <div key={index} className="flex gap-2 animate-in slide-in-from-right-4 duration-300">
                  <input type="text" value={point} onChange={(e) => handlePointChange(index, e.target.value)} placeholder={`Engine Feature #${index + 1}`} className="flex-1 p-4 bg-white border-2 border-transparent focus:border-indigo-100 rounded-2xl outline-none font-bold text-slate-700 shadow-sm" />
                  <button type="button" onClick={() => removePoint(index)} className="p-4 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECTION 4: OPERATIONAL WORKFLOW --- */}
  {/* --- SECTION 4: OPERATIONAL WORKFLOW (Next Level UI) --- */}
<section className="space-y-10">
  <div className="flex flex-col md:flex-row justify-between md:items-end border-b border-slate-100 pb-8 gap-4">
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
          <Workflow size={18}/>
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Operational Logic</h3>
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-11">Define the procedural sequence nodes</p>
    </div>
    
    <button 
      type="button" 
      onClick={addProcessStep} 
      className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-xl group"
    >
      <Plus size={16} className="group-hover:rotate-90 transition-transform"/> Add Node
    </button>
  </div>

  <div className="grid grid-cols-1 gap-8">
    {formData.process.map((step, index) => (
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        key={index} 
        className="relative group"
      >
        {/* Background Ghost Number */}
        <span className="absolute -left-4 -top-6 text-8xl font-black text-slate-50 group-hover:text-indigo-50/50 transition-colors pointer-events-none z-0">
          {String(step.stepId).padStart(2, '0')}
        </span>

        <div className="relative z-10 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm group-hover:shadow-xl group-hover:border-indigo-100 transition-all duration-500">
          
          {/* Node Actions */}
          <button 
            type="button" 
            onClick={() => removeProcessStep(index)} 
            className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
          >
            <Trash2 size={18} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visual Preview Node */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group-hover:bg-indigo-50/30 group-hover:border-indigo-100 transition-colors relative overflow-hidden">
               <div className="relative z-10 text-indigo-600 drop-shadow-md">
                  {getIconComponent(step.icon) || <Zap size={40} strokeWidth={1.5} />}
               </div>
               <div className="mt-4 text-[9px] font-black text-slate-400 uppercase tracking-widest relative z-10">Active_Symbol</div>
               {/* Decorative Circle */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-indigo-200/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Config Fields */}
            <div className="lg:col-span-9 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Sequence_ID</label>
                  <input 
                    type="number" 
                    value={step.stepId} 
                    onChange={(e) => handleProcessChange(index, 'stepId', e.target.value)} 
                    className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-200 focus:bg-white rounded-2xl outline-none font-black text-slate-800 transition-all" 
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Node Header</label>
                  <input 
                    type="text" 
                    value={step.title} 
                    onChange={(e) => handleProcessChange(index, 'title', e.target.value)} 
                    placeholder="Describe the stage..."
                    className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-200 focus:bg-white rounded-2xl outline-none font-bold text-slate-700 transition-all" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 text-indigo-500">Symbol_Ref</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={step.icon} 
                      onChange={(e) => handleProcessChange(index, 'icon', e.target.value)} 
                      placeholder="Lucide Name"
                      className="w-full p-4 bg-indigo-50/50 border-2 border-transparent focus:border-indigo-300 focus:bg-white rounded-2xl outline-none font-mono text-xs text-indigo-700 font-bold transition-all" 
                    />
                    <HelpCircle size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-300" />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Operational Logic Detail</label>
                  <textarea 
                    value={step.text} 
                    onChange={(e) => handleProcessChange(index, 'text', e.target.value)} 
                    rows="1" 
                    placeholder="Enter the technical procedure..."
                    className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-200 focus:bg-white rounded-2xl outline-none font-medium text-slate-600 transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Connector Line (Only if not last) */}
        {index !== formData.process.length - 1 && (
          <div className="w-1 h-8 bg-slate-100 mx-auto my-2 rounded-full shadow-inner"></div>
        )}
      </motion.div>
    ))}

    <motion.button 
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      type="button" 
      onClick={addProcessStep} 
      className="w-full py-10 border-4 border-dashed border-slate-100 text-slate-300 rounded-[3rem] font-black uppercase text-xs tracking-[0.4em] hover:border-indigo-200 hover:text-indigo-400 hover:bg-indigo-50/30 transition-all flex flex-col items-center justify-center gap-4"
    >
      <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-colors">
        <Plus size={24} strokeWidth={3} />
      </div>
      Append Workflow Node
    </motion.button>
  </div>
</section>

        {/* --- Form Actions --- */}
        <div className="flex flex-col md:flex-row justify-end gap-6 pt-10 border-t border-slate-100">
          <button type="button" onClick={onCancel} className="px-8 py-4 font-black text-slate-400 uppercase text-xs tracking-widest hover:text-rose-500 transition-all">
            Terminate Update
          </button>
          <button type="submit" className="px-12 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3 transition transform active:scale-95 group">
            <Save size={20} className="group-hover:rotate-12 transition-transform"/> 
            <span className="uppercase text-xs tracking-[0.2em]">Commit to Database</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;