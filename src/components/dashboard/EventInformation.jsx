import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api"; // Importing the custom API
import MapComponent from "../profile-forms/MapComponent";
import Navbar from "../layout/Navbar";
const EventInformation = () => {
  const { id } = useParams(); // Event ID from URL
  const [eventDetails, setEventDetails] = useState({
    name: "",
    information: "",
    longitude: 0,
    latitude: 0,
    capacity: 5,
    date: new Date(),
    time: "",
    pay: "",
    address: "",
    stringDates: [],
    showmessage: true,
    disabled1: false,
    attendeeStatus: null,
    registrationMessage: "",
    organizer: {
      name: "",
      profileUrl: "",
    },
  });
  console.log(eventDetails);
  const userId = localStorage.getItem("user_id"); // Get user ID from local storage

  useEffect(() => {
    // Fetch event details
    api
      .get(`/api/events/${id}`)
      .then((response) => {
        const event = response.data;
        const eventDate = new Date(event.date);

        // Check if eventDate is a valid date
        if (isNaN(eventDate.getTime())) {
          console.error("Invalid date:", event.date);
        }

        setEventDetails((prev) => ({
          ...prev,
          name: event.name,
          longitude: event.longitude,
          latitude: event.latitude,
          capacity: event.capacity,
          date: eventDate,
          time: event.time,
          information: event.information,
          pay: event.pay,
          address: event.address,
          stringDates: [eventDate.toISOString().split("T")[0], event.time], // Assuming date and time are separate
          showmessage:
            event.attendees.length >= event.capacity ||
            event.status === "Completed" ||
            event.status === "Cancelled",
          disabled1:
            event.status === "Completed" || event.status === "Cancelled",
          organizer: event.organizer,
        }));
        // Fetch attendee status
        return api.get(`/api/events/${id}/attendees/${userId}`);
      })
      .then((response) => {
        setEventDetails((prev) => ({
          ...prev,
          attendeeStatus: response.data ? response.data.status : null,
        }));
      })
      .catch((error) => console.log(error));
  }, [id, userId]);

  const handleRegister = (e) => {
    e.preventDefault();
    api
      .post(`/api/events/${id}/register`, { user_id: userId })
      .then((response) => {
        const { status } = response.data;
        setEventDetails((prev) => ({
          ...prev,
          attendeeStatus: status,
          disabled1:
            status === "WaitingList" ||
            response.data.attendees.length >= prev.capacity,
          registrationMessage:
            status === "WaitingList"
              ? "You have been added to the waiting list. The organizer will approve your registration if a spot becomes available."
              : "You have been successfully registered. Please wait for a confirmation email.",
        }));
      })
      .catch((error) => console.log(error));
  };

  const handleDeregister = () => {
    api
      .delete(`/api/events/${id}/attendees/${userId}`)
      .then(() => {
        setEventDetails((prev) => ({
          ...prev,
          attendeeStatus: null,
          disabled1: false,
          registrationMessage: "Your registration has been cancelled.",
        }));
      })
      .catch((error) => console.log(error));
  };

  const renderRegisterButton = () => {
    const { attendeeStatus, disabled1 } = eventDetails;

    return (
      <div>
        {attendeeStatus ? (
          <button onClick={handleDeregister} disabled={disabled1}>
            Cancel Registration
          </button>
        ) : (
          <button onClick={handleRegister} disabled={disabled1}>
            Register
          </button>
        )}
      </div>
    );
  };

  const {
    name,
    information,
    latitude,
    longitude,
    address,
    stringDates,
    capacity,
    showmessage,
    registrationMessage,
    organizer,
  } = eventDetails;

  return (
    <div>
      <Navbar />
      <h2>{name}</h2>
      <p>{information}</p>
      <p>Date: {stringDates[0]}</p>
      <p>Time: {stringDates[1]}</p>
      <p>Location: {address}</p>
      <p>Capacity: {capacity}</p>
      <p>
        Organizer:{" "}
        <Link to={`/profile/${organizer._id}`}>{organizer.name}</Link>
      </p>
      {!showmessage && (
        <p>
          This event is full. You will be put on the waitlist if you register.
        </p>
      )}

      {renderRegisterButton()}

      {registrationMessage && <p>{registrationMessage}</p>}

      {/* Use MapComponent for displaying the map */}
      <MapComponent latitude={latitude} longitude={longitude} />
    </div>
  );
};

export default EventInformation;
