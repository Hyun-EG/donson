"use client";

import React, { useState } from "react";

const Nav = ({
  setIsShowItems,
}: {
  setIsShowItems: (value: string) => void;
}) => {
  const [selectedNavItem, setSelectedNavItem] = useState("일간");
  return (
    <nav className="w-full h-8 px-1 bg-sky-500 rounded-[6px]">
      <ul className="w-full h-full flex items-center">
        <li
          onClick={() => {
            setSelectedNavItem("일간");
            setIsShowItems("일간");
          }}
          className={`w-1/3 text-center ${
            selectedNavItem === "일간" ? "bg-white" : "bg-sky-500 text-white"
          } rounded-[6px]`}
        >
          일간
        </li>
        <li
          onClick={() => {
            setSelectedNavItem("주간");
            setIsShowItems("주간");
          }}
          className={`w-1/3 text-center ${
            selectedNavItem === "주간" ? "bg-white" : "bg-sky-500 text-white"
          } rounded-[6px]`}
        >
          주간
        </li>
        <li
          onClick={() => {
            setSelectedNavItem("패키지");
            setIsShowItems("패키지");
          }}
          className={`w-1/3 text-center ${
            selectedNavItem === "패키지" ? "bg-white" : "bg-sky-500 text-white"
          } rounded-[6px]`}
        >
          패키지
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
