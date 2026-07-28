function Card({ title, text }) {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-8 transition-colors duration-300">

      <h2 className="text-4xl font-bold text-black dark:text-white mb-5">
        {title}
      </h2>

      <p className="text-lg text-gray-700 dark:text-gray-300">
        {text}
      </p>

    </div>
  );
}

export default Card;