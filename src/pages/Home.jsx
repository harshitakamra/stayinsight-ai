import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <div className="flex-grow">

        <Hero />

        <div className="grid md:grid-cols-3 gap-6 p-8">

          <Card
            title="Sentiment Analysis"
            text="Automatically classify guest reviews as Positive, Neutral, or Negative using AI."
          />

          <Card
            title="Theme Detection"
            text="Identify key discussion areas such as Food, Host, Location, Cleanliness, and Experience."
          />

          <Card
            title="AI Management Responses"
            text="Generate professional responses to guest feedback instantly."
          />

        </div>

        <section className="px-8 py-12">

          <h2 className="text-4xl font-bold text-center mb-10">
            Why Choose StayInsight AI?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-3">
                Save Valuable Time
              </h3>

              <p>
                Stop manually reading hundreds of reviews from different platforms.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-3">
                Understand Guest Needs
              </h3>

              <p>
                Discover recurring compliments and complaints across reviews.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-3">
                Improve Service Quality
              </h3>

              <p>
                Use AI-generated insights to enhance guest satisfaction.
              </p>
            </div>

          </div>

        </section>

        <section className="bg-blue-600 text-white py-16 text-center">

          <h2 className="text-4xl font-bold mb-4">
            Transform Guest Feedback Into Smart Business Insights
          </h2>

          <p className="text-lg mb-6">
            Analyze reviews faster and improve customer experience with AI.
          </p>

          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold">
            Get Started
          </button>

        </section>

      </div>

      <Footer />

    </div>
  );
}

export default Home;