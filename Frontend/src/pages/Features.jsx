import React, { useEffect, useState } from "react";
import { ClipboardCheck, Star, Users, Award } from "lucide-react";

/* ===== DATA ===== */
const features = [
  { icon: ClipboardCheck, value: 150, label: "Project Completed" },
  { icon: Star, value: 2150, label: "Satisfied Clients" },
  { icon: Users, value: 120, label: "Expert Teams" },
  { icon: Award, value: 50, label: "Win Awards" },
];

/* ===== COUNT UP COMPONENT ===== */
const CountUp = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = Math.ceil(end / (duration / 16));

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(counter);
  }, [end]);

  return <>{count}+</>;
};

const Features = () => {
  return (
    <section className="relative bg-[#0b0f0e] py-28 px-6 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,209,165,0.08),transparent_60%)]" />

      {/* HEADING */}
      <div className="relative max-w-3xl mx-auto text-center mb-20">
        <p className="text-[#4fd1a5] font-semibold tracking-wide mb-3">
          Case Study
        </p>

        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Features
        </h2>

        <p className="text-gray-400 leading-relaxed">
          Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla
          porttitor. Duis a orci nunc.
        </p>
      </div>

      {/* CARDS */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="
              bg-[#0f1413]
              rounded-3xl
              px-8 py-12
              text-center
              border border-white/5
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all duration-500
            "
          >
            {/* ICON */}
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#12201b] flex items-center justify-center">
              <item.icon className="w-10 h-10 text-[#4fd1a5]" />
            </div>

            {/* NUMBER */}
            <h3 className="text-4xl font-extrabold text-white mb-2">
              <CountUp end={item.value} />
            </h3>

            {/* LABEL */}
            <p className="text-gray-400 font-medium">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
