import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Projects from "../pages/Projects";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";
import Features from "../pages/Features";
import Newletter from "../pages/Newletter";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout wrapper */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
              <Route path="/newsletter" element={<Newletter/>} />


      </Route>
    </Routes>
  );
};

export default AppRoutes;
