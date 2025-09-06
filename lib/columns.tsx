"use client";

import { ColumnDef } from "@tanstack/react-table";
import { History } from "./definitions";

export const historyColumns: ColumnDef<History>[] = [
  {
    accessorKey: "client_ref_id",
    header: "Ref #",
    cell: ({ row }) => (
      <div className="capitalize text-xs">{row.getValue("client_ref_id")}</div>
    ),
  },
  {
    accessorKey: "created_on",
    header: "Created On",
    cell: ({ row }) => (
      <div className="capitalize text-xs">{row.getValue("created_on")}</div>
    ),
  },
  {
    accessorKey: "number_of_pan",
    header: "Number of PANs",
    cell: ({ row }) => (
      <div className="capitalize text-xs">{row.getValue("number_of_pan")}</div>
    ),
  },
  {
    accessorKey: "batch_request_status",
    header: "Batch Request Status",
    cell: ({ row }) => (
      <div className="capitalize text-xs">
        {row.getValue("batch_request_status")}
      </div>
    ),
  },
  {
    accessorKey: "updated_on",
    header: "Updated On",
    cell: ({ row }) => (
      <div className="capitalize text-xs">{row.getValue("updated_on")}</div>
    ),
  },
  {
    accessorKey: "error_message",
    header: "Error Message",
    cell: ({ row }) => (
      <div className="capitalize text-xs">{row.getValue("error_message")}</div>
    ),
  },
  /* {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          <Badge
            className={clsx({
              "bg-green-900": row.getValue("status") === "Success",
              "bg-yellow-600": row.getValue("status") === "Processing",
              "bg-red-600": row.getValue("status") === "Failed",
            })}
          >
            {row.getValue("status")}
          </Badge>
        </div>
      );
    },
  }, */
  /* {
    id: "actions",
    header: () => <div>Options</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.jobid)}
              className={clsx({
                "hidden md:hidden":
                  row.getValue("status") === "Failed" ||
                  row.getValue("status") === "Processing",
              })}
            >
              <Download></Download>
              Download
            </DropdownMenuItem>
            <DropdownMenuItem
              className={clsx({
                "hidden md:hidden":
                  row.getValue("status") === "Failed" ||
                  row.getValue("status") === "Processing",
              })}
            >
              <Trash2></Trash2> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }, */
];
