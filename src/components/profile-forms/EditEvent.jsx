// src/components/EditEvent.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import Navbar from "../layout/Navbar";
import Notification from "../layout/Notification";

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
        setNotification({ message: "Failed to load event", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/api/events/${eventId}`, event);
      setNotification({
        message: "Event updated successfully",
        type: "success",
      });
      navigate("/events");
    } catch (error) {
      console.error("Error updating event:", error);
      setNotification({ message: "Failed to update event", type: "error" });
    }
  };

  const closeNotification = () => setNotification(null);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      <div className="container">
        <h2>Edit Event</h2>
        {event && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={event.name}
                onChange={handleChange}
                className="form-control"
                disabled
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={event.status}
                onChange={handleChange}
                className="form-control"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input
                type="number"
                name="capacity"
                value={event.capacity}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={new Date(event.date).toISOString().split("T")[0]} // Format date for input
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={event.time}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditEvent;
