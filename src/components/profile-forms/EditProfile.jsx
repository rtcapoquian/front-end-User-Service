import React, { useState, useEffect } from "react";
import api from "../../api"; // Update this path based on your directory structure

const EditProfile = () => {
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
  const [message, setMessage] = useState(""); // For success/error messages
  const [error, setError] = useState(""); // For error messages

  useEffect(() => {
    // Fetch current profile data
    const fetchProfile = async () => {
      try {
        const response = await api.get("/api/profile/me");
        const social = response.data.social || {};

        setFormData({
          company: response.data.company || "",
          website: response.data.website || "",
          location: response.data.location || "",
          status: response.data.status || "",
          skills: response.data.skills ? response.data.skills.join(",") : "",
          githubusername: response.data.githubusername || "",
          bio: response.data.bio || "",
          twitter: social.twitter || "",
          facebook: social.facebook || "",
          linkedin: social.linkedin || "",
          youtube: social.youtube || "",
          instagram: social.instagram || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Error fetching profile data. Please try again.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/profile", formData);
      setMessage("Profile updated successfully!");
      setError(""); // Clear error message if successful
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile. Please try again.");
      setMessage(""); // Clear success message if there's an error
    }
  };

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

  return (
    <section>
      <div>
        <h2>Edit Your Profile</h2>
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={onSubmit}>
          <div>
            <label>Your Interests</label>
            <select name="status" value={status} onChange={onChange}>
              <option value="">Interested in</option>
              <option value="Events">Events</option>
              <option value="Meet New People">Meet New People</option>
              <option value="Parties">Parties</option>
              <option value="Networking Opportunities">
                Networking Opportunities
              </option>
            </select>
          </div>

          <div>
            <label>Where Are you Located</label>
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={onChange}
            />
          </div>

          <div>
            <label>A Short Bio About Yourself</label>
            <textarea
              rows="5"
              name="bio"
              value={bio}
              onChange={onChange}
            ></textarea>
          </div>

          <div>
            <label>Your Skills</label>
            <input
              type="text"
              name="skills"
              value={skills}
              onChange={onChange}
            />
          </div>

          <div>
            <label>Github Username</label>
            <input
              type="text"
              name="githubusername"
              value={githubusername}
              onChange={onChange}
            />
          </div>

          <div>
            <label>Twitter</label>
            <input
              type="text"
              name="twitter"
              value={twitter}
              onChange={onChange}
            />
          </div>

          <div>
            <label>Facebook</label>
            <input
              type="text"
              name="facebook"
              value={facebook}
              onChange={onChange}
            />
          </div>

          <div>
            <label>LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={linkedin}
              onChange={onChange}
            />
          </div>

          <div>
            <label>YouTube</label>
            <input
              type="text"
              name="youtube"
              value={youtube}
              onChange={onChange}
            />
          </div>

          <div>
            <label>Instagram</label>
            <input
              type="text"
              name="instagram"
              value={instagram}
              onChange={onChange}
            />
          </div>

          <div>
            <input type="submit" value="Save" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
