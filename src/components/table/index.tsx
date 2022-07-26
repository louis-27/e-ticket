import { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Filter } from "~/components/table/Filter";
import { LoadingSpinner, RefreshSpinner } from "~/components/Spinner";

import {
  colorOf,
  fuzzyFilter,
  refreshData,
  toggleCheckIn,
  updateStatus,
} from "~/lib/table";
import type { Participant } from "~/lib/table";

export function Table({ participants }) {
  const [data, setData] = useState(participants ?? []);
  const [loading, setLoading] = useState(-1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const columns = useMemo<ColumnDef<Participant>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "name",
        header: "Nama",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "nim",
        header: "NIM",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "phone",
        header: "No HP",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (p) => p.group.name,
        header: "Kelompok",
        cell: (info) => (
          <span style={{ color: colorOf(info.getValue()), fontWeight: 600 }}>
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorFn: (p) => p.group.pic,
        header: "PIC Kelompok",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "checkInId",
        header: "Status",
        cell: (info) => (
          <button
            className="ml-3 text-center"
            disabled={loading === Number(info.row.id)}
            onClick={async (e) => {
              setLoading(Number(info.row.id));
              const checkIn = await toggleCheckIn(
                info.row.getValue("id"),
                info.getValue()
              );
              updateStatus(info.row.getValue("id"), checkIn, setData);
              setLoading(-1);
            }}
          >
            {loading === Number(info.row.id) ? (
              <LoadingSpinner />
            ) : info.getValue() ? (
              "✅"
            ) : (
              "❌"
            )}
          </button>
        ),
      },
      {
        accessorKey: "checkIn",
        header: "Check-In",
        cell: (info) => {
          if (!info.getValue()) return "N/A";
          // @ts-ignore
          const dt = new Date(info.getValue().date);
          const pad = (num) => (num < 10 ? `0${num}` : num);
          return `${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
        },
      },
    ],
    [loading]
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="border rounded shadow-md max-w-5xl m-auto p-8 my-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold mb-4">Daftar peserta</h1>
        <div>
          <button
            onClick={() => refreshData(setData, setIsRefreshing)}
            className="mx-2"
          >
            <RefreshSpinner isRefreshing={isRefreshing} />
          </button>
          <Filter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
      </div>
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header, id) => (
                // kelompok & pic kelompok has same header.id
                <th key={header.id + id} className="p-2 text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell, id) => (
                // kelompok & pic kelompok has same cell.id
                <td key={cell.id + id} className="p-2 text-left">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-end">
        <span>
          <span className="font-semibold">Rows per page:</span>
          <select
            className="bg-transparent"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 50, 100, 200, 500].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </span>

        <span className="ml-4">
          {`${
            table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
            1
          }-${
            table.getState().pagination.pageSize *
            (table.getState().pagination.pageIndex + 1)
          } of ${table.getPrePaginationRowModel().rows.length}`}
        </span>

        <span className="space-x-3 ml-4">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </span>
      </div>
    </div>
  );
}
