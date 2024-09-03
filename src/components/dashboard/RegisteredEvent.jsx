import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api"; // Import the API instance

const RegisteredEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("upcoming"); // Default to "upcoming"

  useEffect(() => {
    fetchEventsByStatus(statusFilter);
  }, [statusFilter]);

  const fetchEventsByStatus = async (status) => {
    try {
      setLoading(true);
      const response = await api.get(`/api/events/registered/${status}`);
      setEvents(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching ${status} events:`, error);
      setLoading(false);
    }
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container">
        <h1>Registered Events</h1>
        <div className="filters">
          <label>
            <input
              type="radio"
              value="upcoming"
              checked={statusFilter === "upcoming"}
              onChange={handleStatusChange}
            />
            Upcoming
          </label>
          <label>
            <input
              type="radio"
              value="past"
              checked={statusFilter === "past"}
              onChange={handleStatusChange}
            />
            Past
          </label>
        </div>
        <div>
          <h2>Events</h2>
          {events.length > 0 ? (
            <ul>
              {events.map((event) => (
                <li key={event._id}>
                  <h3>{event.name}</h3>
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Time: {event.time}</p>
                  <p>Status: {event.status}</p>
                  {/* Link to the event details page */}
                  <Link to={`/edit/${event._id}`}>Go to Event</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No events found.</p>
          )}
        </div>
        <Link to="/">Back to Home</Link>
      </div>
    </>
  );
};

export default RegisteredEvent;
