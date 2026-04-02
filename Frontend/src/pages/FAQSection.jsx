import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // FIX: Added this
import { FaPlus, FaMinus } from 'react-icons/fa';
import axios from 'axios'; // FIX: Added this
import Herolayout from '../components/herolayout/Herolayout';

const FAQItem = ({ faq, isOpen, toggleOpen }) => {
  return (
    <div className={`mb-4 overflow-hidden rounded-xl border transition-all duration-300 relative z-10 ${
      isOpen ? 'border-emerald-500 ring-1 ring-emerald-500 shadow-lg shadow-emerald-500/5' : 'border-slate-200 hover:border-emerald-300'
    }`}>
      <button
        className="flex w-full items-start justify-between bg-white p-5 text-left focus:outline-none group"
        onClick={toggleOpen}
      >
        <div className="flex flex-col pr-4">
          <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 px-2 py-0.5 rounded w-fit transition-colors ${
            isOpen ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600'
          }`}>
            {faq.category}
          </span>
          <span className={`text-lg font-semibold transition-colors duration-300 ${
            isOpen ? 'text-slate-900' : 'text-slate-700 group-hover:text-emerald-600'
          }`}>
            {faq.question}
          </span>
        </div>
        
        <div className={`mt-1 flex-shrink-0 rounded-full p-2 transition-all duration-300 ${
          isOpen ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600'
        }`}>
          {isOpen ? <FaMinus size={12} /> : <FaPlus size={12} />}
        </div>
      </button>
      
      <div className={`transition-all duration-500 ease-in-out bg-white ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 pb-6">
            <div className="h-px w-full bg-slate-100 mb-4"></div>
            <p className="text-slate-600 leading-relaxed text-base">
              {faq.answer}
            </p>
        </div>
      </div>
    </div>
  );
};

const FAQSection = ({ showHero = true }) => {
  const [faqs, setFaqs] = useState([]); 
  const [openIndex, setOpenIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFaqs = async () => {
      try {
        const res = await axios.get("https://marketing-b3je.onrender.com/api/faqs");
        setFaqs(res.data);
      } catch (err) {
        console.error("Knowledge_Base_Sync_Error:", err);
      } finally {
        setLoading(false);
      }
    };
    getFaqs();
  }, []);

  if (loading) return (
    <div className="py-20 text-center font-mono text-[10px] uppercase tracking-widest text-slate-400">
      Syncing_Data_Nodes...
    </div>
  );

  return (
    <section className={`bg-white relative overflow-hidden w-full ${showHero ? 'py-24' : 'py-10'}`}>
      {showHero && <Herolayout title="Frequently Asked Questions" subtitle="Find answers to common questions." />}

      {/* BACKGROUND FX */}
      <div className="absolute inset-0 z-[1] opacity-5 pointer-events-none bg-slate-50"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.08] pointer-events-none"></div>

      <div className="mx-auto max-w-3xl relative z-10 px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-none">
              QUESTIONS <span className="text-emerald-500">&</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">EXCELLENCE.</span>
            </motion.h2>
          </div>

        <div className="space-y-4">
          {faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <FAQItem 
                key={faq._id || index} 
                faq={faq} 
                isOpen={openIndex === index}
                toggleOpen={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))
          ) : (
            <p className="text-center text-slate-400 font-mono text-xs uppercase italic">No active data nodes found.</p>
          )}
        </div>

        <div className="mt-16 text-center bg-emerald-50/40 backdrop-blur-md rounded-[2.5rem] p-10 border border-emerald-100 relative z-10">
          <h4 className="text-xl font-bold mb-2 text-slate-900 uppercase tracking-tighter">Still have questions?</h4>
          <p className="text-slate-600 mb-8 font-medium">I'm ready to discuss your specific requirements.</p>
          <motion.a href="/contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center justify-center px-10 py-5 text-xs font-black uppercase tracking-[0.2em] rounded-2xl text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/20 cursor-pointer">
            Let's Talk Business
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
