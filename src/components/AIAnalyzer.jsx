import React, { useState } from "react";
import api from "../api/api";

export function AIAnalyzer({ onAnalysisComplete }) {
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setError("Please paste or type guest review text to analyze.");
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setResult(null);

    try {
      // Simulate streaming delay for realistic AI feel
      await new Promise((res) => setTimeout(res, 900));

      const response = await api.post("/ai/analyze", {
        review_text: inputText.trim(),
      });

      setResult(response.data);
      if (onAnalysisComplete) {
        onAnalysisComplete(response.data);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "AI Sentiment Analysis service unavailable.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyReply = () => {
    if (result?.suggested_reply) {
      navigator.clipboard.writeText(result.suggested_reply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sentimentColor = {
    Positive: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    Neutral: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    Negative: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 my-8 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl text-white font-bold text-xl shadow-md">
            ✨
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              StayInsight AI Sentiment & Response Studio
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Instantly analyze guest reviews, extract key topics, and generate professional guest responses.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleAnalyze} className="space-y-4">
        <div>
          <textarea
            rows="3"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste guest feedback here (e.g., 'Room view was stunning and staff was super friendly, but the shower water pressure was low...')"
            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm transition"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 rounded-xl text-sm">
            ⚠️ {error}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {["Great host & clean room", "Slow check-in experience", "Delicious breakfast!"].map((preset) => (
              <button
                type="button"
                key={preset}
                onClick={() => setInputText(preset)}
                className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full transition"
              >
                + "{preset}"
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>AI Processing...</span>
              </>
            ) : (
              <>
                <span>Run AI Insight</span>
                <span>🚀</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Streaming / Loading Animated State */}
      {isAnalyzing && (
        <div className="mt-6 p-6 bg-blue-50/50 dark:bg-slate-900/50 rounded-xl border border-blue-100 dark:border-slate-700 animate-pulse space-y-3">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-ping"></span>
            Extracting topics, computing sentiment matrix & generating guest response...
          </div>
          <div className="h-4 bg-blue-200/60 dark:bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-blue-200/60 dark:bg-slate-700 rounded w-1/2"></div>
        </div>
      )}

      {/* Output Display */}
      {result && !isAnalyzing && (
        <div className="mt-6 p-6 bg-gray-50 dark:bg-slate-900/80 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-5 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Detected Sentiment:</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  sentimentColor[result.sentiment] || sentimentColor.Neutral
                }`}
              >
                {result.sentiment} ({(result.sentiment_score * 100).toFixed(0)}%)
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400 font-medium">Extracted Themes:</span>
              {result.themes.map((theme) => (
                <span
                  key={theme}
                  className="px-2.5 py-1 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-semibold border border-blue-200 dark:border-slate-700"
                >
                  #{theme}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Executive AI Summary</h4>
            <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">{result.summary}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Recommended Operational Actions</h4>
            <ul className="space-y-1.5">
              {result.action_items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-blue-500">▪</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Generated Guest Reply Draft
              </h4>
              <button
                onClick={handleCopyReply}
                className="text-xs bg-indigo-50 dark:bg-slate-700 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-semibold px-3 py-1 rounded-lg transition flex items-center gap-1"
              >
                {copied ? "✓ Copied!" : "📋 Copy Reply"}
              </button>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-200 italic">"{result.suggested_reply}"</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIAnalyzer;
