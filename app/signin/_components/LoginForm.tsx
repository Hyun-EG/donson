"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify({ id, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (res.ok) {
      router.push("/");
    } else {
      alert(result.message);
    }
  };

  return (
    <form className="flex flex-col gap-2">
      <input
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
        onKeyDown={(e) => {
          e.key === "Enter" ? handleLogin() : null;
        }}
        className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        type="text"
        placeholder="아이디를 입력해주세요."
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
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
  );
};

export default LoginForm;
