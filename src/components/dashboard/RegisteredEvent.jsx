import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Tooltip, TooltipProvider } from "../ui/tooltip";
import { Alert } from "../ui/alert";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaCalendarDay,
  FaCalendarMinus,
} from "react-icons/fa";

const RegisteredEvent = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("upcoming");
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEventId, setActiveEventId] = useState(null);

  useEffect(() => {
    fetchEventsByStatus(statusFilter);
  }, [statusFilter]);

  useEffect(() => {
    filterEvents();
  }, [events, searchQuery]);

  const fetchEventsByStatus = async (status) => {
    try {
      setLoading(true);
      const response = await api.get(`/api/events/registered/${status}`);
      setEvents(response.data);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching ${status} events:`, error);
      setError(`Failed to load ${status} events.`);
      setLoading(false);
    }
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterEvents = () => {
    if (searchQuery) {
      setFilteredEvents(
        events.filter((event) =>
          event.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredEvents(events);
    }
  };

  const toggleEventDetails = (id) => {
    setActiveEventId(activeEventId === id ? null : id);
  };
  return (
    <TooltipProvider>
      <div className="container mx-auto p-8 bg-background">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          Registered Events
        </h1>

        {error && (
          <Alert variant="destructive" className="mb-4">
            {error}
          </Alert>
        )}

        <div className="flex justify-center mb-6 space-x-4">
          <Button
            onClick={() => handleStatusChange("upcoming")}
            className={`flex items-center ${
              statusFilter === "upcoming"
                ? "text-blue-500 dark:text-blue-300"
                : "text-gray-700 dark:text-gray-300"
            } bg-transparent border border-gray-300 dark:border-gray-700 rounded-md shadow-sm`}
          >
            <FaCalendarDay className="mr-2" />
            Upcoming
          </Button>
          <Button
            onClick={() => handleStatusChange("past")}
            className={`flex items-center ${
              statusFilter === "past"
                ? "text-red-500 dark:text-red-300"
                : "text-gray-700 dark:text-gray-300"
            } bg-transparent border border-gray-300 dark:border-gray-700 rounded-md shadow-sm`}
          >
            <FaCalendarMinus className="mr-2" />
            Past
          </Button>
        </div>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="Search events..."
            className="border border-gray-300 rounded-md p-2 text-lg w-full max-w-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        {loading ? (
          <Skeleton className="h-20 w-full" />
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Events
            </h2>
            {filteredEvents.length > 0 ? (
              <div className="space-y-4 w-full max-w-lg p-12">
                {filteredEvents.map((event) => (
                  <div
                    key={event._id}
                    className="border border-gray-200 rounded-lg dark:border-gray-700"
                  >
                    <Button
                      onClick={() => toggleEventDetails(event._id)}
                      className="w-full text-left p-4 flex items-center justify-between bg-background text-foreground dark:text-gray-100"
                    >
                      <div className="flex items-center">
                        {event.status === "Scheduled" ? (
                          <FaCalendarDay className="text-blue-500 mr-2" />
                        ) : (
                          <FaCalendarMinus className="text-red-500 mr-2" />
                        )}
                        {event.name}
                        <span
                          className={`ml-2 ${
                            event.status === "Scheduled"
                              ? "text-blue-500 dark:text-blue-300"
                              : "text-red-500 dark:text-red-300"
                          }`}
                        >
                          {event.status === "Scheduled" ? "U" : "P"}
                        </span>
                      </div>
                      <FaCheckCircle className="text-gray-500 dark:text-gray-300" />
                    </Button>

                    {activeEventId === event._id && (
                      <Card className="shadow-lg p-6 mx-auto max-w-md mt-2 bg-background0">
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                          {event.name}
                        </h3>
                        <p className="text-lg font-semibold flex items-center text-gray-700 dark:text-gray-300">
                          <FaCalendarAlt className="mr-2" />
                          Date: {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p className="text-lg font-semibold flex items-center text-gray-700 dark:text-gray-300">
                          <FaClock className="mr-2" />
                          Time: {event.time}
                        </p>
                        <p className="text-lg font-semibold flex items-center text-gray-700 dark:text-gray-300">
                          Status: {event.status}
                        </p>
                        <div className="mt-4 text-center">
                          <Tooltip content="View event details">
                            <Button asChild variant="primary">
                              <Link to={`/edit/${event._id}`}>Go to Event</Link>
                            </Button>
                          </Tooltip>
                        </div>
                      </Card>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-lg text-center mt-4 text-gray-700 dark:text-gray-300">
                No events found.
              </p>
            )}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default RegisteredEvent;
