import React, { useState, useEffect } from "react";
import { Search, Bell, Menu, User, LogOut, MessageSquare, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const TopHeader = ({ onOpenMenu, searchQuery, setSearchQuery, user, logout, setActiveView }) => {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  // Notification State
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Real-time Fetch Logic (Har 30 second me check karega naye requests)
  const fetchNotifications = async () => {
    try {
      // API endpoints aapke routes ke hisaab se (Quotes aur Contacts fetch kar rahe hain)
      const [quotesRes, contactsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/quotes"),
        axios.get("http://localhost:5000/api/contacts")
      ]);

      const newNotifs = [
        ...quotesRes.data.map(q => ({ id: q._id, type: 'Quote', msg: `New quote from ${q.name}`, target: 'QuoteMessages', time: q.createdAt })),
        ...contactsRes.data.map(c => ({ id: c._id, type: 'Contact', msg: `New message from ${c.name}`, target: 'ContactMessages', time: c.createdAt }))
      ];

      // Sort by time (Newest first)
      const sortedNotifs = newNotifs.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);
      
      setNotifications(sortedNotifs);
      setUnreadCount(sortedNotifs.length); // Initial count
    } catch (err) {
      console.error("Notif fetch error", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // 30 sec polling
    return () => clearInterval(interval);
  }, []);

  const handleNotifClick = (target) => {
    setActiveView(target); // View change karega
    setShowNotif(false);   // Dropdown band karega
    setUnreadCount(0);     // Count reset karega
  };

  return (
    <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200 px-4 md:px-8 py-4 sticky top-0 z-10 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button onClick={onOpenMenu} className="p-2 -ml-2 text-slate-500 md:hidden hover:bg-slate-100 rounded-xl transition-colors">
          <Menu size={22} />
        </button>
        <h2 className="text-sm font-black text-slate-800 uppercase tracking-tighter italic hidden sm:block">
          System_Control<span className="text-emerald-500">.v3</span>
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search telemetry, projects, blogs..."
            className="pl-12 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl text-xs focus:ring-2 focus:ring-emerald-500/20 w-80 transition-all font-medium"
          />
        </div>

        {/* --- NOTIFICATION BELL SECTION --- */}
        <div className="relative">
          <button 
            onClick={() => { setShowNotif(!showNotif); setUnreadCount(0); }} 
            className="p-2.5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 relative group transition-all"
          >
            <Bell size={20} className="text-slate-600 group-hover:rotate-12 transition-transform" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 bg-rose-500 text-white text-[8px] font-bold rounded-full border-2 border-white flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotif && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: 15 }} 
                className="absolute right-0 mt-4 w-80 bg-white border border-slate-200 rounded-[2rem] shadow-2xl overflow-hidden z-50"
              >
                <div className="p-5 border-b border-slate-50 bg-slate-50/50">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent_Activity</h4>
                </div>
                
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div 
                        key={n.id}
                        onClick={() => handleNotifClick(n.target)}
                        className="p-4 border-b border-slate-50 hover:bg-emerald-50 cursor-pointer transition-colors flex items-start gap-3 group"
                      >
                        <div className="mt-1 p-2 bg-white rounded-xl shadow-sm text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                          {n.type === 'Quote' ? <FileText size={14} /> : <MessageSquare size={14} />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-700 leading-tight mb-1">{n.msg}</p>
                          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter">
                            {new Date(n.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate-400">
                      <p className="text-[10px] font-bold uppercase tracking-widest">No new logs found</p>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => handleNotifClick("AuditDashboard")}
                  className="w-full p-4 text-[10px] font-black text-slate-400 hover:text-emerald-500 uppercase tracking-widest bg-slate-50/30 transition-colors"
                >
                  View All Activity Logs
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <div onClick={() => setShowProfile(!showProfile)} className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-800 leading-none mb-1 uppercase tracking-tighter group-hover:text-emerald-500 transition-colors">{user?.name || "User"}</p>
              <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-widest">System Online</span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 p-[2px] shadow-lg">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-blue-700 font-black uppercase">
                {user?.name ? user.name.charAt(0) : "A"}
              </div>
            </div>
          </div>
          <AnimatePresence>
            {showProfile && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute right-0 mt-4 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50">
                <button onClick={() => { setActiveView("Profile"); setShowProfile(false); }} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-50 rounded-lg flex items-center gap-2">
                  <User size={14} /> Profile Settings
                </button>
                <button onClick={() => { logout(); window.location.href = "/login"; }} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-rose-50 text-rose-500 rounded-lg flex items-center gap-2 border-t mt-2 pt-2">
                  <LogOut size={14} /> Kill Session
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;