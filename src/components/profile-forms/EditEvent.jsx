// src/components/EditEvent.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import MapComponent from "./MapComponent";
import CalendarForm from "./DateTest";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    information: "",
    address: "",
    longitude: "",
    latitude: "",
    capacity: "",
    details: "",
    date: "",
    time: "",
    status: "Scheduled", // Added status field
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/events/${eventId}`);
        setFormData({
          name: response.data.name,
          information: response.data.information,
          address: response.data.address,
          longitude: response.data.longitude,
          latitude: response.data.latitude,
          capacity: response.data.capacity,
          details: response.data.details,
          date: new Date(response.data.date),
          time: response.data.time,
          status: response.data.status || "Scheduled", // Set initial status
        });
      } catch (error) {
        console.error("Error fetching event:", error);
        setErrorMessage("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onMapClick = ({ lat, lng }) => {
    setFormData((prevState) => ({
      ...prevState,
      latitude: lat,
      longitude: lng,
    }));
  };

  const onDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      date,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.patch(`/api/events/${eventId}`, formData);
      setSuccessMessage("Event updated successfully!");
      setErrorMessage("");
      navigate("/landingorg");
    } catch (error) {
      setErrorMessage("Error updating event. Please try again.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStatusChange = (status) => {
    setFormData((prevState) => ({
      ...prevState,
      status,
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="max-w-2xl mx-auto p-4 mt-8 rounded-xl border bg-card text-card-foreground shadow">
      <h1 className="text-3xl font-semibold text-center mb-4 text-foreground">
        Edit Event
      </h1>
      {successMessage && (
        <Alert>
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}
      {errorMessage && (
        <Alert>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        {currentStep === 1 && (
          <>
            <div>
              <Label htmlFor="name" className="text-foreground">
                Event Name
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={onChange}
                placeholder="Enter event name"
                required
                className="text-foreground bg-input"
              />
            </div>

            <div>
              <Label htmlFor="information" className="text-foreground">
                Event Description
              </Label>
              <Textarea
                name="information"
                id="information"
                value={formData.information}
                onChange={onChange}
                placeholder="Enter event description"
                rows="3"
                className="text-foreground bg-input"
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-foreground">
                Location Address
              </Label>
              <Textarea
                name="address"
                id="address"
                value={formData.address}
                onChange={onChange}
                placeholder="Enter location address"
                rows="3"
                className="text-foreground bg-input"
              />
            </div>

            <div>
              <Label htmlFor="capacity" className="text-foreground">
                Capacity
              </Label>
              <Input
                type="number"
                name="capacity"
                id="capacity"
                value={formData.capacity}
                onChange={onChange}
                placeholder="Enter event capacity"
                required
                className="text-foreground bg-input"
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button
                type="button"
                onClick={handleNextStep}
                className="bg-primary text-primary-foreground"
              >
                Next
              </Button>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="longitude" className="text-foreground">
                  Longitude
                </Label>
                <Input
                  type="text"
                  name="longitude"
                  id="longitude"
                  value={formData.longitude}
                  readOnly
                  placeholder="Longitude"
                  className="text-foreground bg-input"
                />
              </div>

              <div className="flex-1">
                <Label htmlFor="latitude" className="text-foreground">
                  Latitude
                </Label>
                <Input
                  type="text"
                  name="latitude"
                  id="latitude"
                  value={formData.latitude}
                  readOnly
                  placeholder="Latitude"
                  className="text-foreground bg-input"
                />
              </div>
            </div>

            <MapComponent onMapClick={onMapClick} />

            <div className="flex justify-between mt-4">
              <Button
                type="button"
                onClick={handlePreviousStep}
                className="bg-primary text-primary-foreground"
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={handleNextStep}
                className="bg-primary text-primary-foreground"
              >
                Next
              </Button>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <div>
              <Label htmlFor="details" className="text-foreground">
                Additional Details
              </Label>
              <Textarea
                name="details"
                id="details"
                value={formData.details}
                onChange={onChange}
                placeholder="Enter additional details"
                rows="3"
                className="text-foreground bg-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="text-foreground">
                  Select the date for the event.
                </Label>
                <CalendarForm
                  date={formData.date}
                  onDateChange={onDateChange}
                />
              </div>

              <div>
                <Label htmlFor="time" className="text-foreground">
                  Time
                </Label>
                <Input
                  type="time"
                  name="time"
                  id="time"
                  value={formData.time}
                  onChange={onChange}
                  placeholder="Enter event time"
                  required
                  className="text-foreground bg-input"
                />
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <Button
                type="button"
                onClick={handlePreviousStep}
                className="bg-primary text-primary-foreground"
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={handleNextStep}
                className="bg-primary text-primary-foreground"
              >
                Next
              </Button>
            </div>
          </>
        )}

        {currentStep === 4 && (
          <>
            <div className="flex flex-col items-center">
              <Label htmlFor="status" className="text-foreground mb-4">
                Event Status
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{formData.status}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleStatusChange("Scheduled")}
                  >
                    Scheduled
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusChange("Completed")}
                  >
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusChange("Cancelled")}
                  >
                    Cancelled
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex justify-between mt-4">
              <Button
                type="button"
                onClick={handlePreviousStep}
                className="bg-primary text-primary-foreground"
              >
                Previous
              </Button>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground"
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </form>
    </section>
  );
};

export default EditEvent;
