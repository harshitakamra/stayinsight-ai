import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      <main className="flex-grow p-8">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              Analytics Dashboard
            </h1>

            <p className="text-gray-600">
              Welcome Admin 👋
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

        <input
          type="text"
          placeholder="Search Reviews..."
          className="w-full border p-3 rounded mb-8"
        />

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-blue-100 p-6 rounded-lg shadow">
            <h3>Total Reviews</h3>
            <p className="text-4xl font-bold">125</p>
          </div>

          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h3>Positive</h3>
            <p className="text-4xl font-bold">85</p>
          </div>

          <div className="bg-yellow-100 p-6 rounded-lg shadow">
            <h3>Neutral</h3>
            <p className="text-4xl font-bold">25</p>
          </div>

          <div className="bg-red-100 p-6 rounded-lg shadow">
            <h3>Negative</h3>
            <p className="text-4xl font-bold">15</p>
          </div>

        </div>

        <div className="mt-10">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-2xl font-bold">
              Recent Reviews
            </h2>

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Upload Reviews
            </button>

          </div>

          <div className="space-y-4">

            <div className="bg-white p-4 rounded shadow">
              ⭐⭐⭐⭐⭐ Great host and very clean rooms.
            </div>

            <div className="bg-white p-4 rounded shadow">
              ⭐⭐⭐ Good location but average food.
            </div>

            <div className="bg-white p-4 rounded shadow">
              ⭐ Poor service and delayed check-in.
            </div>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Dashboard;