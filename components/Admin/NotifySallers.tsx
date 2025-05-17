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
import { ArrowUpDown } from "lucide-react";

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
import { TSaller } from "@/types";
import {
  useGetAllSallerNeedNotify,
  useSendEmailForNotity,
} from "@/hooks/auth.hooks";
import translate from "@/utils/translate";
import { MdEmail } from "react-icons/md";
import { toast } from "sonner";

function NotifySallers() {
  const { data, isLoading, refetch } = useGetAllSallerNeedNotify();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { mutate, isPending } = useSendEmailForNotity();

  const handleSendEmail = (id: string) => {
    mutate(id, {
      onSuccess: (data) => {
        console.log(data);
        if (data?.success) {
          toast.success(data?.message);
          refetch();
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  const columns: ColumnDef<TSaller>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.sallers.tableHeadings.name}
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
            {translate.admin.sallers.tableHeadings.email}
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
            {translate.admin.sallers.tableHeadings.contact}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="ml-3">{row.original.phone}</div>,
    },
    {
      accessorKey: "subEndDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            End In
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const endDate = new Date(row.getValue("subEndDate"));
        const now = new Date();
        const timeDiff = endDate.getTime() - now.getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        return <div>{daysLeft} days</div>;
      },
    },

    {
      accessorKey: "subEndDate3",
      header: () => {
        return <Button variant="ghost">End Date</Button>;
      },
      cell: ({ row }) => <div className="">{row.getValue("subEndDate")}</div>,
    },
    {
      id: "actions",
      header: `${translate.admin.sallers.tableHeadings.action}`,
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="isolate flex -space-x-px">
            <Button
              disabled={isPending}
              onClick={() => handleSendEmail(row.original?._id)}
              variant="outline"
              size="sm"
            >
              Send <MdEmail />
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
    return (
      <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-purple-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold">Notify Sallers</h1>
      <div className="flex flex-row gap-3 justify-between py-4">
        <Input
          placeholder={translate.admin.sallers.searchPlaceholder}
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
            {translate.admin.sallers.buttons.previous}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {translate.admin.sallers.buttons.next}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotifySallers;
