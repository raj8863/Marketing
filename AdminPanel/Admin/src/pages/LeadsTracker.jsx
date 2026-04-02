import React, { useState, useEffect } from "react";
import axios from "axios";
import { Phone, Mail, Globe, Calendar, User, ShieldAlert, Loader2 } from "lucide-react";

export const LeadsTracker = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://marketing-b3je.onrender.com/api/pricing/admin/leads", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLeads(res.data);
      } catch (err) {
        setError("Failed to sync lead repository.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
    </div>
  );

  if (error) return (
    <div className="p-10 bg-rose-50 border border-rose-100 rounded-[2rem] text-rose-600 flex items-center gap-4">
      <ShieldAlert /> {error}
    </div>
  );

  return (
    <div className="p-6 md:p-10 bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 z-0 opacity-50" />

      <div className="relative z-10">
        <div className="mb-10">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900">
            Lead_Capture_Log<span className="text-emerald-500">.sys</span>
          </h2>
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em]">Neural link established with public pricing nodes</p>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">
                <th className="px-6 py-2">Entity Identity</th>
                <th className="px-6 py-2">Contact Link</th>
                <th className="px-6 py-2">Protocol Chosen</th>
                <th className="px-6 py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead._id} className="group bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 rounded-2xl">
                    {/* Entity Details */}
                    <td className="px-6 py-5 first:rounded-l-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 text-slate-400 group-hover:text-emerald-500 group-hover:border-emerald-100 transition-colors">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-sm uppercase italic">{lead.name}</p>
                          <div className="flex items-center gap-2 text-slate-400 text-[10px] mt-0.5">
                            <Globe size={10} /> {lead.website || "No Domain Linked"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info - NEW PRO COLUMN */}
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                          <Mail size={12} className="text-emerald-500" /> {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                          <Phone size={12} className="text-emerald-500" /> {lead.phone || "Not Provided"}
                        </div>
                      </div>
                    </td>

                    {/* Plan Badge */}
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                        lead.planChosen === 'Platinum' ? 'bg-indigo-500 text-white' : 
                        lead.planChosen === 'Advanced' ? 'bg-emerald-500 text-white' : 
                        'bg-slate-900 text-white'
                      }`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        {lead.planChosen}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 last:rounded-r-2xl">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                        <Calendar size={12} /> {new Date(lead.createdAt).toLocaleDateString('en-GB')}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-20 text-center text-slate-300 font-mono text-xs uppercase italic tracking-widest">
                    No active leads detected in the registry.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
