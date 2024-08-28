import React, { Fragment, useState } from "react";
import axios from "axios";
import { API_URL } from "../../API_URL";
import "../../css/forms.css";

const Sende = () => {
  const [formData, setFormData] = useState({
    email: "",
    question1: "",
    answer1: "",
    question2: "", // Initialize question2
    answer2: "",   // Initialize answer2
  });
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages

  const { email, question1, answer1, question2, answer2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    try {
      const response = await axios.post(`${API_URL}/auth/sendss`, {
        email,
        question1,
        answer1,
        question2: question2 || "", // Ensure question2 is sent as an empty string if undefined
        answer2: answer2 || "",     // Ensure answer2 is sent as an empty string if undefined
      });

      if (response.data.msg) {
        if (response.data.msg === "Email has been sent successfully") {
          setSuccess("Email has been sent successfully");
        } else {
          setError("An unexpected response was received: " + response.data.msg);
        }
      } else if (response.data.errors && response.data.errors[0].msg) {
        setError(response.data.errors[0].msg);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while sending the request. Please try again later.");
      console.error("Error sending request:", err);
    }
  };

  return (
    <Fragment>
      <section className="formslayout2">
        <div className="formslayout2-inner">
          <div className="page">
            <div className="register">
              <div className="formulaire">
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={email}
                      onChange={onChange}
                      required
                    />
                    <select
                      value={question1}
                      className="input2"
                      name="question1"
                      onChange={onChange}
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

                    <input
                      type="text"
                      placeholder="Enter Answer Here"
                      name="answer1"
                      value={answer1}
                      onChange={onChange}
                      required
                    />
                    
                    {/* You can also remove the elements for question2 and answer2 if they are not needed */}
                  
                  </div>

                  {error && <div className="error-message">{error}</div>}
                  {success && <div className="success-message">{success}</div>}

                  <input
                    type="submit"
                    className="button1"
                    value="Send Verification Email"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Sende;
