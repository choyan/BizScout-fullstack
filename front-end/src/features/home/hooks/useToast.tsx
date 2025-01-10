import { toast as sonnerToast } from "sonner";
import { Activity } from "../types";

export function useToast() {
  function toast(activity: Activity) {
    const { event, metadata } = activity;

    if (event === "SIGNUP") {
      sonnerToast.success(`New User Registered: ${metadata.username}`);
    } else if (event === "PURCHASE") {
      sonnerToast.success(`New Product Purchased: ${metadata.amount}`, {
        description: `${metadata.paymentMethod}`,
      });
    }
  }

  return {
    toast,
  };
}
