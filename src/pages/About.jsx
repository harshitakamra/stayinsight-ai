import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      <Navbar />

      <main className="flex-grow p-10 max-w-6xl mx-auto text-black dark:text-white">

        <h1 className="text-5xl font-bold text-center mb-4">
          About StayInsight AI
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-12">
          Helping hospitality businesses understand guest feedback with Artificial Intelligence.
        </p>

        {/* Project Overview */}

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 transition-colors duration-300">

          <h2 className="text-3xl font-bold mb-4">
            Project Overview
          </h2>

          <p className="leading-8 text-gray-700 dark:text-gray-300">
            StayInsight AI is an intelligent review analytics platform designed
            for homestay owners, guest houses, and hospitality businesses.
            The system helps users understand guest opinions without manually
            reading large numbers of reviews.
          </p>

        </div>

        {/* Key Features */}

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 transition-colors duration-300">

          <h2 className="text-3xl font-bold mb-6">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-slate-700">
              Sentiment Classification
            </div>

            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-slate-700">
              Theme Categorization
            </div>

            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-slate-700">
              AI Generated Responses
            </div>

            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-slate-700">
              Analytics Dashboard
            </div>

          </div>

        </div>

        {/* Future Scope */}

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 transition-colors duration-300">

          <h2 className="text-3xl font-bold mb-6">
            Future Scope
          </h2>

          <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
            <li>Multi-language review analysis</li>
            <li>CSV & Excel upload support</li>
            <li>Real-time AI dashboard</li>
            <li>PDF report generation</li>
            <li>Mobile application support</li>
          </ul>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default About;