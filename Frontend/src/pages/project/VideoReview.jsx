import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiStar, FiLoader, FiX } from "react-icons/fi";

const VideoReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideoReviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/video-reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        setReviews([
          {
            _id: 1,
            clientName: "Rahul Sharma",
            company: "Growth X",
            youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            rating: 5,
          },
          {
            _id: 2,
            clientName: "Sanya Malhotra",
            company: "Fashion Hub",
            youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
            rating: 5,
          },
          {
            _id: 3,
            clientName: "Aman Gupta",
            company: "Alpha Tech",
            youtubeUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
            rating: 4,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideoReviews();
  }, []);

  const getID = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <main className="bg-white min-h-screen font-sans relative overflow-hidden">

      {/* Background Effects (UNCHANGED) */}
      <div className="absolute inset-0 z-[1] opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10">

        {/* HEADER (UNCHANGED) */}
        <div className="text-center max-w-3xl mx-auto mt-10 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 tracking-tight"
          >
            NUMBERS THAT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
              DEFINE EXCELLENCE.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-600 text-lg leading-relaxed"
          >
            We pride ourselves on delivering consistent quality and measurable impact.
            Our track record speaks for itself.
          </motion.p>
        </div>

        {/* VIDEO GRID */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <FiLoader className="animate-spin text-4xl text-emerald-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

              {reviews.map((video, i) => (
                <motion.div
                  key={video._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white border border-slate-100 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
                >

                  {/* THUMBNAIL */}
                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    
                    {/* REAL THUMBNAIL */}
                    <img
                      src={`https://img.youtube.com/vi/${getID(video.youtubeUrl)}/maxresdefault.jpg`}
                      alt="Review"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${getID(video.youtubeUrl)}/0.jpg`;
                      }}
                    />

                    {/* LIGHT OVERLAY (FIXED) */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

                    {/* PLAY BUTTON (PRO ANIMATION) */}
                    <button
                      onClick={() => setSelectedVideo(getID(video.youtubeUrl))}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 md:w-16 md:h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
                      >
                        <FiPlay size={24} className="ml-1" />
                      </motion.div>
                    </button>

                    <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md text-[9px] font-black text-white px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">
                      HD_VLOG
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 md:p-8">

                    {/* STARS */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, index) => (
                        <FiStar
                          key={index}
                          className={
                            index < video.rating
                              ? "text-amber-400 fill-current"
                              : "text-slate-200"
                          }
                          size={14}
                        />
                      ))}
                    </div>

                    {/* NAME */}
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 italic uppercase tracking-tighter">
                      {video.clientName}
                    </h3>

                    {/* COMPANY */}
                    <p className="text-[10px] md:text-[11px] font-black text-emerald-500 uppercase tracking-[0.3em] mt-2">
                      {video.company}
                    </p>

                    {/* EXTRA TRUST TEXT (NEW) */}
                    <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                      "Amazing results! Highly recommended digital marketing service."
                    </p>
                  </div>
                </motion.div>
              ))}

            </div>
          )}
        </section>
      </div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6 md:p-12"
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 text-white hover:text-emerald-500"
            >
              <FiX size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.85, y: 60, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-5xl aspect-video bg-black rounded-xl md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_80px_rgba(16,185,129,0.25)] border border-white/10"
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                title="Client Review Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default VideoReview;