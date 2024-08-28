import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api"; // Import the API instance

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await api.get("/api/profile"); // Adjust the API endpoint as needed
        setProfiles(res.data); // Set the profiles from the API response
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load profiles.");
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p className="lead">Browse and connect with developers</p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <div key={profile._id} className="profile bg-light">
                  <div>
                    <p>
                      {profile.status}{" "}
                      {profile.company && <span> at {profile.company}</span>}
                    </p>
                    <p className="my-1">
                      {profile.location && <span>{profile.location}</span>}
                    </p>
                  </div>
                  <ul>
                    {profile.skills.slice(0, 4).map((skill, index) => (
                      <li key={index} className="text-primary">
                        <i className="fas fa-check" /> {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Profiles;
