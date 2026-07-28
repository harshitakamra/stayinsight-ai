import React from "react";

export function Toast({ message, type = "info", onClose }) {
  if (!message) return null;

  const typeStyles = {
    success: "bg-emerald-600 text-white border-emerald-700",
    error: "bg-rose-600 text-white border-rose-700",
    warning: "bg-amber-500 text-white border-amber-600",
    info: "bg-blue-600 text-white border-blue-700",
  };

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce transition-all">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border ${
          typeStyles[type] || typeStyles.info
        }`}
      >
        <span className="font-bold text-lg">{icons[type]}</span>
        <span className="text-sm font-medium pr-2">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white hover:opacity-75 font-bold ml-2 focus:outline-none"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default Toast;
