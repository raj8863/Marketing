import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaCheck, FaEnvelope } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API Call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      // Reset after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section className="px-6 py-20 bg-[#0b0f12] relative overflow-hidden">
      
      {/* --- PRO BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="relative rounded-3xl bg-[#161b1e] border border-white/5 overflow-hidden shadow-2xl">
          
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

          <div className="grid lg:grid-cols-2 gap-12 p-10 md:p-16 items-center">
            
            {/* --- LEFT CONTENT --- */}
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-4"
              >
                <span className="w-8 h-[2px] bg-emerald-500"></span>
                <span className="text-emerald-400 font-bold tracking-widest uppercase text-xs">
                  Stay Connected
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-4">
                UNLOCK <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                  EXCLUSIVE
                </span>{' '}
                UPDATES
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Join 10,000+ developers and designers. Get the latest trends and tech news delivered straight to your inbox.
              </p>
            </div>

            {/* --- RIGHT FORM --- */}
            <div className="relative">
              <form
                onSubmit={handleSubmit}
                className="relative z-10 p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col sm:flex-row gap-2 transition-all duration-300 focus-within:border-emerald-500/50 focus-within:bg-white/10"
              >
                <div className="flex-1 flex items-center px-4 h-14 sm:h-auto">
                  <FaEnvelope className="text-gray-500 text-xl mr-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-base font-medium"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    px-8 py-4 sm:py-5 rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2
                    ${status === 'success' 
                      ? 'bg-emerald-500 text-white cursor-default' 
                      : 'bg-white text-black hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]'
                    }
                  `}
                >
                  {status === 'loading' ? (
                    <CgSpinner className="animate-spin text-xl" />
                  ) : status === 'success' ? (
                    <>
                      Subscribed <FaCheck />
                    </>
                  ) : (
                    <>
                      Subscribe <FaPaperPlane />
                    </>
                  )}
                </motion.button>
              </form>
              
              {/* Decorative Blur behind form */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-20 blur-xl rounded-2xl -z-10"></div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;