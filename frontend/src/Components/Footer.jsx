import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-blue-500">NutriTrack</h2>
          <p className="text-gray-400 mt-2">
            Your ultimate guide to tracking calories and maintaining a healthy lifestyle.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><Link to="/" className="text-gray-400 hover:text-blue-400">Home</Link></li>
            <li><Link to="/check-calories" className="text-gray-400 hover:text-blue-400">Check Calories</Link></li>
            <li><Link to="/women" className="text-gray-400 hover:text-blue-400">Women's Nutrition</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-blue-400">Contact Us</Link></li>
          </ul>
        </div>

        {/* Social Media & Contact */}
        <div>
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-gray-400 hover:text-blue-400 text-xl"><FaFacebookF /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-xl"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-xl"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-xl"><FaLinkedin /></a>
          </div>
          <p className="text-gray-400 mt-4 text-sm">📧 support@nutritrack.com</p>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} NutriTrack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
