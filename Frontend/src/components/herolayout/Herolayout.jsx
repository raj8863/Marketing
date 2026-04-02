import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaChevronRight, FaHome } from 'react-icons/fa';

const Herolayout = ({ title, subtitle, bgImage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to split path for breadcrumbs (optional, creates auto-breadcrumbs)
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="relative bg-[#0b0f12] text-white pt-32 pb-20 overflow-hidden isolate">

      {/* ==================== 
          1. DYNAMIC BACKGROUND LAYERS 
      ==================== */}

      {/* Optional: Background Image Overlay with Blend Mode */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0b0f12] via-[#0b0f12]/80 to-transparent"></div>
        </div>
      )}

      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.15]"
        style={{ backgroundImage: 'linear-gradient(#34d399 1px, transparent 1px), linear-gradient(to right, #34d399 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Glowing Orbs (Animated) */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-125 h-125 bg-emerald-500/20 blur-[100px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-100 h-100 bg-teal-600/10 blur-[100px] rounded-full"></div>

      {/* ==================== 
          2. CONTENT CONTAINER 
      ==================== */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Glassmorphic Breadcrumb Navigation */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-[fadeIn_0.5s_ease-out]">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-emerald-400 transition-colors group border-r border-white/10 pr-3 mr-1"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back
          </button>

          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            <FaHome className="text-sm" />
          </Link>

          <FaChevronRight className="text-[10px] text-gray-600" />

          {/* Dynamic Breadcrumb Logic or Static Title */}
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest line-clamp-1">
            {title}
          </span>
        </div>

        {/* Text Content */}
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1] text-transparent bg-clip-text bg-linear-to-r from-white via-white to-gray-400 drop-shadow-sm">
            {title}
          </h1>

          <div className="flex flex-col md:flex-row gap-6 md:items-start">
            <div className="w-12 h-1 bg-emerald-500 rounded-full mt-3 shrink-0"></div>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-2xl">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Fade Effect (Seamless transition to next section) */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-[#0b0f12] to-transparent z-10"></div>
    </div>
  );
};

export default Herolayout;