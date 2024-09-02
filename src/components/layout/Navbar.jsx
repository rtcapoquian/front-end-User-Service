import React from "react";
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
        <Link to="/dashboardOrg">Home</Link>
      </li>
      <li>
        <Link to="/landingOrg">Events</Link>
      </li>
      <li>
        <Link to="/edit-profile">Profile</Link>
      </li>
      <li>
        <Link to="/posts">Forums</Link>
      </li>
      <li>
        <Link to="/searchpeople">People</Link>
      </li>
      <li>
        <Link to="/chatscreen">Chat</Link>
      </li>
      <li>
        <div className="dropdown">
          <button className="dropdown-toggle">Menu</button>
          <div className="dropdown-menu">
            <Link to="/dashboardOrg">Home</Link>
            <Link to="/landingOrg">Events</Link>
            <Link to="/edit-profile">Profile</Link>
            <Link to="/posts">Forums</Link>
            <Link to="/searchpeople">People</Link>
            <Link to="/chatscreen">Chat</Link>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </li>
    </ul>
  );

  const authLinks = (
    <ul>
      <li>
        <Link to="/landingpage">Home</Link>
      </li>
      <li>
        <Link to="/SearchEvents">Events</Link>
      </li>
      <li>
        <Link to="/registeredEvents">Registration</Link>
      </li>
      <li>
        <Link to="/edit-profile">Profile</Link>
      </li>
      <li>
        <Link to="/posts">Forums</Link>
      </li>
      <li>
        <Link to="/searchpeople">People</Link>
      </li>
      <li>
        <Link to="/chatscreen">Chat</Link>
      </li>
      <li>
        <div className="dropdown">
          <button className="dropdown-toggle">Menu</button>
          <div className="dropdown-menu">
            <Link to="/landingpage">Home</Link>
            <Link to="/SearchEvents">Events</Link>
            <Link to="/registeredEvents">Registration</Link>
            <Link to="/edit-profile">Profile</Link>
            <Link to="/posts">Forums</Link>
            <Link to="/searchpeople">People</Link>
            <Link to="/chatscreen">Chat</Link>
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
