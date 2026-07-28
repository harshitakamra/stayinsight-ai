function Toast({ message }) {
  return (
    <div className="bg-red-500 text-white p-4 rounded-lg mx-8 mb-5">
      {message}
    </div>
  );
}

export default Toast;