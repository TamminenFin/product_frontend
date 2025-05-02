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
import { ArrowUpDown, Edit, Eye, Trash } from "lucide-react";

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
import Link from "next/link";
import { TSaller } from "@/types";
import { useGetAllSaller, useRemoveSaller } from "@/hooks/auth.hooks";
import SubscriptionModal from "../model/SubscriptionModal";
import translate from "@/utils/translate";
import DeleteUserModal from "../model/DeleteUserModal";

function AllSallers() {
  const { data, isLoading, refetch } = useGetAllSaller();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedId, setSelectedId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dates, setDates] = useState<{
    startDate: string;
    endDate: string;
  } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userName, setUserName] = useState<{
    userName: string;
    id: string;
  } | null>(null);
  const { mutate } = useRemoveSaller();

  const handleDelete = () => {
    mutate(
      { sallerId: userName?.id as string },
      {
        onSuccess: () => {
          refetch();
          setIsDeleteModalOpen(false);
        },
      }
    );
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
      accessorKey: "categoryCount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.sallers.tableHeadings.totalCategory}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("categoryCount")}</div>
      ),
    },
    {
      accessorKey: "productCount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.sallers.tableHeadings.totalProduct}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("productCount")}</div>
      ),
    },
    {
      accessorKey: "Status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.sallers.tableHeadings.status}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => {
        const isDeactivated =
          new Date() > new Date(row.original?.subEndDate as Date);

        return (
          <div
            className={`inline-block px-3 text-sm py-0.5 text-white rounded-full ${
              row.original.status === "Pending"
                ? "bg-blue-600"
                : isDeactivated
                ? "bg-red-500"
                : "bg-green-500"
            }`}
          >
            {isDeactivated ? "Deactivated" : row.original?.status}
          </div>
        );
      },
    },

    {
      id: "actions",
      header: `${translate.admin.sallers.tableHeadings.action}`,
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="isolate flex -space-x-px">
            <Link href={`/admin/sallers/${row.original?._id}`}>
              <Button variant="outline" className="rounded-r-none focus:z-10">
                <Eye />
              </Button>
            </Link>
            {row.original.status !== "Pending" && (
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedId(row.original?._id);
                  setDates({
                    startDate: row.original.subStartDate as unknown as string,
                    endDate: row.original.subEndDate as unknown as string,
                  });
                }}
                variant="outline"
                className="rounded-r-none focus:z-10"
              >
                <Edit />
              </Button>
            )}
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setUserName({
                  userName: row.original.name,
                  id: row.original._id,
                });
              }}
              variant="outline"
              className="rounded-r-none focus:z-10"
            >
              <Trash />
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
      <h1 className="text-2xl font-semibold">
        {translate.admin.sallers.heading}
      </h1>
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
      {dates && (
        <SubscriptionModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          sallerId={selectedId}
          refetch={refetch}
          dates={dates}
        />
      )}
      {userName && (
        <DeleteUserModal
          handleDelete={handleDelete}
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
          itemName={userName.userName}
        />
      )}
    </div>
  );
}

export default AllSallers;
