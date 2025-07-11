"use client";

import Image from "next/image";
import React, { useState } from "react";
import menu from "@/public/icons/icon-menu.svg";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import SubNav from "./SubNav";

const MainNav = ({ dp, isAdmin }: { dp: number; isAdmin: boolean }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [isShowMenu, setIsShowMenu] = useState(false);

  if (
    pathName === "/signin" ||
    pathName === "/signup" ||
    pathName === "/find/id" ||
    pathName === "/find/password"
  ) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full h-14 px-3 flex justify-between items-center border-b border-[#bebebe] bg-white">
      <ul className="flex items-center gap-4 text-xs">
        <img
          onClick={() => {
            router.push("/");
          }}
          className="border border-[#bebebe] rounded-full cursor-pointer"
          src="/icons/icon-nav-logo.svg"
          width={30}
          alt="돈슨 로고"
        />
        <li
          style={{ fontWeight: pathName === "/info" ? "bold" : "" }}
          className="cursor-pointer"
        >
          <Link href="/info">캐릭터 정보</Link>
        </li>
        <li
          style={{ fontWeight: pathName === "/notice" ? "bold" : "" }}
          className="cursor-pointer"
        >
          <Link href="/notice">공지사항</Link>
        </li>
        <li
          style={{ fontWeight: pathName === "/event" ? "bold" : "" }}
          className="cursor-pointer"
        >
          <Link href="/event">이벤트</Link>
        </li>
        <div className="relative">
          <li
            style={{ fontWeight: pathName === "/cash" ? "bold" : "" }}
            className="cursor-pointer"
          >
            <Link href="/cash">캐시샵 공지</Link>
          </li>
          <span className="absolute top-0 right-0 translate-x-2/3 -translate-y-2/3 w-3 h-3 flex justify-center items-center text-[10px] text-white bg-red-500 rounded-full">
            N
          </span>
        </div>
      </ul>
      <button
        onClick={() => {
          setIsShowMenu(true);
        }}
      >
        <Image src={menu} alt="메뉴 아이콘" width={20} priority />
      </button>
      {isShowMenu && (
        <SubNav
          dp={dp}
          setIsShowMenu={setIsShowMenu}
          isAnimating={isShowMenu}
          isAdmin={isAdmin}
        />
      )}
    </nav>
  );
};

export default MainNav;
