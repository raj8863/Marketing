import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

// Views & Components
import { QuoteView } from "../pages/QuoteView";
import { ContactView } from "../pages/ContactView";
import { ProjectListView } from "../pages/ProjectListView";
import ProjectForm from "../pages/ProjectForm";
import AuditDashboard from "../pages/AuditDashboard";
import ServicesView from "../components/Services/ServicesView";
import ServiceForm from "../components/Services/ServiceForm";
import BlogView from "../components/Blogs/BlogView";
import BlogForm from "../components/Blogs/BlogForm";
import Profile from "../pages/Profile";
import TeamForm from "../components/Team/TeamForm";
import TeamView from "../components/Team/TeamView";
import PricingManager from "../pages/PricingManager";
import { PricingForm } from "../pages/PricingForm";
import AdminPrivacy from "../pages/AdminPrivacy";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import DashboardView from "./DashboardView";
import FAQForm from "../components/FAQ/FAQForm";
import { LeadsTracker } from "../pages/LeadsTracker";
import MeetingList from "../pages/MeetingList";
const Dashboard = () => {
  const [activeView, setActiveView] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingData, setEditingData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // State to force refresh list views

  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Unified navigation handler
  const handleNavClick = (view, data = null) => {
    setEditingData(data);
    setActiveView(view);
    // Force refresh when coming back to a list view
    if (view.includes("View") || view.includes("Manager") || view === "Projects") {
      setRefreshKey(prev => prev + 1);
    }
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-700 selection:bg-emerald-100 overflow-hidden">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 z-30 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Component */}
      <Sidebar
        activeView={activeView}
        setActiveView={(view) => handleNavClick(view)}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onLogout={() => { logout(); navigate("/login"); }}
        setEditingData={setEditingData}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header Component */}
        <TopHeader
          user={user}
          logout={logout}
          onOpenMenu={() => setIsSidebarOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveView={setActiveView}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-10 bg-[#f8fafc] custom-scrollbar scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView + refreshKey} // Key change triggers re-mount for fresh data
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Dashboard Home */}
                {activeView === "Dashboard" && <DashboardView />}

                {/* Team Management - FIXED LOGIC */}
                {activeView === "TeamView" && (
                  <TeamView onEdit={(member) => handleNavClick("TeamForm", member)} />
                )}
                {activeView === "TeamForm" && (
                  <TeamForm
                    selected={editingData}
                    onSuccess={() => handleNavClick("TeamView")}
                    onCancel={() => handleNavClick("TeamView")}
                  />
                )}

                {/* Blogs Section */}
                {activeView === "Blog" && <BlogView initialMode="list" searchQuery={searchQuery} />}
                {activeView === "Add Blog" && (
                  <BlogForm onSave={() => handleNavClick("Blog")} onCancel={() => handleNavClick("Blog")} />
                )}

                {/* Services Section */}
                {activeView === "Services" && <ServicesView initialMode="list" searchQuery={searchQuery} />}
                {activeView === "Add Service" && (
                  <ServiceForm onSave={() => handleNavClick("Services")} onCancel={() => handleNavClick("Services")} />
                )}

                {/* Projects Section */}
                {activeView === "Projects" && <ProjectListView searchQuery={searchQuery} />}
                {activeView === "Add Project" && (
                  <ProjectForm onSave={() => handleNavClick("Projects")} onCancel={() => handleNavClick("Projects")} />
                )}

                {/* Other Views */}
                {activeView === "Quote" && <QuoteView searchQuery={searchQuery} />}
                {activeView === "ContactMessages" && <ContactView searchQuery={searchQuery} />}
                {activeView === "AuditDashboard" && <AuditDashboard />}
                {activeView === "Profile" && <Profile />}
                {activeView === "Privacy" && <AdminPrivacy />}

                {/* --- PRICING & LEADS --- */}
                {activeView === "PricingManager" && (
                  <PricingManager onEdit={(plan) => handleNavClick("PricingForm", plan)} />
                )}
                {activeView === "PricingForm" && (
                  <PricingForm
                    selected={editingData}
                    onSuccess={() => handleNavClick("PricingManager")}
                    onCancel={() => handleNavClick("PricingManager")}
                  />
                )}
                {activeView === "LeadsTracker" && <LeadsTracker />}

                {activeView === "Meetings" && <MeetingList />}


                {/* FAQ Section */}
                {activeView === "FAQForm" && (
                  <FAQForm
                    selected={editingData}
                    onSuccess={() => handleNavClick("Dashboard")} // Replace with proper FAQ view if available
                    onCancel={() => handleNavClick("Dashboard")}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;