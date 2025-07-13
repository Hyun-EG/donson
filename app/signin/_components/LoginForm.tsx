"use client";

import LoadingOverlay from "@/app/(components)/LoadingOverlay";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useUserStore from "@/store/useUserStore";

const LoginForm = () => {
  const router = useRouter();
  const [userId, setIUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setUserIdAndOcid } = useUserStore();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        body: JSON.stringify({ userId, userPassword }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (res.ok) {
        await setUserIdAndOcid(userId);
        sessionStorage.setItem("userId", userId);
        router.push("/");
        router.refresh();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("로그인 중 에러가 발생하였습니다.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <form className="flex flex-col gap-2">
        <input
          value={userId}
          onChange={(e) => {
            setIUserId(e.target.value);
          }}
          onKeyDown={(e) => {
            e.key === "Enter" ? handleLogin() : null;
          }}
          className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
          type="text"
          placeholder="아이디를 입력해주세요."
        />
        <input
          value={userPassword}
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
          onKeyDown={(e) => {
            e.key === "Enter" ? handleLogin() : null;
          }}
          className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <button
          className="w-full h-10 bg-sky-500 text-white rounded-xl"
          type="button"
          onClick={handleLogin}
        >
          로그인
        </button>
      </form>
    </>
  );
};

export default LoginForm;
