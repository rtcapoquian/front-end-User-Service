import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { FaArrowLeft } from 'react-icons/fa';

const AboutUs = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <Card className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Button
            onClick={() => navigate(-1)} // Navigate to the previous page
            className="flex items-center space-x-2 bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-md px-4 py-2"
          >
            <FaArrowLeft />
            <span>Back</span>
          </Button>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">About Reji Capoquian</h1>
        <hr className="my-6 border-gray-300" />
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Hello! I'm Reji Capoquian, a passionate third-year Computer Engineering student at Mapúa University. Currently residing in Quezon City, I came from   Northern Samar Province. 
        </p>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          My journey into technology began early, driven by a fascination with how things work and a desire to create innovative solutions. At Mapúa, I am deeply involved in software development and enjoy exploring various technologies to solve complex problems. 
        </p>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Beyond academics, I enjoy traveling, gaming, and exploring new cultures. I believe in continuous learning and strive to stay updated with the latest advancements in technology. My goal is to contribute to impactful projects and make a positive difference in the tech community.
        </p>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Thank you for visiting my page. Feel free to connect with me or reach out if you share similar interests or opportunities.
        </p>
      </Card>
    </div>
  );
};

export default AboutUs;
