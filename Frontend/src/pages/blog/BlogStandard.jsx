import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Herolayout from "../../components/herolayout/Herolayout";
import { 
  FaMagnifyingGlass, 
  FaCalendarDays, 
  FaUserPen, 
  FaArrowRight, 
  FaFolderOpen,
  FaTags 
} from "react-icons/fa6";

// Keeping Sidebars static for now to preserve layout
const RECENT_POSTS = [
  { title: "The Future of Web Design", date: "Jan 15, 2026", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=200" },
  { title: "AI in Content Creation", date: "Jan 12, 2026", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=200" }
];
const CATEGORIES = [{ name: "Digital Marketing", count: 14 }, { name: "Web Development", count: 8 }];
const TAGS = ["SEO", "Business", "React", "Marketing"];

const BlogStandard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // --- PRO LOGIC: Dynamic State ---
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs');
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
      <Herolayout title="Journal & News" subtitle="In-depth articles, agency updates, and industry perspectives." />

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* --- LEFT COLUMN: POST FEED --- */}
          <div className="lg:w-2/3 flex flex-col gap-16">
            {loading ? (
               <div className="text-center text-emerald-500 font-bold text-xl py-10">Loading Articles...</div>
            ) : blogs.length === 0 ? (
               <div className="text-center text-gray-500 py-10">No articles published yet.</div>
            ) : (
              blogs.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase())).map((post) => (
                <article key={post._id} className="bg-white rounded-[2.5rem] p-4 md:p-5 border border-gray-100 shadow-xl shadow-gray-200/50 group">
                  <div className="relative overflow-hidden rounded-[2rem] aspect-video">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-emerald-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                      {post.category}
                    </div>
                  </div>

                  <div className="px-4 md:px-6 py-8">
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-4 font-medium">
                      <div className="flex items-center gap-2">
                        <FaCalendarDays className="text-emerald-500" /> {post.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUserPen className="text-emerald-500" /> {post.author}
                      </div>
                      <div className="flex items-center gap-2 text-emerald-500">
                         ❤️ {post.likes} Likes • 💬 {post.comments?.length || 0} Comments
                      </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-emerald-600 transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-gray-500 leading-relaxed mb-8 text-lg">{post.excerpt}</p>

                    <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-50 text-emerald-700 font-bold rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300">
                      Read More <FaArrowRight />
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* --- RIGHT COLUMN: SIDEBAR --- */}
          <aside className="lg:w-1/3 space-y-10 h-fit lg:sticky lg:top-28">
            {/* Search Widget */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/40">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><span className="w-1 h-6 bg-emerald-500 rounded-full"></span> Search</h3>
              <div className="relative">
                <input type="text" placeholder="Type keyword..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-5 pr-12 py-4 bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-500 rounded-xl outline-none transition-all text-gray-700" />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500"><FaMagnifyingGlass /></button>
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="relative p-8 rounded-3xl overflow-hidden bg-[#0b0d0f] text-white text-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 blur-[60px] rounded-full opacity-20"></div>
              <h3 className="text-xl font-bold mb-2 relative z-10">Subscribe Now</h3>
              <p className="text-gray-400 text-sm mb-6 relative z-10">Get the latest news and updates directly in your inbox.</p>
              <form className="relative z-10 space-y-3" onSubmit={(e) => { e.preventDefault(); alert("Newsletter feature coming soon!"); }}>
                <input required type="email" placeholder="Your email address" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors" />
                <button type="submit" className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-colors">Subscribe</button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogStandard;