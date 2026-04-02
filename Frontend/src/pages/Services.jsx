import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { LuArrowUpRight } from "react-icons/lu";
import Herolayout from "../components/herolayout/Herolayout";
import { getIconComponent } from "../utils/iconMapper";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Services = ({ showHero = false }) => {
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const heroInfo = {
    title: "Our Specialized Services",
    subtitle: "We deliver excellence through technology and creative design."
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services');
        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        setServicesData(data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Could not load services at this time.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showHero && <Herolayout title={heroInfo.title} subtitle={heroInfo.subtitle} />}

      <section className="relative bg-[#0b0d0f] py-24 px-6 overflow-hidden">
        {/* Background Design Elements (Unchanged) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            World Class Expertise
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8"
          >
            SOLUTIONS THAT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">
              SCALE WITH YOU.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light"
          >
            Innovative strategies tailored to your business needs. We combine technical precision with creative problem-solving to drive real growth.
          </motion.p>
        </div>

        {loading && <div className="text-center text-emerald-500 text-xl font-bold relative z-10 animate-pulse">Loading Services...</div>}
        {error && <div className="text-center text-red-500 text-xl font-bold relative z-10">{error}</div>}

        {!loading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {servicesData.map((service) => (
              <motion.div
                key={service._id || service.id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="group relative bg-[#121619] rounded-3xl p-1 border border-white/5 active:border-emerald-500/50 lg:hover:border-emerald-500/50 transition-colors duration-500"
              >
                <div className="bg-[#121619] rounded-[22px] h-full p-8 md:p-10 flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-10 active:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#0b0d0f] border border-white/10 flex items-center justify-center text-3xl text-gray-400 active:text-emerald-400 active:border-emerald-500/30 lg:group-hover:text-emerald-400 lg:group-hover:border-emerald-500/30 lg:group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-500">
                      {getIconComponent(service.icon)}
                    </div>
                    <span className="text-5xl font-black text-white/5 lg:group-hover:text-white/10 transition-colors duration-500 select-none">
                      {service.serviceId || "00"}
                    </span>
                  </div>

                  <div className="relative z-10 flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-4 active:text-emerald-400 lg:group-hover:text-emerald-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    {/* UPDATED LOGIC: Description limited to 100 characters */}
                    <p className="text-gray-400 text-base leading-relaxed mb-8 border-l-2 border-white/5 pl-4 active:border-emerald-500/50 lg:group-hover:border-emerald-500/50 transition-colors duration-500">
                      {service.description.length > 100 
                        ? `${service.description.substring(0, 100)}...` 
                        : service.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-auto pt-6 border-t border-white/5 active:border-emerald-500/20 lg:group-hover:border-emerald-500/20 transition-colors duration-500">
                    <Link
                      to={`/service/${service.slug}`}
                      onClick={handleScrollTop}
                      className="flex items-center justify-between text-sm font-bold text-white active:text-emerald-400 lg:group-hover:text-emerald-400 transition-colors"
                    >
                      EXPLORE SERVICE
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center active:bg-emerald-500 active:text-black lg:group-hover:bg-emerald-500 lg:group-hover:text-black transition-all duration-300">
                        <LuArrowUpRight className="transform active:rotate-45 lg:group-hover:rotate-45 transition-transform duration-300" />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom CTA (Unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-32 w-full flex justify-center"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 p-2 md:pr-10 rounded-3xl md:rounded-full bg-[#121619] border border-white/10 shadow-2xl max-w-[90%] md:max-w-max mx-auto">
            <div className="bg-emerald-500 text-black font-bold px-8 py-4 rounded-2xl md:rounded-full w-full md:w-auto text-center shrink-0">
              READY TO START?
            </div>
            <p className="text-gray-300 font-medium text-center md:text-left px-2 md:px-0">
              Let's build something extraordinary together.
            </p>
            <Link
              to="/contact"
              onClick={handleScrollTop}
              className="flex items-center gap-2 text-white font-bold hover:text-emerald-400 transition-colors group pb-4 md:pb-0"
            >
              Contact Us <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

      </section>
    </>
  );
};

export default Services;