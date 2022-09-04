import { rankItem } from "@tanstack/match-sorter-utils";
import type { FilterFn } from "@tanstack/react-table";
import { fetcher } from "~/lib/fetcher";

export interface Participant {
  id: number;
  name: string;
  nim: string;
  phone: string;
  group: any;
  checkIn: any;
}

export const colorOf = (kelompok) => {
  const lookup = [
    { color: "white", background: "black" },
    { color: "black", background: "#f4f4f5" },
    { color: "white", background: "#713f12" },
    { color: "black", background: "#facc15" },
    { color: "white", background: "#b45309" },
    { color: "black", background: "#fef3c7" },
    { color: "black", background: "#65a30d" },
    { color: "black", background: "#a3e635" },
    { color: "white", background: "#047857" },
    { color: "black", background: "#10b981" },
    { color: "black", background: "#ca8a04" },
    { color: "white", background: "#374151" },
    { color: "white", background: "#6b7280" },
    { color: "black", background: "#f97316" },
    { color: "black", background: "#f472b6" },
    { color: "white", background: "#dc2626" },
    { color: "white", background: "#7f1d1d" },
    { color: "black", background: "#22c55e" },
    { color: "white", background: "#3b82f6" },
    { color: "black", background: "#0ea5e9" },
    { color: "black", background: "#a855f7" },
    { color: "black", background: "#ddd6fe" },
    { color: "white", background: "#1e3a8a" },
    { color: "white", background: "#c0a392" },
    { color: "black", background: "#d97706" },
    { color: "black", background: "#06b6d4" },
    { color: "white", background: "#7c2d12" },
    { color: "black", background: "#86efac" },
  ];

  return lookup.hasOwnProperty(kelompok)
    ? lookup[kelompok]
    : { color: "black", background: "white" };
};

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  if (value === "-" || value === "NA") {
    columnId = "checkIn";
    value = "null";
  }

  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);
  // Store the itemRank info
  addMeta(itemRank);
  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const refreshData = async (setData, setIsRefreshing) => {
  setIsRefreshing((state) => !state);

  const res = await fetcher("participants");
  const newData = await res.json();
  setData((data) => newData);

  setIsRefreshing((state) => !state);
};

export const toggleCheckIn = async (id: number, checkInId: number) => {
  const checkIn = await fetcher("check-in", { id, checkInId });
  const res = await checkIn.json();

  return res.body;
};

export const updateStatus = (id, checkIn, setData) => {
  setData((data) =>
    data.map((i) =>
      i.id === id
        ? {
            ...i,
            checkInId: i.checkInId ? null : checkIn.id,
            checkIn: i.checkIn ? null : { date: new Date().toISOString() },
          }
        : i
    )
  );
};
