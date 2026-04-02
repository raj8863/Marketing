import React, { useState, useRef, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaThLarge, FaArrowRight } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa6";
import { LuArrowUpRight } from "react-icons/lu";
import Herolayout from "../../components/herolayout/Herolayout";

const ProjectShowcase = ({ showHero = true }) => {
  const [mode, setMode] = useState("discover");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH ALL PROJECTS FROM BACKEND
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('https://marketing-b3je.onrender.com/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="bg-[#050505] min-h-screen flex items-center justify-center text-emerald-500">Loading Portfolio...</div>;

  return (
    <>
      {showHero && (
        <Herolayout
          title="Selected Works"
          subtitle="A curated gallery of our most impactful digital masterpieces."
          bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
        />
      )}

      <section className="bg-[#050505] min-h-screen py-24 text-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
               <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                 Latest <span className="text-emerald-500">Works</span>
               </h2>
               <p className="text-gray-400 max-w-md">Explore our portfolio in detail. {projects.length} projects live.</p>
            </div>

            <div className="relative p-1 bg-[#121619] border border-white/10 rounded-full flex">
              <motion.div
                className="absolute top-1 bottom-1 w-1/2 bg-[#2a2a2a] rounded-full shadow-lg"
                animate={{ x: mode === "grid" ? "0%" : "100%" }}
              />
              <button onClick={() => setMode("grid")} className={`relative z-10 px-6 py-3 text-xs font-bold uppercase transition-colors ${mode === 'grid' ? 'text-white' : 'text-gray-400'}`}>Grid</button>
              <button onClick={() => setMode("discover")} className={`relative z-10 px-6 py-3 text-xs font-bold uppercase transition-colors ${mode === 'discover' ? 'text-white' : 'text-gray-400'}`}>Discover</button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {mode === "discover" ? (
              <motion.div key="discover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-32 pb-20">
                {projects.map((project, index) => <DiscoverCard key={project._id} project={project} index={index} />)}
              </motion.div>
            ) : (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, i) => <GridCard key={project._id} project={project} i={i} />)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

// --- SUB-COMPONENTS ---
const DiscoverCard = ({ project, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <motion.div ref={ref} className="group relative w-full max-w-5xl mx-auto">
      <Link to={`/project/${project.slug}`} className="block relative aspect-[4/5] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#121619]">
        <motion.img style={{ y }} src={project.mainImage} className="w-full h-[120%] object-cover absolute top-[-10%] brightness-75 group-hover:brightness-100 transition-all duration-700" />
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between z-20">
          <span className="text-6xl md:text-8xl font-black text-white/10">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <span className="inline-block mb-4 px-4 py-1.5 text-xs font-bold uppercase bg-emerald-500 text-black rounded">{project.category}</span>
            <h3 className="text-4xl md:text-6xl font-black text-white">{project.title}</h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const GridCard = ({ project, i }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 group bg-[#121619]">
    <Link to={`/project/${project.slug}`} className="block w-full h-full">
      <img src={project.mainImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 p-8 flex flex-col justify-end">
        <span className="text-xs font-bold uppercase text-emerald-400 mb-2">{project.category}</span>
        <h3 className="text-2xl font-black text-white">{project.title}</h3>
      </div>
    </Link>
  </motion.div>
);

export default ProjectShowcase;
