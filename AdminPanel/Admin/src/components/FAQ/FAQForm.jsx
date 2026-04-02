import React, { useState, useEffect } from "react";

const FAQForm = ({ selected, onSuccess }) => {
  const [form, setForm] = useState({ category: "", question: "", answer: "" });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = selected ? "PUT" : "POST";
    const url = selected ? `https://marketing-b3je.onrender.com/api/faqs/${selected._id}` : "https://marketing-b3je.onrender.com/api/faqs";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 space-y-4">
      <input 
        className="w-full p-4 bg-slate-50 rounded-xl" 
        placeholder="Category (e.g. SEO)" 
        value={form.category} 
        onChange={(e) => setForm({...form, category: e.target.value})} 
      />
      <input 
        className="w-full p-4 bg-slate-50 rounded-xl" 
        placeholder="Question" 
        value={form.question} 
        onChange={(e) => setForm({...form, question: e.target.value})} 
      />
      <textarea 
        className="w-full p-4 bg-slate-50 rounded-xl h-32" 
        placeholder="Answer" 
        value={form.answer} 
        onChange={(e) => setForm({...form, answer: e.target.value})} 
      />
      <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs">
        Save FAQ Node
      </button>
    </form>
  );
};

export default FAQForm;
