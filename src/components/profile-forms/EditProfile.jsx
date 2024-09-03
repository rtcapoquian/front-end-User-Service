import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import api from "../../api";

const formatDate = (dateString) => {
  if (!dateString) return "Not Specified";
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

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
    image: "",
  });

  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/api/profile/me");
        const social = response.data.social || {};

        setFormData({
          company: response.data.company || "",
          website: response.data.website || "",
          location: response.data.location || "",
          status: response.data.status || "",
          skills: response.data.skills ? response.data.skills.join(", ") : "",
          githubusername: response.data.githubusername || "",
          bio: response.data.bio || "",
          twitter: social.twitter || "",
          facebook: social.facebook || "",
          linkedin: social.linkedin || "",
          youtube: social.youtube || "",
          instagram: social.instagram || "",
          image: response.data.image || "",
        });

        setEducation(response.data.education || []);
        setExperience(response.data.experience || []);
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
      setError("");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile. Please try again.");
      setMessage("");
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
    image,
  } = formData;

  return (
    <section className="p-6 text-foreground">
      {/* Display the Profile Image */}
      <section className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Profile Image</h3>
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="mx-auto rounded-full w-32 h-32 object-cover"
          />
        ) : (
          <div className="mx-auto rounded-full w-32 h-32 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </section>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Your Profile</CardTitle>
          <CardDescription>Update your profile details below.</CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <div className="bg-green-100 text-green-800 p-2 rounded mb-4">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-800 p-2 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="status" className="font-medium">
                Your Interests
              </label>
              <Select
                value={status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Interested in" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Events">Events</SelectItem>
                  <SelectItem value="Meet New People">
                    Meet New People
                  </SelectItem>
                  <SelectItem value="Parties">Parties</SelectItem>
                  <SelectItem value="Networking Opportunities">
                    Networking Opportunities
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="location" className="font-medium">
                Where Are You Located
              </label>
              <Input
                id="location"
                name="location"
                value={location}
                onChange={onChange}
                placeholder="Location"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="bio" className="font-medium">
                A Short Bio About Yourself
              </label>
              <Textarea
                id="bio"
                name="bio"
                value={bio}
                onChange={onChange}
                rows="5"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="skills" className="font-medium">
                Your Skills
              </label>
              <Input
                id="skills"
                name="skills"
                value={skills}
                onChange={onChange}
                placeholder="Comma separated"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="githubusername" className="font-medium">
                Github Username
              </label>
              <Input
                id="githubusername"
                name="githubusername"
                value={githubusername}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="twitter" className="font-medium">
                Twitter
              </label>
              <Input
                id="twitter"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="facebook" className="font-medium">
                Facebook
              </label>
              <Input
                id="facebook"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="linkedin" className="font-medium">
                LinkedIn
              </label>
              <Input
                id="linkedin"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="youtube" className="font-medium">
                YouTube
              </label>
              <Input
                id="youtube"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="instagram" className="font-medium">
                Instagram
              </label>
              <Input
                id="instagram"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="image" className="font-medium">
                Profile Image URL
              </label>
              <Input
                id="image"
                name="image"
                value={image}
                onChange={onChange}
              />
            </div>
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
          <div className="space-x-2">
            <Link to="/add-education">
              <Button variant="outline">Add Education</Button>
            </Link>
            <Link to="/add-experience">
              <Button variant="outline">Add Experience</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* Display Education */}
      <section className="mt-6 mx-auto max-w-4xl">
        <h3 className="text-xl font-semibold text-center">Education</h3>
        {education.length > 0 ? (
          <ul className="space-y-4">
            {education.map((edu) => (
              <Card key={edu._id} className="w-80 mx-auto bg-secondary">
                <CardHeader>
                  <CardTitle className="text-center">{edu.degree}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-sm text-muted-foreground">
                    <p className="text-md font-medium dark:text-gray-200">
                      {edu.fieldofstudy}
                    </p>
                    <p className="text-sm  dark:text-gray-300">{edu.school}</p>
                    <p className="text-sm  dark:text-gray-400">
                      {formatDate(edu.from)} -{" "}
                      {edu.to ? formatDate(edu.to) : "Present"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground">
            No education details available.
          </p>
        )}
      </section>

      {/* Display Experience */}
      <section className="mt-6 mx-auto max-w-4xl">
        <h3 className="text-xl font-semibold text-center">Experience</h3>
        {experience.length > 0 ? (
          <ul className="space-y-4">
            {experience.map((exp) => (
              <Card key={exp._id} className="w-80 mx-auto bg-secondary">
                <CardHeader>
                  <CardTitle className="text-center">{exp.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-sm text-muted-foreground">
                    <p className="text-md font-medium dark:text-gray-100">
                      {exp.company}
                    </p>
                    <p className="text-sm dark:text-gray-200">
                      {formatDate(exp.from)} -{" "}
                      {exp.to ? formatDate(exp.to) : "Present"}
                    </p>
                    <p className="text-sm dark:text-gray-300">{exp.location}</p>
                    <p className="text-sm dark:text-gray-400">
                      {exp.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground">
            No experience details available.
          </p>
        )}
      </section>
    </section>
  );
};

export default EditProfile;
