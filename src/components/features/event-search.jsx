// pages/features/event-search.js
import { Card } from "../ui/card";
import { FaSearch, FaFilter } from "react-icons/fa";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
export default function EventSearch() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Event Search & Filtering
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <Card className="p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaSearch className="text-blue-500 text-4xl mr-4" />
              <h2 className="text-2xl font-semibold">Search Events</h2>
            </div>
            <p>
              Use keywords and criteria to find events that match your
              interests. Easily locate the events that matter most.
            </p>
          </Card>

          <Card className="p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaFilter className="text-blue-500 text-4xl mr-4" />
              <h2 className="text-2xl font-semibold">Advanced Filtering</h2>
            </div>
            <p>
              Apply filters based on date, location, type, and more to narrow
              down your event search.
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
