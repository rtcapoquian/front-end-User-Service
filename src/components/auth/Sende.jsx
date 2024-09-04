import React, { Fragment, useState } from "react";
import axios from "axios";
import { API_URL } from "../../API_URL";
import Slideshow from "../layout/Slideshow";
// import { Input, Button } from '../ui'; // Adjust the import according to your structure
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Sende = () => {
  const [formData, setFormData] = useState({
    email: "",
    question1: "",
    answer1: "",
    question2: "",
    answer2: "",
  });
  const [message, setMessage] = useState(""); // Combined success and error message state

  const { email, question1, answer1, question2, answer2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(`${API_URL}/auth/sendss`, {
        email,
        question1,
        answer1,
        question2: question2 || "",
        answer2: answer2 || "",
      });

      // Show a generic success message
      setMessage("Check your email if you get the security question right.");
    } catch (err) {
      // Show a generic error message
      setMessage("An error occurred. Please try again later.");
      console.error("Error sending request:", err);
    }
  };

  return (
    <Fragment>
      <section className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/2 relative">
          <Slideshow />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 text-foreground">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Reset Password
            </h2>
            <form onSubmit={onSubmit} className="space-y-6">
              <Input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="focus:ring-blue-500"
              />
              <select
                name="question1"
                value={question1}
                onChange={onChange}
                className="block w-full p-2 border rounded focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                required
              >
                <option value="">Select Security Question</option>
                <option value="Your First Pet's Name">
                  Your First Pet's Name
                </option>
                <option value="Your Father's First Name">
                  Your Father's First Name
                </option>
                <option value="Your Mother's Maiden Name">
                  Your Mother's Maiden Name
                </option>
                <option value="Your High School's Name">
                  Your High School's Name
                </option>
                <option value="The City You Were Born In">
                  The City You Were Born In
                </option>
              </select>
              <Input
                type="text"
                placeholder="Enter Answer Here"
                name="answer1"
                value={answer1}
                onChange={onChange}
                required
                className="focus:ring-blue-500"
              />
              {question2 && (
                <>
                  <select
                    name="question2"
                    value={question2}
                    onChange={onChange}
                    className="block w-full p-2 border rounded focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    required
                  >
                    <option value="">Select Another Security Question</option>
                    <option value="Your First Pet's Name">
                      Your First Pet's Name
                    </option>
                    <option value="Your Father's First Name">
                      Your Father's First Name
                    </option>
                    <option value="Your Mother's Maiden Name">
                      Your Mother's Maiden Name
                    </option>
                    <option value="Your High School's Name">
                      Your High School's Name
                    </option>
                    <option value="The City You Were Born In">
                      The City You Were Born In
                    </option>
                  </select>
                  <Input
                    type="text"
                    placeholder="Enter Answer Here"
                    name="answer2"
                    value={answer2}
                    onChange={onChange}
                    required
                    className="focus:ring-blue-500"
                  />
                </>
              )}
              {message && (
                <p
                  className={`text-center ${
                    message.startsWith("An error")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {message}
                </p>
              )}
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition-colors duration-300"
              >
                Send Verification Email
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Sende;
