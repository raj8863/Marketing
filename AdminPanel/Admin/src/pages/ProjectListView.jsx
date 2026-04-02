import { useEffect, useState, useMemo } from "react";
import { Trash2, Edit2, Image as ImageIcon, Search, Plus, RotateCcw } from "lucide-react";

export const ProjectListView = ({ onEdit, refreshTrigger }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://marketing-b3je.onrender.com/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) { 
      console.error("Fetch Error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchProjects(); }, [refreshTrigger]);

  // Client-side search for instant feedback
  const filteredProjects = useMemo(() => {
    return projects.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, projects]);

  const deleteProject = async (id) => {
    if (window.confirm("CRITICAL: Delete this project permanently from the archives?")) {
      try {
        const res = await fetch(`https://marketing-b3je.onrender.com/api/projects/${id}`, { method: 'DELETE' });
        if (res.ok) setProjects(prev => prev.filter(p => p._id !== id));
      } catch (err) { alert("Delete failed."); }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2.5rem] border border-slate-100">
      <RotateCcw className="animate-spin text-emerald-500 mb-4" size={32} />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Syncing_Nodes...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Search & Stats Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search_Database..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-6 px-6">
          <div className="text-center">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active_Nodes</p>
            <p className="text-xl font-black text-slate-900 leading-none">{projects.length}</p>
          </div>
          <div className="w-[1px] h-8 bg-slate-100"></div>
          <div className="text-center">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Results</p>
            <p className="text-xl font-black text-emerald-500 leading-none">{filteredProjects.length}</p>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.2em] bg-slate-50 text-slate-400 border-b border-slate-100">
                <th className="px-8 py-6 font-black">Project_Asset</th>
                <th className="px-8 py-6 font-black">Architecture</th>
                <th className="px-8 py-6 font-black">Client_Node</th>
                <th className="px-8 py-6 font-black text-right">Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProjects.map((p) => (
                <tr key={p._id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 shadow-sm">
                        {p.mainImage ? (
                          <img src={p.mainImage} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon size={20} /></div>
                        )}
                      </div>
                      <div>
                        <span className="block font-black text-slate-900 uppercase italic text-sm">{p.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono tracking-tight">{p.slug}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-slate-500">{p.client || "Self_Initiated"}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onEdit(p)} className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => deleteProject(p._id)} className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-slate-300 font-black uppercase tracking-widest text-xs">Query_Returned_Zero_Results</div>
        )}
      </div>
    </div>
  );
};
