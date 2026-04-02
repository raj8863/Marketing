import React, { useState } from "react";
import { X, Save, Image as ImageIcon, Code, Briefcase, Link as LinkIcon, User, ExternalLink, Loader2 } from "lucide-react";

const ProjectForm = ({ onSave, onCancel, initialData = null }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    title: "",
    slug: "",
    category: "Web Design",
    client: "",
    timeline: "",
    role: "",        // Added Role
    projectLink: "",   // Added Live Link
    mainImage: "",
    challengeText: "",
    challengePoints: "", 
    solutionText: "",
    techStack: "",      
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setFormData({
        ...formData,
        title: value,
        slug: value.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanedData = {
      ...formData,
      challengePoints: typeof formData.challengePoints === 'string' 
        ? formData.challengePoints.split(',').map(p => p.trim()).filter(p => p !== "")
        : formData.challengePoints,
      techStack: typeof formData.techStack === 'string'
        ? formData.techStack.split(',').map(t => t.trim()).filter(t => t !== "")
        : formData.techStack,
    };

    try {
      const url = initialData 
        ? `http://localhost:5000/api/projects/${initialData._id}` 
        : "http://localhost:5000/api/projects";
      
      const response = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      if (response.ok) {
        onSave();
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      alert("Error saving project. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-5xl mx-auto overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="bg-gray-900 p-8 flex justify-between items-center text-white">
        <div>
          <h2 className="text-3xl font-black tracking-tight">
            {initialData ? "Edit Showcase" : "Create Showcase"}
          </h2>
          <p className="text-gray-400 text-sm mt-1">Fill in the details for your new case study.</p>
        </div>
        <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X size={28} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-10 space-y-8">
        {/* Section 1: Identity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Project Title</label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                required name="title" value={formData.title} onChange={handleInputChange}
                placeholder="e.g., FinFlow Banking App"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-bold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Slug (Auto-generated)</label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-4 text-gray-300" size={20} />
              <input
                readOnly name="slug" value={formData.slug}
                className="w-full pl-12 pr-4 py-4 bg-gray-100 border border-gray-200 rounded-2xl outline-none text-gray-500 font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Core Details (Including Role) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Category</label>
            <input name="category" value={formData.category} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Client</label>
            <input name="client" value={formData.client} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1 flex items-center gap-1">
              <User size={12}/> Your Role
            </label>
            <input name="role" value={formData.role} onChange={handleInputChange} placeholder="Lead Designer" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Timeline</label>
            <input name="timeline" value={formData.timeline} onChange={handleInputChange} placeholder="e.g. 3 Months" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
        </div>

        {/* Section 3: Visuals & External Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Main Cover Image URL</label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                required name="mainImage" value={formData.mainImage} onChange={handleInputChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            {formData.mainImage && (
              <div className="mt-4 rounded-3xl overflow-hidden border-4 border-gray-50 shadow-inner h-32 w-full bg-gray-100">
                <img src={formData.mainImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Live Project Link (URL)</label>
            <div className="relative">
              <ExternalLink className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                name="projectLink" value={formData.projectLink} onChange={handleInputChange}
                placeholder="https://live-site.com"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <p className="text-gray-400 text-[10px] mt-2 italic px-1">Optional: Link to the production site or demo.</p>
          </div>
        </div>

        {/* Section 4: Deep Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">The Challenge</label>
            <textarea
              name="challengeText" value={formData.challengeText} onChange={handleInputChange}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none h-40 resize-none focus:ring-2 focus:ring-emerald-500"
              placeholder="What problem were we solving?"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">The Solution</label>
            <textarea
              name="solutionText" value={formData.solutionText} onChange={handleInputChange}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none h-40 resize-none focus:ring-2 focus:ring-emerald-500"
              placeholder="How did we solve it?"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1 flex items-center gap-2">
            <Code size={14} /> Technologies (Comma Separated)
          </label>
          <input
            name="techStack" value={formData.techStack} onChange={handleInputChange}
            placeholder="React, Node.js, MongoDB, Figma"
            className="w-full p-4 bg-gray-900 text-emerald-400 font-mono text-sm border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end items-center gap-6 pt-6 border-t border-gray-100">
          <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-900 font-bold transition-colors">
            Discard Changes
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-emerald-200 transition-all active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            {initialData ? "Update Case Study" : "Publish Case Study"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;