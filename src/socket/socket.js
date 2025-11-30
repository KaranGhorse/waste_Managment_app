import { io } from "socket.io-client";

export const socket = io("https://waste-managment-y3tn.onrender.com", {
  transports: ["websocket"],
  reconnection: false,
});
