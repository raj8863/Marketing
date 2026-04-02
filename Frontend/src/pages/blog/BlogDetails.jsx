import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaLinkedinIn, FaXTwitter, FaFacebookF, FaArrowLeft, FaHeart, FaComment } from 'react-icons/fa6';
import Herolayout from '../../components/herolayout/Herolayout';

const BlogDetails = () => {
  const { id } = useParams(); 
  
  const [post, setPost] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]); // ADDED: To store related articles
  const [loading, setLoading] = useState(true);
  
  const [hasLiked, setHasLiked] = useState(false);
  const [commentData, setCommentData] = useState({ name: "", email: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- PRO LOGIC: Parallel Fetching ---
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch specific blog AND all blogs at the same time
        const [singleResponse, allResponse] = await Promise.all([
            fetch(`http://localhost:5000/api/blogs/slug/${id}`),
            fetch('http://localhost:5000/api/blogs')
        ]);

        if (singleResponse.ok) {
          const singleData = await singleResponse.json();
          setPost(singleData);
        }
        if (allResponse.ok) {
            const allData = await allResponse.json();
            setAllBlogs(allData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]); // This ensures if you click a related article, it re-runs and fetches the new one!

  const handleLike = async () => {
    if (hasLiked) return; 
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${post._id}/like`, { method: 'PUT' });
      if (response.ok) {
        const data = await response.json();
        setPost(prev => ({ ...prev, likes: data.likes }));
        setHasLiked(true);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${post._id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
      });
      
      if (response.ok) {
        const updatedComments = await response.json();
        setPost(prev => ({ ...prev, comments: updatedComments }));
        setCommentData({ name: "", email: "", text: "" });
        alert("Comment posted successfully!");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-24 text-xl font-bold text-emerald-500">Loading Article...</div>;
  if (!post) return <div className="text-center py-24 text-xl">Article not found.</div>;

  return (
    <div className="bg-white pb-32">
      <Herolayout title={post.title} subtitle={`${post.date} • By ${post.author}`} />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative -mt-24 z-20">
          <Link to="/blog-standard" className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full mb-8 font-bold text-sm shadow-xl hover:text-emerald-500 transition-colors">
            <FaArrowLeft /> Back to Insights
          </Link>
          <div className="aspect-video w-full overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white">
            <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 mt-16">
          <article className="lg:w-2/3">
            
            <div className="prose prose-lg md:prose-xl prose-emerald max-w-none text-gray-600 mb-16">
               {post.content.map((block, index) => {
                 if (block.startsWith('##')) {
                   return <h3 key={index} className="text-3xl font-bold text-gray-900 mt-10 mb-4">{block.replace('##', '').trim()}</h3>;
                 }
                 return <p key={index} className={`leading-relaxed mb-6 ${index === 0 ? "first-letter:text-6xl first-letter:font-black first-letter:text-emerald-500 first-letter:float-left first-letter:mr-3 first-letter:mt-2" : ""}`}>{block}</p>;
               })}
            </div>

            <div className="border-t border-gray-100 pt-10">
                <div className="flex items-center gap-6 mb-12">
                    <button onClick={handleLike} className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${hasLiked ? 'bg-red-50 text-red-500' : 'bg-gray-50 hover:bg-red-50 hover:text-red-500'}`}>
                        <FaHeart className={hasLiked ? 'text-red-500' : 'text-gray-400'} /> {post.likes || 0} Likes
                    </button>
                    <div className="flex items-center gap-2 text-gray-500 font-bold">
                        <FaComment /> {post.comments?.length || 0} Comments
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-8">Discussion</h3>
                <div className="space-y-6 mb-12">
                    {!post.comments || post.comments.length === 0 ? (
                        <p className="text-gray-500 italic">No comments yet. Be the first to start the discussion!</p>
                    ) : (
                        post.comments.map((comment, i) => (
                            <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-gray-900">{comment.name}</h4>
                                    <span className="text-xs text-gray-400">{new Date(comment.date).toLocaleDateString()}</span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{comment.text}</p>
                            </div>
                        ))
                    )}
                </div>

                <div className="bg-[#0b0d0f] p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>
                    <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Leave a Reply</h3>
                    
                    <form onSubmit={handleCommentSubmit} className="space-y-4 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input required type="text" placeholder="Your Name" value={commentData.name} onChange={e => setCommentData({...commentData, name: e.target.value})} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500" />
                            <input required type="email" placeholder="Your Email" value={commentData.email} onChange={e => setCommentData({...commentData, email: e.target.value})} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500" />
                        </div>
                        <textarea required rows="4" placeholder="Share your thoughts..." value={commentData.text} onChange={e => setCommentData({...commentData, text: e.target.value})} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 resize-none"></textarea>
                        <button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors disabled:opacity-50">
                            {isSubmitting ? "Posting..." : "Post Comment"}
                        </button>
                    </form>
                </div>
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:w-1/3 space-y-8 h-fit lg:sticky lg:top-28">
            <div className="p-8 bg-gray-50 border border-gray-100 rounded-3xl">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Written By</p>
                <h4 className="text-xl font-bold text-gray-900">{post.author}</h4>
                <p className="text-emerald-500 text-sm font-medium mb-4">{post.role}</p>
                <div className="h-px w-full bg-gray-200 my-4"></div>
                <p className="text-gray-500 text-sm leading-relaxed">Specializing in data-driven growth strategies and modern brand architecture.</p>
            </div>

            {/* --- NEW: RELATED ARTICLES WIDGET --- */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/40">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span> Related Articles
              </h3>
              <div className="flex flex-col gap-6">
                {allBlogs
                  .filter(b => b._id !== post._id) // Don't show the currently active article
                  .slice(0, 3) // Only show 3
                  .map((relatedPost) => (
                  <Link 
                    key={relatedPost._id} 
                    to={`/blog/${relatedPost.slug}`} 
                    onClick={() => window.scrollTo(0, 0)} // This forces the new page to open at the top!
                    className="flex gap-4 group"
                  >
                    <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden">
                      <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <span className="text-xs text-emerald-500 font-bold uppercase tracking-wider mb-1 block">{relatedPost.date}</span>
                      <h4 className="font-bold text-gray-900 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Share this</h4>
              <div className="flex gap-3">
                {[FaLinkedinIn, FaXTwitter, FaFacebookF].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 shadow-sm"><Icon /></button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;