import { useTheme } from "../context/ThemeContext";

function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`text-center p-5 ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-gray-200 text-black"
      }`}
    >
      © 2026 StayInsight AI
    </footer>
  );
}

export default Footer;