import React, { useState } from "react";
import api from "../../api"; // Import the API instance

const AddExperience = () => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/api/profile/experience", formData); // Update this URL to match your API endpoint
      setSuccessMessage("Experience details added successfully!");
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error adding experience details. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1>Add Your Experience</h1>
      {loading && <p>Loading...</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="* Job Title"
          name="title"
          value={title}
          onChange={onChange}
          required
        />
        <input
          type="text"
          placeholder="* Company"
          name="company"
          value={company}
          onChange={onChange}
          required
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          value={location}
          onChange={onChange}
        />
        <label>
          From Date
          <input type="date" name="from" value={from} onChange={onChange} />
        </label>
        <label>
          <input
            type="checkbox"
            name="current"
            checked={current}
            onChange={() => {
              setFormData({ ...formData, current: !current });
              toggleDisabled(!toDateDisabled);
            }}
          />{" "}
          Current Job
        </label>
        <label>
          To Date
          <input
            type="date"
            name="to"
            value={to}
            onChange={onChange}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </label>
        <textarea
          name="description"
          placeholder="Job Description"
          value={description}
          onChange={onChange}
        />
        <input type="submit" value="Submit" />
        <button type="button" onClick={() => window.history.back()}>
          Go Back
        </button>
      </form>
    </section>
  );
};

export default AddExperience;
