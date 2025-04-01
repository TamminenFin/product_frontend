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
import Link from "next/link";
import { TUser } from "@/types";
import { useGetAllCategoryRequest } from "@/hooks/category.hooks";
import translate from "@/utils/translate";

type TRequest = {
  name: string;
  productCount: number;
  sallerId: TUser;
  email: string;
  _id?: string;
  createdAt: string;
};

function CategoryRequestTable() {
  const { data, isLoading } = useGetAllCategoryRequest();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<TRequest>[] = [
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.requestsPage.tableHeadings.category}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="ml-3">{row.original.name}</div>,
    },
    {
      accessorKey: "Saller Email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.requestsPage.tableHeadings.sallerEmail}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="ml-3">{row.original.email}</div>,
    },
    {
      accessorKey: "Have Product",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.requestsPage.tableHeadings.haveProduct}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="ml-3">{row.original.productCount}</div>
      ),
    },
    {
      accessorKey: "Created At",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.requestsPage.tableHeadings.createdAt}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="ml-3">{row.original?.createdAt?.slice(0, 10)}</div>
      ),
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
        {" "}
        {translate.admin.requestsPage.heading}
      </h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
        <Input
          placeholder={translate.admin.requestsPage.searchPlaceholder}
          value={
            (table?.getColumn("category")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table?.getColumn("category")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center flex-row-reverse md:flex-row justify-between md:justify-start gap-2 mt-4 md:mt-0">
          <Link href="/admin/categories">
            <button className="text-sm bg-red py-2 rounded px-5 bg-blue-600 text-white ">
              {translate.admin.requestsPage.addButton}
            </button>
          </Link>
        </div>
      </div>
      <div className="rounded-md border mt-5">
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
              table?.getRowModel()?.rows?.map((row) => {
                return (
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
                );
              })
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
            {translate.admin.requestsPage.buttons.previous}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {translate.admin.requestsPage.buttons.next}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CategoryRequestTable;
