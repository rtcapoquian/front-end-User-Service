import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import Rating from "../ui/rating"; // Import the new Rating component

const GiveFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedbackDetails, setFeedbackDetails] = useState({
    rating: 1,
    feedback: "",
    message: "",
    isSubmitted: false,
  });

  useEffect(() => {
    api
      .get(`/api/events/${id}`)
      .then((response) => {
        const event = response.data;
        if (event.status !== "Completed") {
          navigate(`/events/${id}`); // Redirect to event information page if event is not completed
        }
      })
      .catch((error) => console.log(error));
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post(`/api/events/${id}/feedback`, {
        user_id: localStorage.getItem("user_id"),
        rating: feedbackDetails.rating,
        feedback: feedbackDetails.feedback,
      })
      .then(() => {
        setFeedbackDetails((prev) => ({
          ...prev,
          message: "Feedback submitted successfully!",
          isSubmitted: true,
        }));
      })
      .catch((error) => {
        console.log(error);
        setFeedbackDetails((prev) => ({
          ...prev,
          message: "You are not allowed to give feedback",
        }));
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <Card className="p-10 bg-card text-card-foreground shadow-xl border rounded-lg transition-all duration-300 max-w-xl">
        <h2 className="text-4xl font-bold mb-6">Give Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="rating" className="block text-lg font-medium mb-2">
              Rating (1-5)
            </label>
            <Rating
              name="rating"
              value={feedbackDetails.rating}
              onChange={(value) => setFeedbackDetails((prev) => ({ ...prev, rating: value }))}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="feedback"
              className="block text-lg font-medium mb-2"
            >
              Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              rows="5"
              className="w-full p-3 border rounded-lg bg-background"
              value={feedbackDetails.feedback}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" variant="">
            Submit Feedback
          </Button>
        </form>
        {feedbackDetails.message && (
          <Alert variant={feedbackDetails.isSubmitted ? "success" : "error"} className="mt-8">
            <AlertTitle>{feedbackDetails.isSubmitted ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{feedbackDetails.message}</AlertDescription>
          </Alert>
        )}
      </Card>
    </div>
  );
};

export default GiveFeedback;
