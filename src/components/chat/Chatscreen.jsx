import React, { useState, useEffect, useRef } from "react";
import api from "../../api";
import socket from "../../socket";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaUser, FaComments } from "react-icons/fa";
import UserImage from "./UserImage";

const defaultProfileImage = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

const MessengerApp = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [myusername, setMyusername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const endOfMessagesRef = useRef(null); // Reference for scrolling to the bottom

  useEffect(() => {
    // Fetch users and profiles
    const fetchData = async () => {
      try {
        const userRes = await api.get("/api/users");
        setUsers(userRes.data);
        setFilteredUsers(userRes.data); // Initialize filtered users
      } catch (err) {
        console.error("Error fetching users:", err.message);
      }
    };
    fetchData();
    // Join chat room and listen for messages
    const userId = localStorage.getItem("user_id");
    if (userId) {
      socket.emit("join", userId);
    }
    socket.on("chatMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup
    return () => {
      socket.off("chatMessage");
    };
  }, []);
  
  useEffect(() => {
    // Scroll to the bottom when messages change
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    // Filter users based on search query
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleUserSelect = (userId, username) => {
    setMyusername(username);
    setCurrentChat({ type: "user", id: userId });
    fetchChatMessages(userId);
  };

  const fetchChatMessages = async (receiverId) => {
    try {
      const userId = localStorage.getItem("user_id");
      const res = await api.get("/api/chats", {
        params: { receiver: receiverId, userId },
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err.message);
    }
  };

  const handleSendMessage = async () => {
    if (currentChat && messageInput.trim()) {
      try {
        const senderId = localStorage.getItem("user_id");
        const messageData = {
          message: messageInput,
          sender: senderId,
          receiver: currentChat.id,
        };
        socket.emit("chatMessage", messageData);
        setMessageInput("");
      } catch (err) {
        console.error("Error sending message:", err.message);
      }
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 p-4 bg-white shadow rounded-lg dark:bg-gray-800 dark:text-gray-100">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaUser className="w-6 h-6 mr-2" />
            Users
          </h2>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="mb-4 p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
          <ScrollArea className="h-[calc(85vh-10rem)] rounded-md border-none p-2">
            <ul className="list-none p-0">
              {filteredUsers.map((user) => (
                <li
                  key={user._id}
                  onClick={() => handleUserSelect(user._id, user.name)}
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center dark:hover:bg-gray-700"
                >
                 
                  <UserImage userId={user._id} />
                  {user.name}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>

        <div className="col-span-2 flex flex-col ">
          {currentChat && (
            <div className="flex-1 flex flex-col bg-white shadow rounded-lg dark:bg-gray-800 dark:text-gray-100">
              <div className="flex-1 overflow-y-auto p-4">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaComments className="w-6 h-6 mr-2" />
                  {myusername}
                </h3>
                {/* chat window */}
                <ScrollArea className="h-[calc(85vh-10rem)] rounded-md border-none p-2">
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          (msg.sender._id || msg.sender) === localStorage.getItem("user_id")
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg max-w-xs ${
                            (msg.sender._id || msg.sender) === localStorage.getItem("user_id")
                              ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-100"
                              : "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-300"
                          }`}
                        >
                          {msg.message}
                        </div>
                      </div>
                    ))}
                    <div ref={endOfMessagesRef} /> {/* Scroll reference */}
                  </div>
                </ScrollArea>
              </div>
              <div className="p-4 flex items-center border-t dark:border-gray-600">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 mr-2 p-2 border rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessengerApp;
