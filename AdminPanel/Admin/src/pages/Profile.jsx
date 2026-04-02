import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, ShieldAlert, Trash2, Camera, ArrowLeft, RefreshCw } from "lucide-react";

const Profile = ({ setActiveView }) => {
  const { user, login, logout } = useContext(AuthContext);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Refs and state for image handling
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null); 
  const [previewUrl, setPreviewUrl] = useState(null); 

  const navigate = useNavigate();

  // FIX 1: Standardized Bearer Token Format
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    // Ensure "Bearer " prefix is exactly as the backend middleware expects
    return token ? `Bearer ${token}` : "";
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Revoke old object URL to prevent memory leaks
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 1. READ: Refresh data from server
  const loadProfile = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { "Authorization": getAuthHeader() }
      });
      
      // FIX 2: Check for HTML response (SyntaxError prevention)
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, the server didn't send JSON. Check your API route!");
      }

      const data = await res.json();
      if (res.ok) {
        setForm({ name: data.name, email: data.email });
      } else if (res.status === 401) {
        logout();
        navigate("/login");
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    loadProfile();
    // Cleanup preview URL on unmount
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, []);

  // 2. UPDATE Logic
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    
    // Check if a file was actually selected
    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          // IMPORTANT: Do NOT set 'Content-Type' manually when using FormData
          "Authorization": getAuthHeader()
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        login(data); // Update global state
        localStorage.setItem("user", JSON.stringify(data));
        alert("System Parameters Synchronized Successfully");
      } else {
        alert(data.msg || "Session expired. Please login again.");
      }
    } catch (err) {
      alert("Network Error: Check Backend Connection");
    } finally {
      setLoading(false);
    }
  };

  // 3. DELETE Logic
  const handleDelete = async () => {
    if (window.confirm("CRITICAL: Permanent deletion of account. Proceed?")) {
      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          method: "DELETE",
          headers: { "Authorization": getAuthHeader() }
        });
        if (res.ok) {
          logout();
          navigate("/login");
        }
      } catch (err) {
        alert("Termination sequence failed.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => setActiveView("Dashboard")}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Return_to_Main_Terminal
        </button>
        <button 
          onClick={loadProfile}
          className={`p-2 text-slate-400 hover:text-emerald-500 transition-all ${isSyncing ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-700 p-1 shadow-2xl overflow-hidden">
              <div className="w-full h-full bg-white rounded-[2.3rem] flex items-center justify-center text-4xl font-black text-slate-900 uppercase italic">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : user?.profileImage ? (
                  <img src={`http://localhost:5000${user.profileImage}`} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  form.name.charAt(0) || "U"
                )}
              </div>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />

            <button 
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-1 right-1 p-3 bg-emerald-500 text-white rounded-2xl border-4 border-white hover:scale-110 transition-transform shadow-lg"
            >
              <Camera size={18} />
            </button>
          </div>
          <h2 className="mt-6 text-2xl font-black text-slate-900 tracking-tighter uppercase italic">{form.name}</h2>
          <p className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-[0.3em]">Access_Level: Admin</p>
        </div>

        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <User size={12}/> Identity_Name
                </label>
                <input 
                  type="text"
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 font-bold text-slate-700"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Mail size={12}/> Network_Email
                </label>
                <input 
                  type="email"
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 font-bold text-slate-700"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row gap-4">
              <button 
                type="submit"
                disabled={loading}
                className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
              >
                {loading ? "Committing_Changes..." : "Apply_Configuration"}
              </button>
              <button 
                type="button"
                onClick={handleDelete}
                className="px-8 py-4 bg-rose-50 text-rose-500 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-500 hover:text-white transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </form>

          <div className="mt-8 flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
            <ShieldAlert size={20} className="text-emerald-600" />
            <p className="text-[10px] font-bold text-emerald-700 uppercase leading-tight">
              Privacy Shield Active. Your data is encrypted and stored in high-security MERN architecture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;