import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

import Loader from "../components/ui/Loader";
import Toast from "../components/ui/Toast";

import API from "../api/reviewsApi";

function Home() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      // Check if user is logged in
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("Please login to view reviews.");
        setLoading(false);
        return;
      }

      // Token will automatically be attached by reviewsApi.js
      const response = await API.get("/reviews");

      setReviews(response.data);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError("Failed to load reviews.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">

      <Navbar />

      <Hero />

      {loading && <Loader />}

      {!loading && error && <Toast message={error} />}

      {!loading && !error && (
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Card
                key={review.id}
                title={review.guest}
                text={`${review.review} (${review.sentiment})`}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-2">
              No reviews available.
            </p>
          )}
        </div>
      )}

      <Footer />

    </div>
  );
}

export default Home;