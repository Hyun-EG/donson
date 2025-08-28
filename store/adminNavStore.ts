import { create } from "zustand";

export type NavItem =
  | "이벤배율"
  | "알림전송"
  | "문의내역"
  | "주문내역"
  | "고객검색";

interface AdminNavStore {
  selectedNavItem: NavItem;
  setSelectedNavItem: (item: NavItem) => void;
}

export const useAdminNavStore = create<AdminNavStore>((set) => ({
  selectedNavItem: "이벤배율",
  setSelectedNavItem: (item) => {
    set({ selectedNavItem: item });
  },
}));
