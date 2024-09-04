import React, { useState } from "react";
import api from "../../api"; // Import the API instance
import { useNavigate } from "react-router-dom";
const AddExperience = () => {
  const navigate = useNavigate();
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
      navigate("/edit-profile");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error adding experience details. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto m-16 p-8 bg-card shadow-lg rounded-xl dark:bg-card-dark text-card-foreground border">
      <h1 className="text-2xl font-semibold mb-4 text-primary dark:text-primary-dark">
        Add Your Experience Details
      </h1>
      {loading && <p className="text-accent">Loading...</p>}
      {successMessage && <p className="text-primary dark:text-primary-dark">{successMessage}</p>}
      {errorMessage && <p className="text-destructive dark:text-destructive-dark">{errorMessage}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="* Job Title"
          name="title"
          value={title}
          onChange={onChange}
          required
          className="w-full p-2 border border-border rounded-md bg-input dark:bg-input-dark"
        />
        <input
          type="text"
          placeholder="* Company"
          name="company"
          value={company}
          onChange={onChange}
          required
          className="w-full p-2 border border-border rounded-md bg-input dark:bg-input-dark"
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          value={location}
          onChange={onChange}
          className="w-full p-2 border border-border rounded-md bg-input dark:bg-input-dark"
        />
        <div className="flex flex-col space-y-2">
          <label className="font-medium text-primary dark:text-primary-dark">From Date</label>
          <input
            type="date"
            name="from"
            value={from}
            onChange={onChange}
            className="p-2 border border-border rounded-md bg-input dark:bg-input-dark"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="current"
            checked={current}
            onChange={() => {
              setFormData({ ...formData, current: !current });
              toggleDisabled(!toDateDisabled);
            }}
            className="form-checkbox"
          />
          <label className="font-medium text-primary dark:text-primary-dark">Current Job</label>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-medium text-primary dark:text-primary-dark">To Date</label>
          <input
            type="date"
            name="to"
            value={to}
            onChange={onChange}
            disabled={toDateDisabled}
            className="p-2 border border-border rounded-md bg-input dark:bg-input-dark"
          />
        </div>
        <textarea
          name="description"
          cols="30"
          rows="5"
          placeholder="Job Description"
          value={description}
          onChange={onChange}
          className="w-full p-2 border border-border rounded-md bg-input dark:bg-input-dark"
        />
        <input
          type="submit"
          value="Submit"
          className="w-full p-2 bg-primary text-primary-foreground font-semibold rounded-md cursor-pointer dark:bg-primary-dark dark:text-primary-foreground-dark"
        />
        <button
          type="button"
          onClick={() => window.history.back()}
          className="w-full p-2 bg-secondary text-secondary-foreground font-semibold rounded-md cursor-pointer dark:bg-secondary-dark dark:text-secondary-foreground-dark"
        >
          Go Back
        </button>
      </form>
    </section>
  );
};

export default AddExperience;
