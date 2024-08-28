import React, { useState, Fragment } from "react";
import axios from "axios";
import "../../css/forms.css";
import { API_URL } from "../../API_URL";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

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

      localStorage.setItem("token", response.data.token); // Save token to localStorage
      setError("");
      window.location.href = "/dashboard"; // Redirect after successful login
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
      <section className="formslayout">
        <div className="formslayout-inner">
          <div className="page">
            <div className="login">
              <div className="formulaire">
                <h2 className="text-center" style={{ color: "black" }}>
                  Login
                </h2>
                <form onSubmit={onSubmit}>
                  <input
                    type="email"
                    style={{
                      height: "35px",
                      border: "none",
                      marginBottom: "10px",
                    }}
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                  <input
                    type="password"
                    style={{
                      height: "35px",
                      border: "none",
                      marginBottom: "10px",
                    }}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                  />
                  <input
                    type="submit"
                    style={{
                      height: "35px",
                      marginTop: "20px",
                      width: "30%",
                      backgroundColor: "#17a2b8",
                      fontSize: "1.2rem",
                      color: "black",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                    value={loading ? "Logging in..." : "Login"}
                    disabled={loading}
                  />
                  <p className="forgot" style={{ color: "black" }}>
                    Don't have an account? <a href="/register">Register</a>
                  </p>
                  <p className="forgot" style={{ color: "black" }}>
                    Forgot your password? <a href="/reset-password">Reset Password</a>
                  </p>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Login;
