import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../../api"; // Adjust import if your API instance is named differently
import MapComponent from "./MapComponent";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    information: "",
    address: "",
    longitude: "",
    latitude: "",
    capacity: "", // Updated to match backend
    details: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const {
    name,
    information,
    address,
    longitude,
    latitude,
    capacity,
    details,
    date,
    time,
  } = formData;

  useEffect(() => {
    const storedOrganizer = localStorage.getItem("user_id");
    if (storedOrganizer) {
      setFormData((prevState) => ({
        ...prevState,
        organizer: storedOrganizer,
      }));
    }
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onMapClick = ({ lat, lng }) => {
    setFormData((prevState) => ({
      ...prevState,
      latitude: lat,
      longitude: lng,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Create the event
      const response = await api.post("/api/events", formData);
      console.log("Event Response:", response.data);

      // Step 2: Create a post with the event name and address
      const postText = `Event: ${name} at ${address} on ${date} at ${time}`;
      await api.post("/api/posts", { text: postText });

      // Success messages and navigation
      setSuccessMessage("Event and post added successfully!");
      setErrorMessage("");
      navigate("/landingorg"); // Navigate to landingorg after success
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("Error adding event. Please try again.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1>Add Event</h1>
      {loading && <p>Loading...</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="* Event Name"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
        <textarea
          name="information"
          placeholder="Event Description"
          value={information}
          onChange={onChange}
          rows="5"
        />
        <textarea
          name="address"
          placeholder="Location Address"
          value={address}
          onChange={onChange}
          rows="5"
        />
        <input
          type="text"
          placeholder="Longitude"
          name="longitude"
          value={longitude}
          onChange={onChange}
          readOnly
        />
        <input
          type="text"
          placeholder="Latitude"
          name="latitude"
          value={latitude}
          onChange={onChange}
          readOnly
        />
        <input
          type="number"
          placeholder="Max Capacity"
          name="capacity"
          value={capacity}
          onChange={onChange}
          required
        />
        <textarea
          name="details"
          placeholder="Additional Details"
          value={details}
          onChange={onChange}
          rows="5"
        />
        <input
          type="date"
          name="date"
          value={date}
          onChange={onChange}
          required
        />
        <input
          type="time"
          name="time"
          value={time}
          onChange={onChange}
          required
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => window.history.back()}>
          Go Back
        </button>
      </form>
      <MapComponent onMapClick={onMapClick} />
    </section>
  );
};

export default AddEvent;
