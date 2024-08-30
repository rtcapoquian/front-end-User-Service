import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Simulated authentication state
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const userType = localStorage.getItem("userType");

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("user_id");
    window.location.href = "/"; // Redirect to home page after logout
  };

  const organizerLinks = (
    <ul>
      <li>
        <Link to="/posts">PlayGround</Link>
      </li>
      <li>
        <Link to="/chatscreen">Chat</Link>
      </li>
      <li>
        <div className="dropdown">
          <button className="dropdown-toggle">Menu</button>

          <Link to="/dashboardOrg">My Profile</Link>
          <Link to="/faqs">FAQ</Link>
          <Link to="/terms">Terms</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </li>
    </ul>
  );

  const authLinks = (
    <ul>
      <li>
        <Link to="/posts">PlayGround</Link>
      </li>
      <li>
        <Link to="/landingpage">Dashboard</Link>
      </li>
      <li>
        <Link to="/dashboard">Profile</Link>
      </li>
      <li>
        <div className="dropdown">
          <button className="dropdown-toggle">Discover</button>
          <div className="dropdown-menu">
            <Link to="/SearchVenue">Venues</Link>
            <Link to="/chatscreen">Chat</Link>
            <Link to="/SearchEvents">Events</Link>
            <Link to="/SearchPeople">Around You</Link>
          </div>
        </div>
      </li>
      <li>
        <div className="dropdown">
          <button className="dropdown-toggle">Menu</button>
          <div className="dropdown-menu">
            <Link to="/dashboard">My Profile</Link>
            <Link to="/faqs">FAQ</Link>
            <Link to="/terms">Terms</Link>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
    </ul>
  );

  return (
    <nav>
      <div>
        <Link to="/">
          <span>Logo</span> {/* Replace with logo or text */}
        </Link>
      </div>
      {!isAuthenticated
        ? guestLinks
        : userType === "Organizer"
        ? organizerLinks
        : authLinks}
    </nav>
  );
};

export default Navbar;
