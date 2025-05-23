"use client";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { useGetSubscriptionSaller } from "@/hooks/auth.hooks";
import AddTransactionIdModal from "../model/AddTransactionIdModal";
import { TSaller } from "@/types";
import translate from "@/utils/translate";

function SubscriptionDeadline() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, refetch } = useGetSubscriptionSaller();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedUserId, setSelectedUserId] = useState("");

  const columns: ColumnDef<TSaller>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.subscriptionCheck.tableHeadings.name}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="ml-3">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.subscriptionCheck.tableHeadings.email}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="ml-3">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "Contact",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.subscriptionCheck.tableHeadings.contact}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="ml-3">{row.original.phone}</div>,
    },
    {
      accessorKey: "Start Date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.subscriptionCheck.tableHeadings.startDate}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="ml-3">
          {row.original.subStartDate
            ? new Date(row.original.subStartDate).toISOString().slice(0, 10)
            : "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "End Date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.subscriptionCheck.tableHeadings.endDate}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="ml-3">
          {row.original.subEndDate
            ? new Date(row.original.subEndDate).toISOString().slice(0, 10)
            : "N/A"}
        </div>
      ),
    },

    {
      id: "Transaction Id",
      header: `${translate.admin.subscriptionCheck.tableHeadings.transactionId}`,
      enableHiding: false,
      cell: ({ row }) => {
        return row.original.transactionId ? (
          row.original.transactionId
        ) : (
          <div className="isolate flex -space-x-px">
            <Button
              onClick={() => {
                setIsOpen(true);
                setSelectedUserId(row.original._id);
              }}
              variant="outline"
              className="rounded-r-none focus:z-10"
            >
              <Plus /> Trans Id
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data?.data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold">
        {translate.admin.subscriptionCheck.heading}
      </h1>
      <div className="flex flex-row gap-3 justify-between py-4">
        <Input
          placeholder={translate.admin.subscriptionCheck.searchPlaceholder}
          value={(table?.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table?.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel()?.rows?.map((row) => (
                <TableRow
                  key={row?.id}
                  data-state={row?.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells()?.map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {translate.admin.subscriptionCheck.buttons.previous}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {translate.admin.subscriptionCheck.buttons.next}
          </Button>
        </div>
      </div>
      <AddTransactionIdModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        refetch={refetch}
        id={selectedUserId}
      />
    </div>
  );
}

export default SubscriptionDeadline;
