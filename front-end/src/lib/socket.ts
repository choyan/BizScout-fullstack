import { io } from "socket.io-client";
import { BASE_URL } from "@/config";

const URL = process.env.NODE_ENV === "production" ? undefined : BASE_URL;

export const socket = io(URL, {
  autoConnect: true,
});
