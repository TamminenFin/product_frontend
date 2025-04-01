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
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteProduct, useGetAllProduct } from "@/hooks/product.hooks";
import { Input } from "../ui/input";
import Link from "next/link";
import { TProduct } from "@/types";
import DeleteConfirmationModal from "../model/DeleteConfirmationModal";
import Image from "next/image";
import translate from "@/utils/translate";

type SelectedItemType = { name: string; _id: string } | null;

function AllProduct({ isAdmin = false }: { isAdmin?: boolean }) {
  const { data, isLoading, refetch } = useGetAllProduct();
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
            {translate.admin.allProductPage.tableHeadings.name}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="ml-3">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "image",
      header: ({}) => {
        return <p> {translate.admin.allProductPage.tableHeadings.image}</p>;
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
            {translate.admin.allProductPage.tableHeadings.location}
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
            {translate.admin.allProductPage.tableHeadings.category}
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
            {translate.admin.allProductPage.tableHeadings.price}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="ml-3">{row.getValue("price")}</div>,
    },
    {
      accessorKey: "Created At",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.allProductPage.tableHeadings.createdAt}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="ml-3">{row.original.createdAt.slice(0, 10)}</div>
      ),
    },
  ];

  if (!isAdmin) {
    columns.push({
      id: "actions",
      header: `${translate.admin.allProductPage.tableHeadings.action}`,
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="isolate flex -space-x-px">
            <Link href={`/dashboard/product/edit/${row.original?._id}`}>
              <Button
                variant="outline"
                className="rounded-r-none text-black focus:z-10"
              >
                <Edit />
              </Button>
            </Link>
            <Button
              onClick={() =>
                handleModelOpen({
                  name: row.original?.name,
                  _id: row?.original?._id,
                })
              }
              variant="outline"
              className="text-black rounded-l-none focus:z-10"
            >
              <Trash />
            </Button>
          </div>
        );
      },
    });
  }

  if (isAdmin) {
    columns.push({
      accessorKey: "Saller Name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translate.admin.allProductPage.tableHeadings.sallerName}
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="ml-3">{row.original?.sallerId?.name}</div>
      ),
    });
  }

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
        {translate.admin.allProductPage.heading}
      </h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
        <Input
          placeholder={translate.admin.allProductPage.searchPlaceholder}
          value={(table?.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table?.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center flex-row-reverse md:flex-row justify-between md:justify-start gap-2 mt-4 md:mt-0">
          {!isAdmin && (
            <Link href="/dashboard/product/add">
              <button className="text-sm bg-red py-2 rounded px-5 bg-blue-600 text-white ">
                {translate.admin.allProductPage.addProductButton}
              </button>
            </Link>
          )}
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
                const isCategoryEmpty = row?.original?.category?.length === 0;

                return (
                  <TableRow
                    key={row?.id}
                    data-state={row?.getIsSelected() && "selected"}
                    className={
                      isCategoryEmpty
                        ? "bg-red-500 text-white hover:bg-red-500"
                        : ""
                    }
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
            {translate.admin.allProductPage.buttons.previous}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {translate.admin.allProductPage.buttons.next}
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

export default AllProduct;
