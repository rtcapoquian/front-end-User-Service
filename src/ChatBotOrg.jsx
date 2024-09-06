import React, { useState, useRef, useEffect } from "react";
import { FaCommentDots } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import api from "./api";
import BotProp from "./BotProp";

let typingIntervalId = null;

const ChatBot = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);

  const userType = localStorage.getItem("userType");
  if (userType !== "Organizer") return null;
  // Do not display ChatBot if userType is not "ChatbotOrg"

  useEffect(() => {
    if (isOpen && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response, isOpen]);

  const simulateTyping = (text, delay = 5) => {
    let index = 0;
    let currentResponse = "";
    const intervalId = setInterval(() => {
      if (index >= text.length) {
        clearInterval(intervalId);
        return;
      }
      setResponse((prev) => currentResponse );
      currentResponse += text[index];
      index += 1;
    }, delay);

    // Clear the interval if a new message is sent
    return () => clearInterval(intervalId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Clear previous typing simulation
    if (typeof typingIntervalId === "function") {
      typingIntervalId();
    }

    try {
      const result = await api.post(`/api/awsbotorg/${id}`, {
        userMessage: message,
      });
      const text = result.data.response;
      setResponse(""); // Clear previous response
      // Start typing simulation
      typingIntervalId = simulateTyping(text);
    } catch (error) {
      console.error(
        "Fill up your profile information first to use this:",
        error
      );
      setResponse("Fill up your profile information first to use this.");
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="">
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg hover:bg-primary/80 focus:outline-none bg-primary text-white z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaCommentDots size={24} />
      </button>

      {/* Chatbot Popup */}
      {isOpen && (
        <Card className="fixed bottom-16 right-6 w-[85%] max-w-xs sm:max-w-md   h-[80vh] sm:h-[70vh] md:h-[68vh] lg:h-[68vh] flex flex-col border shadow-lg bg-background text-gray-800 dark:text-gray-100 z-50">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Chat with AI
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition duration-200 dark:text-gray-400"
            >
              ✕
            </button>
          </div>

          {/* Response Area */}
          <div className="flex-1 p-4 overflow-y-auto border">
            <div className="p-2 text-sm rounded-lg bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
              <BotProp response={response} />
            </div>
          </div>

          {/* Input Field */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-gray-300 dark:border-gray-700 flex items-center space-x-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
              required
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary border-gray-300 dark:border-gray-600 bg-background dark:text-gray-100"
            />
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white font-semibold ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/80"
              }`}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </Card>
      )}
    </div>
  );
};

export default ChatBot;
