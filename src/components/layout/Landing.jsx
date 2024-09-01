import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/landing.css"; // Import your CSS file for styling

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already authenticated
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    if (token && userType) {
      if (userType === "Organizer") {
        navigate("/landingorg");
      } else if (userType === "Attendee") {
        navigate("/SearchEvents");
      }
    }
  }, [navigate]);

  return (
    <section className="landing-page">
      <div className="hero-section">
        <h1>Welcome to Our Platform</h1>
        <p>Your gateway to amazing experiences.</p>
        <div className="button-container">
          <Link to="/register" className="button">
            Sign Up
          </Link>
          <Link to="/login" className="button">
            Login
          </Link>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default Landing;
