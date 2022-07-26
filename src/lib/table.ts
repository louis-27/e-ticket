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
  const lookup = {
    Hurricane: "#dc2626",
    Typhoon: "#ea580c",
    Tornado: "#d97706",
    Gale: "#ca8a04",
    // TODO: nanti disesuain lagi sama kelompok (kevin)
  };

  return lookup.hasOwnProperty(kelompok) ? lookup[kelompok] : "black";
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
