import React, { useState, useEffect } from "react";
import { Save, X, Plus, Trash2, Loader2 } from "lucide-react";

export const PricingForm = ({ selected, onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    name: "", price: "", desc: "", popular: false, color: "slate",
    features: [{ name: "", info: "", isAvailable: true }] 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const addFeature = () => {
    setForm({ ...form, features: [...form.features, { name: "", info: "", isAvailable: true }] });
  };

  const removeFeature = (index) => {
    const updated = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: updated });
  };

  const handleFeatureChange = (index, field, value) => {
    const updated = [...form.features];
    updated[index][field] = value;
    setForm({ ...form, features: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const method = selected ? "PUT" : "POST";
    const url = selected ? `http://localhost:5000/api/pricing/${selected._id}` : "http://localhost:5000/api/pricing";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) onSuccess();
    } catch (err) { alert("Sync Error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-10 rounded-[3rem] border shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black uppercase italic">Plan_Config</h2>
        <button onClick={onCancel}><X /></button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <input className="p-4 bg-slate-50 rounded-2xl outline-none" placeholder="Plan Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input className="p-4 bg-slate-50 rounded-2xl outline-none" placeholder="Price Label" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
        </div>

        <textarea className="w-full p-4 bg-slate-50 rounded-2xl outline-none h-24" placeholder="Description" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} />

        {/* --- DYNAMIC FEATURE SECTION --- */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Unlimited Features List</h4>
            <button type="button" onClick={addFeature} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold">
              <Plus size={14} /> Add Feature Row
            </button>
          </div>

          {form.features.map((feature, index) => (
            <div key={index} className="flex gap-3 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <input className="flex-1 bg-transparent outline-none text-sm font-bold" placeholder="Feature Name" value={feature.name} onChange={e => handleFeatureChange(index, 'name', e.target.value)} />
              <input className="flex-1 bg-transparent outline-none text-xs text-slate-500" placeholder="Info/Subtext" value={feature.info} onChange={e => handleFeatureChange(index, 'info', e.target.value)} />
              <input type="checkbox" checked={feature.isAvailable} onChange={e => handleFeatureChange(index, 'isAvailable', e.target.checked)} className="accent-emerald-500 w-4 h-4" />
              <button type="button" onClick={() => removeFeature(index)} className="text-rose-500 p-2"><Trash2 size={16}/></button>
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">
          {loading ? <Loader2 className="animate-spin mx-auto"/> : "Save Protocol"}
        </button>
      </form>
    </div>
  );
};