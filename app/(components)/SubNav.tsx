"use client";

import { useRouter } from "next/navigation";
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
      className={`fixed right-0 top-0 w-36 min-h-screen pt-3 px-3 pb-24 flex flex-col justify-between border-l border-[#bebebe] rounded-tl-2xl bg-white ${
        isAnimating ? "animate-fadeOut" : ""
      }`}
    >
      <nav className="mt-4">
        <button
          onClick={() => {
            setIsShowMenu(false);
          }}
          className="w-10 h-10 mb-4 border border-black rounded-full  font-bold"
        >
          ✕
        </button>
        <p className="text-sm">
          <span className="text-sky-500 font-bold">{charName}</span> 님
        </p>
        <ul className="mt-4 leading-loose">
          <li>미개발</li>
          <li>미개발</li>
          <li>미개발</li>
          <li>미개발</li>
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
