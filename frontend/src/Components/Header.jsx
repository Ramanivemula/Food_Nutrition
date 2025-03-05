import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios"; // ✅ Fetch user details
import diet from "../assets/diet.png";
import defaultProfile from "../assets/profile.png";

const Header = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      const token = localStorage.getItem("userToken");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log("Decoded Token:", decoded); // Debugging
  
          if (decoded?.name) {
            setUser({ name: decoded.name });
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("userToken");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
  
    fetchUser();
  
    // Listen for token updates when login occurs
    window.addEventListener("storage", fetchUser);
    return () => window.removeEventListener("storage", fetchUser);
  }, []);  

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-bold text-blue-600">
          <img src={diet} alt="App Logo" className="w-8 h-8 mr-2" />
          NutriTrack
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/check-calories" className="text-gray-700 hover:text-blue-600">Check Calories</Link>
          <Link to="/women-nutrition" className="text-gray-700 hover:text-blue-600">Women</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact Us</Link>
        </nav>

        {/* User Profile Section */}
        <div className="relative">
          {user ? (
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src={defaultProfile}
                alt="User Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-600"
              />
              <span className="text-gray-700 font-semibold">{user.name}</span>
            </div>
          ) : (
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
              Signup/Login
            </Link>
          )}

          {/* Dropdown Menu */}
          {showDropdown && user && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg p-2">
              <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                View Profile
              </Link>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
