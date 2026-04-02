import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="min-h-screen bg-[#0b0f12] flex flex-col items-center justify-center text-white px-6">
      <h1 className="text-9xl font-black text-emerald-500">404</h1>
      <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
      <p className="text-gray-400 mt-4 text-center max-w-md">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="mt-8 px-8 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-white hover:text-black transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

// YEH LINE SABSE ZAROORI HAI:
export default Error404;