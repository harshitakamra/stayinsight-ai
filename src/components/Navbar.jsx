import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <nav className="bg-blue-600 text-white p-5">
      <div className="flex justify-between items-center">

        <div className="flex gap-8 text-lg">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white text-black px-4 py-2 rounded-lg font-semibold"
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;