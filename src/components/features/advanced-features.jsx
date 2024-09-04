// pages/features/advanced-features.js
import { Card } from "../ui/card";
import { FaRobot, FaRegLightbulb } from "react-icons/fa";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
export default function AdvancedFeatures() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  return (
    <div className="bg-gray-100 min-h-screen dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Advanced Features
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <Card className="p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaRobot className="text-blue-500 text-4xl mr-4" />
              <h2 className="text-2xl font-semibold">AI Integration</h2>
            </div>
            <p>
              Explore AI-driven features like chatbots, predictive analytics,
              and more to enhance user experience.
            </p>
          </Card>

          <Card className="p-6 shadow-md">
            <div className="flex items-center mb-4">
              <FaRegLightbulb className="text-blue-500 text-4xl mr-4" />
              <h2 className="text-2xl font-semibold">Innovative Tools</h2>
            </div>
            <p>
              Discover innovative tools and functionalities designed to improve
              efficiency and user engagement.
            </p>
          </Card>
        </div>
        <div className="text-center mt-12">
          <a onClick={() => navigate(-1)}>
            {" "}
            <Button className="bg-yellow-500 text-black py-2 px-4 rounded shadow-md">
              Back
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
