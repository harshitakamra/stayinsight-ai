import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      <main className="flex-grow p-10 max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-4">
          About StayInsight AI
        </h1>

        <p className="text-center text-gray-600 text-lg mb-12">
          Helping hospitality businesses understand guest feedback with Artificial Intelligence.
        </p>

        <div className="bg-white rounded-xl shadow p-8 mb-8">

          <h2 className="text-3xl font-bold mb-4">
            Project Overview
          </h2>

          <p className="leading-8 text-gray-700">
            StayInsight AI is an intelligent review analytics platform designed
            for homestay owners, guest houses, and hospitality businesses.
            The system helps users understand guest opinions without manually
            reading large numbers of reviews. Using AI-powered analysis,
            reviews are classified by sentiment, categorized into key themes,
            and transformed into meaningful business insights.
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-8 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="border p-4 rounded-lg">
              Sentiment Classification
            </div>

            <div className="border p-4 rounded-lg">
              Theme Categorization
            </div>

            <div className="border p-4 rounded-lg">
              AI Generated Responses
            </div>

            <div className="border p-4 rounded-lg">
              Analytics Dashboard
            </div>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-8 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-4">

            <div className="border p-4 rounded-lg text-center">
              <h3 className="font-bold mb-2">Step 1</h3>
              Submit Reviews
            </div>

            <div className="border p-4 rounded-lg text-center">
              <h3 className="font-bold mb-2">Step 2</h3>
              Analyze Sentiment
            </div>

            <div className="border p-4 rounded-lg text-center">
              <h3 className="font-bold mb-2">Step 3</h3>
              Identify Themes
            </div>

            <div className="border p-4 rounded-lg text-center">
              <h3 className="font-bold mb-2">Step 4</h3>
              Generate Insights
            </div>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-8 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            Benefits for Hospitality Businesses
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="border p-5 rounded-lg">
              <h3 className="font-bold text-xl mb-2">
                Faster Decision Making
              </h3>

              <p>
                Quickly identify guest concerns and service strengths without reading every review manually.
              </p>
            </div>

            <div className="border p-5 rounded-lg">
              <h3 className="font-bold text-xl mb-2">
                Improved Guest Satisfaction
              </h3>

              <p>
                Use review insights to enhance customer experiences and address recurring issues.
              </p>
            </div>

            <div className="border p-5 rounded-lg">
              <h3 className="font-bold text-xl mb-2">
                Better Reputation Management
              </h3>

              <p>
                Generate professional responses and maintain a positive online presence.
              </p>
            </div>

            <div className="border p-5 rounded-lg">
              <h3 className="font-bold text-xl mb-2">
                Actionable Insights
              </h3>

              <p>
                Convert guest feedback into meaningful recommendations that support business growth.
              </p>
            </div>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-8">

          <h2 className="text-3xl font-bold mb-6">
            Future Scope
          </h2>

          <ul className="list-disc pl-6 space-y-3">
            <li>Multi-language review analysis</li>
            <li>CSV and Excel uploads</li>
            <li>PDF report generation</li>
            <li>Real-time analytics dashboard</li>
            <li>Mobile application support</li>
          </ul>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default About;