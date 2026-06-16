function Card({ title, text }) {
  return (
    <div className="border rounded-lg p-8 shadow hover:shadow-lg transition">
      <h2 className="text-2xl font-bold mb-3">
        {title}
      </h2>

      <p className="text-lg">
        {text}
      </p>
    </div>
  );
}

export default Card;