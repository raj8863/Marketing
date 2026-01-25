import React from "react";

const Hero = () => {
  return (
    <section className="bg-[#0b0d0f] min-h-[calc(100vh)] px-6 md:px-14 flex items-center text-white">
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-10">

        {/* Text Content */}
        <div className="max-w-xl">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            CREATIVE & MINIMAL <br />
            <span className="font-light tracking-widest">IT AGENCY.</span>
          </h2>

          <p className="text-gray-400 mt-6 text-sm leading-relaxed">
            Curabitur sed facilisis erat. Vestibulum pharetra eros eget
            fringilla porttitor.
          </p>

          {/* Buttons */}
          <div className="flex justify-center md:justify-start gap-6 mt-5">
            <button className="border border-gray-700 px-6 py-3 hover:bg-white hover:text-black transition">
              About Us
            </button>

            <button className="border border-gray-700 px-6 py-3 hover:bg-white hover:text-black transition">
              See Project
            </button>
          </div>
        </div>

        {/* Image */}
        <img
          src="/src/assets/images/hero.jpg"
          alt="hero"
         className="w-full max-w-sm md:max-w-[480px] rounded-2xl grayscale transition-transform duration-500 ease-out hover:scale-105"
        />
      </div>
    </section>
  );
};

export default Hero;
