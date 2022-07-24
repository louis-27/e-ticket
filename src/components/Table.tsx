import { useReducer, useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fetcher } from "~/lib/fetcher";
import { Search } from "~/components/Search";

interface Participant {
  id: number;
  name: string;
  nim: string;
  phone: string;
  group: any;
  checkIn: any;
}

export function Table({ participants }) {
  const rerender = useReducer(() => ({}), {})[1];
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
        accessorKey: "group",
        header: "Kelompok",
        cell: (info) => (
          <span
            style={{ color: colorOf(info.getValue().name), fontWeight: 600 }}
          >
            {info.getValue().name}
          </span>
        ),
      },
      {
        accessorKey: "group",
        header: "PIC Kelompok",
        cell: (info) => info.getValue().pic,
      },
      {
        accessorKey: "checkInId",
        header: "Status",
        cell: (info) => (
          <span
            style={{ marginLeft: ".75rem", cursor: "pointer" }}
            onClick={async (evt) => {
              // set to loading for while waiting for api
              evt.target.innerText = 'loading'
              const checkIn = await toggleCheckIn(info.row.getValue("id"), info.getValue())
              updateStatus(info.row.getValue("id"), checkIn)
            }}
          >
            {info.getValue() ? "✅" : "❌"}
          </span>
        ),
      },
      {
        accessorKey: "checkIn",
        header: "Check-In",
        cell: (info) => {
          if (!info.getValue()) return "NA";
          const dt = new Date(info.getValue().date);
          const pad = (num) => (num < 10 ? `0${num}` : num);
          return `${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
        },
      },
    ],
    []
  );

  const [data, setData] = useState(participants ?? [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });


  const refreshData = async () => {
    const resp = await fetcher('data')
    const newData = await resp.json()
    setData(data => newData)
    // rerender();
  }

  const updateStatus = (id, checkIn) => {
    setData(data => data.map((i) => i.id === id 
      ? {
        ...i,
        checkInId: i.checkInId ? null : checkIn.id,
        checkIn: i.checkIn ? null : {date: (new Date()).toISOString()}
      }
      : i))
  }

  const toggleCheckIn = async (id: number, checkInId: number) => {
    const checkIn = await fetcher(`check-in`, { id, checkInId });
    const resp = await checkIn.json()
    return resp.body
  };

  const colorOf = (kelompok) => {
    const lookup = {
      Hurricane: "#dc2626",
      Typhoon: "#ea580c",
      Tornado: "#d97706",
      Gale: "#ca8a04",
      // TODO: nanti disesuain lagi sama kelompok (kevin)
    };
    return lookup.hasOwnProperty(kelompok) ? lookup[kelompok] : "black";
  };

  return (
    <div className="border rounded shadow-md max-w-5xl m-auto p-8 my-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold mb-4">Daftar peserta</h1>
        <div>
          <button onClick={refreshData}>refresh</button>
          <Search />
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
          {`${table.getState().pagination.pageIndex + 1}-${
            table.getState().pagination.pageSize
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
