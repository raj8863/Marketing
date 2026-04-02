import React, { useState } from 'react';
import { Plus, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';

const BlogForm = ({ initialData = null, onSave, onCancel }) => {

  const getTodayFormatted = () => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
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
      content: [""],
      comments: []   // ✅ Added comments
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (index, value) => {
    const newContent = [...formData.content];
    newContent[index] = value;
    setFormData((prev) => ({ ...prev, content: newContent }));
  };

  const addContentBlock = () => {
    setFormData((prev) => ({ ...prev, content: [...prev.content, ""] }));
  };

  const removeContentBlock = (index) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index)
    }));
  };

  // ✅ DELETE COMMENT
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/blogs/${initialData._id}/comment/${commentId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Delete failed");

      const updatedComments = await res.json();

      setFormData((prev) => ({
        ...prev,
        comments: updatedComments
      }));

    } catch (err) {
      console.error(err);
      alert("Error deleting comment");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      content: formData.content.filter(b => b.trim() !== "")
    };

    const url = initialData
      ? `http://localhost:5000/api/blogs/${initialData._id}`
      : `http://localhost:5000/api/blogs`;

    const method = initialData ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData)
      });

      if (!res.ok) throw new Error("Save failed");

      onSave();

    } catch (err) {
      console.error(err);
      alert("Error saving blog");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-5xl mx-auto">

      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {initialData ? "Edit Article" : "New Article"}
        </h2>
        <button onClick={onCancel}><X /></button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="w-full p-3 border rounded"
        />

        {/* Content Blocks */}
        {formData.content.map((block, i) => (
          <div key={i} className="flex gap-2">
            <textarea
              value={block}
              onChange={(e) => handleContentChange(i, e.target.value)}
              className="w-full p-3 border rounded"
            />
            <button type="button" onClick={() => removeContentBlock(i)}>
              <Trash2 />
            </button>
          </div>
        ))}

        <button type="button" onClick={addContentBlock}>
          <Plus /> Add
        </button>

        {/* ✅ COMMENTS SECTION */}
        {initialData && formData.comments?.length > 0 && (
          <div>
            <h3 className="font-bold text-lg mb-3">Comments</h3>

            {formData.comments.map((c) => (
              <div key={c._id} className="flex justify-between p-3 border mb-2">
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm">{c.text}</p>
                </div>
                <button onClick={() => handleDeleteComment(c._id)}>
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit */}
        <button className="bg-green-500 text-white px-6 py-2 rounded flex items-center gap-2">
          <Save /> Publish
        </button>

      </form>
    </div>
  );
};

export default BlogForm;