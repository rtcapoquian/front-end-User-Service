// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://api.eventcs.com", {
  transports: ["websocket", "polling"],
});

// const socket = io("http://localhost:5000", {
//   transports: ["websocket", "polling"],
// });
export default socket;
