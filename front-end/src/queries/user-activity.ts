import {
  ActivitiesByEventProps,
  getActivitiesByEvent,
} from "@/services/user-activity";
import { useQuery } from "@tanstack/react-query";

export function useGetActivitiesByEventQuery(args: ActivitiesByEventProps) {
  return useQuery({
    queryKey: ["user-activity", args],
    queryFn: () => getActivitiesByEvent(args),
  });
}
