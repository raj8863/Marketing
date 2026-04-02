import React, { useState } from "react";
import { X, Save, Plus, Trash2, Image as ImageIcon } from "lucide-react";

const BlogForm = ({ initialData = null, onSave, onCancel }) => {
  const getTodayFormatted = () => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(new Date());
  };

  const [formData, setFormData] = useState(
    initialData || {
      title: "", 
      slug: "", 
      category: "Digital Marketing", 
      author: "Admin", 
      role: "Editor",
      date: getTodayFormatted(), 
      readTime: "5 min read", 
      image: "", 
      excerpt: "", 
      content: [""]
    }
  );

  // Helper to generate slug from title
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Auto-generate slug if title is changing
    if (name === "title") {
      setFormData((prev) => ({ 
        ...prev, 
        title: value,
        slug: generateSlug(value)
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleContentChange = (index, value) => {
    const newContent = [...formData.content];
    newContent[index] = value;
    setFormData((prev) => ({ ...prev, content: newContent }));
  };

  const addContentBlock = () => setFormData((prev) => ({ ...prev, content: [...prev.content, ""] }));
  const removeContentBlock = (index) => {
    if (formData.content.length > 1) {
        setFormData((prev) => ({ ...prev, content: prev.content.filter((_, i) => i !== index) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedData = { 
        ...formData, 
        content: formData.content.filter(block => block.trim() !== "") 
    };

    const url = initialData 
        ? `https://marketing-b3je.onrender.com/api/blogs/${initialData._id}` 
        : `https://marketing-b3je.onrender.com/api/blogs`;
    
    const method = initialData ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method, 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(cleanedData),
      });
      if (!response.ok) throw new Error("Failed to save blog post");
      onSave();
    } catch (error) {
      alert("Error saving article. Please check your connection.");
    }
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-2xl shadow-xl border border-gray-100 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">
                {initialData ? "Edit Article" : "Write New Article"}
            </h2>
            <p className="text-sm text-gray-400">Drafting as {formData.author}</p>
        </div>
        <button onClick={onCancel} className="text-gray-400 hover:text-red-500 p-2 rounded-full transition-colors">
            <X size={28} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title and Slug */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Article Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="The Future of SEO..." className="w-full p-4 text-xl font-bold bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Slug (URL)</label>
            <input required type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="w-full p-4 bg-blue-50/30 border border-blue-100 rounded-xl text-blue-600 font-mono text-sm outline-none" />
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-6 rounded-2xl">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Author</label>
            <input required type="text" name="author" value={formData.author} onChange={handleInputChange} className="w-full bg-transparent border-b border-gray-200 py-1 outline-none text-sm font-bold" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Category</label>
            <input required type="text" name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-transparent border-b border-gray-200 py-1 outline-none text-sm font-bold" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Date</label>
            <input required type="text" name="date" value={formData.date} onChange={handleInputChange} className="w-full bg-transparent border-b border-gray-200 py-1 outline-none text-sm font-bold" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Read Time</label>
            <input required type="text" name="readTime" value={formData.readTime} onChange={handleInputChange} className="w-full bg-transparent border-b border-gray-200 py-1 outline-none text-sm font-bold" />
          </div>
        </div>

        {/* Image & Excerpt */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2"><ImageIcon size={14}/> Image URL</label>
                <input required type="text" name="image" value={formData.image} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" />
            </div>
            {formData.image && (
                <div className="h-24 w-full rounded-xl overflow-hidden border">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Short Summary (Excerpt)</label>
            <textarea required name="excerpt" value={formData.excerpt} onChange={handleInputChange} rows="2" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none"></textarea>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Article Body */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
                <h3 className="text-lg font-bold text-gray-800">Body Content</h3>
                <p className="text-[10px] text-gray-400">Use "##" at the start of a block for Sub-headings.</p>
            </div>
            <button type="button" onClick={addContentBlock} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:shadow-lg transition flex items-center gap-1">
                <Plus size={16} /> New Paragraph
            </button>
          </div>

          <div className="space-y-4">
            {formData.content.map((block, index) => (
              <div key={index} className="flex gap-4 group">
                <div className="flex-1">
                    <textarea 
                        value={block} 
                        onChange={(e) => handleContentChange(index, e.target.value)} 
                        rows={block.startsWith("##") ? 1 : 5} 
                        className={`w-full p-5 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-blue-100 outline-none transition-all 
                            ${block.startsWith("##") ? "bg-blue-50 text-blue-800 font-bold text-xl border-blue-100" : "bg-white text-gray-600"}`}
                        placeholder={index === 0 ? "Start your story here..." : "Next paragraph..."}
                    />
                </div>
                <button 
                    type="button" 
                    onClick={() => removeContentBlock(index)} 
                    className="self-start mt-4 p-2 text-red-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 pt-8 border-t border-gray-100">
          <button type="button" onClick={onCancel} className="px-6 py-3 font-bold text-gray-400 hover:text-gray-600 transition-colors">Discard Draft</button>
          <button type="submit" className="px-10 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-100 flex items-center gap-2 transition-transform active:scale-95">
            <Save size={20} /> Publish Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
