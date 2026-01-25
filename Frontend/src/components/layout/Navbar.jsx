import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-[#0b0d0f] px-6 md:px-14 py-6 text-white">
      <nav className="flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold">Decent<span className="text-emerald-400">11</span></h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm text-gray-300">
          {navItems.map((item) => (
            <li key={item.name} className="relative group">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `cursor-pointer transition ${
                    isActive ? "text-white" : "hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>

              {/* underline animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <button className="hidden md:block relative overflow-hidden border border-gray-700 px-5 py-2 text-sm group hover:text-black transition">
          <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          <span className="relative z-10">Get A Quote</span>
        </button>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1 group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-[2px] bg-white transition group-hover:translate-x-1"></span>
          <span className="w-6 h-[2px] bg-white transition group-hover:translate-x-2"></span>
          <span className="w-6 h-[2px] bg-white transition group-hover:translate-x-1"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-6 border-t border-gray-800">
          <ul className="flex flex-col gap-5 py-6 text-gray-300 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="hover:text-white transition"
              >
                {item.name}
              </NavLink>
            ))}

            <button className="mt-4 border border-gray-700 px-5 py-2 text-sm w-fit hover:bg-white hover:text-black transition">
              Get A Quote
            </button>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
