import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Globe, Mail, Palette, Monitor, 
  Lock, Users, Save, Bell, Image as ImageIcon, 
  Loader2 as FaSpinner 
} from "lucide-react";

/* =======================
    PRO SETTINGS VIEW 
   ======================= */
const SettingsView = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  
  // System State
  const [maintenance, setMaintenance] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const tabs = [
    { id: "profile", label: "Admin Identity", icon: <Users size={18}/> },
    { id: "security", label: "Access & Security", icon: <ShieldCheck size={18}/> },
    { id: "website", label: "Site Configuration", icon: <Globe size={18}/> },
    { id: "automation", label: "Mail Automation", icon: <Mail size={18}/> },
    { id: "appearance", label: "Interface", icon: <Palette size={18}/> },
  ];

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API Synchronization
    setTimeout(() => {
      setIsSaving(false);
      alert("System Configuration Synchronized.");
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4 pt-10">
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">System Settings</h2>
          <p className="text-gray-500 mt-2 font-medium">Command center for Verto Digital's core infrastructure.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-200 hover:bg-indigo-700 disabled:bg-indigo-400 transition-all flex items-center gap-2 group"
        >
          {isSaving ? <FaSpinner className="animate-spin" size={18}/> : <Save size={18} className="group-hover:scale-110 transition-transform"/>}
          {isSaving ? "Synchronizing..." : "Save Changes"}
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Nav */}
        <nav className="w-full lg:w-72 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                activeTab === tab.id 
                ? "bg-white text-indigo-600 shadow-xl shadow-gray-200/50 scale-105" 
                : "text-gray-400 hover:bg-white/50"
              }`}
            >
              <div className="flex items-center gap-3">
                {tab.icon} {tab.label}
              </div>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeDot" 
                  className="w-1.5 h-1.5 bg-indigo-600 rounded-full"
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right Content */}
        <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-6 md:p-10 min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "profile" && <ProfileSettings />}
              {activeTab === "security" && <SecuritySettings />}
              {activeTab === "website" && (
                <WebsiteSettings 
                  maintenance={maintenance} 
                  setMaintenance={setMaintenance} 
                />
              )}
              {activeTab === "automation" && (
                <AutomationSettings 
                  notifications={notifications} 
                  setNotifications={setNotifications} 
                />
              )}
              {activeTab === "appearance" && <AppearanceSettings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const ProfileSettings = () => (
  <div className="space-y-8">
    <div className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-gray-50 rounded-3xl border border-gray-100">
      <div className="relative group cursor-pointer">
        <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl transition-transform group-hover:scale-95">R</div>
        <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <ImageIcon size={20} className="text-white"/>
        </div>
      </div>
      <div className="text-center sm:text-left">
        <h4 className="text-xl font-bold text-gray-900">Rajkumar Singh</h4>
        <p className="text-sm text-gray-500 font-medium">Master Admin • Senior Developer</p>
        <div className="flex gap-4 mt-3 justify-center sm:justify-start">
          <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:underline">Update Photo</button>
          <button className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline">Remove</button>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputBlock label="Display Name" defaultValue="Rajkumar Singh" />
      <InputBlock label="Admin Email" defaultValue="rajkumar@vertodigital.com" />
      <div className="md:col-span-2">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Professional Bio</label>
        <textarea 
          rows="4" 
          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all text-gray-700 font-medium" 
          defaultValue="Lead MERN stack developer at Verto Digital agency..."
        />
      </div>
    </div>
  </div>
);

const SecuritySettings = () => (
  <div className="space-y-8">
    <div className="p-6 bg-red-50 rounded-3xl border border-red-100 flex items-center gap-4">
      <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-200 shrink-0">
        <Lock size={20}/>
      </div>
      <div>
        <h4 className="font-bold text-red-900">High Security Zone</h4>
        <p className="text-xs text-red-700 leading-relaxed">Changing your password will log you out of all active devices across the Verto network.</p>
      </div>
    </div>
    <div className="space-y-4">
      <InputBlock label="Current Password" type="password" placeholder="••••••••••••" />
      <InputBlock label="New Secure Password" type="password" placeholder="Min 12 characters" />
      <InputBlock label="Confirm New Password" type="password" placeholder="Repeat password" />
    </div>
  </div>
);

const WebsiteSettings = ({ maintenance, setMaintenance }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between p-6 bg-gray-900 rounded-3xl text-white">
        <div>
            <h4 className="font-bold text-lg">Maintenance Mode</h4>
            <p className="text-xs text-gray-400 mt-1">Directs traffic to a "Down for Maintenance" splash screen.</p>
        </div>
        <Switch active={maintenance} onToggle={() => setMaintenance(!maintenance)} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <InputBlock label="Site Title" defaultValue="Verto Digital | MERN Agency" />
       <InputBlock label="Primary SEO Tagline" defaultValue="Building the Future of Web" />
       <div className="md:col-span-2">
         <InputBlock label="Global Footer Copyright" defaultValue="© 2026 Verto Digital. All rights reserved." />
       </div>
    </div>
  </div>
);

const AutomationSettings = ({ notifications, setNotifications }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg"><Bell size={18}/></div>
            <div>
                <h4 className="font-bold text-indigo-900">Email Alerts</h4>
                <p className="text-xs text-indigo-700">Instant lead notifications via Nodemailer integration.</p>
            </div>
        </div>
        <Switch active={notifications} onToggle={() => setNotifications(!notifications)} />
    </div>
    <div className="space-y-4">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Auto-Reply Template</label>
        <textarea 
          rows="6" 
          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm leading-relaxed outline-none focus:bg-white focus:ring-2 focus:ring-indigo-50 transition-all font-medium text-gray-700" 
          defaultValue="Hi there! Thanks for reaching out to Verto Digital. We've received your inquiry and our experts will review it shortly. Expect a response within 24 hours."
        />
    </div>
  </div>
);

const AppearanceSettings = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-8 bg-gray-50 border-2 border-indigo-200 rounded-3xl text-center relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-indigo-600 w-2 h-2 rounded-full animate-ping"/>
              <Monitor size={32} className="mx-auto mb-3 text-indigo-600"/>
              <p className="font-bold text-gray-900">Clean White</p>
              <button className="mt-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest">Currently Active</button>
          </div>
          <div className="p-8 bg-gray-900 border border-gray-800 rounded-3xl text-center text-white opacity-60 grayscale-[0.5] hover:grayscale-0 transition-all cursor-not-allowed group">
              <Monitor size={32} className="mx-auto mb-3 text-gray-700 group-hover:text-gray-500 transition-colors"/>
              <p className="font-bold">Midnight Dark</p>
              <button className="mt-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">Coming Soon</button>
          </div>
      </div>
    </div>
);

/* --- HELPER UI COMPONENTS --- */

const InputBlock = ({ label, defaultValue, type="text", placeholder }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      defaultValue={defaultValue} 
      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all font-semibold text-gray-800" 
    />
  </div>
);

const Switch = ({ active, onToggle }) => (
  <button 
    onClick={onToggle}
    className={`w-14 h-8 rounded-full relative transition-colors duration-500 shadow-inner ${active ? "bg-emerald-500" : "bg-gray-700"}`}
  >
    <motion.div 
      animate={{ x: active ? 28 : 4 }}
      initial={false}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-lg"
    />
  </button>
);

export default SettingsView;