import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";
import Herolayout from "../components/herolayout/Herolayout";
import { Link } from "react-router-dom";
import axios from "axios";

const PrivacyPolicy = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 Fetch from backend
  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/privacy");
        setData(res.data);
      } catch (err) {
        setError("Failed to load privacy policy");
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacy();
  }, []);

  // 🔄 Loading UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-pulse text-lg">Loading Privacy Policy...</div>
      </div>
    );
  }

  // ❌ Error UI
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      <Herolayout
        title="Privacy Policy"
        subtitle="Your privacy is critically important to us. Here is how we protect your data."
      />

      <section className="bg-[#0b0d0f] min-h-screen py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          
          {/* 🔥 LEFT SIDEBAR */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              
              <div className="bg-[#161b1e] p-6 rounded-2xl border border-white/5">
                <h4 className="text-white font-bold mb-4">Table of Contents</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  {data?.sections?.map((item, index) => (
                    <li key={index}>
                      <a
                        href={`#section-${index}`}
                        className="hover:text-emerald-400 transition-colors block"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20">
                <FaShieldAlt className="text-3xl text-emerald-500 mb-3" />
                <h5 className="text-white font-bold mb-1">Secure & Compliant</h5>
                <p className="text-xs text-gray-400">
                  Your data is protected with industry-grade security.
                </p>
              </div>

            </div>
          </div>

          {/* 🔥 RIGHT CONTENT */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#161b1e] p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl"
            >
              {/* 🔥 LAST UPDATED */}
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Last Updated: {data?.lastUpdated}
              </div>

              {/* 🔥 INTRO */}
              <h2 className="text-3xl font-black text-white mb-6">
                Introduction
              </h2>
              <p className="text-gray-400 leading-relaxed mb-10">
                At <strong>Decent11</strong>, we prioritize your privacy and ensure
                that your data is handled securely and transparently.
              </p>

              <hr className="border-white/5 my-10" />

              {/* 🔥 DYNAMIC SECTIONS */}
              <div className="space-y-12">
                {data?.sections?.map((section, index) => (
                  <motion.div
                    key={index}
                    id={`section-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="scroll-mt-32"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">
                      {section.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                      {section.content}
                    </p>
                  </motion.div>
                ))}
              </div>

              <hr className="border-white/5 my-10" />

              {/* 🔥 CONTACT */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Contact Us
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  If you have any questions, feel free to reach out.
                </p>

                <Link
                  to="/contact"
                  className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all"
                >
                  Contact Support
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;