import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import MapComponent from "./MapComponent";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CalendarForm from "./DateTest";

const AddEvent = () => {
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
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    name,
    information,
    address,
    longitude,
    latitude,
    capacity,
    details,
    date,
    time,
  } = formData;

  useEffect(() => {
    const storedOrganizer = localStorage.getItem("user_id");
    if (storedOrganizer) {
      setFormData((prevState) => ({
        ...prevState,
        organizer: storedOrganizer,
      }));
    }
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onMapClick = ({ lat, lng }) => {
    setFormData((prevState) => ({
      ...prevState,
      latitude: lat,
      longitude: lng,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/api/events", formData);
      const postText = `Event: ${name} at ${address} on ${date} at ${time}`;
      await api.post("/api/posts", { text: postText });

      setSuccessMessage("Event and post added successfully!");
      setErrorMessage("");
      navigate("/landingorg");
    } catch (error) {
      setErrorMessage("Error adding event. Please try again.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      date,
    }));
  };

  return (
    <section className="max-w-2xl mx-auto p-4  mt-8 rounded-xl border bg-card text-card-foreground shadow">
      <h1 className="text-3xl font-semibold text-center mb-4 text-foreground">
        Add Event
      </h1>
      {loading && (
        <p className="text-center text-muted-foreground">Loading...</p>
      )}
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
                value={name}
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
                value={information}
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
                value={address}
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
                value={capacity}
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
                  value={longitude}
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
                  value={latitude}
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
                value={details}
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
                <CalendarForm date={date} onDateChange={handleDateChange} />
              </div>

              <div>
                <Label htmlFor="time" className="text-foreground">
                  Time
                </Label>
                <Input
                  type="time"
                  name="time"
                  id="time"
                  value={time}
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

export default AddEvent;
