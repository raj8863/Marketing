import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff, ArrowRight, Zap, ShieldCheck } from "lucide-react";

const AdminLogin = ({ onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate Industry-Level Auth API Call
    try {
      // In production: await axios.post('/api/auth/login', formData)
      setTimeout(() => {
        if (formData.email === "admin@verto.com" && formData.password === "pro123") {
          onLoginSuccess();
        } else {
          setError("Invalid cryptographic credentials. Access Denied.");
        }
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError("Server connection timeout. Internal Error 500.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200/40 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-violet-200/40 rounded-full blur-[120px]" />

      <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 overflow-hidden border border-slate-100 relative z-10">
        
        {/* Left Side: Branding & Marketing */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-slate-900 text-white relative">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <Zap size={24} className="fill-white text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tighter">VERTO <span className="text-indigo-400">PRO</span></h1>
            </div>
            
            <h2 className="text-4xl font-black leading-tight mb-6">
              The Digital <br /> Revolution starts <br /> in <span className="text-indigo-400 italic">patna.</span>
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
              Enter the command center to manage your regional SEO engine and conversion funnels.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">
              Biometric Secure Layer Active
            </p>
          </div>

          {/* Abstract Design Background */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Initialize Session</h3>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Authentication Required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">System Identifier</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="admin@verto.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 rounded-2xl outline-none transition-all font-medium text-slate-700"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Cipher</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 rounded-2xl outline-none transition-all font-medium text-slate-700"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-rose-50 text-rose-600 p-4 rounded-2xl text-xs font-bold flex items-center gap-3 border border-rose-100 animate-shake">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                {error}
              </div>
            )}

            {/* Action Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Authorize Entry
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            Protected by Verto-Shield Encyption
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;