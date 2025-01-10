"use client";

import { ColumnDef } from "@tanstack/react-table";
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
