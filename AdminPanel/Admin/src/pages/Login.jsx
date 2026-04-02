import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext); // Context se login function uthaya
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      // Check if response is not OK
      if (!res.ok) {
        throw new Error(data.message || data.msg || "Login failed");
      }

      /**
       * IMPORTANT: Humne AuthContext mein logic likha hai ki login function hi 
       * localStorage ko handle karega. Isliye yahan alag se set karne ki zaroorat nahi.
       */
      login(data.user, data.token); 

      // Redirect to Dashboard
      navigate("/");
      
    } catch (err) {
      console.error("Login Error:", err.message);
      alert(err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-[2rem] shadow-2xl w-[400px] border border-slate-200"
      >
        <h2 className="text-3xl font-black mb-2 italic uppercase tracking-tighter">
          Admin_Login<span className="text-emerald-500">.exe</span>
        </h2>
        <p className="text-[10px] font-mono text-slate-400 mb-8 uppercase tracking-widest">
          Secure_Access_Required
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email_Address</label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full mt-1 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium text-sm"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium text-sm"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        <button className="w-full mt-8 bg-slate-900 text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200">
          Authorize_Access
        </button>
      </form>
    </div>
  );
};

export default Login;