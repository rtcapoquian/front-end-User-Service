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
      <section className="formslayout">
        <div className="formslayout-inner">
          <div className="page">
            <div className="reset-password">
              <div className="formulaire">
                <h2 className="text-center" style={{ color: "black" }}>
                  Reset Password
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
                    placeholder="New Password"
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
                    value={loading ? "Resetting..." : "Reset Password"}
                    disabled={loading}
                  />
                  {success && <p style={{ color: "green" }}>{success}</p>}
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Resetpass;
