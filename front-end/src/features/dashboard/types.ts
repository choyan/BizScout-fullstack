export type Activity = {
  event: Event;
  timestamp: Date;
  userId: string;
  metadata: JSON;
};

export type Event = "SIGNUP" | "SIGNIN" | "PURCHASE";
