import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import api from "../../api"; // Assuming you have an Axios instance for API requests
import Spinner from "../layout/Spinner";

const DashboardOrg = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/"); // Change this to the correct endpoint for fetching the user
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const deleteAccount = async () => {
    try {
      await api.delete("/api/profile"); // Adjust this if the deletion logic changes
      alert("Account deleted");
      // You can redirect the user or perform other post-deletion actions here
    } catch (err) {
      console.error(err);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="welcome__block">
        <div>
          <h1>Welcome back, {user?.name}</h1>
          <p>Nice to see you again</p>
        </div>
        <div className="card">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Link to="/landingorg">
                <p>Manage Events</p>
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/Addevent">
                <p>Add an event</p>
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/edit-profile">
                <p>Your Profile</p>
              </Link>
            </li>
            <li className="list-group-item">
              <button onClick={deleteAccount} className="btn btn-danger">
                Delete Account
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardOrg;
