// src/socket.js
import { io } from "socket.io-client";

// const socket = io("http://3.27.140.76:5000", {
//   transports: ["websocket", "polling"],
// });

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
});
export default socket;
