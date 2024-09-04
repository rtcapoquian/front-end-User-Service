import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Slideshow from "./Slideshow"; // Import the Slideshow component

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

  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 relative">
        <Slideshow /> {/* Slideshow on the left side */}
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center z-10 relative">
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
      </div>
    </section>
  );
};

export default Landing;
