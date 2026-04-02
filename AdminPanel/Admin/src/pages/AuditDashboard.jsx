import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGlobe, FiMail, FiCalendar, FiRefreshCw, FiTrash2, FiExternalLink } from "react-icons/fi";

const AuditDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 🛰️ Fetch Leads from Backend ---
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/audit/all");
      const data = await response.json();
      if (data.success) {
        setLeads(data.data);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans">
      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-4">
            System Admin Console
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            Audit <span className="text-emerald-500">Intelligence.</span>
          </h1>
        </div>

        <button 
          onClick={fetchLeads}
          className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-emerald-500 hover:text-black transition-all font-bold text-xs uppercase tracking-widest"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} /> Refresh Feed
        </button>
      </div>

      {/* --- STATS OVERVIEW --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl">
          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Total Inbound</p>
          <h3 className="text-5xl font-black italic">{leads.length}</h3>
        </div>
        <div className="p-8 bg-emerald-500 text-black rounded-[2rem] shadow-lg shadow-emerald-500/20">
          <p className="text-black/60 text-[10px] font-black uppercase tracking-widest mb-2">Verified Domains</p>
          <h3 className="text-5xl font-black italic">{leads.filter(l => l.status === 'Pending').length}</h3>
        </div>
      </div>

      {/* --- DATA TABLE --- */}
      <div className="max-w-7xl mx-auto overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Timestamp</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Domain Protocol</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Contact Route</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {leads.map((lead, idx) => (
                  <motion.tr 
                    key={lead._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-3 text-white/50 font-mono text-xs">
                        <FiCalendar className="text-emerald-500" />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="text-emerald-500 font-black italic uppercase tracking-tight text-lg group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                          <FiGlobe size={14}/> {lead.domain}
                        </span>
                        <span className="text-[10px] text-white/20 font-mono lowercase truncate max-w-[200px]">{lead.url}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3 text-white font-bold text-sm">
                        <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-emerald-500 border border-white/10">
                           <FiMail size={14}/>
                        </div>
                        {lead.email}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-3">
                        <a 
                          href={lead.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-3 bg-white/5 rounded-xl hover:bg-emerald-500 hover:text-black transition-all"
                        >
                          <FiExternalLink />
                        </a>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {leads.length === 0 && !loading && (
            <div className="p-20 text-center text-white/20 font-black uppercase tracking-widest italic">
              No Data Packets Detected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditDashboard;