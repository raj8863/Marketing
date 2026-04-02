import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, X, LayoutDashboard, BookOpen, Layers, Zap, Info, CheckCircle, Briefcase, Star, Video, Mic, Users, UserPlus, CreditCard, HelpCircle, ShieldCheck, LogOut, ChevronRight } from "lucide-react";
import { FiCalendar } from "react-icons/fi";
const SidebarItem = ({ icon, label, isActive, onClick, dropdown, items = [], onSubItemClick }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-1">
      <button
        onClick={() => dropdown ? setOpen(!open) : onClick && onClick()}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group
        ${isActive ? "bg-slate-900 text-white shadow-xl shadow-slate-200 font-bold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
      >
        <div className="flex items-center gap-4">
          <span className={isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-900"}>{icon}</span>
          <span className="text-[13px] font-bold tracking-tight">{label}</span>
        </div>
        {dropdown && <ChevronRight size={16} className={`transition-transform ${open ? "rotate-90 text-emerald-400" : "text-slate-300"}`} />}
      </button>
      <AnimatePresence>
        {dropdown && open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="mt-2 ml-10 space-y-1 border-l-2 border-slate-100 pl-4">
              {items.map((item, i) => (
                <button key={i} onClick={() => onSubItemClick(item)} className="w-full text-left py-2 text-[12px] font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Sidebar = ({ activeView, setActiveView, isOpen, setIsOpen, onLogout, setEditingData }) => {
  const handleNavClick = (view) => {
    setActiveView(view);
    if (window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 flex flex-col shadow-2xl transition-transform duration-500 md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="p-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-tr from-indigo-600 to-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-200 rotate-3">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tighter italic uppercase">Verto_<span className="text-emerald-500">Node</span></h1>
        </div>
        <button className="md:hidden p-2 text-slate-400" onClick={() => setIsOpen(false)}><X size={24} /></button>
      </div>
      <nav className="flex-1 px-6 space-y-1.5 overflow-y-auto py-4 custom-scrollbar">
        <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" isActive={activeView === "Dashboard"} onClick={() => handleNavClick("Dashboard")} />
        <SidebarItem icon={<BookOpen size={20} />} label="Blog Engine" dropdown items={["All Blog", "Add Blog"]} isActive={activeView.includes("Blog")} onSubItemClick={(item) => handleNavClick(item === "Add Blog" ? "Add Blog" : "Blog")} />
        <div className="my-6 border-t border-slate-100"></div>
        <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Site Architecture</div>
        <SidebarItem icon={<Layers size={20} />} label="Taxonomy" isActive={activeView.includes("Taxonomy")} dropdown items={["Categories", "Tags", "Attributes"]} onSubItemClick={(item) => handleNavClick(item.replace(" ", ""))} />
        <SidebarItem
          icon={<FiCalendar size={20} />}
          label="Meetings"
          isActive={activeView === "Meetings"}
          onClick={() => handleNavClick("Meetings")}
        />
        <SidebarItem icon={<Zap size={20} />} label="Hero Section" isActive={activeView === "Hero"} onClick={() => handleNavClick("Hero")} />
        <SidebarItem icon={<Info size={20} />} label="About Studio" isActive={activeView === "About"} onClick={() => handleNavClick("About")} />
        <SidebarItem icon={<CheckCircle size={20} />} label="Project Hub" isActive={activeView.includes("Project")} dropdown items={["All Projects", "Add Project"]} onSubItemClick={(item) => handleNavClick(item === "Add Project" ? "Add Project" : "Projects")} />
        <SidebarItem icon={<Briefcase size={20} />} label="Services Registry" isActive={activeView.includes("Service")} dropdown items={["All Services", "Add Services"]} onSubItemClick={(item) => handleNavClick(item === "Add Services" ? "Add Service" : "Services")} />
        <div className="my-6 border-t border-slate-100"></div>
        <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Media Assets</div>
        <SidebarItem icon={<Star size={20} />} label="Review Portal" isActive={activeView === "Review"} onClick={() => handleNavClick("Review")} />
        <SidebarItem icon={<Video size={20} />} label="Video Library" isActive={activeView === "Video"} onClick={() => handleNavClick("Video")} />
        <SidebarItem icon={<Mic size={20} />} label="Audio Engine" isActive={activeView === "Audio"} onClick={() => handleNavClick("Audio")} />
        <div className="my-6 border-t border-slate-100"></div>
        <SidebarItem icon={<Users size={20} />} label="Identity Clients" isActive={["ContactMessages", "Clients", "AuditDashboard"].includes(activeView)} dropdown items={["Contact details", "Feedback", "AuditDashboard"]} onSubItemClick={(item) => { if (item === "Contact details") handleNavClick("ContactMessages"); else if (item === "AuditDashboard") handleNavClick("AuditDashboard"); else handleNavClick("Clients"); }} />
        <SidebarItem icon={<UserPlus size={20} />} label="Team Management" isActive={activeView.includes("Team")} dropdown items={["Our Team", "Add Member"]} onSubItemClick={(item) => { if (item === "Our Team") handleNavClick("TeamView"); else if (item === "Add Member") handleNavClick("TeamForm"); }} />
        {/* Pricing Hub - Updated to include Leads */}
        <SidebarItem
          icon={<CreditCard size={20} />}
          label="Pricing Hub"
          isActive={activeView.includes("Pricing") || activeView === "LeadsTracker"}
          dropdown
          items={["Plan Registry", "Create Plan", "Enquiry Leads"]} // Added Enquiry Leads
          onSubItemClick={(item) => {
            if (item === "Plan Registry") handleNavClick("PricingManager");
            if (item === "Create Plan") { setEditingData(null); handleNavClick("PricingForm"); }
            if (item === "Enquiry Leads") handleNavClick("LeadsTracker"); // New View
          }}
        />


        <div className="my-6 border-t border-slate-100"></div>
        <SidebarItem
          icon={<HelpCircle size={20} />}
          label="FAQ Engine"
          isActive={activeView.includes("FAQ")}
          dropdown
          items={["Add FAQ"]}
          onSubItemClick={(item) =>
            handleNavClick(item === "Add FAQ" ? "FAQForm" : "FAQ")
          }
        />
        <SidebarItem icon={<ShieldCheck size={20} />} label="Privacy Policy" isActive={activeView === "Privacy"} onClick={() => handleNavClick("Privacy")} />
      </nav>
      <div className="p-6 mt-auto border-t border-slate-100">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3.5 text-rose-500 hover:bg-rose-50 rounded-[1.5rem] transition-all text-sm font-black uppercase tracking-widest">
          <LogOut size={20} /> Kill_Session
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;