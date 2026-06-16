import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Dashboard() {
const navigate = useNavigate();

const handleLogout = () => {
localStorage.removeItem("isLoggedIn");
navigate("/login");
};

return ( <div className="min-h-screen flex flex-col bg-gray-100">

```
  <Navbar />

  <main className="flex-grow p-8 max-w-7xl mx-auto w-full">

    <div className="flex flex-col md:flex-row justify-between items-center mb-8">

      <div>
        <h1 className="text-4xl font-bold">
          Guest Review Analytics Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Monitor guest sentiment, identify trends, and improve customer satisfaction.
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 mt-4 md:mt-0"
      >
        Logout
      </button>

    </div>

    <input
      type="text"
      placeholder="Search guest reviews..."
      className="w-full border p-3 rounded-lg mb-8"
    />

    <div className="grid md:grid-cols-4 gap-6">

      <div className="bg-blue-100 p-6 rounded-xl shadow">
        <h3 className="font-semibold">Total Reviews</h3>
        <p className="text-4xl font-bold mt-2">125</p>
      </div>

      <div className="bg-green-100 p-6 rounded-xl shadow">
        <h3 className="font-semibold">Positive Reviews</h3>
        <p className="text-4xl font-bold mt-2">85</p>
      </div>

      <div className="bg-yellow-100 p-6 rounded-xl shadow">
        <h3 className="font-semibold">Neutral Reviews</h3>
        <p className="text-4xl font-bold mt-2">25</p>
      </div>

      <div className="bg-red-100 p-6 rounded-xl shadow">
        <h3 className="font-semibold">Negative Reviews</h3>
        <p className="text-4xl font-bold mt-2">15</p>
      </div>

    </div>

    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-4">
        Common Feedback Themes
      </h2>

      <div className="flex flex-wrap gap-3">

        <span className="bg-blue-100 px-4 py-2 rounded-full">
          Location
        </span>

        <span className="bg-green-100 px-4 py-2 rounded-full">
          Host
        </span>

        <span className="bg-yellow-100 px-4 py-2 rounded-full">
          Food
        </span>

        <span className="bg-red-100 px-4 py-2 rounded-full">
          Cleanliness
        </span>

        <span className="bg-purple-100 px-4 py-2 rounded-full">
          Experience
        </span>

      </div>

    </div>

    <div className="mt-10 bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-4">
        AI Recommendations
      </h2>

      <ul className="space-y-3 text-gray-700">

        <li>
          Improve breakfast quality based on recent food-related reviews.
        </li>

        <li>
          Highlight excellent host ratings in promotional materials.
        </li>

        <li>
          Maintain cleanliness standards during peak booking periods.
        </li>

      </ul>

    </div>

    <div className="mt-10">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-bold">
          Recent Reviews
        </h2>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Upload Reviews
        </button>

      </div>

      <div className="space-y-4">

        <div className="bg-white p-4 rounded-lg shadow">
          ⭐⭐⭐⭐⭐ Great host, clean rooms, and beautiful location.
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          ⭐⭐⭐ Good location but breakfast options could improve.
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          ⭐ Poor service and delayed check-in experience.
        </div>

      </div>

    </div>

  </main>

  <Footer />

</div>

);
}

export default Dashboard