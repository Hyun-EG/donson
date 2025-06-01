"use client";

import Image from "next/image";
import React from "react";
import logo from "@/public/icons/icon-logo.png";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="fixed top-0 left-0 w-full h-14 px-2 flex items-center border-b border-[#bebebe]">
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
          <Link href="/notice">업데이트</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
