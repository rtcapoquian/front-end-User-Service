import React, { useState, Fragment } from "react";
import axios from "axios";
import { API_URL } from "../../API_URL";

const Resetpass = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.put(`${API_URL}/auth/updatess`, {
        email,
        password,
      });

      setSuccess(response.data.msg);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.msg || "Server error"
      );
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <section className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Reset Password
          </h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="New Password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              } text-white rounded-md`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            {success && <p className="text-green-500 text-center">{success}</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default Resetpass;
