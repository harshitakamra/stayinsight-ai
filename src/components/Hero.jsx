import { useTheme } from "../context/ThemeContext";

function Hero() {
  const { darkMode } = useTheme();

  return (
    <section className="text-center py-20">

      <h1
        className={`text-7xl font-bold ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        StayInsight AI
      </h1>

      <p
        className={`text-xl mt-4 ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Analyze Guest Reviews with Artificial Intelligence
      </p>

    </section>
  );
}

export default Hero;