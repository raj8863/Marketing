import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaTwitter, 
  FaLinkedinIn, FaInstagram, FaPaperPlane, FaCheck, 
  FaSpinner, FaWhatsapp, FaArrowRight 
} from "react-icons/fa";
import Herolayout from "../components/herolayout/Herolayout";

const contactInfo = [
  { icon: <FaPhoneAlt />, title: "Direct Line", content: "+91 88639 07523", sub: "Mon-Fri 9am - 6pm", link: "tel:+918863907523", color: "bg-blue-50 text-blue-600" },
  { icon: <FaWhatsapp />, title: "WhatsApp", content: "+91 88639 07523", sub: "Instant Response", link: "https://wa.me/918863907523", color: "bg-emerald-50 text-emerald-600" },
  { icon: <FaEnvelope />, title: "Email Support", content: "infodecent11@gmail.com", sub: "24/7 Availability", link: "mailto:infodecent11@gmail.com", color: "bg-purple-50 text-purple-600" },
  { icon: <FaMapMarkerAlt />, title: "HQ Location", content: "SAS Tower, 9th Flr, Gurgaon", sub: "Haryana 122001, India", link: "https://maps.google.com", color: "bg-orange-50 text-orange-600" },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API delay
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <div className="bg-[#fafafa] min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
      <Herolayout 
        title="Contact Us" 
        subtitle="We're ready to engineer your vision into a digital reality." 
      />

      <section className="relative py-24 lg:py-32 px-6">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* --- LEFT: Brand Messaging & Info --- */}
            <div className="lg:col-span-5">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                className="mb-12"
              >
                <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
                  Inquiry_Portal_V2
                </span>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase mb-8">
                  Let's Build <br />
                  <span className="text-transparent stroke-text italic font-light text-slate-400">Something</span><br />
                  Iconic.
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                  Have a complex challenge? Our team of engineers and designers are ready to help you scale.
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    href={item.link}
                    key={index}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-4 transition-transform group-hover:rotate-6`}>
                      {item.icon}
                    </div>
                    <h4 className="text-slate-900 font-bold text-sm uppercase tracking-tight">{item.title}</h4>
                    <p className="text-slate-500 text-[11px] font-medium leading-tight mt-1">{item.content}</p>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* --- RIGHT: The Modern Form --- */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20"
                    >
                      <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaCheck size={40} />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 uppercase italic">Payload Received</h3>
                      <p className="text-slate-500 mt-4">We'll get back to you within 12 business hours.</p>
                      <button onClick={() => setStatus("idle")} className="mt-8 font-black text-xs uppercase tracking-widest text-emerald-600 hover:underline">New Submission</button>
                    </motion.div>
                  ) : (
                    <form key="form" onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <InputField label="Full Name" name="name" placeholder="E.g. Elon Musk" onChange={handleChange} value={formData.name} />
                        <InputField label="Email Address" type="email" name="email" placeholder="name@company.com" onChange={handleChange} value={formData.email} />
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                        <InputField label="Phone Number" name="phone" placeholder="+91 ..." onChange={handleChange} value={formData.phone} />
                        <InputField label="Subject" name="subject" placeholder="Project Scale" onChange={handleChange} value={formData.subject} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Message Detail</label>
                        <textarea
                          name="message"
                          rows="4"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Briefly describe your goals..."
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="group w-full bg-slate-900 hover:bg-emerald-600 text-white font-black py-6 rounded-2xl transition-all duration-500 flex items-center justify-center gap-4 uppercase tracking-[0.3em] text-xs"
                      >
                        {status === "loading" ? <FaSpinner className="animate-spin" /> : (
                          <>Dispatch Inquiry <FaArrowRight className="group-hover:translate-x-2 transition-transform" /></>
                        )}
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Aesthetic Map */}
      <div className="px-6 pb-24">
        <div className="max-w-7xl mx-auto h-[500px] rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.431284561845!2d77.04256567550186!3d28.436402775773173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d180632d43e5d%3A0xc3124847e52b2170!2sSAS%20Tower!5e0!3m2!1sen!2sin!4v1709292929292!5m2!1sen!2sin"
            width="100%" height="100%" style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }} loading="lazy" title="Office Location"
          ></iframe>
          <div className="absolute top-8 left-8 p-6 bg-white/80 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl max-w-xs">
            <h5 className="font-black text-slate-900 uppercase tracking-tighter">Decent HQ</h5>
            <p className="text-xs text-slate-500 mt-2">Tower B, Sas Tower, Sector 38, Medanta, Gurgaon</p>
          </div>
        </div>
      </div>

      <style>{`
        .stroke-text { -webkit-text-stroke: 1.5px #cbd5e1; text-stroke: 1.5px #cbd5e1; }
      `}</style>
    </div>
  );
};

/* Reusable Input Component for cleaner code */
const InputField = ({ label, type = "text", name, placeholder, onChange, value }) => (
  <div className="w-full">
    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">{label}</label>
    <input
      type={type}
      name={name}
      required
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all placeholder:text-slate-300"
    />
  </div>
);

export default Contact;