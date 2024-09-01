import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import Navbar from '../layout/Navbar';
import Notification from '../layout/Notification';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/api/events'); // Use the appropriate API endpoint
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setNotification({ message: 'Failed to load events', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle event deletion
  const handleDeleteEvent = (eventId) => async () => {
    try {
      await api.delete(`/api/events/${eventId}`); // Use the appropriate API endpoint
      setEvents(events.filter(event => event._id !== eventId));
      setNotification({ message: 'Event deleted successfully', type: 'success' });
    } catch (error) {
      console.error('Error deleting event:', error);
      setNotification({ message: 'Failed to delete event', type: 'error' });
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
        <h2>Events</h2>
        <Link to="/Addevent" className="btn btn-primary mb-3">Create New Event</Link>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Capacity</th>
              <th>Registered</th>
              <th>Waiting List</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.status || 'N/A'}</td>
                <td>{event.capacity}</td>
                <td>{event.attendees.filter(a => a.status === 'Registered').length}</td>
                <td>{event.attendees.filter(a => a.status === 'WaitingList').length}</td>
                <td>
                  <Link to={`/event/${event._id}/edit`} className="btn btn-warning btn-sm ml-2">Edit</Link>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={handleDeleteEvent(event._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/event/${event._id}`} className="btn btn-info btn-sm ml-2">Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventList;
