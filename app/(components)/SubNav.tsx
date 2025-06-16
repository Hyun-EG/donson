"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";

const SubNav = ({
  setIsShowMenu,
  isAnimating,
}: {
  setIsShowMenu: (value: boolean) => void;
  isAnimating: boolean;
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathName = usePathname();

  const [charName, setCharName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const charName = sessionStorage.getItem("userCharName");
    setCharName(charName);
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      await fetch("api/logout", {
        method: "POST",
      });
      router.push("/signin");
    } catch (error) {
      console.error("로그아웃 중 에러가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <LoadingOverlay />}
      <section
        ref={menuRef}
        className={`fixed right-0 top-0 w-44 min-h-screen pt-3 px-3 pb-40 flex flex-col justify-between items-center border-l border-[#bebebe] rounded-tl-2xl bg-white z-2 ${
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
            <p className="mb-2 border-b border-[#bebebe] font-bold">Menu.</p>
            <Link href="/mepo">
              <li
                style={{ fontWeight: pathName === "/mepo" ? "bold" : "" }}
                className="text-center text-sm"
                onClick={() => {
                  setIsShowMenu(false);
                }}
              >
                메포시세
              </li>
            </Link>
            <Link href="/weather">
              <li
                style={{ fontWeight: pathName === "/weather" ? "bold" : "" }}
                className="text-center text-sm"
                onClick={() => {
                  setIsShowMenu(false);
                }}
              >
                오늘 피방갈 날씬가?
              </li>
            </Link>
            <Link href="/contact">
              <li
                style={{ fontWeight: pathName === "/contact" ? "bold" : "" }}
                className="text-center text-sm"
                onClick={() => {
                  setIsShowMenu(false);
                }}
              >
                고객문의
              </li>
            </Link>
            <Link href="mypage">
              <li
                style={{ fontWeight: pathName === "/mypage" ? "bold" : "" }}
                className="text-center text-sm"
                onClick={() => {
                  setIsShowMenu(false);
                }}
              >
                마이페이지
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
    </>
  );
};

export default SubNav;
