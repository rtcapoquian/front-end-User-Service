import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import api from "../../api"; // Import the API instance

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userRes = await api.get("/api/profile/me");

        // Set user state with the data from the response
        setUser(userRes.data);

        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setError("Error loading data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteAccount = async () => {
    try {
      await api.delete(`/api/profile`);
      console.log("Account deleted");
      // Optionally, redirect or perform additional actions after deletion
    } catch (err) {
      console.error(err.message);
      setError("Error deleting account. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user)
    return (
      <p>
        <Link to="/edit-profile" className="text-blue-500 hover:underline">
          Create Profile
        </Link>
      </p>
    ); // Handle cases where user data is not available

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        {user.user && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">
                Hey There, {user.user.name}
              </h2>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Actions</h2>
              <ul className="list-disc pl-5">
                <li>
                  <Link
                    to={`/registerevent/${user.user._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Registered And Completed
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/waitinglistevent/${user.user._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Waitlisted Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/edit-profile"
                    className="text-blue-500 hover:underline"
                  >
                    Your Profile
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-8">
              <div className="h-80">
                <FullCalendar
                  defaultView="dayGridMonth"
                  plugins={[dayGridPlugin]}
                  events={[
                    { title: "Game Day", date: "2024-10-01" },
                    { title: "Music", date: "2019-11-02" },
                  ]}
                />
              </div>
            </div>
            <div className="mb-8 text-center">
              <button
                type="button"
                onClick={() => deleteAccount()}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete Account
              </button>
              <h3 className="text-xl font-semibold mt-4">
                Explore Experiences
              </h3>
              <p className="mt-2">Find something great to do!</p>
              <p>
                <Link
                  to="/SearchEvents"
                  className="text-blue-500 hover:underline"
                >
                  Browse All
                </Link>
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Events You Love</h2>
              <div className="flex flex-wrap gap-4">
                {user.user.likes && user.user.likes.length > 0 ? (
                  user.user.likes.map((event, index) => (
                    <Link key={index} to={`/events/${event._id}`}>
                      <div
                        style={{
                          width: "200px",
                          borderRadius: "16px",
                          padding: "20px",
                          height: "200px",
                          backgroundColor: "#f0f0f0",
                        }}
                        className="flex items-center justify-center text-center"
                      >
                        <p className="font-semibold">Event {index + 1}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>No liked events to display.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
