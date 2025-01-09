"use client";

import { useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

export function SocketInitializer() {
  const { activity, initializeSocket } = useSocket();

  console.log(activity);

  useEffect(() => {
    initializeSocket();
  }, []);

  return null;
}
