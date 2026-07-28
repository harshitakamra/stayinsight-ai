import React from "react";

export function EmptyState({ title = "No reviews found", message = "No records match your criteria.", actionText, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-800/60 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 text-center my-6">
      <div className="w-16 h-16 bg-blue-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-4 text-3xl">
        🔍
      </div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mb-6">{message}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-md transition"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
