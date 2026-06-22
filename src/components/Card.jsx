import { useTheme } from "../context/ThemeContext";

function Card({ title, text }) {
  const { darkMode } = useTheme();

  return (
    <div
      className={`rounded-xl shadow-lg p-8 ${
        darkMode
          ? "bg-slate-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl font-bold mb-4">
        {title}
      </h2>

      <p>
        {text}
      </p>
    </div>
  );
}

export default Card;