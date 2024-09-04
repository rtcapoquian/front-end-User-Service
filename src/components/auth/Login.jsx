import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { API_URL } from "../../API_URL";
import Slideshow from "../layout/Slideshow";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const { email, password } = formData;

  useEffect(() => {
    // Check if already authenticated
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    const userId = localStorage.getItem("user_id");
    if (token && userType) {
      if (userType === "Organizer") {
        navigate("/landingOrg");
      } else if (userType === "Attendee") {
        navigate("/landingpage");
      }
    }
  }, [navigate]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth`, {
        email,
        password,
      });

      const { token, userType, userId } = response.data;
      // Save token, userType, and user_id to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userType", userType);
      localStorage.setItem("user_id", userId);

      setError("");

      // Redirect based on user type
      if (userType === "Organizer") {
        navigate("/dashboardOrg");
      } else if (userType === "Attendee") {
        navigate("/landingpage");
      }
    } catch (err) {
      setError(
        err.response?.data?.errors.map((e) => e.msg).join(", ") ||
          "Server error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <section className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/2 relative">
          <Slideshow />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 text-foreground">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Login
            </h2>
            <form onSubmit={onSubmit} className="space-y-6">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={onChange}
                className="block w-full p-2 border rounded focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                className="block w-full p-2 border rounded focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                required
              />
              <input
                type="submit"
                value={loading ? "Logging in..." : "Login"}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300 py-2"
                disabled={loading}
              />
              <p className="text-gray-700 dark:text-gray-300">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500 hover:text-blue-600">
                  Register
                </Link>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Forgot your password?{" "}
                <Link to="/Sende" className="text-blue-500 hover:text-blue-600">
                  Reset Password
                </Link>
              </p>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Login;
