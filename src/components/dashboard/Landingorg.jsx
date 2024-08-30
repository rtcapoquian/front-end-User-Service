import React, { Component } from "react";
import api from "../../api"; // Import the api instance
import Navbar from "../../components/layout/Navbar";
import "../../css/landing.css";
import Notification from "../../components/layout/Notification"; // Custom notification component

export default class LandingOrg extends Component {
  state = {
    events: [],
    profile: null,
    loading: true,
    notification: null,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    const userId = localStorage.getItem("user_id");
    console.log(userType, userId);
    // Fetch profile and events concurrently using the api instance
    Promise.all([
      api.get(`/api/profile/user/${userId}`),
      api.get(`/api/events/${userId}`),
    ])
      .then(([profileRes, eventsRes]) => {
        this.setState({
          profile: profileRes.data,
          events: eventsRes.data.map((event) => ({
            ...event,
            attendees: event.attendees.map((attendee) => attendee.name),
          })),
          loading: false,
        });
      })
      .catch((e) => {
        console.error(e);
        this.setState({ loading: false });
      });
  }

  handleDeleteEvent = (event_id) => (e) => {
    e.preventDefault();

    api
      .patch(`/api/events/${event_id}`)
      .then(() => {
        this.setState({
          notification: {
            message: "Your Event Was Deleted Successfully",
            type: "success",
          },
          events: this.state.events.filter((event) => event._id !== event_id),
        });
      })
      .catch((e) => {
        console.error(e);
        this.setState({
          notification: {
            message: "Failed to Delete Event",
            type: "error",
          },
        });
      });
  };

  closeNotification = () => {
    this.setState({ notification: null });
  };

  render() {
    const { events, profile, loading, notification } = this.state;

    if (loading) return <div>Loading...</div>;

    return (
      <div>
        <Navbar />
        <div className="container">
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={this.closeNotification}
            />
          )}
          <h2>Welcome, {profile ? profile.user.name : "User"}</h2>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Event/Venue</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Registered</th>
                <th>Status</th>
                <th>Attendees</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                
                <tr key={event._id}>
                  <td>{event.name}</td>
                  <td>Recreational</td>
                  <td>{event.Capacity}</td>
                  <td>{event.attendees.length}</td>
                  <td>{event.status}</td>
                  <td>{event.attendees.join(", ")}</td>
                  <td>
                    {event.status !== "Cancelled" && (
                      <button
                        className="btn btn-info"
                        onClick={this.handleDeleteEvent(event._id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
