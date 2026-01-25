import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0b0f12] text-gray-300">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Decent
            <span className="text-emerald-400">11</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Integer purus odio, placerat nec ande rhoncus in,
            ullamcorper nec dolor. on aptent taciti sociosqu.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            {[
              <FaFacebookF />,
              <FaTwitter />,
              <FaPinterestP />,
              <FaInstagram />,
            ].map((icon, i) => (
              <div
                key={i}
                className="w-10 h-10 flex items-center justify-center
                           rounded-full bg-black/60 text-white
                           hover:bg-emerald-400 hover:text-black
                           transition"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Our Services
          </h3>
          <ul className="space-y-3">
            {[
              "Strategy & Research",
              "Web Development",
              "Web Solution",
              "Digital Marketing",
              "App Design",
              "App Development",
            ].map((item, i) => (
              <li
                key={i}
                className="hover:text-emerald-400 cursor-pointer transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              "About Us",
              "Services",
              "Project",
              "Blog",
              "Career",
              "Pricing Plan",
            ].map((item, i) => (
              <li
                key={i}
                className="hover:text-emerald-400 cursor-pointer transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Contacts
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-emerald-400 mt-1" />
              <div>
                <p>+880 566 111 985</p>
                <p>+880 657 111 576</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaEnvelope className="text-emerald-400 mt-1" />
              <div>
                <p>info@example.com</p>
                <p>info@support.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-emerald-400 mt-1" />
              <p>
                168/170, Avenue 01, <br />
                Mirpur DOHS, Bangladesh
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6
                        flex flex-col md:flex-row
                        items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            Copyright 2026 <span className="text-white">Decent11</span> |
            Design By <span className="text-white">Egens Lab</span>
          </p>

          <div className="flex gap-6 text-sm">
            <span className="hover:text-emerald-400 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-emerald-400 cursor-pointer">
              Terms of Use
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
