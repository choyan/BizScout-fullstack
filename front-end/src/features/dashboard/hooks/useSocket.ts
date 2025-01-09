import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
import { Activity } from "../types";

export function useSocket() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activity, setActivity] = useState<Activity | null>(null);

  function initializeSocket() {
    socket.connect();
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("newActivity", (data) => {
      // console.log("New activity received:", data);
      setActivity(data);
      setActivities((prev) => [data, ...prev]);
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
    activities,
    activity,
  };
}
