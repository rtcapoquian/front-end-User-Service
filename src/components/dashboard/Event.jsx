import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import api from '@/api';
import { FaLocationArrow, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'; // Import relevant icons

const Event = ({ event }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/api/profile/user/${event._id}`);
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUserProfile({}); // Set an empty object to handle missing data gracefully
      }
    };

    fetchUserProfile();
  }, [event._id]);

  const profileImage = userProfile?.image
    ? userProfile.image
    : 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'; // Default image URL

  const renderSocialLinks = () => {
    const { social } = userProfile || {};
    return (
      <div className="flex space-x-4 mt-4">
        {social?.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600 transition-colors"><FaLinkedin size={24} /></a>}
        {social?.twitter && <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-500 transition-colors"><FaTwitter size={24} /></a>}
        {social?.facebook && <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700 transition-colors"><FaFacebook size={24} /></a>}
        {social?.instagram && <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 dark:text-pink-500 dark:hover:text-pink-700 transition-colors"><FaInstagram size={24} /></a>}
        {social?.youtube && <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-700 transition-colors"><FaYoutube size={24} /></a>}
      </div>
    );
  };

  return (
    <Card className="bg-background shadow-lg rounded-lg overflow-hidden mb-8 mt-4 p-4 border">
      <Link to={`/gotoprofile/${event._id}`}>
        <div className="relative w-full h-64 rounded-lg overflow-hidden">
          <img
            src={profileImage}
            alt={event.name}
            className="w-full h-full object-cover rounded-lg transition-transform transform hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 truncate">{event.name || 'User Name'}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex items-center">
          <FaLocationArrow className="inline mr-2 truncate" size={16} />
          {userProfile?.location || 'Location'}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
  {userProfile?.bio || 'No bio available'}
</p>
        {renderSocialLinks()}
      </div>
    </Card>
  );
};

export default Event;
