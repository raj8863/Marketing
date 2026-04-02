import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Plus, Trash2, Save } from "lucide-react";

const AdminPrivacy = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Load data
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/privacy")
      .then((res) => {
        setSections(res.data?.sections || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // ➕ Add Section
  const addSection = () => {
    setSections([...sections, { title: "", content: "" }]);
  };

  // ✏️ Update
  const handleChange = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  // ❌ Delete
  const deleteSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  // 💾 Save
  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/privacy/update", {
        sections,
      });
      alert("✅ Updated Successfully");
    } catch (err) {
      alert("❌ Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white p-8">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black tracking-tight">
          Privacy Policy Editor
        </h1>

        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded-xl font-bold transition-all"
        >
          <Save size={18} />
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* EMPTY STATE */}
      {sections.length === 0 && (
        <div className="text-center text-gray-400 mb-10">
          No sections yet. Click "Add Section" to start.
        </div>
      )}

      {/* SECTIONS */}
      <div className="space-y-6">
        {sections.map((sec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-emerald-400">
                Section {index + 1}
              </h3>

              <button
                onClick={() => deleteSection(index)}
                className="text-red-400 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* TITLE */}
            <input
              type="text"
              placeholder="Enter section title..."
              value={sec.title}
              onChange={(e) =>
                handleChange(index, "title", e.target.value)
              }
              className="w-full mb-4 p-3 rounded-xl bg-black/40 border border-white/10 focus:border-emerald-500 outline-none"
            />

            {/* CONTENT */}
            <textarea
              rows={4}
              placeholder="Enter section content..."
              value={sec.content}
              onChange={(e) =>
                handleChange(index, "content", e.target.value)
              }
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10 focus:border-emerald-500 outline-none"
            />
          </motion.div>
        ))}
      </div>

      {/* ADD BUTTON */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={addSection}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-bold transition-all"
        >
          <Plus size={18} />
          Add New Section
        </button>
      </div>
    </div>
  );
};

export default AdminPrivacy;