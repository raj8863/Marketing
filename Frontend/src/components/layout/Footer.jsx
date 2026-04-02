import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
  FaHeadset
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [dynamicServices, setDynamicServices] = useState([]);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('https://marketing-b3je.onrender.com/api/services');
        const data = await response.json();
        setDynamicServices(data.slice(0, 6));
      } catch (err) {
        console.error("Footer sync error:", err);
      }
    };
    fetchFooterData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- REUSABLE HOVER CLASS FOR ALL LINKS ---
  const linkHoverClass = "flex items-center gap-2 text-gray-400 hover:text-emerald-400 hover:pl-2 transition-all duration-300 group";
  const iconSpan = <span className="w-0 h-[1px] bg-emerald-500 group-hover:w-3 transition-all duration-300"></span>;

  return (
    <footer className="bg-[#050709] text-gray-400 font-sans border-t border-white/5 relative overflow-hidden">
      
      {/* --- BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none"></div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid gap-16 md:grid-cols-2 lg:grid-cols-4 relative z-10">

        {/* 1. BRAND IDENTITY */}
        <div className="space-y-8">
          <Link to="/" onClick={scrollToTop} className="inline-block">
            <h2 className="text-4xl font-black text-white tracking-tighter hover:tracking-normal transition-all duration-500 ">
              Verto<span className="text-emerald-500"> Digital</span>
            </h2>
          </Link>
          <p className="text-sm leading-relaxed opacity-60 font-medium max-w-xs">
            Architecting high-performance digital ecosystems. We transform complex engineering challenges into seamless enterprise experiences.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: FaLinkedinIn, link: "#" },
              { Icon: FaInstagram, link: "#" },
              { Icon: FaTwitter, link: "#" },
              { Icon: FaWhatsapp, link: "#" }
            ].map((social, i) => (
              <motion.a 
                whileHover={{ y: -5, backgroundColor: "#10b981", color: "#000" }}
                key={i} 
                href={social.link} 
                className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-500 border border-white/5"
              >
                <social.Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* 2. DYNAMIC EXPERTISE (Synchronized Hovers) */}
        <div>
          <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-emerald-500"></span> Expertise
          </h3>
          <ul className="space-y-5 text-sm font-medium">
            {dynamicServices.length > 0 ? (
              dynamicServices.map((service) => (
                <li key={service._id}>
                  <Link to={`/service/${service.slug}`} onClick={scrollToTop} className={linkHoverClass}>
                    {iconSpan} {service.title}
                  </Link>
                </li>
              ))
            ) : (
              [1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 w-40 bg-white/5 animate-pulse rounded-lg mb-4"></div>)
            )}
          </ul>
        </div>

        {/* 3. PLATFORM NAVIGATION (Synchronized Hovers) */}
        <div>
          <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-emerald-500"></span> Platform
          </h3>
          <ul className="space-y-5 text-sm font-medium">
            {[
              { name: "About Agency", link: "/about" },
              { name: "Digital Portfolio", link: "/projects" },
              { name: "Global Services", link: "/services" },
              { name: "Contact Node", link: "/contact" },
              { name: "Privacy Protocol", link: "/privacy-policy" },
            ].map((item, index) => (
              <li key={index}>
                <Link to={item.link} onClick={scrollToTop} className={linkHoverClass}>
                  {iconSpan} {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. MATRIX CONNECT (Enhanced Contact) */}
        <div>
          <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-emerald-500"></span> Connect
          </h3>
          <div className="space-y-8">
            <a href="tel:+918863907523" className="flex gap-5 items-start group transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 shrink-0 border border-white/5 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                <FaPhoneAlt size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Direct Line</span>
                <span className="text-white font-bold group-hover:text-emerald-400 transition-colors">+91 88639 07523</span>
              </div>
            </a>

            <a href="mailto:infodecent11@gmail.com" className="flex gap-5 items-start group transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 shrink-0 border border-white/5 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                <FaEnvelope size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Official Node</span>
                <span className="text-white font-bold group-hover:text-emerald-400 transition-colors break-all">infodecent11@gmail.com</span>
              </div>
            </a>

            <div className="flex gap-5 items-start group">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 shrink-0 border border-white/5 group-hover:border-emerald-500 transition-all duration-500">
                <FaMapMarkerAlt size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Headquarters</span>
                <span className="text-gray-200 text-xs font-bold">Gurgaon, Haryana, IN</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOOTER BOTTOM BAR --- */}
      <div className="border-t border-white/5 bg-black/40 py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-12">
             <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70">System Status: Operational</span>
             </div>
             <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30">
              © {currentYear} Decent11 Innovation Pvt Ltd.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex gap-6 text-[9px] font-black uppercase tracking-[0.3em]">
              <Link to="/terms" onClick={scrollToTop} className="hover:text-emerald-400 transition-colors opacity-40 hover:opacity-100">Terms</Link>
              <Link to="/contact" onClick={scrollToTop} className="hover:text-emerald-400 transition-colors opacity-40 hover:opacity-100">Support</Link>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: "#10b981", color: "#000" }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="w-12 h-12 bg-white/5 text-white rounded-full flex items-center justify-center transition-all border border-white/5 shadow-lg"
            >
              <FaArrowUp size={14} />
            </motion.button>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
