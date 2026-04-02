import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Briefcase, FileText, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from "./StatCard";

const DashboardView = () => {
  const [stats, setStats] = useState({ projects: 345, quotes: 12, performance: 94 });

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        performance: Math.min(100, Math.max(88, prev.performance + (Math.random() > 0.5 ? 1 : -1)))
      }));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const performanceData = [
    { time: '00:00', value: 85 }, { time: '04:00', value: 88 }, { time: '08:00', value: 95 },
    { time: '12:00', value: 92 }, { time: '16:00', value: 98 }, { time: '20:00', value: 94 },
    { time: 'NOW', value: stats.performance },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
            Telemetry_Status<span className="text-emerald-500">.exe</span>
          </h1>
          <p className="text-slate-400 font-mono text-[10px] tracking-[0.4em] uppercase mt-2">
            Real-time performance metrics enabled
          </p>
        </div>
        <div className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 animate-pulse">
          <Zap size={14} fill="currentColor" /> System Active
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StatCard title="Projects Done" value={stats.projects} trend="+12%" trendUp={true} icon={<Briefcase size={24} />} color="blue" sub="Verified_Deliveries" />
        <StatCard title="Pending Quotes" value={stats.quotes} trend="-2.4%" trendUp={false} icon={<FileText size={24} />} color="rose" sub="Awaiting_Review" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <Activity size={18} className="text-emerald-500" /> Performance_Analytics
            </h3>
            <p className="text-[10px] text-slate-400 font-mono mt-1">Real-time graph data management</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-emerald-500 italic leading-none">{stats.performance}%</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Efficiency</p>
          </div>
        </div>
        <div className="h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
              <YAxis hide domain={[80, 100]} />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
              <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={4} fill="url(#colorVal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardView;