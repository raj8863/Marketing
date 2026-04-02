import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, FileText, Loader2 } from "lucide-react";
import BlogForm from "./BlogForm";

const BlogView = ({ initialMode = "list" }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(initialMode);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    setMode(initialMode);
    if (initialMode === "list") fetchBlogs();
  }, [initialMode]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/blogs');
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setBlogs(blogs.filter(b => b._id !== id));
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setMode('edit');
  };

  const handleWriteNew = () => {
    setSelectedBlog(null);
    setMode('add');
  };

  const handleSaveSuccess = () => {
    setMode('list');
    fetchBlogs();
  };

  // --- RENDER FORM MODE ---
  if (mode === 'add' || mode === 'edit') {
    return (
      <BlogForm 
        initialData={mode === 'edit' ? selectedBlog : null}
        onSave={handleSaveSuccess}
        onCancel={() => setMode('list')}
      />
    );
  }

  // --- RENDER LIST MODE ---
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 transition-all">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Manage Articles</h2>
          <p className="text-sm text-gray-500">Create, edit, and monitor your blog performance.</p>
        </div>
        <button 
          onClick={handleWriteNew} 
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-100 active:scale-95 w-full md:w-auto"
        >
          <Plus size={18} /> Write New Article
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-blue-500">
          <Loader2 className="w-10 h-10 animate-spin mb-2" />
          <p className="text-gray-400 font-medium animate-pulse">Fetching articles...</p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-4 md:mx-0 rounded-xl border border-gray-50">
          <table className="w-full text-left text-sm text-gray-500 min-w-[700px]">
            <thead className="text-[10px] text-gray-400 uppercase bg-gray-50/50 font-black tracking-widest">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Article Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Stats</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {blogs.map((blog) => (
                <tr key={blog._id} className="group hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-gray-400 font-medium">{blog.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs md:max-w-md">
                        <div className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {blog.title}
                        </div>
                        <div className="text-[11px] text-gray-400 truncate">/{blog.slug}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-bold">
                        {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4 text-[11px]">
                        <div className="flex flex-col">
                            <span className="text-gray-400 font-bold uppercase tracking-tighter">Likes</span>
                            <span className="text-gray-800 font-black">{blog.likes || 0}</span>
                        </div>
                        <div className="flex flex-col border-l pl-4">
                            <span className="text-gray-400 font-bold uppercase tracking-tighter">Comments</span>
                            <span className="text-gray-800 font-black">{blog.comments?.length || 0}</span>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => handleEdit(blog)} 
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(blog._id)} 
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {blogs.length === 0 && (
            <div className="text-center py-20 bg-gray-50/50">
              <div className="inline-flex p-4 bg-white rounded-2xl shadow-sm border mb-4">
                <FileText className="w-8 h-8 text-gray-200" />
              </div>
              <h3 className="text-gray-800 font-bold">No articles yet</h3>
              <p className="text-gray-400 text-sm mb-6">Your content strategy starts here.</p>
              <button 
                onClick={handleWriteNew}
                className="text-emerald-500 font-bold text-sm hover:underline"
              >
                Click here to write your first post
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogView;