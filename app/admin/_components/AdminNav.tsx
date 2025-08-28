"use client";

import { NavItem, useAdminNavStore } from "@/store/adminNavStore";

const AdminNav = () => {
  const { selectedNavItem, setSelectedNavItem } = useAdminNavStore();

  const items: NavItem[] = [
    "이벤배율",
    "알림전송",
    "문의내역",
    "주문내역",
    "고객검색",
  ];
  return (
    <nav className="w-full h-10 mt-2 flex items-center justify-center">
      {items.map((item, idx) => (
        <div
          key={idx}
          onClick={() => {
            setSelectedNavItem(item);
          }}
          className={`w-[20%] h-full flex justify-center items-center ${
            selectedNavItem === item
              ? "text-sky-500 bg-white border"
              : "text-white bg-sky-500"
          } `}
        >
          {item}
        </div>
      ))}
    </nav>
  );
};

export default AdminNav;
