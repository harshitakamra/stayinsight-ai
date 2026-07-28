import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post(
        "/login",
        formData,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.access_token
      );

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      alert("Login Successful!");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(error.response.data.detail);
      } else {
        alert("Unable to connect to backend.");
      }

    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">

      <Navbar />

      <main className="flex-grow flex justify-center items-center">

        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-8 w-96">

          <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
            Login
          </h1>

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded mb-4"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded mb-6"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Login
          </button>

          <div className="mt-5 text-center">

            <span>
              Don't have an account?
            </span>

            <br />

            <Link
              to="/register"
              className="text-blue-600"
            >
              Register Here
            </Link>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Login;