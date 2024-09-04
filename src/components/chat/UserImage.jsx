import React, { useState, useEffect } from "react";
import api from "@/api";
const UserImage = ({ userId }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/api/profile/user/${userId}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const defaultProfileImage =
    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

  return (
    <div>
      <img
        src={profile?.image || defaultProfileImage}
        className="w-8 h-8 rounded-full mr-2"
      />
    </div>
  );
};

export default UserImage;
