import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({ title, value, trend, trendUp, icon, color, sub }) => {
  const themes = {
    blue: "from-blue-600/20 to-blue-600/5 text-blue-600 border-blue-100 bg-blue-50",
    rose: "from-rose-600/20 to-rose-600/5 text-rose-600 border-rose-100 bg-rose-50"
  };

  return (
    <motion.div whileHover={{ y: -8 }} className="relative bg-white p-10 rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border ${themes[color]}`}>{icon}</div>
        <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black uppercase ${trendUp ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
          {trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {trend}
        </div>
      </div>
      <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">{title.replace(" ", "_")}</h3>
      <div className="flex items-baseline gap-3">
        <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic">{value}</h2>
        <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{sub}</span>
      </div>
    </motion.div>
  );
};

export default StatCard;