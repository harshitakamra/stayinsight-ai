import React from "react";

export function Loader({ text = "Loading data..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{text}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white dark:bg-slate-800 rounded-xl p-5 shadow space-y-3 border border-gray-200 dark:border-gray-700">
      <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-1/3"></div>
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-4/5"></div>
      <div className="h-6 bg-gray-300 dark:bg-slate-700 rounded w-1/4 mt-4"></div>
    </div>
  );
}

export default Loader;
