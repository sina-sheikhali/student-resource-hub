import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Loader2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DataTable({ columns, data, loading }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full rounded-lg border bg-white p-4 shadow-md">
      {/* Search */}
      <div className="mb-4">
        <Input
          disabled={!data.length}
          className="placeholder:font-yekan font-yekan w-full max-w-1/2 rounded-md lg:max-w-sm"
          placeholder="جستجو..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      {/* Table */}
      {!loading ? (
        data.length > 0 ? (
          <div className="overflow-x-auto rounded-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="cursor-pointer px-6 py-3 text-right text-xs font-bold tracking-wider text-gray-600 uppercase select-none"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getIsSorted()
                          ? header.column.getIsSorted() === "asc"
                            ? " 🔼"
                            : " 🔽"
                          : ""}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {table.getRowModel().rows.map((row, rowIndex) => (
                  <tr
                    key={row.id}
                    className={
                      rowIndex % 2 === 0
                        ? "bg-white hover:bg-gray-50"
                        : "bg-gray-50 hover:bg-gray-100"
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 text-sm text-gray-700"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex h-24 items-center justify-center text-lg">
            <p>موردی یافت نشد!</p>
          </div>
        )
      ) : (
        <div className="flex h-24 items-center justify-center">
          <Loader2Icon className="h-8 w-8 animate-spin text-red-400" />
        </div>
      )}

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          قبلی
        </Button>
        <span className="text-sm text-gray-600">
          صفحه {table.getState().pagination.pageIndex + 1} از{" "}
          {table.getPageCount()}
        </span>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
