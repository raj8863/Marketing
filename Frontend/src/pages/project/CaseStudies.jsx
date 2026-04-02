import React, { useRef, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowRight, FaCircleCheck, FaLayerGroup, FaBolt, FaMobileScreen, FaCode, FaChartLine, FaQuoteLeft } from "react-icons/fa6";
import { motion, useScroll, useSpring } from 'framer-motion';
import Herolayout from '../../components/herolayout/Herolayout';

// --- ICON MAPPER ---
const iconMap = {
  FaChartLine: <FaChartLine />,
  FaBolt: <FaBolt />,
  FaCircleCheck: <FaCircleCheck />,
  FaMobileScreen: <FaMobileScreen />,
  FaCode: <FaCode />
};

const CaseStudies = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`https://marketing-b3je.onrender.com/api/projects/slug/${slug}`);
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-white">Loading Case Study...</div>;
  if (!project) return <div className="h-screen bg-black flex items-center justify-center text-white text-center">Project Not Found <br/><Link to="/projects" className="text-emerald-500 underline">Back to Portfolio</Link></div>;

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-emerald-500 origin-left z-50" style={{ scaleX }} />

      <Herolayout title={project.title} subtitle={project.subtitle} bgImage={project.mainImage} />

      {/* Floating Info Grid */}
      <div className="relative z-20 -mt-20 max-w-7xl mx-auto px-6">
        <div className="bg-[#0b0d0f] rounded-3xl p-10 shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-10 text-white border border-white/5">
          {[
            { label: "Client", value: project.client },
            { label: "Timeline", value: project.timeline },
            { label: "Role", value: project.role },
            { label: "Website", value: "Live Link", isLink: true }
          ].map((item, i) => (
            <div key={i} className="border-l border-white/10 pl-6">
              <span className="text-emerald-500 text-xs font-bold uppercase mb-2 block">{item.label}</span>
              <span className="text-lg font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32 space-y-32">
        {/* Main Image */}
        <div className="rounded-[3rem] overflow-hidden shadow-2xl">
          <img src={project.mainImage} alt={project.title} className="w-full object-cover min-h-[500px]" />
        </div>

        {/* Challenge Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky top-32">
            <h2 className="text-4xl font-black mb-8 leading-tight">The <span className="text-emerald-500">Challenge</span></h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">{project.challengeText}</p>
            <div className="space-y-4">
              {project.challengePoints?.map((point, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-emerald-500 mt-1"><FaCircleCheck /></div>
                  <span className="text-gray-700 font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <img src={project.secondaryImage || project.mainImage} className="rounded-[2.5rem] shadow-xl w-full" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-[#0b0d0f] -mx-6 p-12 md:p-24 rounded-[3rem] grid grid-cols-1 md:grid-cols-3 gap-8">
          {project.stats?.map((stat, i) => (
            <div key={i} className="p-8 bg-[#111] border border-white/10 rounded-3xl">
              <div className="text-3xl text-emerald-400 mb-4">{iconMap[stat.iconType] || <FaBolt />}</div>
              <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-xs font-bold uppercase">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Solution Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center bg-slate-50 p-12 rounded-[3rem]">
          <div className="relative">
            <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-emerald-100 rounded-[3rem] -z-10" />
            <img src={project.mobileMockup || project.mainImage} className="rounded-[2rem] shadow-2xl border-[8px] border-white" />
          </div>
          <div>
            <h2 className="text-4xl font-black mb-8">The <span className="text-emerald-500">Solution</span></h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">{project.solutionText}</p>
            <div className="flex flex-wrap gap-3">
              {project.techStack?.map((tech) => (
                <span key={tech} className="px-5 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-bold shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Next Project Footer */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-[#0b0d0f] rounded-[3rem] p-24 text-center">
          <p className="text-emerald-400 font-bold mb-6">Ready for more?</p>
          <h2 className="text-5xl font-black text-white mb-10">Let's Build Your Vision</h2>
          <Link to="/projects" className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black rounded-full font-bold hover:bg-emerald-500 hover:text-white transition-all">
            Browse All Projects <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
