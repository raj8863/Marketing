import React, { useState } from "react";
import getty from "../assets/images/getty.jpg";
import video from "../assets/images/videoplayback.mp4";

const About = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ABOUT SECTION */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <p className="text-[#4fd1a5] font-semibold mb-2">Get To Know</p>

            <h2 className="text-4xl font-bold mb-6">About Us</h2>

            <h3 className="text-2xl font-semibold mb-6">
              We Do Design, Code & Develop <br /> Software Finally Launch.
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Integer purus odio, placerat nec rhoncus in, ullamcorper nec
              dolor. Class aptent taciti sociosqu ad litora torquent per
              conubia nostra, per inceptos himenaeos. Praesent nec neque
              at dolor venenatis consectetur.
            </p>
          </div>

          {/* RIGHT */}
          <div className="relative">
            {/* Main Image */}
            <img
              src={getty}
              alt="Team Work"
              className="rounded-2xl w-137.5"
            />

            {/* Video Preview */}
            <div className="absolute -bottom-20 -left-5 w-48 rounded-xl overflow-hidden shadow-xl bg-black mb-10">
              <video
                src={video}
                muted
                loop
                className="w-full h-auto  "
              />

              {/* Play Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="absolute inset-0 flex items-center justify-center
                 text-4xl text-[#4fd1a5]
                 bg-black/30 hover:bg-black/40
                 transition"
              >
                ▶
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* VIDEO MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-[90%] max-w-3xl bg-black rounded-xl overflow-hidden">

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-white text-2xl z-10"
            >
              ✕
            </button>

            {/* Video */}
            <video
              src={video}
              controls
              autoPlay
              className="w-full h-30"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default About;
