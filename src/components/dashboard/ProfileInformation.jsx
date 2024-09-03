import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { Card } from "../ui/Card";
import {
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaBuilding,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaStar,
} from "react-icons/fa";

const ProfileInformation = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileResponse = await api.get(`/api/profile/user/${id}`);
        const userResponse = await api.get(`/api/users/${id}`);
        setProfile(profileResponse.data || {});
        setUser(userResponse.data || {});
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!profile) {
    return (
      <Card className="max-w-4xl mx-auto p-8 shadow-lg text-center">
        <p className="text-lg text-gray-500">User profile not found.</p>
      </Card>
    );
  }

  const {
    image,
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    experience,
    education,
    social,
  } = profile;
  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Profile Image, Name, Email */}
          <div className="md:col-span-1 flex flex-col items-center">
            <Card className="p-8 shadow-lg max-w-sm">
              <div className="text-center mb-6">
                <img
                  src={image || "https://via.placeholder.com/150"}
                  alt="User Avatar"
                  className="mx-auto rounded-full w-40 h-40 object-cover"
                />
                <h1 className="text-2xl font-bold mt-4">
                  {user?.name || "Name not available"}
                </h1>
                <p className="text-lg text-gray-500">
                  {user?.email || "Email not available"}
                </p>
              </div>
            </Card>
            {/* Social Media Card */}
            <Card className="p-8 shadow-lg mt-6 max-w-sm">
              <h2 className="text-xl font-semibold mb-4">Social Media</h2>
              <div className="flex flex-col gap-2">
                <p className="flex items-center">
                  <FaTwitter className="mr-2" />{" "}
                  <a
                    href={social?.twitter || "#"}
                    rel="noopener"
                    target="_blank"
                    className="text-blue-500"
                  >
                    {"Twitter"}
                  </a>
                </p>
                <p className="flex items-center">
                  <FaFacebook className="mr-2" />{" "}
                  <a
                    href={social?.facebook || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {"Facebook"}
                  </a>
                </p>
                <p className="flex items-center">
                  <FaLinkedin className="mr-2" />{" "}
                  <a
                    href={social?.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {"LinkedIn"}
                  </a>
                </p>
                <p className="flex items-center">
                  <FaInstagram className="mr-2" />{" "}
                  <a
                    href={social?.instagram || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {"Instagram"}
                  </a>
                </p>
                <p className="flex items-center">
                  <FaGithub className="mr-2" />{" "}
                  <a
                    href={
                      githubusername
                        ? `https://www.github.com/${githubusername}`
                        : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {githubusername ? `GitHub` : "GitHub not available"}{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </a>
                </p>
              </div>
            </Card>
          </div>

          {/* Right Column - Profile Details, Experience, Education */}
          <div className="md:col-span-2 flex flex-col gap-8">
            {/* Profile Details Card */}
            <Card className="p-8 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
              <div className="flex flex-col gap-4">
                <p className="flex items-center">
                  <FaGlobe className="mr-2" />{" "}
                  <a
                    href={website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {website || "Website not available"}
                  </a>
                </p>
                <p className="flex items-center">
                  <FaBuilding className="mr-2" /> <strong>Company:</strong>{" "}
                  {company || "Not available"}
                </p>
                <p className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> <strong>Location:</strong>{" "}
                  {location || "Not available"}
                </p>
                <p className="flex items-center">
                  <FaInfoCircle className="mr-2" /> <strong>Status:</strong>{" "}
                  {status || "Not available"}
                </p>
                <p className="flex items-center">
                  <FaStar className="mr-2" /> <strong>Skills:</strong>{" "}
                  {skills.length > 0 ? skills.join(", ") : "Not available"}
                </p>
                <p className="flex items-center">
                  <FaInfoCircle className="mr-2" /> <strong>Bio:</strong>{" "}
                  {bio || "Not available"}
                </p>
              </div>
            </Card>

            {/* Experience Section */}
            {experience.length > 0 && (
              <Card className="p-8 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Experience</h2>
                <ul className="list-disc ml-6 space-y-4">
                  {experience.map((exp, index) => (
                    <li key={index}>
                      <p>
                        <strong>Title:</strong> {exp.title || "Not available"}
                      </p>
                      <p>
                        <strong>Company:</strong>{" "}
                        {exp.company || "Not available"}
                      </p>
                      <p>
                        <strong>Location:</strong>{" "}
                        {exp.location || "Not available"}
                      </p>
                      <p>
                        <strong>From:</strong>{" "}
                        {exp.from
                          ? new Date(exp.from).toDateString()
                          : "Not available"}
                      </p>
                      <p>
                        <strong>To:</strong>{" "}
                        {exp.to
                          ? new Date(exp.to).toDateString()
                          : "Not available"}
                      </p>
                      <p>
                        <strong>Current:</strong> {exp.current ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {exp.description || "Not available"}
                      </p>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <Card className="p-8 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Education</h2>
                <ul className="list-disc ml-6 space-y-4">
                  {education.map((edu, index) => (
                    <li key={index}>
                      <p>
                        <strong>School:</strong> {edu.school || "Not available"}
                      </p>
                      <p>
                        <strong>Degree:</strong> {edu.degree || "Not available"}
                      </p>
                      <p>
                        <strong>Field of Study:</strong>{" "}
                        {edu.fieldofstudy || "Not available"}
                      </p>
                      <p>
                        <strong>From:</strong>{" "}
                        {edu.from
                          ? new Date(edu.from).toDateString()
                          : "Not available"}
                      </p>
                      <p>
                        <strong>To:</strong>{" "}
                        {edu.to
                          ? new Date(edu.to).toDateString()
                          : "Not available"}
                      </p>
                      <p>
                        <strong>Current:</strong> {edu.current ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {edu.description || "Not available"}
                      </p>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
