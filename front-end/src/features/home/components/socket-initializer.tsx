"use client";

import { useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { useToast } from "../hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";

export function SocketInitializer() {
  const { activity } = useSocket();
  const { toast } = useToast();
  const client = useQueryClient();

  useEffect(() => {
    if (activity) {
      toast(activity);
      client.invalidateQueries({
        queryKey: ["user-activity", { event: "PURCHASE" }],
      });
    }
  }, [activity, toast, client]);

  return null;
}
