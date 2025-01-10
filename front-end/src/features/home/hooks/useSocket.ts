import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
import { Activity } from "../types";

export function useSocket() {
  const [activity, setActivity] = useState<Activity | null>(null);

  function initializeSocket() {
    socket.connect();
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("newActivity", (data) => {
      setActivity(data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    initializeSocket,
    activity,
  };
}
