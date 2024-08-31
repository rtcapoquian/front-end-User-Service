import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api"; // Import the API instance
import Navbar from "../layout/Navbar";

const RegisteredEvent = () => {
  const { id } = useParams(); // Access the dynamic route parameter
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRegisteredEvent(id);
    }
  }, [id]);

  const fetchRegisteredEvent = async (eventId) => {
    try {
      const response = await api.get(`/api/auth/regievent/${eventId}`);
      const { activityname, venuename } = response.data[0];
      await fetchEvents(activityname);
      await fetchVenues(venuename);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching registration event:", error);
    }
  };

  const fetchEvents = async (activitynames) => {
    try {
      const response = await api.put("/api/auth/getevent", { activitynames });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchVenues = async (venuename) => {
    try {
      const response = await api.put("/api/auth/getvenue", { venuename });
      setVenues(response.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Registered Event</h1>
        <div>
          <h2>Events</h2>
          <ul>
            {events.map((event, index) => (
              <li key={index}>{event.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Venues</h2>
          <ul>
            {venues.map((venue, index) => (
              <li key={index}>{venue.name}</li>
            ))}
          </ul>
        </div>
        <Link to="/">Back to Home</Link>
      </div>
    </>
  );
};

export default RegisteredEvent;
