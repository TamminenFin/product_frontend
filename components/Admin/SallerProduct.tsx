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
import { ArrowUpDown, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteProduct, useGetSallerProduct } from "@/hooks/product.hooks";
import { Input } from "../ui/input";
import { TProduct } from "@/types";
import DeleteConfirmationModal from "../model/DeleteConfirmationModal";
import Image from "next/image";
import translate from "@/utils/translate";

type SelectedItemType = { name: string; _id: string } | null;

function SallerProducts({ id }: { id: string }) {
  const { data, isLoading, refetch } = useGetSallerProduct(id);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedItem, setSelctedItem] = useState<SelectedItemType>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteProduct } = useDeleteProduct();

  const handleDelete = () => {
    if (selectedItem) {
      deleteProduct(selectedItem?._id, {
        onSuccess: () => {
          refetch();
          setIsOpen(false);
        },
      });
    }
  };

  const handleModelOpen = (item: { name: string; _id: string }) => {
    setSelctedItem(item);
    setIsOpen(true);
  };

  const columns: ColumnDef<TProduct>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.sallerProductPage.tableHeadings.name}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="ml-3">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "image",
      header: ({}) => {
        return <p> {translate.admin.sallerProductPage.tableHeadings.image}</p>;
      },
      cell: ({ row }) => (
        <div className="ml-3">
          <Image
            src={row.getValue("image")}
            width={50}
            height={50}
            alt=""
            className="w-12 h-12 object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.sallerProductPage.tableHeadings.location}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="ml-3">{row.getValue("location")}</div>,
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.sallerProductPage.tableHeadings.category}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="ml-3">
          {row?.original?.category?.map((cat, idx) => (
            <p key={idx}>{cat.name},</p>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.sallerProductPage.tableHeadings.price}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="ml-3">{row.getValue("price")}</div>,
    },
    {
      accessorKey: "Saller Name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.sallerProductPage.tableHeadings.sallerName}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="ml-3">{row.original?.sallerId?.name}</div>
      ),
    },
    {
      id: "actions",
      header: `${translate.admin.sallerProductPage.tableHeadings.action}`,
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="isolate flex -space-x-px">
            <Button
              onClick={() =>
                handleModelOpen({
                  name: row.original?.name,
                  _id: row?.original?._id,
                })
              }
              variant="outline"
              className="rounded-l-none focus:z-10"
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
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold">
        {translate.admin.sallerProductPage.heading}{" "}
      </h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
        <Input
          placeholder={translate.admin.sallerProductPage.searchPlaceholder}
          value={(table?.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table?.getColumn("name")?.setFilterValue(event.target.value)
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
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleDelete}
        itemName={selectedItem?.name || ""}
      />
    </div>
  );
}

export default SallerProducts;
