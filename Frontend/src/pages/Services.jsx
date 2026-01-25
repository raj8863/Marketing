import React, { useRef } from "react";

// Images
import service1 from "../assets/images/services1.jpg";
import service2 from "../assets/images/services2.jpg";
import service3 from "../assets/images/services3.jpg";
import service4 from "../assets/images/services4.jpg";
import service5 from "../assets/images/services5.jpg";
import service6 from "../assets/images/services5.jpg";


const servicesData = [
  { id: "01", title: "Software Development", image: service1 },
  { id: "02", title: "UI / UX Design", image: service2 },
  { id: "03", title: "Web Applications", image: service3 },
  { id: "04", title: "Mobile Development", image: service4 },
  { id: "05", title: "Cloud Solutions", image: service5 },
  { id: "06", title: "Socal Media Handler", image: service6 },
];

const Services = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-28 px-6">
      {/* ===== HEADING ===== */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <p className="text-xs tracking-[0.35em] uppercase text-gray-400">
          Our Solutions
        </p>

        <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
          Services
        </h2>

        <p className="text-gray-500 mt-6 leading-relaxed">
          Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla
          porttitor.
        </p>
      </div>

      {/* ===== SLIDER / GRID WRAPPER ===== */}
      <div className="relative max-w-6xl mx-auto">
        <div
          ref={scrollRef}
          className="
            flex gap-8
            overflow-x-auto
            scroll-smooth
            pb-12
            snap-x snap-mandatory
            [&::-webkit-scrollbar]:hidden
            [-ms-overflow-style:none]
            [scrollbar-width:none]

            md:grid md:grid-cols-2 md:overflow-visible md:snap-none
            lg:grid-cols-3
          "
        >
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="
                w-full
                min-w-[85%]
                md:min-w-0
                snap-start
                bg-white
                rounded-3xl
                p-7
                border border-gray-200
                shadow-md
                hover:shadow-2xl
                hover:-translate-y-3
                transition-all duration-500 ease-out
                group
              "
            >
              {/* TOP */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="
                      w-full h-full object-cover
                      grayscale
                      group-hover:scale-110
                      group-hover:grayscale-0
                      transition duration-500
                    "
                  />
                </div>

                <span className="text-5xl font-extrabold text-gray-200 group-hover:text-gray-300 transition">
                  {service.id}
                </span>
              </div>

              {/* BODY */}
              <h3 className="text-xl font-semibold mt-6 text-center">
                {service.title}
              </h3>

              <p className="text-gray-500 text-sm mt-3 text-center leading-relaxed">
                Integer purus odio, placerat nec rhoncus in, ullamcorper nec
                dolor.
              </p>

              {/* CTA */}
              <button
                className="
                  mt-6 mx-auto block
                  px-6 py-2.5 text-sm
                  rounded-full
                  border border-gray-300
                  font-medium
                  hover:bg-black hover:text-white
                  hover:border-black
                  transition-all duration-300
                "
              >
                Read More
              </button>
            </div>
          ))}
        </div>

        {/* ===== MOBILE CONTROLS ===== */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none md:hidden">
          <button
            onClick={scrollLeft}
            aria-label="Previous"
            className="
              pointer-events-auto
              w-12 h-12 rounded-full
              border border-gray-300
              bg-white/90 backdrop-blur
              shadow-xl
              hover:bg-black hover:text-white
              transition-all duration-300
            "
          >
            ←
          </button>

          <button
            onClick={scrollRight}
            aria-label="Next"
            className="
              pointer-events-auto
              w-12 h-12 rounded-full
              border border-gray-300
              bg-white/90 backdrop-blur
              shadow-xl
              hover:bg-black hover:text-white
              transition-all duration-300
            "
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
