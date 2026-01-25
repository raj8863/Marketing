import React, { useState } from "react";

// Images
import img1 from "../assets/images/project-1.jpg";
import img2 from "../assets/images/project-2.jpg";
import img3 from "../assets/images/project-3.jpg";

const categories = [
  "All",
  "UI/UX",
  "Web Design",
  "Developing",
  "Graphic Design",
];

const projects = [
  { id: 1, title: "Abstract Grid", category: "UI/UX", img: img1 },
  { id: 2, title: "Dark Vehicle", category: "Web Design", img: img2 },
  { id: 3, title: "3D Blocks", category: "Developing", img: img3 },
  { id: 4, title: "Creative Poster", category: "Graphic Design", img: img1 },
  { id: 5, title: "Minimal Layout", category: "UI/UX", img: img2 },
  { id: 6, title: "Web Dashboard", category: "Developing", img: img3 },
];

const Projects = () => {
  const [active, setActive] = useState("All");

  const filteredProjects =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-green-500 font-semibold mb-2">Case Study</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Projects
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500">
            Curabitur sed facilisis erat. Vestibulum pharetra eros eget
            fringilla porttitor.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition
                ${
                  active === cat
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-black hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl overflow-hidden bg-white
                         shadow-md hover:shadow-xl
                         transition-all duration-300
                         group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-72 object-cover
                             transition-transform duration-700
                             group-hover:scale-110"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/0
                                group-hover:bg-black/30
                                transition-all duration-500" />
              </div>

              {/* Content */}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {project.category}
                  </p>
                </div>

                {/* Pro Button */}
                <button
                  className="w-11 h-11 rounded-full flex items-center justify-center
                             bg-linear-to-br from-gray-800 to-black
                             text-white text-lg
                             shadow-md
                             hover:scale-110 hover:shadow-lg
                             transition-all duration-300"
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
