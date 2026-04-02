import React, { useState, useEffect } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { FaChevronDown, FaBars, FaXmark, FaArrowRight, FaCalendarCheck } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import QuoteModal from "../../pages/QuoteModel";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  
  const location = useLocation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://marketing-b3je.onrender.com/api/services');
        const data = await response.json();
        setServices(data);
      } catch (err) {
        console.error("Navbar fetch error:", err);
      }
    };
    fetchServices();
  }, []);

  const handleScheduleScroll = () => {
    setIsOpen(false); 
    const section = document.getElementById("partner-booking-hub");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/meeting";
    }
  };

  const NAV_ITEMS = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {
      name: "Services",
      path: "/services",
      submenu: services.map(s => ({ name: s.title, path: `/service/${s.slug}` }))
    },
    {
      name: "Projects",
      path: "/projects",
      submenu: [{ name: "Project Gallery", path: "/projects" }]
    },
    {
      name: "Pages",
      path: "#",
      submenu: [
        { name: "Our Team", path: "/team" },
        { name: "Pricing Plan", path: "/pricing" },
        { name: "F.A.Qs", path: "/faqs" },
        { name: "Privacy Protocol", path: "/privacy-policy" },
      ]
    },
    {
      name: "Blog",
      path: "/blog",
      submenu: [
        { name: "Standard Blog", path: "/blog" },
        { name: "Technical Insights", path: "/blog-details" },
      ]
    },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync Mobile Menu State
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled ? "bg-[#0b0d0f]/90 backdrop-blur-xl py-3 border-white/5 shadow-2xl" : "bg-transparent py-6 border-transparent"
        }`}
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 md:px-12">
          <NavLink to="/" className="z-[60] relative group">
            <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white ">
              Verto<span className="text-emerald-500"> Digital</span>
            </h1>
          </NavLink>

          {/* DESKTOP MENU */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.name}
                className="relative group h-full py-2"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center gap-1.5 cursor-pointer">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-[10px] xl:text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                        isActive && item.path !== "#" ? "text-emerald-400" : "text-gray-400 group-hover:text-white"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                  {item.submenu?.length > 0 && <FaChevronDown className="text-[9px] text-gray-600 transition-transform group-hover:rotate-180" />}
                </div>

                <AnimatePresence>
                  {item.submenu?.length > 0 && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-56 bg-[#0b0d0f] border border-white/10 rounded-2xl shadow-2xl p-2"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1.5 w-3 h-3 bg-[#0b0d0f] border-t border-l border-white/10 rotate-45" />
                      {item.submenu.map((sub) => (
                        <NavLink
                          key={sub.name}
                          to={sub.path}
                          className="px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-white hover:bg-white/5 flex justify-between items-center group/sub"
                        >
                          {sub.name}
                          <FaArrowRight className="text-[10px] text-emerald-500 opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all" />
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={handleScheduleScroll}
              className="hidden xl:flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-300 hover:bg-white hover:text-black transition-all"
            >
              <FaCalendarCheck className="text-emerald-400" /> Book Meet
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all group"
            >
              Get Quote
              <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform text-xs" />
            </button>

            {/* MOBILE HAMBURGER BUTTON */}
            <button
              className="lg:hidden text-white z-[70] w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 relative"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </nav>

        {/* MOBILE OVERLAY MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-[#050709] z-[65] lg:hidden flex flex-col"
            >
              <div className="flex-1 overflow-y-auto px-8 pt-28 pb-10">
                <div className="flex flex-col gap-2">
                  {NAV_ITEMS.map((item) => (
                    <div key={item.name} className="border-b border-white/5 last:border-0">
                      <div className="flex items-center justify-between py-5">
                        <NavLink
                          to={item.path === "#" ? "" : item.path}
                          onClick={(e) => {
                            if(item.submenu) {
                                e.preventDefault();
                                setActiveDropdown(activeDropdown === item.name ? null : item.name);
                            } else {
                                setIsOpen(false);
                            }
                          }}
                          className={({ isActive }) =>
                            `text-2xl font-black uppercase tracking-tighter ${isActive && item.path !== "#" ? "text-emerald-500" : "text-white"}`
                          }
                        >
                          {item.name}
                        </NavLink>
                        {item.submenu?.length > 0 && (
                          <button 
                            onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                            className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10"
                          >
                            <FaChevronDown className={`text-xs transition-transform duration-300 ${activeDropdown === item.name ? "rotate-180 text-emerald-500" : "text-gray-400"}`} />
                          </button>
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {item.submenu?.length > 0 && activeDropdown === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-5 pb-6 pl-4 border-l border-emerald-500/20 ml-1">
                              {item.submenu.map((sub) => (
                                <NavLink
                                  key={sub.name}
                                  to={sub.path}
                                  onClick={() => setIsOpen(false)}
                                  className="text-[13px] font-bold uppercase tracking-widest text-white/50 active:text-emerald-400"
                                >
                                  {sub.name}
                                </NavLink>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="mt-12 space-y-4">
                  <button 
                    onClick={handleScheduleScroll}
                    className="w-full py-5 rounded-2xl bg-white text-black text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3"
                  >
                    <FaCalendarCheck /> Book A Meeting
                  </button>
                  <button 
                    onClick={() => { setIsModalOpen(true); setIsOpen(false); }}
                    className="w-full py-5 rounded-2xl bg-emerald-500 text-black text-[11px] font-black uppercase tracking-widest"
                  >
                    Get A Digital Quote
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        servicesList={services.map(s => s.title)}
      />
    </>
  );
};

export default Navbar;
