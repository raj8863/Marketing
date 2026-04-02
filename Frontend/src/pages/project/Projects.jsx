import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaFilter, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import Herolayout from "../../components/herolayout/Herolayout";

const categories = ["All", "UI/UX", "Web Design", "Developing", "Graphic Design"];

const Projects = ({ showHero = true }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH PROJECTS FROM BACKEND ---
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects");
        const data = await response.json();
        setProjectsData(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  if (loading) {
    return (
      <div className="bg-[#0b0d0f] min-h-screen flex flex-col items-center justify-center text-emerald-500">
        <FaSpinner className="animate-spin text-4xl mb-4" />
        <p className="font-bold tracking-widest uppercase text-sm">Loading Portfolio...</p>
      </div>
    );
  }

  return (
    <>
      {showHero && (
        <Herolayout
          title="Our Portfolio"
          subtitle="A curated selection of our finest work, delivering impact through design and code."
          bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
        />
      )}

      {/* Main Section */}
      <section className={`relative bg-[#0b0d0f] px-6 overflow-hidden min-h-screen ${showHero ? "py-20 lg:py-32" : "py-16 lg:py-24"}`}>
{/* --- BACKGROUND FX --- */}
      {/* Noise Texture */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Tech Grid - Updated to match the dark theme audit style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
       
        <div className="max-w-7xl mx-auto relative z-10">

          {/* HEADER & FILTERS */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-8">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">
                <FaFilter /> Selected Works
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white">Latest Cases</h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-3 p-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 z-10 ${activeCategory === cat ? "text-black" : "text-gray-400 hover:text-white"
                    }`}
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-emerald-400 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* PROJECTS GRID */}
          <motion.div
            layout
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative rounded-[2rem] overflow-hidden bg-[#161b1e] border border-white/5 hover:border-emerald-500/30 transition-colors"
                >
                  {/* Wrap content in Link to Case Study */}
                  <Link to={`/project/${project.slug}`}>
                    {/* Image Container */}
                    <div className="relative h-[350px] overflow-hidden">
                      <img
                        src={project.mainImage} // Using mainImage from your backend
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Dark Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Floating Badge */}
                      <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-xs font-bold text-white uppercase tracking-wider">
                        {project.category}
                      </div>
                    </div>

                    {/* Content Reveal Card */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-[#0b0d0f]/90 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-emerald-400 text-xs font-bold uppercase mb-1">{project.client || "Client Project"}</p>
                            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                              {project.title}
                            </h3>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                            <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No projects found in this category.</p>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default Projects;