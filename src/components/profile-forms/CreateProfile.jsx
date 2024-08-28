import React, { useState, useEffect } from "react";
import api from "../../api"; // Import the API instance

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  useEffect(() => {
    // Fetch current profile data (if any) when the component loads
    const getCurrentProfile = async () => {
      try {
        const res = await api.get("/api/profile/me");
        setFormData({
          ...formData,
          ...res.data,
          skills: res.data.skills ? res.data.skills.join(", ") : "",
        });
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setLoading(false);
      }
    };

    getCurrentProfile();
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/profile", formData);
      setSuccessMessage("Profile created successfully!");
      setErrorMessage(""); // Clear any previous error message
    } catch (err) {
      console.error(err.message);
      setErrorMessage("Error creating profile. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <h1>Create Your Profile</h1>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <select name="status" value={status} onChange={onChange}>
            <option value="0">I'm looking for</option>
            <option value="Events">Events</option>
            <option value="Networking">Networking Opportunities</option>
            <option value="Meet People">Meet New People</option>
            <option value="Parties">Parties</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Skills"
            name="skills"
            value={skills}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="GitHub Username"
            name="githubusername"
            value={githubusername}
            onChange={onChange}
          />
        </div>
        {/* Add more fields as needed */}
        <input type="submit" value="Submit" />
      </form>
    </section>
  );
};

export default CreateProfile;
