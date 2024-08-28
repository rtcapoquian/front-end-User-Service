import React, { useState, useEffect, Fragment } from "react";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";
import ProfileEducation from "./ProfileEducation";
import ProfileExperience from "./ProfileExperience";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user_id } = useParams();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/api/profile/user/${user_id}`);
        console.log(res.data);
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user_id]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <Fragment>
      <Link to="/profiles" className="btn btn-light">
        Back To Profiles
      </Link>
      <div className="profile-grid my-1">
        {profile.experience.length > 0 ? (
          profile.experience.map((exp) => (
            <ProfileExperience key={exp._id} experience={exp} />
          ))
        ) : (
          <h4>No experience</h4>
        )}

        {profile.education.length > 0 ? (
          profile.education.map((edu) => (
            <ProfileEducation key={edu._id} education={edu} />
          ))
        ) : (
          <h4>No education</h4>
        )}
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        {profile.githubusername}
        <ProfileGithub username={profile.githubusername} />
      </div>
    </Fragment>
  );
};

export default Profile;
