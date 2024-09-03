import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import Notification from "../layout/Notification";

const EventOrgInfo = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvent = async () => {
    try {
      const response = await api.get(`/api/events/${id}`);
      setEvent(response.data);

      const userRequests = response.data.attendees.map((attendee) =>
        api.get(`/api/users/${attendee.user_id}`)
      );
      const userResponses = await Promise.all(userRequests);
      const userDetails = userResponses.reduce((acc, curr) => {
        acc[curr.data._id] = curr.data;
        return acc;
      }, {});
      setUsers(userDetails);
    } catch (err) {
      console.error("Error fetching event:", err);
      setError("Failed to load event details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const updateAttendeeStatus = async (attendeeId, newStatus) => {
    try {
      await api.patch(`/api/events/${id}/attendees/${attendeeId}/status`, {
        status: newStatus
      });
      await fetchEvent();
    } catch (err) {
      console.error("Error updating attendee status:", err);
      setError("Failed to update attendee status.");
    }
  };

  const handleFinalize = async () => {
    try {
      await api.post(`/api/events/${id}/finalize`);
      fetchEvent();
    } catch (err) {
      console.error("Error finalizing registrations:", err);
      setError("Failed to finalize registrations.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {event && (
        <div className="container">
          <h2>Event Details</h2>
          <table className="table">
            <tbody>
              {/* Event details here */}
            </tbody>
          </table>

          <h3>Attendees</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>QR Code</th>
                <th>Rating</th>
                <th>Feedback</th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {event.attendees && event.attendees.length > 0 ? (
                event.attendees.map((attendee) => {
                  const user = users[attendee.user_id] || {};
                  return (
                    <tr key={attendee.user_id}>
                      <td>{user.name || "N/A"}</td>
                      <td>{user.email || "N/A"}</td>
                      <td>
                        <select
                          value={attendee.status}
                          onChange={(e) => updateAttendeeStatus(attendee.user_id, e.target.value)}
                        >
                          <option value="Registered">Registered</option>
                          <option value="WaitingList">Waiting List</option>
                        </select>
                      </td>
                      <td>{attendee.qr_code ? "Has QR Code" : "N/A"}</td>
                      <td>{attendee.rating !== null ? attendee.rating : "N/A"}</td>
                      <td>{attendee.feedback || "N/A"}</td>
                      <td>
                        <a href={`/profile/${attendee.user_id}`} target="_blank" rel="noopener noreferrer">
                          View Profile
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7">No attendees</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Link to QR Code Scanning Page */}
          <Link to={`/event/${id}/scan-qr`} className="btn btn-primary mb-3">
            Scan QR Codes
          </Link>

          <button onClick={handleFinalize} className="btn btn-success mt-3">
            Finalize Registered
          </button>
        </div>
      )}
    </div>
  );
};

export default EventOrgInfo;
