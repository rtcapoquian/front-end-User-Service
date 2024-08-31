import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import Navbar from "../layout/Navbar";

const Paymentevents = () => {
  const [email, setEmail] = useState("");
  const [activityname, setActivityname] = useState("");
  const [fee, setFee] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { id } = useParams(); // Use useParams hook to get the URL parameters
  const navigate = useNavigate(); // Use useNavigate hook for programmatic navigation

  useEffect(() => {
    api
      .get(`/api/auth/confirmations/${id}`)
      .then((response) => {
        setActivityname(response.data[0].name);
        setFee(response.data[0].pay);
      })
      .catch((error) => console.log(error));
  }, [id]); // Dependency array includes id

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    api
      .post("/api/auth/confirmation", {
        email,
        activityname,
        event_id: id,
        user_id: localStorage.user_id,
      })
      .then(() => {
        setIsSubmitted(true);
        // Navigate to the confirmation page after submission
        navigate(`/confi/${id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Paymentevents;
