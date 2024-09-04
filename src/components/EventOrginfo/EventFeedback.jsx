import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { FaStar, FaExclamationTriangle, FaSearch } from "react-icons/fa";

const EventFeedback = () => {
  const { event_id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'

  useEffect(() => {
    // Fetch event data
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/events/${event_id}`);
        setEvent(response.data);
      } catch (err) {
        setError("Error fetching event data");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [event_id]);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <Card className="max-w-md mx-auto my-4 p-4 bg-red-100 border border-red-200 rounded-lg">
        <CardHeader>
          <FaExclamationTriangle className="text-red-500" size={24} />
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>{error}</CardContent>
      </Card>
    );

  // Calculate average rating
  const calculateAverageRating = () => {
    if (event.attendees.length === 0) return 0;
    const totalRating = event.attendees.reduce(
      (acc, attendee) => acc + attendee.rating,
      0
    );
    return (totalRating / event.attendees.length).toFixed(1);
  };

  // Filter and sort feedbacks
  const filteredAndSortedAttendees = () => {
    const filtered = event.attendees.filter((attendee) =>
      attendee.feedback.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered.sort((a, b) => {
      if (sortOrder === "desc") {
        return b.rating - a.rating;
      } else {
        return a.rating - b.rating;
      }
    });
  };

  return (
    <Card className="max-w-md mx-auto my-4 p-4 bg-background shadow-lg rounded-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-2">
          Feedback for {event.name}
        </CardTitle>
        <div className="flex items-center mb-4">
          <span className="text-lg font-semibold mr-2">Average Rating:</span>
          <FaStar className="inline text-yellow-500" />{" "}
          {calculateAverageRating()}/5
        </div>
        <div className="mb-4">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-black border border-gray-300 p-2 rounded-lg w-full placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400"
            />
            <FaSearch
              className="absolute inset-y-0 right-2 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400"
              size={16}
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="sortOrder"
            className="mr-2 text-black dark:text-white"
          >
            Sort by Rating:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-white text-black border border-gray-300 p-2 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
          >
            <option value="desc">High to Low</option>
            <option value="asc">Low to High</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredAndSortedAttendees().length > 0 ? (
          filteredAndSortedAttendees().map((attendee) => (
            <div
              key={attendee.user_id}
              className="mb-4 border-b border-gray-200 pb-4"
            >
              <p className="text-lg font-semibold">
                <FaStar className="inline text-yellow-500" /> Rating:{" "}
                {attendee.rating}/5
              </p>
              <p className="mt-2">{attendee.feedback}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No feedback available for this event.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default EventFeedback;
