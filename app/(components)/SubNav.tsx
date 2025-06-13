"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SubNav = ({
  setIsShowMenu,
  isAnimating,
}: {
  setIsShowMenu: (value: boolean) => void;
  isAnimating: boolean;
}) => {
  const router = useRouter();
  const [charName, setCharName] = useState<string | null>(null);
  const pathName = usePathname();

  useEffect(() => {
    const charName = sessionStorage.getItem("userCharName");
    setCharName(charName);
  });

  const handleLogOut = async () => {
    await fetch("api/logout", {
      method: "POST",
    });
    router.push("/signin");
  };
  return (
    <section
      className={`fixed right-0 top-0 w-44 min-h-screen pt-3 px-3 pb-40 flex flex-col justify-between items-center border-l border-[#bebebe] rounded-tl-2xl bg-white ${
        isAnimating ? "animate-fadeOut" : ""
      }`}
    >
      <nav className="w-full mt-4">
        <button
          onClick={() => {
            setIsShowMenu(false);
          }}
          className="w-10 h-10 mb-4 border border-black rounded-full font-bold"
        >
          ✕
        </button>
        <p className="text-sm">
          <span className="text-sky-500 font-bold">{charName}</span> 님
        </p>
        <ul className="mt-4 flex flex-col justify-center gap-2">
          <p className="mb-2 font-bold">Menu.</p>
          <li className="border-b border-[#bebebe] text-sm">미개발</li>
          <li className="border-b border-[#bebebe] text-sm">미개발</li>
          <li className="border-b border-[#bebebe] text-sm">미개발</li>
          <Link href="/weather">
            <li
              style={{ fontWeight: pathName === "/weather" ? "bold" : "" }}
              className="border-b border-[#bebebe] text-sm"
            >
              오늘 피방갈 날씬가?
            </li>
          </Link>
        </ul>
      </nav>
      <button
        onClick={() => {
          handleLogOut();
        }}
        className="w-20 px-2 py-1 mt-1 flex justify-center border border-black rounded-lg text-start font-bold"
      >
        로그아웃
      </button>
    </section>
  );
};

export default SubNav;
