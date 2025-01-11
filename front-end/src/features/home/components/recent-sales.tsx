"use client";

import { Spinner } from "@/components/spinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetActivitiesByEventQuery } from "@/queries/user-activity";
import { PAYMENT_METHODS } from "../constants";

export function RecentSales() {
  const { data, isPending } = useGetActivitiesByEventQuery({
    page: 1,
    limit: 10,
    event: "PURCHASE",
  });

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="-m-2">
      {data?.data
        ?.filter((item) => item.event === "PURCHASE")
        .map((item) => (
          <div
            className="flex items-center justify-between mt-4  first:mt-0"
            key={item.metadata.orderId}
          >
            <div className="flex space-x-2">
              <Avatar className="h-9 w-9">
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {item.userId}
                </p>
                <p className="text-sm text-muted-foreground">
                  {PAYMENT_METHODS[item.metadata.paymentMethod]}
                </p>
              </div>
            </div>
            <div className="ml-auto font-medium">+${item.metadata.amount}</div>
          </div>
        ))}
    </div>
  );
}
