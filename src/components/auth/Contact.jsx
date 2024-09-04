import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { FaArrowLeft } from 'react-icons/fa';

const Contact = () => {
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
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Contact Me</h1>
        <hr className="my-6 border-gray-300" />
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          I'm always excited to connect with others and discuss opportunities, collaborations, or any questions you may have.
        </p>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Feel free to reach out to me through the following channels:
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-gray-800">Email:</span>
            <a 
              href="mailto:rejicapoquian81@gmail.com" 
              className="text-blue-600 hover:underline"
            >
              rejicapoquian81@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-gray-800">Facebook:</span>
            <a 
              href="https://web.facebook.com/rejicapoquian81" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              facebook.com/rejicapoquian81
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-gray-800">GitHub:</span>
            <a 
              href="https://github.com/rtcapoquian" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              github.com/rtcapoquian
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Contact;
