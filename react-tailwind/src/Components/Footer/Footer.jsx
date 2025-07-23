import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-animated-bg bg-gray-900 text-gray-300 pt-6 pb-4 text-sm relative">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Logo + Description */}
          <div>
            <h2 className="text-white text-xl font-bold mb-3">MyShop</h2>
            <p className="text-gray-400 text-xs leading-relaxed">
              Best deals on electronics and fashion with fast delivery.
            </p>
            <div className="flex space-x-2 mt-3">
              {["amazon-pay.png", "paypal.png", "American-Express-Color.png"].map((img, i) => (
                <img
                  key={i}
                  src={`/images/${img}`}
                  alt={img}
                  className="h-5 transition-transform duration-300 hover:scale-110 hover:-translate-y-1"
                />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Quick Links</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-primary transition">Home</a></li>
              <li><a href="/brands" className="hover:text-primary transition">Brands</a></li>
              <li><a href="/categories" className="hover:text-primary transition">Categories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Support</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-primary transition">FAQs</a></li>
              <li><a href="#" className="hover:text-primary transition">Shipping</a></li>
              <li><a href="#" className="hover:text-primary transition">Returns</a></li>
              <li><a href="#" className="hover:text-primary transition">Tracking</a></li>
            </ul>
          </div>

          {/* App + Social */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Get the App</h3>
            <div className="flex space-x-2 mb-3">
              <img src="/images/get-apple-store.png" alt="Apple Store"
                   className="h-8 transition-transform duration-300 hover:scale-105 hover:-translate-y-1" />
              <img src="/images/get-google-play.png" alt="Google Play"
                   className="h-8 transition-transform duration-300 hover:scale-105 hover:-translate-y-1" />
            </div>
            <div className="flex space-x-2 text-lg">
              {[
                { Icon: FaFacebookF, color: "bg-blue-600" },
                { Icon: FaTwitter, color: "bg-sky-400" },
                { Icon: FaInstagram, color: "bg-pink-500" },
                { Icon: FaLinkedinIn, color: "bg-blue-700" },
              ].map(({ Icon, color }, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${color} shadow-md hover:scale-110 transition-transform`}
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-6 pt-3 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} MyShop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
