// src/socket.js
import { io } from "socket.io-client";

// const socket = io("https://d16e2auk6ot0vq.cloudfront.net", {
//   transports: ["websocket", "polling"],
// });

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
});
export default socket;
