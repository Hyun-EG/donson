"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";

const SubNav = ({
  setIsShowMenu,
  isAnimating,
  isAdmin,
  dp,
}: {
  setIsShowMenu: (value: boolean) => void;
  isAnimating: boolean;
  isAdmin: boolean | null;
  dp: number;
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
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("userCharName");
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
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-red-300">DP</span>
            <div className="w-20 flex justify-between items-center">
              <span className="font-bold text-sm"> {dp?.toFixed(1)}</span>
              <span className="text-sm font-bold">point</span>
            </div>
            <button
              onClick={() => {
                router.refresh();
              }}
              className="px-1 text-xs border"
            >
              갱신
            </button>
          </div>
          <article className="my-2 border-b border-[#bebebe] ">
            <p className="text-xs text-[#bebebe] font-bold">Menu.</p>
          </article>
          <ul className="mt-4 flex flex-col justify-center gap-2">
            <li
              style={{ fontWeight: pathName === "/mepo" ? "bold" : "" }}
              className="text-center text-sm text-[#bebebe] line-through"
            >
              메포시세 (공사중)
            </li>
            <li
              style={{ fontWeight: pathName === "/ren" ? "bold" : "" }}
              className="text-center text-sm text-[#555555]"
              onClick={() => {
                setIsShowMenu(false);
              }}
            >
              <Link href="/ren">렌 사냥터|빌드</Link>
            </li>
            <li
              style={{
                fontWeight: pathName === "/skilltree" ? "bold" : "",
              }}
              className="text-center text-sm text-[#555555]"
              onClick={() => {
                setIsShowMenu(false);
              }}
            >
              <Link href="/skilltree">렌 스킬트리</Link>
            </li>

            <div className="flex justify-center items-center gap-1">
              <li
                style={{ fontWeight: pathName === "/dpstore" ? "bold" : "" }}
                className="text-center text-sm text-[#555555]"
                onClick={() => {
                  setIsShowMenu(false);
                }}
              >
                <Link href="/dpstore">DP Store</Link>
              </li>
            </div>
            <div className="flex justify-center items-center gap-1">
              <span className="w-3 h-3 flex justify-center items-center text-[10px] text-white bg-red-500 rounded-full">
                N
              </span>
              <li
                style={{
                  fontWeight: pathName === "/baseball" ? "bold" : "",
                }}
                className="text-center text-sm text-[#555555]"
                onClick={() => {
                  setIsShowMenu(false);
                }}
              >
                <Link href="/baseball">야구 게임</Link>
              </li>
            </div>
            <div className="flex justify-center items-center gap-1">
              <span className="w-3 h-3 flex justify-center items-center text-[10px] text-white bg-red-500 rounded-full">
                N
              </span>
              <li
                style={{
                  fontWeight: pathName === "/dosin" ? "bold" : "",
                }}
                className="text-center text-sm text-[#555555]"
                onClick={() => {
                  setIsShowMenu(false);
                }}
              >
                <Link href="/dosin">도 신</Link>
              </li>
            </div>
            <div className="flex justify-center items-center gap-1">
              <span className="w-3 h-3 flex justify-center items-center text-[10px] text-white bg-red-500 rounded-full">
                N
              </span>
              <li
                style={{
                  fontWeight: pathName === "/loan" ? "bold" : "",
                }}
                className="text-center text-sm text-[#555555]"
                onClick={() => {
                  setIsShowMenu(false);
                }}
              >
                <Link href="/loan">DP론</Link>
              </li>
            </div>
            <Link href="/weather">
              <li
                style={{ fontWeight: pathName === "/weather" ? "bold" : "" }}
                className="text-center text-sm text-[#555555]"
                onClick={() => {
                  setIsShowMenu(false);
                }}
              >
                오늘 피방갈 날씬가?
              </li>
            </Link>
            <li
              style={{ fontWeight: pathName === "/contact" ? "bold" : "" }}
              className="text-center text-sm text-[#555555]"
              onClick={() => {
                setIsShowMenu(false);
              }}
            >
              <Link href="/contact">고객문의</Link>
            </li>
            <li
              style={{ fontWeight: pathName === "/mypage" ? "bold" : "" }}
              className="text-center text-sm text-[#555555]"
              onClick={() => {
                setIsShowMenu(false);
              }}
            >
              <Link href="mypage">마이페이지</Link>
            </li>
            {isAdmin && (
              <li
                style={{ fontWeight: pathName === "/admin" ? "bold" : "" }}
                className="text-center text-sm text-[#555555]"
                onClick={() => {
                  setIsShowMenu(false);
                }}
              >
                <Link href="admin">관리자</Link>
              </li>
            )}
          </ul>
        </nav>
        <button
          onClick={() => {
            handleLogOut();
            setIsShowMenu(false);
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
