import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout & Core Pages
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";
import Contact from "../pages/Contact";
import Features from "../pages/Features";
import Newletter from "../pages/Newletter";

// Dropdown/Extra Pages
import OurTeam from "../pages/Page/OurTeam";
import PricingPlan from "../pages/Page/PricingPlan";

import Error404 from "../pages/Page/Error404";
import QuoteModal from "../pages/QuoteModel";
import PrivacyPolicy from "../pages/PrivacyPolicy";


// Blog Pages
import Blog from "../pages/blog/Blog";
import BlogStandard from "../pages/blog/BlogStandard";
import BlogDetails from "../pages/blog/BlogDetails";

// Project Pages
import Projects from "../pages/project/Projects";
import CaseStudies from "../pages/project/CaseStudies";
import ProjectShowcase from "../pages/project/ProjectShowcase";
import Testimonials from "../pages/Testimonials";
import PartnerSection from "../pages/Page/PartnerSection";
import FAQSection from "../pages/FAQSection";


const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* --- Core Routes --- */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About showHero={true} />} />
        <Route path="/services" element={<Services showHero={true} />} />
        <Route path="/service/:slug" element={<ServiceDetails />} />

        {/* --- Project & Case Study Routes (FIXED) --- */}
        {/* This shows the full gallery (the grid/discover view) */}
        <Route path="/projects" element={<ProjectShowcase showHero={true} />} /> 
        
        {/* This shows individual project details based on the URL slug */}
        <Route path="/project/:slug" element={<CaseStudies />} />
        
        {/* Optional: Filtered projects view if you still use it */}
        <Route path="/portfolio" element={<Projects showHero={true} />} />

        {/* --- Blog Routes --- */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-standard" element={<BlogStandard />} />
        <Route path="/blog/:id" element={<BlogDetails />} />

        {/* --- Other Pages --- */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/newsletter" element={<Newletter />} />
        <Route path="/team" element={<OurTeam />} />
        <Route path="/pricing" element={<PricingPlan />} />
        <Route path="/faqs" element={<FAQSection/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />


        {/* --- Modal Route (If needed as a standalone page) --- */}
        <Route path="/quote" element={<QuoteModal />} />
         <Route path="/testimonials" element={<Testimonials/>} />

           <Route path="/meeting" element={<PartnerSection/>} />
           
        {/* --- 404 - Should be last --- */}
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;