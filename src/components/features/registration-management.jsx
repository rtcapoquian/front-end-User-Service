// pages/features/registration-management.js
import { Card } from "../ui/card";
import { FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function RegistrationManagement() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Attendee Registration & Event Management
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaRegCalendarAlt className="text-blue-500 text-4xl mr-4" />
              <h2 className="text-2xl font-semibold">Event Creation</h2>
            </div>
            <p>
              Create and manage events with ease. Define event details, set up
              schedules, and manage your event’s logistics.
            </p>
          </Card>

          <Card className="p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaUsers className="text-blue-500 text-4xl mr-4" />
              <h2 className="text-2xl font-semibold">Attendee Management</h2>
            </div>
            <p>
              View, filter, and manage attendee registrations. Send
              confirmations, handle waitlists, and more.
            </p>
          </Card>

          <Card className="p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaRegCalendarAlt className="text-blue-500 text-4xl mr-4" />
              <h2 className="text-2xl font-semibold">QR Code Generation</h2>
            </div>
            <p>
              Generate and send QR codes for event check-ins. Ensure smooth and
              efficient event entry.
            </p>
          </Card>
        </div>
        <div className="text-center mt-12">
          <Button className="bg-yellow-500 text-black py-2 px-4 rounded shadow-md">
            <a onClick={() => navigate(-1)}>Back</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
