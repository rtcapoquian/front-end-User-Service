import React, { useState, useEffect } from "react";
import api from "../../api";
import Event from "../chat/Event";
import { Input } from "../ui/Input";

const SearchPeople = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await api.get("/api/auth/people");
        setEvents(response.data);
        setFilteredEvents(response.data); // Set initial filtered list
      } catch (error) {
        console.error(error);
      }
    };

    fetchPeople();
  }, []);

  useEffect(() => {
    // Filter events based on search term
    if (searchTerm) {
      setFilteredEvents(
        events.filter((event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredEvents(events); // Show all if search term is empty
    }
  }, [searchTerm, events]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-6 mx-auto max-w-screen-xl bg-background text-foreground">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">Search for Users</h1>
        <p className="text-lg text-gray-600 mt-2">
          Enter a name to find users in our community.
        </p>
      </div>
      <div className="flex flex-col items-center mb-6">
        <Input
          type="text"
          id="search-bar"
          value={searchTerm}
          placeholder="Search for a User"
          onChange={handleSearchChange}
          className="w-full max-w-md"
        />
      </div>
      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredEvents.map((event) => (
          <Event event={event} key={event._id} />
        ))}
      </div>
    </div>
  );
};

export default SearchPeople;
