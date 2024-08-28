import React, { useState } from "react";
import api from "../../api"; // Import the API instance

const AddEducation = () => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/api/profile/education", formData); // Update this URL to match your API endpoint
      setSuccessMessage("Education details added successfully!");
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error adding education details. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1>Add your student details!</h1>
      {loading && <p>Loading...</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="* IU School Name"
          name="school"
          value={school}
          onChange={onChange}
          required
        />
        <input
          type="text"
          placeholder="* Degree"
          name="degree"
          value={degree}
          onChange={onChange}
          required
        />
        <input
          type="text"
          placeholder="Study"
          name="fieldofstudy"
          value={fieldofstudy}
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
          Currently studying
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
        {/* <textarea
          name="description"
          cols="30"
          rows="5"
          placeholder="Program Description"
          value={description}
          onChange={onChange}
        /> */}
        <input type="submit" value="Submit" />
        <button type="button" onClick={() => window.history.back()}>
          Go Back
        </button>
      </form>
    </section>
  );
};

export default AddEducation;
