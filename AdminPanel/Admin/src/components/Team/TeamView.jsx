import React, { useEffect, useState } from "react";
import { User, Trash2, Edit3, Loader2, Users, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TeamView = ({ onEdit }) => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  // Auth Header Helper (Common for fetch and delete)
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token.trim()}` : "";
  };

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/team");
      const data = await res.json();
      if (res.ok) {
        setTeam(data);
      } else {
        console.error("Database error:", data.message);
      }
    } catch (err) {
      console.error("Failed to load team:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Kyan aap is operative ko system se hatana chahte hain?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/team/${id}`, {
        method: "DELETE",
        headers: { "Authorization": getAuthHeader() }
      });
      
      if (res.ok) {
        // Optimistic UI Update: Turant list se hata dena
        setTeam(prev => prev.filter(m => m._id !== id));
      } else {
        const errorData = await res.json();
        alert(`Action Denied: ${errorData.message || "Unauthorized"}`);
      }
    } catch (err) {
      alert("System Error: Could not reach the server.");
    }
  };

  // Improved Image Helper: Cloudinary support ke saath
  const getImgSrc = (img) => {
    if (!img) return "https://via.placeholder.com/400x400?text=No+Visual";
    // Agar Cloudinary URL hai (starts with http), toh direct return karein
    return img.startsWith('http') ? img : `http://localhost:5000${img}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-slate-400">
        <Loader2 className="animate-spin mb-4 text-emerald-500" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Accessing_Database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header Info */}
      <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-50 p-4 rounded-2xl">
            <Database className="text-emerald-500" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">
              Operational_Team<span className="text-emerald-500">.node</span>
            </h2>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Active_Personnel: {team.length}
            </p>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      {team.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="bg-white p-24 rounded-[3rem] border-2 border-dashed border-slate-200 text-center"
        >
          <Users className="mx-auto text-slate-200 mb-4" size={48} />
          <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No Operatives Found in System</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {team.map((member) => (
              <motion.div 
                key={member._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                className="bg-white group rounded-[2.5rem] border border-slate-200 p-6 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all relative overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative h-56 w-full rounded-[2rem] overflow-hidden mb-6 bg-slate-100">
                  <img
                    src={getImgSrc(member.image)}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Error+Loading"; }}
                  />
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/10">
                    Live_Status
                  </div>
                </div>

                {/* Info Section */}
                <div className="space-y-1 mb-6 px-2">
                  <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{member.role}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-5 border-t border-slate-50">
                  <button
                    onClick={() => onEdit(member)}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300"
                  >
                    <Edit3 size={14} /> Edit_Data
                  </button>

                  <button
                    onClick={() => handleDelete(member._id)}
                    className="w-14 h-14 flex items-center justify-center bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white rounded-2xl transition-all duration-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default TeamView;