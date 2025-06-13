"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/icons/icon-logo.png";
import menu from "@/public/icons/icon-menu.svg";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import SubNav from "./SubNav";

const Nav = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [isShowMenu, setIsShowMenu] = useState(false);
  if (pathName === "/signin" || pathName === "/signup") {
    return null;
  }
  return (
    <nav className="fixed top-0 left-0 w-full h-14 px-3 flex justify-between items-center border-b border-[#bebebe] bg-white">
      <ul className="flex items-center gap-4 text-sm">
        <Image
          onClick={() => {
            router.push("/");
          }}
          className="cursor-pointer"
          src={logo}
          alt="돈슨 로고"
          width={40}
        />
        <li className="cursor-pointer">
          <Link href="/info">캐릭터 정보</Link>
        </li>
        <li className="cursor-pointer">
          <Link href="/notice">공지사항</Link>
        </li>
        <li className="cursor-pointer">
          <Link href="/event">이벤트</Link>
        </li>
      </ul>
      <button
        onClick={() => {
          setIsShowMenu(true);
        }}
      >
        <Image src={menu} alt="메뉴 아이콘" width={20} priority />
      </button>
      {isShowMenu && <SubNav setIsShowMenu={setIsShowMenu} />}
    </nav>
  );
};

export default Nav;
