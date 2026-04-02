import React, { useState, useEffect } from 'react';
import Herolayout from "../../components/herolayout/Herolayout";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const Blog = () => {
  // --- PRO LOGIC: Dynamic State ---
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from the backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://marketing-b3je.onrender.com/api/blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <Herolayout 
        title="Knowledge Hub" 
        subtitle="Exploring the frontiers of Digital Marketing, Data Analytics, and Brand Growth." 
      />
      
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-emerald-500"></span>
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs">Our Articles</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Latest Insights</h2>
        </div>
        
        {loading ? (
           <div className="text-center text-emerald-500 font-bold text-xl py-10">Loading Articles...</div>
        ) : blogs.length === 0 ? (
           <div className="text-center text-gray-500 py-10">No articles published yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <article key={post._id} className="bg-white group rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 flex flex-col h-full">
                
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md text-emerald-800 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm">
                    {post.category}
                  </div>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-4">
                    <time>{post.date}</time>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-emerald-600 transition-colors">
                    {/* Link updated to use slug from the database */}
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-500 leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-6 border-t border-gray-50 mt-auto">
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-emerald-500 transition-colors group/link"
                    >
                      Read Article 
                      <FaArrowRight className="text-emerald-500 transform group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;
