import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Slideshow from "../layout/Slideshow";
import { Card } from "@/components/ui/Card";
import { FaUser, FaUserTie, FaAws } from "react-icons/fa";
import axios from "axios"; // Import axios for API requests
import { API_URL } from "../../API_URL"; // Adjust the path to your API URL

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    if (token && userType) {
      if (userType === "Organizer") {
        navigate("/landingorg");
      } else if (userType === "Attendee") {
        navigate("/SearchEvents");
      }
    }
  }, [navigate]);

  const registerUser = async (email, password, userType) => {
    try {
      const response = await axios.post(`${API_URL}/auth`, {
        email,
        password,
        userType,
      });

      const { token, userId } = response.data;

      // Store token and userType in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userType", userType);
      localStorage.setItem("user_id", userId);

      // Redirect based on user type
      if (userType === "Organizer") {
        navigate("/dashboardOrg");
      } else if (userType === "Attendee") {
        navigate("/landingpage");
      }
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 relative">
        <Slideshow />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center z-10 relative pt-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Welcome to Eventcs
          </h1>
          <p className="text-base md:text-lg mb-6 text-gray-700 dark:text-gray-300">
            Eventcs is your ultimate event management and discovery platform.
          </p>
          <div className="flex flex-col space-y-4">
            <Link to="/register">
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white dark:bg-green-700 dark:hover:bg-green-800">
                Login
              </Button>
            </Link>
          </div>
        </div>

        <Card className="bg-gray-100 dark:bg-gray-900 shadow-lg rounded-lg p-8 mt-8 max-w-md w-full text-center z-10 relative border border-gray-300 dark:border-gray-700">
          <div className="flex justify-center mb-4"></div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white bg-yellow-500 p-2 rounded-md">
            For Testing and Demo Purposes for AWS Innovation Cup 2024
          </h2>
          <p className="text-base mb-4 text-gray-800 dark:text-gray-200">
            Click on a name to automatically register as that attendee:
          </p>
          <ul className="text-gray-800 dark:text-gray-200 list-disc list-inside mb-6 space-y-2">
            <li className="flex items-center justify-center">
              <FaUser className="text-blue-600 dark:text-blue-400 mr-2" />
              <button
                onClick={() =>
                  registerUser(
                    "rejicapoquian81@gmail.com",
                    "rejithe3",
                    "Attendee"
                  )
                }
                className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
              >
                Reji Capoquian
              </button>
            </li>
            <li className="flex items-center justify-center">
              <FaUser className="text-blue-600 dark:text-blue-400 mr-2" />
              <button
                onClick={() =>
                  registerUser(
                    "aaron.abadiano@gmail.com",
                    "rejithe3",
                    "Attendee"
                  )
                }
                className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
              >
                Aaron Abadiano
              </button>
            </li>
            <li className="flex items-center justify-center">
              <FaUser className="text-blue-600 dark:text-blue-400 mr-2" />
              <button
                onClick={() =>
                  registerUser(
                    "rance.deguzman@gmail.com",
                    "rejithe3",
                    "Attendee"
                  )
                }
                className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
              >
                Rance Deguzman
              </button>
            </li>
          </ul>
          <p className="text-base mb-4 text-gray-800 dark:text-gray-200">
            And for the organizer:
          </p>
          <ul className="text-gray-800 dark:text-gray-200 list-disc list-inside mb-6 space-y-2">
            <li className="flex items-center justify-center">
              <FaUserTie className="text-orange-600 dark:text-orange-400 mr-2" />
              <button
                onClick={() =>
                  registerUser("fp.sangilan@gmail.com", "rejithe3", "Organizer")
                }
                className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
              >
                Fp Sangilan
              </button>
            </li>
          </ul>
          <a
            href="https://github.com/rtcapoquian/front-end-User-Service/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800">
              User Guide
            </Button>
          </a>
        </Card>

        <footer className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              &copy; 2024 Eventcs. All rights reserved.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <Link
                to="/about"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
              >
                About Us
              </Link>{" "}
              |
              <Link
                to="/contact"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
              >
                Contact
              </Link>
            </p>
          </div>
        </footer>

        <div className="flex flex-col items-center justify-center mt-8 p-4">
          <div className="flex items-center">
            <FaAws className="text-4xl text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-base text-gray-600 dark:text-gray-400">
              Powered by AWS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
