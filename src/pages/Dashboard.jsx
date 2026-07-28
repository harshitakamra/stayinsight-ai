import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/api";

import Loader from "../components/Loader";
import Toast from "../components/Toast";
import ConfirmModal from "../components/ConfirmModal";
import ReviewModal from "../components/ReviewModal";
import EmptyState from "../components/EmptyState";
import AIAnalyzer from "../components/AIAnalyzer";

function Dashboard() {
  const navigate = useNavigate();

  // State Management
  const [userEmail, setUserEmail] = useState("");
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    total_reviews: 0,
    positive_reviews: 0,
    neutral_reviews: 0,
    negative_reviews: 0,
    themes: ["Host", "Location", "Cleanliness", "Food", "Service"],
    ai_recommendations: [],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("All");

  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Modals state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [deletingReviewId, setDeletingReviewId] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch logged-in user profile
  const fetchUserProfile = useCallback(async () => {
    try {
      const res = await api.get("/users/me");
      setUserEmail(res.data.email);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      showToast("Could not load user profile", "warning");
    }
  }, []);

  // Fetch reviews & stats from FastAPI backend
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [reviewsRes, statsRes] = await Promise.all([
        api.get("/reviews"),
        api.get("/reviews/stats"),
      ]);

      setReviews(reviewsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      showToast("Failed to fetch reviews from server. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
      return;
    }

    fetchUserProfile();
    fetchDashboardData();
  }, [fetchUserProfile, fetchDashboardData, navigate]);

  // Create or Update Review Handler
  const handleSaveReview = async (formData) => {
    setActionLoading(true);
    try {
      if (editingReview) {
        // PUT update
        const res = await api.put(`/reviews/${editingReview.id}`, formData);
        setReviews((prev) => prev.map((r) => (r.id === editingReview.id ? res.data : r)));
        showToast("Review updated successfully!", "success");
      } else {
        // POST create
        const res = await api.post("/reviews", formData);
        setReviews((prev) => [res.data, ...prev]);
        showToast("New review added successfully!", "success");
      }

      setIsReviewModalOpen(false);
      setEditingReview(null);
      // Refresh stats
      const statsRes = await api.get("/reviews/stats");
      setStats(statsRes.data);
    } catch (err) {
      console.error("Error saving review:", err);
      showToast("Failed to save review. " + (err.response?.data?.detail || ""), "error");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Review Handler
  const handleDeleteReview = async () => {
    if (!deletingReviewId) return;
    setActionLoading(true);
    try {
      await api.delete(`/reviews/${deletingReviewId}`);
      setReviews((prev) => prev.filter((r) => r.id !== deletingReviewId));
      showToast("Review deleted successfully.", "success");
      setDeletingReviewId(null);

      // Refresh stats
      const statsRes = await api.get("/reviews/stats");
      setStats(statsRes.data);
    } catch (err) {
      console.error("Error deleting review:", err);
      showToast("Failed to delete review.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered Reviews
  const filteredReviews = reviews.filter((item) => {
    const matchesSearch =
      item.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.review.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSentiment =
      sentimentFilter === "All" || item.sentiment.toLowerCase() === sentimentFilter.toLowerCase();
    return matchesSearch && matchesSentiment;
  });

  const getSentimentBadge = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border-emerald-300";
      case "negative":
        return "bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300 border-rose-300";
      default:
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border-amber-300";
    }
  };

  const getSentimentStars = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case "positive":
        return "⭐⭐⭐⭐⭐";
      case "negative":
        return "⭐";
      default:
        return "⭐⭐⭐";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full text-black dark:text-white">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Guest Review Analytics
              </h1>
              {userEmail && (
                <span className="hidden sm:inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full border border-blue-300 dark:border-blue-700">
                  👤 {userEmail}
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm md:text-base">
              Live sentiment monitoring, theme detection, and AI-powered management insights.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingReview(null);
              setIsReviewModalOpen(true);
            }}
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2"
          >
            <span>+ Add Guest Review</span>
          </button>
        </div>

        {/* Statistics Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 border-l-4 border-blue-500 transition hover:shadow-lg">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Total Reviews
            </h3>
            <p className="text-3xl md:text-4xl font-black mt-2 text-gray-900 dark:text-white">
              {stats.total_reviews}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 border-l-4 border-emerald-500 transition hover:shadow-lg">
            <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Positive Reviews
            </h3>
            <p className="text-3xl md:text-4xl font-black mt-2 text-emerald-600 dark:text-emerald-400">
              {stats.positive_reviews}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 border-l-4 border-amber-500 transition hover:shadow-lg">
            <h3 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Neutral Reviews
            </h3>
            <p className="text-3xl md:text-4xl font-black mt-2 text-amber-600 dark:text-amber-400">
              {stats.neutral_reviews}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 border-l-4 border-rose-500 transition hover:shadow-lg">
            <h3 className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              Negative Reviews
            </h3>
            <p className="text-3xl md:text-4xl font-black mt-2 text-rose-600 dark:text-rose-400">
              {stats.negative_reviews}
            </p>
          </div>
        </div>

        {/* AI Analyzer Studio Component */}
        <AIAnalyzer
          onAnalysisComplete={(analysis) => {
            showToast(`AI Sentiment Analyzed: ${analysis.sentiment}`, "info");
          }}
        />

        {/* Search & Filter Controls */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guest reviews by name or text..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
              <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
            </div>

            {/* Sentiment Filter Tabs */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
              {["All", "Positive", "Neutral", "Negative"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSentimentFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    sentimentFilter === filter
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Guest Reviews ({filteredReviews.length})</h2>
            <button
              onClick={fetchDashboardData}
              className="text-xs bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 px-3 py-1.5 rounded-lg font-semibold transition"
            >
              🔄 Refresh List
            </button>
          </div>

          {isLoading ? (
            <Loader text="Loading live reviews from FastAPI backend..." />
          ) : filteredReviews.length === 0 ? (
            <EmptyState
              title="No guest reviews found"
              message={
                searchQuery
                  ? `No reviews matched "${searchQuery}". Try clearing your search.`
                  : "You haven't recorded any guest reviews yet."
              }
              actionText="+ Add Your First Review"
              onAction={() => {
                setEditingReview(null);
                setIsReviewModalOpen(true);
              }}
            />
          ) : (
            <div className="grid gap-4">
              {filteredReviews.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700 transition hover:shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="space-y-2 flex-grow">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-bold text-lg text-gray-900 dark:text-white">
                        {item.guest}
                      </span>
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs font-bold border ${getSentimentBadge(
                          item.sentiment
                        )}`}
                      >
                        {item.sentiment}
                      </span>
                      <span className="text-xs">{getSentimentStars(item.sentiment)}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm italic">
                      "{item.review}"
                    </p>
                  </div>

                  {/* Actions (Edit / Delete) */}
                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <button
                      onClick={() => {
                        setEditingReview(item);
                        setIsReviewModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-blue-50 dark:bg-slate-700 dark:hover:bg-slate-600 text-blue-600 dark:text-blue-400 font-semibold text-xs rounded-lg transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => setDeletingReviewId(item.id)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-red-50 dark:bg-slate-700 dark:hover:bg-slate-600 text-red-600 dark:text-red-400 font-semibold text-xs rounded-lg transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Modals & Toasts */}
      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setEditingReview(null);
        }}
        onSubmit={handleSaveReview}
        initialData={editingReview}
        isLoading={actionLoading}
      />

      <ConfirmModal
        isOpen={!!deletingReviewId}
        title="Delete Guest Review"
        message="Are you sure you want to delete this guest review? This operation cannot be undone."
        onConfirm={handleDeleteReview}
        onCancel={() => setDeletingReviewId(null)}
        isLoading={actionLoading}
      />
    </div>
  );
}

export default Dashboard;