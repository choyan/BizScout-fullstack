"use client";
import { useState } from "react";

import { useGetActivitiesByEventQuery } from "@/queries/user-activity";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Spinner } from "@/components/spinner";
import { Activity } from "../types";

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "metadata.username",
    header: "Fullname",
  },
  {
    accessorKey: "metadata.email",
    header: "Email",
  },
  {
    accessorKey: "metadata.signupSource",
    header: "Signup Source",
  },
];

export function RecentSignups() {
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
