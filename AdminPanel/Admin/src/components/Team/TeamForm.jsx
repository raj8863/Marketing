import React, { useState, useEffect, useRef } from "react";
import { UserPlus, Image as ImageIcon, X, UploadCloud, CheckCircle, Loader2, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const TeamForm = ({ selected, onSuccess, onCancel }) => {
  const [form, setForm] = useState({ name: "", role: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Sync form when editing a member
  useEffect(() => {
    if (selected) {
      setForm({ name: selected.name, role: selected.role });
      // Use existing Cloudinary URL for preview
      setPreviewUrl(selected.image);
    } else {
      setForm({ name: "", role: "" });
      setPreviewUrl(null);
      setSelectedFile(null);
    }
  }, [selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Auth Error: Please login again.");
      return;
    }

    // Required check for new entries
    if (!selected && !selectedFile) {
      alert("Please upload a profile photo.");
      return;
    }

    setLoading(true);

    // 1. Prepare FormData
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("role", form.role);
    
    // Only append image if a NEW file was picked
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const url = selected?._id 
        ? `http://localhost:5000/api/team/${selected._id}` 
        : "http://localhost:5000/api/team";
      
      const method = selected?._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { 
          // IMPORTANT: Do NOT set Content-Type here. 
          // Let the browser set the boundary automatically.
          "Authorization": `Bearer ${token.trim()}` 
        },
        body: formData, 
      });

      const data = await res.json();

      if (res.ok) {
        // Success: Clear form and notify parent
        setForm({ name: "", role: "" });
        setSelectedFile(null);
        setPreviewUrl(null);
        onSuccess(); 
      } else {
        // If server returns an error, show the exact message from backend
        console.error("Server Error Detail:", data);
        alert(`System Error: ${data.message || "Failed to process request"}`);
      }
    } catch (err) {
      console.error("Network/Fetch Error:", err);
      alert("Network Error: Could not reach the server. Is your backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl relative overflow-hidden">
        
        {/* Form Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">
              {selected ? "Update_Personnel" : "New_Onboarding"}
              <span className="text-emerald-500">.cfg</span>
            </h2>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Database_Link: Active</p>
          </div>
          <button 
            type="button"
            onClick={onCancel} 
            className="p-3 hover:bg-rose-50 hover:text-rose-600 rounded-2xl text-slate-400 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Text Data */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block italic">Operative_Name</label>
                <input 
                  type="text"
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 font-bold text-slate-700 outline-none transition-all" 
                  placeholder="e.g. Alex Rivera" 
                  value={form.name} 
                  onChange={(e) => setForm({...form, name: e.target.value})} 
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block italic">Assigned_Role</label>
                <input 
                  type="text"
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 font-bold text-slate-700 outline-none transition-all" 
                  placeholder="e.g. Lead Developer" 
                  value={form.role} 
                  onChange={(e) => setForm({...form, role: e.target.value})} 
                  required 
                />
              </div>
            </div>

            {/* Right Column: Visual Data */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block italic">Profile_Visual</label>
              <div 
                onClick={() => fileInputRef.current.click()}
                className="group relative h-40 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/30 transition-all bg-slate-50"
              >
                {previewUrl ? (
                  <>
                    <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all backdrop-blur-sm">
                      <RefreshCw className="text-white mb-2" size={20} />
                      <p className="text-white text-[8px] font-black uppercase tracking-widest">Update_File</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <UploadCloud className="mx-auto text-slate-300 group-hover:text-emerald-500 transition-colors" size={30} />
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Upload_Visual</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setSelectedFile(file);
                      // Local preview for better UX
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }} 
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Synchronizing_Node...
              </>
            ) : (
              <>
                <CheckCircle size={16} />
                {selected ? "Update_Operative_Record" : "Commit_Member_to_System"}
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default TeamForm;