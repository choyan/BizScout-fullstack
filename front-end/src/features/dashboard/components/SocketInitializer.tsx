"use client";

import { useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { useToast } from "../hooks/useToast";

export function SocketInitializer() {
  const { activity, initializeSocket } = useSocket();
  const { toast } = useToast();

  useEffect(() => {
    initializeSocket();
  }, []);

  useEffect(() => {
    if (activity) {
      toast(activity);
    }
  }, [activity, toast]);

  return null;
}
