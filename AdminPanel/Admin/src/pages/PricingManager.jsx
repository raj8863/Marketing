import React, { useState, useEffect } from "react";
import { Trash2, Edit3, Package, Loader2 } from "lucide-react";

const PricingManager = ({ onEdit }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const res = await fetch("https://marketing-b3je.onrender.com/api/pricing");
      if (!res.ok) throw new Error("Failed to fetch nodes");
      const data = await res.json();
      setPlans(data);
    } catch (err) { 
      console.error("Registry_Fetch_Error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchPlans(); }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized: No session token found. Please login again.");
      return;
    }

    if (!window.confirm("CRITICAL: Terminate this plan protocol from public site?")) return;

    try {
      const res = await fetch(`https://marketing-b3je.onrender.com/api/pricing/${id}`, {
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${token.trim()}` 
        }
      });

      if (res.status === 401) {
        alert("Session Expired: Please login again.");
        return;
      }

      if (res.ok) {
        setPlans(plans.filter(p => p._id !== id)); // Instant UI update
      } else {
        alert("Protocol Error: Deletion failed.");
      }
    } catch (err) {
      alert("Network Error: Backend unreachable.");
    }
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-emerald-500" size={32} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">
            Plan_Registry<span className="text-emerald-500">.sys</span>
          </h2>
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Active nodes on public interface</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan._id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 ${plan.color === 'emerald' ? 'bg-emerald-500' : 'bg-indigo-500'}`}></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-slate-50 rounded-2xl text-slate-900 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <Package size={20}/>
              </div>
              {plan.popular && <span className="bg-emerald-500 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase">Popular</span>}
            </div>

            <h3 className="text-xl font-black uppercase italic text-slate-900 tracking-tighter">{plan.name}</h3>
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-4">{plan.price}</p>
            
            <div className="flex gap-2 pt-6 border-t border-slate-50">
              <button onClick={() => onEdit(plan)} className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">Edit_Cfg</button>
              <button onClick={() => handleDelete(plan._id)} className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={14}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingManager;
