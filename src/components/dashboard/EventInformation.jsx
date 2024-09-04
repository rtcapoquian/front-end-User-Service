import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import MapComponent from "../profile-forms/MapComponent";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

const EventInformation = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState({
    name: "",
    information: "",
    details: "",
    longitude: 0,
    latitude: 0,
    capacity: 5,
    date: new Date(),
    time: "",
    pay: "",
    address: "",
    stringDates: [],
    showMessage: true,
    disabled1: false,
    attendeeStatus: null,
    registrationMessage: "",
    organizer: {
      name: "",
      profileUrl: "",
    },
    registeredCount: 0,
    status: "", // Added to store event status
  });

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    api
      .get(`/api/events/${id}`)
      .then((response) => {
        const event = response.data;
        const eventDate = new Date(event.date);

        if (isNaN(eventDate.getTime())) {
          console.error("Invalid date:", event.date);
        }

        const registeredCount = event.attendees.filter(
          (attendee) => attendee.status === "Registered"
        ).length;

        const isFull = registeredCount >= event.capacity;

        setEventDetails((prev) => ({
          ...prev,
          name: event.name,
          longitude: event.longitude,
          latitude: event.latitude,
          capacity: event.capacity,
          date: eventDate,
          time: event.time,
          information: event.information,
          details: event.details,
          pay: event.pay,
          address: event.address,
          stringDates: [eventDate.toISOString().split("T")[0], event.time],
          registeredCount,
          showMessage:
            isFull ||
            event.status === "Completed" ||
            event.status === "Cancelled",
          disabled1:
            event.status === "Completed" || event.status === "Cancelled",
          organizer: event.organizer,
          status: event.status, // Set the event status
        }));

        return api.get(`/api/events/${id}/attendees/${userId}`);
      })
      .then((response) => {
        setEventDetails((prev) => ({
          ...prev,
          attendeeStatus: response.data ? response.data.status : null,
        }));
      })
      .catch((error) => console.log(error));
  }, [id, userId]);

  const handleRegister = (e) => {
    e.preventDefault();
    api
      .post(`/api/events/${id}/register`, { user_id: userId })
      .then((response) => {
        const { status } = response.data;
        const registeredCount = response.data.attendees.filter(
          (attendee) => attendee.status === "Registered"
        ).length;

        const isFull = registeredCount >= eventDetails.capacity;

        setEventDetails((prev) => ({
          ...prev,
          attendeeStatus: status,
          disabled1: status === "WaitingList" || isFull,
          registrationMessage:
            status === "WaitingList"
              ? "You have been added to the waiting list. The organizer will approve your registration if a spot becomes available."
              : "You have been successfully registered. Please wait for a confirmation email.",
          registeredCount,
          showMessage:
            isFull ||
            response.data.status === "Completed" ||
            response.data.status === "Cancelled",
        }));
      })
      .catch((error) => console.log(error));
  };

  const handleDeregister = () => {
    api
      .delete(`/api/events/${id}/attendees/${userId}`)
      .then(() => {
        setEventDetails((prev) => ({
          ...prev,
          attendeeStatus: null,
          disabled1: false,
          registrationMessage: "Your registration has been cancelled.",
          registeredCount: prev.registeredCount - 1,
          showMessage:
            prev.registeredCount - 1 >= prev.capacity || prev.disabled1,
        }));
      })
      .catch((error) => console.log(error));
  };

  const renderRegisterButton = () => {
    const { attendeeStatus, disabled1 } = eventDetails;

    return (
      <div className="my-6">
        {attendeeStatus ? (
          <Button
            onClick={handleDeregister}
            disabled={disabled1}
            variant="outline"
          >
            Cancel Registration
          </Button>
        ) : (
          <Button onClick={handleRegister} disabled={disabled1} variant="">
            Register
          </Button>
        )}
      </div>
    );
  };

  const {
    name,
    information,
    details,
    latitude,
    longitude,
    address,
    stringDates,
    capacity,
    showMessage,
    registrationMessage,
    organizer,
    registeredCount,
    status,
  } = eventDetails;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center mx-4 my-8">
        <Card className="p-8 bg-card text-card-foreground shadow-xl border rounded-lg transition-all duration-300 hover:bg-muted flex-1 mx-4 my-4">
          <h2 className="text-4xl font-bold mb-4">{name}</h2>
          <p className="text-xl mb-6">{information}</p>
          <p className="text-lg mb-6">{details}</p>
          <div className="flex items-center mb-6">
            <FaCalendarAlt className="text-primary mr-3" />
            <p className="text-lg">Date: {stringDates[0]}</p>
          </div>
          <div className="flex items-center mb-6">
            <FaMapMarkerAlt className="text-primary mr-3" />
            <p className="text-lg">Location: {address}</p>
          </div>
          <div className="flex items-center mb-6">
            <FaUsers className="text-primary mr-3" />
            <p className="text-lg">Capacity: {capacity}</p>
            <p
              className={`text-lg ml-6 ${
                registeredCount >= capacity
                  ? "text-destructive"
                  : "text-primary"
              }`}
            >
              Registered: {registeredCount}
            </p>
          </div>
          <p className="text-lg mb-6">
            Organizer:{" "}
            <Link to={`/gotoprofile/${organizer._id}`} className="text-primary">
              {organizer.name}
            </Link>
          </p>

          {renderRegisterButton()}

          {registrationMessage && (
            <Alert variant="info" className="my-6">
              <AlertTitle>
                {showMessage ? "Registration Status" : ""}
              </AlertTitle>
              <AlertDescription>{registrationMessage}</AlertDescription>
            </Alert>
          )}

          {status === "Completed" && (
            <div className="my-6">
              <Link to={`/givefeedback/${id}`} className="text-primary">
                <Button variant="outline">Give Feedback</Button>
              </Link>
            </div>
          )}
        </Card>
        <div className="w-full flex-1 p-4">
          <MapComponent
            latitude={latitude}
            longitude={longitude}
            className="w-full h-full z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default EventInformation;
