"use client";
import { Spinner } from "@/components/spinner";

import { useGetActivitiesByEventQuery } from "@/queries/user-activity";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useState } from "react";

export function PurchaseHistoryTable() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isPending } = useGetActivitiesByEventQuery({
    page: currentPage,
    limit: 10,
    event: "SIGNUP",
  });

  const fallbackData = {
    data: [],
    meta: {
      total: 0,
      page: 1,
      lastPage: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };

  if (isPending) {
    return <Spinner />;
  }

  return (
    <DataTable
      columns={columns}
      data={data ?? fallbackData}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
}
