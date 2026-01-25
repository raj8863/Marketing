import React from "react";

const Newsletter = () => {
  return (
    <section className="px-6 py-10 bg-white">
      <div
        className="
          max-w-7xl mx-auto
          rounded-2xl
          bg-[#0b0f12]
          text-white
          px-10 py-14
          relative overflow-hidden
        "
      >
        {/* Background Pattern (optional effect) */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,#ffffff15,transparent_40%)]" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-2 items-center">
          
          {/* LEFT CONTENT */}
          <div>
            <p className="text-emerald-400 font-medium mb-3">
              Get In Touch
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              SUBSCRIBE OUR
            </h2>

            <h3 className="text-4xl md:text-5xl font-extrabold text-white/20 mt-2">
              NEWSLETTER
            </h3>
          </div>

          {/* RIGHT FORM */}
          <form
            className="
              flex items-center
              bg-black/70
              rounded-xl
              p-2
              max-w-xl
              w-full
              ml-auto
            "
          >
            <input
              type="email"
              placeholder="Type Your Email"
              className="
                flex-1
                bg-transparent
                px-5 py-4
                text-gray-300
                placeholder-gray-500
                outline-none
              "
            />

            <button
              type="submit"
              className="
                px-10 py-4
                rounded-lg
                bg-emerald-400
                text-black
                font-semibold
                hover:bg-emerald-500
                transition
              "
            >
              SUBMIT
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;
