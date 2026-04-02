import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPlay, FaTimes, FaShieldAlt, FaTools, FaTerminal, FaRocket, 
  FaGlobe, FaChartLine, FaFingerprint, FaSearchPlus, FaCode, FaMicrochip,
  FaServer, FaMobileAlt, FaBolt, FaLink, FaEdit
} from "react-icons/fa";
import Herolayout from "../components/herolayout/Herolayout";

/* --- 1. IMAGE LOGO DATA --- */
const PARTNER_LOGOS = [
  { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "AWS", url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Meta", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Stripe", url: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
  { name: "Hubspot", url: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg" },
  { name: "Shopify", url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" },
];

/* --- 2. DENSE CONTENT ARRAYS --- */
const SEO_CATEGORIES = [
  { 
    name: "Technical SEO", 
    icon: <FaCode />, 
    color: "text-emerald-500", 
    desc: "Technical SEO represents the invisible engine of your digital presence. At Verto Digital, we go beyond basic plugin configurations. Our engineering protocol involves deep-level server optimization and the elimination of crawl budget waste. We focus on the Critical Rendering Path to ensure that your Largest Contentful Paint (LCP) meets the gold standard of sub-1.2 seconds. This process includes sharding XML sitemaps for enterprise-level indexing, implementing complex canonical logic to prevent duplicate content dilution, and deploying advanced JSON-LD Schema Markup. By defining your business as a unique entity within Google's Knowledge Graph, we translate your services into a language the algorithm trusts. Our team also manages server-side response times (TTFB) across global Patna-node distributions, ensuring that bots prioritize your domain's architecture during every crawl cycle. This is high-integrity engineering designed to create a resilient, fast, and secure environment that search engines are algorithmically biased to reward with top-tier rankings." 
  },
  { 
    name: "On-Page SEO", 
    icon: <FaEdit />, 
    color: "text-emerald-500", 
    desc: "Our On-Page protocol is rooted in computational linguistics and semantic search intent. We move past the primitive era of keyword density and focus on Topic Modeling and LSI (Latent Semantic Indexing). By utilizing Natural Language Processing (NLP) strategies, we construct content clusters that signal absolute topical authority to search engines. Every page we engineer follows a strict hierarchical document structure, meticulously mapping H1-H4 headers to align with the way modern algorithms parse data. We optimize Internal Link Equity using high-performance silo structures, ensuring that authority flows seamlessly from your power pages to your primary conversion funnels. Furthermore, we apply the E-E-A-T framework—Experience, Expertise, Authoritativeness, and Trust—to every paragraph. This ensures your brand voice is not only engaging for human readers but also verifiable for search bots. By optimizing meta-assets for high CTR and aligning on-page elements with user search behavior, we turn your domain into a definitive industry resource." 
  },
  { 
    name: "Off-Page SEO", 
    icon: <FaLink />, 
    color: "text-emerald-500", 
    desc: "Off-Page dominance is the art of digital diplomacy and authority projection. We reject low-value directory tactics in favor of high-tier Entity Link Building. At Verto Digital, we acquire digital citations from High-DR (Domain Rating) platforms through data-driven storytelling and technical Digital PR. Our outreach is vetted through a rigorous 12-point technical check to ensure that every backlink is contextual, safe, and powerful. We treat your backlink profile as a digital fortress, providing 24/7 monitoring to mitigate negative SEO attacks and reclaim lost link equity through broken link reclamation. By securing high-quality guest mapping and strategic brand mentions, we establish a web of trust around your domain. This process involves identifying high-intent 'Skyscraper' opportunities that naturally attract organic citations from industry leaders. We don't just build links; we build a reputation that search engines cannot ignore, effectively forcing the algorithm to acknowledge your brand as the leading authority in your specific niche or regional market." 
  },
  { 
    name: "Local SEO", 
    icon: <FaGlobe />, 
    color: "text-emerald-500", 
    desc: "Local SEO is the battleground for regional relevance and proximity. For businesses looking to dominate markets like Patna and the wider Bihar region, we deploy Geo-Node targeting strategies. This protocol begins with complete optimization of your Google Business Profile (GBP), ensuring 100% NAP (Name, Address, Phone) consistency across the web's entire citation ecosystem. We engineer Local Map Pack dominance by building verified review funnels and generating contextual local citations that link your business to regional landmarks and entities. Our team builds dedicated Location Pages optimized for vernacular search patterns, capturing the growing segment of users searching in local dialects. We implement Geo-JSON microdata into your site's infrastructure to provide exact physical coordinates to search bots, reducing the 'distance-to-user' metric in the algorithm. By aligning your digital footprint with local search intent, we ensure your business is the primary choice when customers are ready to purchase in your area. This is hyper-local engineering at scale." 
  },
];

const PRE_SEO_PROTOCOLS = [
  { step: "1", name: "Infrastructure Audit", icon: <FaServer />, detail: "Before any campaign begins, we conduct a full-stack audit of your hosting and server logic. We analyze DNS latency, SSL handshake speeds, and HTTP/3 implementation. This ensures your foundation is leak-proof and ready to handle massive traffic surges without degrading performance. A stable infrastructure is the prerequisite for any successful SEO sprint." },
  { step: "2", name: "UX/Mobile Logic", icon: <FaMobileAlt />, detail: "In a mobile-first indexing world, your layout logic is your ranking. We eliminate Cumulative Layout Shift (CLS) and optimize touch-target accessibility. By refining the Critical Path, we ensure that both human users and Googlebot can navigate your site effortlessly. UX is no longer a design choice; it is a primary technical ranking factor that we optimize for maximum retention." },
  { step: "3", name: "Speed Injection", icon: <FaBolt />, detail: "We implement aggressive server-side caching, Brotli compression, and JS/CSS minification. By lazy-loading heavy media and optimizing asset delivery via CDN, we ensure your site feels instantaneous. Our speed protocol targets sub-second load times, directly impacting your bounce rates and conversion funnel efficiency. Speed is the ultimate competitive advantage." },
];

const About = ({ showHero }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animation variants for consistency
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Reusable grid background for white sections
  const WhiteGridBg = () => (
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70 pointer-events-none"></div>
  );

  return (
    <main className="bg-white text-slate-900 font-sans selection:bg-emerald-500 selection:text-white overflow-hidden pb-4">
      {showHero && (
        <Herolayout title="The SEO Architect" subtitle="Engineering search dominance through technical precision" />
      )}

      {/* --- 1. LOGO MARQUEE --- */}
      <section className="bg-slate-50 mt-10  border-y border-slate-100 py-6 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        <motion.div animate={{ x: [0, -1500] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} className="flex gap-20 items-center">
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
            <img key={i} src={logo.url} alt={logo.name} className="h-8 md:h-10 w-auto transition-all duration-500 cursor-pointer object-contain" />
          ))}
        </motion.div>
      </section>

      {/* --- 2. BENTO CONSOLE --- */}
      <section className="px-5 lg:px-20 py-20 max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 relative">
        {/* Noise Texture */}
      <div className="absolute inset-0 z-[1] opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Tech Grid - Darker, More Defined Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-100 pointer-events-none"></div>

      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <WhiteGridBg />
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="lg:col-span-7 space-y-6 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1]">
            SEO IS <span className="text-emerald-500 italic">ENGINEERING</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed text-justify">
            Improve your website's technical integrity and <strong>boost your search rankings with Verto Digital's advanced technical SEO services.</strong> Our team of experts will optimize your infrastructure, UX, and speed for maximum performance. Stay ahead of the competition and drive more organic traffic to your site with our proven protocol.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <motion.div whileHover={{ y: -8, scale: 1.02 }} className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden text-center cursor-pointer transition-all">
              <FaRocket className="absolute -right-6 -bottom-6 text-7xl text-white/5" />
              <h4 className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Integrity Rating</h4>
              <div className="text-5xl font-black italic tracking-tighter">99.2%</div>
              <p className="text-slate-400 text-[9px] mt-2 uppercase tracking-widest">Algorithmic Alignment</p>
            </motion.div>
            <motion.div whileHover={{ y: -8, scale: 1.02 }} className="p-8 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center cursor-pointer transition-all">
               <FaMicrochip className="text-emerald-600 text-4xl mb-3" />
               <p className="text-[11px] font-bold text-slate-800 leading-relaxed uppercase tracking-widest">Neural mapping verified across nodes</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative bg-slate-50 rounded-[3rem] border border-slate-200 p-4 flex flex-col items-center justify-center z-10"
        >
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070" className="rounded-[2.5rem] w-full h-[380px] object-cover" alt="Algorithmic Logic" /> 
          <div className="mt-6 w-full space-y-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest text-center px-4">
            <p className="border-b border-slate-200 font-sans pb-1 flex justify-between">SYSTEM STATUS: <span className="text-black font-black font-sans">OPTIMAL</span></p>
            <p className="border-b border-slate-200 font-sans pb-1 flex justify-between">LATENCY: <span className="text-slate-900 font-sans font-black">1.2MS</span></p>
            <p className="flex justify-between font-sans">DATA: <span className="text-slate-900 font-black font-sans">ENCRYPTED</span></p>
          </div>
        </motion.div>
      </section>

      {/* --- 3. PRE-SEO ROADMAP --- */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
    {/* --- BACKGROUND FX --- */}
  
        <div className="container mx-auto px-6 md:px-20 relative z-10">
          <div className="text-center mb-16">
            {/* --- BACKGROUND FX --- */}
      {/* Noise Texture */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Tech Grid - Updated to match the dark theme audit style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              System Architecture
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.1] mb-6">
              How a Full-Stack Audit Secures<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">
                Hosting for SEO
              </span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium"
            >
              We stabilize the digital environment before we initiate the algorithmic sprint.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRE_SEO_PROTOCOLS.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col items-center cursor-pointer transition-all backdrop-blur-sm hover:border-emerald-500/30"
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-3">
                  Step — 0{item.step}
                </div>
                <h4 className="text-xl font-bold uppercase tracking-tight mb-4 text-white">
                  {item.name}
                </h4>
                <p className="text-sm text-slate-400 flex leading-relaxed text-justify opacity-80">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. SEO TAXONOMY --- */}
      <section className="py-24 px-6 md:px-20 bg-white text-center relative">
            {/* --- BACKGROUND FX --- */}
      {/* Noise Texture */}
      <div className="absolute inset-0 z-[1] opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <WhiteGridBg />
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[1.1] mb-16 relative z-10"
        >
          THE TECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">TAXONOMY</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto relative z-10">
          {SEO_CATEGORIES.map((cat, i) => (
            <motion.div 
              key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} whileHover={{ scale: 1.02 }}
              className="p-10 md:p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 flex flex-col items-center transition-all group cursor-pointer "
            >
              <div className={`text-6xl ${cat.color} mb-8 transition-transform group-hover:rotate-12`}>
                {cat.icon}
              </div>
              <h4 className="text-3xl font-black uppercase mb-4 tracking-tighter">{cat.name}</h4>
              <p className="text-[13px] text-slate-500 leading-relaxed text-justify indent-6 font-serif">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    
  

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-slate-900/95 backdrop-blur-xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-10 right-10 text-white/50 hover:text-white transition-all"><FaTimes size={40} /></button>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full max-w-6xl aspect-video rounded-[3rem] overflow-hidden bg-black shadow-2xl">
              <video src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-4356-large.mp4" controls autoPlay className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default About;