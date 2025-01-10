import { BASE_URL } from "@/config";
import { Activity, Event } from "@/features/home/types";

export type ActivitiesByEventProps = {
  page: number;
  limit: number;
  event: Event;
};

export type ActivityDataType = {
  data: Activity[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export async function getActivitiesByEvent({
  page,
  limit,
  event,
}: ActivitiesByEventProps): Promise<ActivityDataType> {
  try {
    const response = await fetch(
      `${BASE_URL}/user-activities?page=${page}&limit=${limit}&event=${event}`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw new Error("Unable to fetch activities");
  }
}
