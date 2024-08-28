import React, { useState } from "react";
import api from "../../api";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    information: "",
    address: "",
    longitude: "",
    latitude: "",
    Age: "", // Changed from age to Age
    pay: "",
    Capacity: "", // Changed from capacity to Capacity
    Details: "", // Changed from details to Details
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    name,
    type,
    information,
    address,
    longitude,
    latitude,
    Age, // Changed from age to Age
    pay,
    Capacity, // Changed from capacity to Capacity
    Details, // Changed from details to Details
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/api/events", formData);
      console.log("Response:", response.data);
      setSuccessMessage("Event added successfully!");
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("Error adding event. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1>Add Event or Venue</h1>
      {loading && <p>Loading...</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="* Event or Venue Name"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
        <select name="type" value={type} onChange={onChange} required>
          <option value="">Select Type</option>
          <option value="event">Event</option>
          <option value="venue">Venue</option>
        </select>
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
          required
        />
        <input
          type="text"
          placeholder="Latitude"
          name="latitude"
          value={latitude}
          onChange={onChange}
          required
        />
        <select name="Age" value={Age} onChange={onChange} required>
          {" "}
          {/* Changed from age to Age */}
          <option value="">Select Age Restrictions</option>
          <option value="over_21">Over 21</option>
          <option value="over_18">Over 18</option>
        </select>
        <select name="pay" value={pay} onChange={onChange} required>
          <option value="">Select Payment Type</option>
          <option value="free">Free</option>
          <option value="chargeable">Chargeable</option>
        </select>
        <input
          type="number"
          placeholder="Max Capacity"
          name="Capacity" // Changed from capacity to Capacity
          value={Capacity} // Changed from capacity to Capacity
          onChange={onChange}
        />
        <textarea
          name="Details" // Changed from details to Details
          placeholder="Additional Details"
          value={Details} // Changed from details to Details
          onChange={onChange}
          rows="5"
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => window.history.back()}>
          Go Back
        </button>
      </form>
    </section>
  );
};

export default AddEvent;
