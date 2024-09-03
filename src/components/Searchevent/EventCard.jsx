import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const EventCard = ({ event }) => {
  const eventDate = new Date(event.date.$date || event.date);
  const formattedDate = eventDate.toLocaleDateString();
  const formattedTime = event.time;

  const registeredCount = event.attendees.filter(
    (attendee) => attendee.status === "Registered"
  ).length;

  const remainingSpots = event.capacity - registeredCount;

  return (
    <Card className="relative p-4 mb-6 shadow-lg border transition-all duration-300 hover:shadow-[0px_4px_12px_0px_var(--foreground)] hover:bg-muted">
      <Link to={`/edit/${event._id}`} className="block rounded-lg overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-[var(--card-foreground)] truncate">
            {event.name}
          </h2>
          <p className="text-[var(--popover-foreground)] mt-1 flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            {event.address}
          </p>
          <p className="text-[var(--muted-foreground)] mt-2 flex items-center">
            <FaCalendarAlt className="mr-2" />
            {formattedDate} at {formattedTime}
          </p>
          <div className="flex items-center mt-3">
            <span className="text-[var(--muted-foreground)] font-medium flex items-center">
              <FaUsers className="mr-2" />
              Capacity:
            </span>
            <span className="ml-2 text-[var(--foreground)] font-semibold">
              {event.capacity}
            </span>
            <span
              className={`ml-4 text-sm ${
                remainingSpots > 0
                  ? "text-primary"
                  : "text-destructive"
              }`}
            >
              {remainingSpots > 0
                ? `${remainingSpots} spots available`
                : "No spots available"}
            </span>
          </div>
        </div>
      </Link>
      {remainingSpots === 0 && (
        <div className="absolute top-2 right-2 bg-[var(--destructive)] text-[var(--destructive-foreground)] text-xs font-semibold py-1 px-2 rounded-full">
          Sold Out
        </div>
      )}
    </Card>
  );
};

export default EventCard;
