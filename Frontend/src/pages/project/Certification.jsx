import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiCheckBadge, FiExternalLink, FiShield, FiLoader, FiX } from "react-icons/fi";

const Certifications = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await fetch("https://marketing-b3je.onrender.com/api/certifications");
        const data = await res.json();
        setCerts(data);
      } catch (err) {
        // ✅ REAL DIGITAL MARKETING CERTIFICATIONS
        setCerts([
          {
            _id: 1,
            title: "Google Ads Certified",
            issuer: "Google",
            issueDate: "2024",
            image: "https://www.gstatic.com/partners/badge/certified_badge_v2.png",
            verifyUrl: "https://skillshop.withgoogle.com/",
            desc: "Certified in Google Ads Search, Display & Performance campaigns."
          },
          {
            _id: 2,
            title: "Google Analytics Certified",
            issuer: "Google",
            issueDate: "2024",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/77/GAnalytics.svg",
            verifyUrl: "https://analytics.google.com/",
            desc: "Advanced knowledge in web analytics and performance tracking."
          },
          {
            _id: 3,
            title: "Meta Blueprint Certified",
            issuer: "Meta",
            issueDate: "2024",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
            verifyUrl: "https://www.facebook.com/business/learn",
            desc: "Expertise in Facebook & Instagram ads and audience targeting."
          },
          {
            _id: 4,
            title: "HubSpot Inbound Marketing",
            issuer: "HubSpot",
            issueDate: "2023",
            image: "https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Vertical-Logo-Color.png",
            verifyUrl: "https://academy.hubspot.com/",
            desc: "Inbound strategy, lead generation and CRM automation."
          },
          {
            _id: 5,
            title: "SEMrush SEO Toolkit",
            issuer: "SEMrush",
            issueDate: "2023",
            image: "https://cdn.worldvectorlogo.com/logos/semrush-1.svg",
            verifyUrl: "https://www.semrush.com/academy/",
            desc: "SEO audits, keyword strategy & competitive analysis."
          },
          {
            _id: 6,
            title: "Google Digital Garage",
            issuer: "Google",
            issueDate: "2023",
            image: "https://lh3.googleusercontent.com/proxy/digitalgaragebadge",
            verifyUrl: "https://learndigital.withgoogle.com/",
            desc: "Fundamentals of digital marketing & online growth strategies."
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  return (
    <main className="bg-[#fcfcfc] min-h-screen font-sans">
      
      {/* 🔥 Header (SMALL FIXED) */}
      <div className="pt-16 pb-10 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 mb-4">
          <FiShield className="text-emerald-500" size={12} />
          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">
            Verified_Excellence
          </span>
        </div>

        {/* ✅ SMALL HEADING */}
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
          Agency Credentials
        </h1>

        <p className="text-slate-400 text-sm mt-3 max-w-xl mx-auto">
          Certified expertise in SEO, PPC & Digital Marketing platforms.
        </p>
      </div>

      {/* 🔥 GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <FiLoader className="animate-spin text-3xl text-emerald-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map((cert, i) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition"
              >
                {/* Badge */}
                <div className="w-20 h-20 mb-5 flex items-center justify-center bg-gray-50 rounded-xl">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 text-emerald-500 mb-1">
                    <FiCheckBadge size={14} />
                    <span className="text-[10px] font-bold uppercase">
                      {cert.issuer}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-slate-500 mb-4">
                    {cert.desc}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t text-[10px]">
                  <span className="text-slate-400 font-bold">
                    {cert.issueDate}
                  </span>

                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex items-center gap-1 font-bold hover:text-emerald-500"
                  >
                    View <FiExternalLink />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 🔥 MODAL SAME */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative">
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4"
              >
                <FiX />
              </button>

              <img
                src={selectedCert.image}
                className="w-24 mx-auto mb-4"
              />

              <h2 className="font-bold text-xl mb-2">
                {selectedCert.title}
              </h2>

              <p className="text-sm text-gray-500 mb-6">
                {selectedCert.desc}
              </p>

              <a
                href={selectedCert.verifyUrl}
                target="_blank"
                className="bg-black text-white px-6 py-3 rounded-lg text-sm"
              >
                Verify Certificate
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Certifications;
