import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ADMIN_EMAIL = "admin@stayinsight.com";
  const ADMIN_PASSWORD = "admin123";

  const handleLogin = () => {
    if (
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      <main className="flex-grow flex justify-center items-center px-4">

        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-center mb-2">
            StayInsight AI
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Sign in to access your review analytics dashboard
          </p>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Sign In
          </button>

          <div className="mt-4 text-center">
            <a
              href="#"
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot Password?
            </a>
          </div>

          <p className="mt-6 text-center text-gray-500 text-sm">
            Secure access for authorized users only.
          </p>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Login;