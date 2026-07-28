import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userToken = localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-blue-600 dark:bg-slate-900 text-white shadow-lg sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="p-1.5 bg-white text-blue-600 rounded-lg text-lg font-black shadow">
              SI
            </span>
            <span>StayInsight AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-semibold">
            <Link to="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-200 transition">
              About
            </Link>
            {isLoggedIn && (
              <Link to="/dashboard" className="hover:text-blue-200 transition">
                Dashboard
              </Link>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur transition"
            >
              {darkMode ? "🌞 Light" : "🌙 Dark"}
            </button>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-1.5 rounded-lg text-xs font-bold transition shadow-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-white/10 p-2 rounded-lg text-xs font-semibold"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-blue-200 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-700 dark:bg-slate-800 px-4 pt-2 pb-4 space-y-2 border-t border-blue-500 dark:border-slate-700">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold hover:text-blue-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold hover:text-blue-200"
          >
            About
          </Link>
          {isLoggedIn && (
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold hover:text-blue-200"
            >
              Dashboard
            </Link>
          )}

          <div className="pt-2 border-t border-blue-600 dark:border-slate-700 flex flex-col gap-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center bg-white text-blue-600 py-2 rounded-lg text-sm font-bold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center bg-indigo-700 text-white py-2 rounded-lg text-sm font-bold"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;