import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import Navbar from "../layout/Navbar";

// Functional component for displaying user profile with additional details
const Profile = ({ event }) => {
  // Ensure event is defined and has the necessary properties
  const hasActivities =
    Array.isArray(event.activityname) && event.activityname.length > 0;

  return (
    <div className="content-profile-page">
      <div className="profile-user-page card">
        <div className="user-profile-data">
          {/* Display user avatar */}
          <div style={{ textAlign: "center" }}>
            <img
              src={event.avatar || "https://via.placeholder.com/150"}
              alt="User Avatar"
              style={{ borderRadius: "50%", width: "150px", height: "150px" }}
            />
          </div>
          {/* Display user name */}
          <h1 style={{ textAlign: "center" }}>
            {event.name || "Name not available"}
          </h1>
          {/* Display user email */}
          <p style={{ textAlign: "center" }}>
            {event.email || "Email not available"}
          </p>
          {/* Display activities if available */}
          {hasActivities && (
            <div>
              <h2>Activities</h2>
              <ul>
                {event.activityname.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Similarly display other fields if needed */}
        </div>
      </div>
    </div>
  );
};

const ProfileInformation = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/api/auth/gotoprofile/${id}`)
      .then((response) => {
        // Assuming the response data is an array with a single object
        if (Array.isArray(response.data) && response.data.length > 0) {
          setEvent(response.data[0]);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div>
      <Navbar />
      <Profile event={event} />
    </div>
  );
};

export default ProfileInformation;
