import React, { useState, useEffect } from "react";

export function ReviewModal({ isOpen, onClose, onSubmit, initialData = null, isLoading = false }) {
  const [guest, setGuest] = useState("");
  const [review, setReview] = useState("");
  const [sentiment, setSentiment] = useState("Positive");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setGuest(initialData.guest || "");
      setReview(initialData.review || "");
      setSentiment(initialData.sentiment || "Positive");
    } else {
      setGuest("");
      setReview("");
      setSentiment("Positive");
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!guest.trim()) errs.guest = "Guest name is required.";
    if (!review.trim()) errs.review = "Review body text is required.";
    if (review.trim().length < 5) errs.review = "Review must be at least 5 characters long.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ guest: guest.trim(), review: review.trim(), sentiment });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {initialData ? "Edit Review" : "Add New Guest Review"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Guest Name
            </label>
            <input
              type="text"
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              className={`w-full p-3 rounded-lg border ${
                errors.guest ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none`}
            />
            {errors.guest && <p className="text-red-500 text-xs mt-1">{errors.guest}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Guest Feedback / Review Text
            </label>
            <textarea
              rows="4"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="e.g. Great host, clean rooms, and beautiful view."
              className={`w-full p-3 rounded-lg border ${
                errors.review ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none`}
            />
            {errors.review && <p className="text-red-500 text-xs mt-1">{errors.review}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Sentiment Classification
            </label>
            <select
              value={sentiment}
              onChange={(e) => setSentiment(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Positive">Positive ⭐⭐⭐⭐⭐</option>
              <option value="Neutral">Neutral ⭐⭐⭐</option>
              <option value="Negative">Negative ⭐</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600 text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition flex items-center gap-2"
            >
              {isLoading ? "Saving..." : initialData ? "Update Review" : "Create Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewModal;
