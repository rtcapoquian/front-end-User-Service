import React, { useState, useEffect } from "react";
import api from "../../api"; // Adjust the import path as necessary
import socket from "../../socket"; // Ensure this import path is correct

const MessengerApp = () => {
  const [users, setUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [myusername, setMyusername] = useState("");

  useEffect(() => {
    // Fetch all users initially
    const fetchData = async () => {
      try {
        const userRes = await api.get("/api/users");
        setUsers(userRes.data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchData();

    // Get user ID and join the room
    const userId = localStorage.getItem("user_id");
    if (userId) {
      socket.emit('join', userId);
    }

    // Listen for incoming messages
    socket.on("chatMessage", (newMessage) => {
      console.log("Received new message:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup listener on component unmount
    return () => {
      console.log('Cleaning up chatMessage listener');
      socket.off("chatMessage");
    };
  }, []);

  const handleUserSelect = (userId, username) => {
    setMyusername(username);
    setCurrentChat({ type: "user", id: userId });
    fetchChatMessages(userId); // Fetch messages for the selected chat
  };

  const fetchChatMessages = async (receiverId) => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId || !receiverId) {
        throw new Error("Missing userId or receiverId");
      }

      const res = await api.get("/api/chats", {
        params: {
          receiver: receiverId,
          userId: userId,
        },
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
        if (!senderId) {
          throw new Error("Missing sender ID");
        }
        const messageData = {
          message: messageInput,
          sender: senderId,
          receiver: currentChat.id,
        };

     

        // Emit the message to the server via Socket.IO
        socket.emit("chatMessage", messageData);

        // Clear message input after sending
        setMessageInput("");
      } catch (err) {
        console.error("Error sending message:", err.message);
      }
    }
  };

  return (
    <div className="messenger-app">
      {/* Left Panel - User List */}
      <div className="left-panel">
        <div className="users-section">
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user._id} onClick={() => handleUserSelect(user._id, user.name)}>
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Middle Panel - Chat Window */}
      <div className="middle-panel">
        {currentChat && (
          <div className="chat-window">
            <div className="messages">
{myusername}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.sender === localStorage.getItem("user_id")
                      ? "sent"
                      : "received"
                  }
                >
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessengerApp;
