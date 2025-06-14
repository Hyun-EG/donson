"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupForm = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [certifyNo, setCertifyNo] = useState("");
  const [userId, setUserId] = useState("");
  const [charName, setCharName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmUserPassword, setConfirmUserPassword] = useState("");
  const [resendStat, setResendStat] = useState(false);
  const [certifyDisabled, setCertifyDisabled] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !userName ||
      !userEmail ||
      !userId ||
      !charName ||
      !userPassword ||
      !confirmUserPassword
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          userEmail,
          userId,
          charName,
          userPassword,
          confirmUserPassword,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        router.push("/signin");
      } else {
        alert(result.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 요청 실패:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSignup}>
      <input
        name="userName"
        value={userName}
        className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        type="text"
        placeholder="성함을 입력해주세요."
        onChange={(e) => setUserName(e.target.value)}
      />
      <div className="flex justify-between">
        <input
          name="userEmail"
          value={userEmail}
          className="w-[79%] h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
          type="email"
          placeholder="이메일을 입력해주세요."
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button
          onClick={() => {
            setCertifyDisabled(true);
            setResendStat(true);
          }}
          className="w-[20%] h-10 bg-sky-500 text-white text-xs"
        >
          {resendStat ? (
            "재전송"
          ) : (
            <>
              인증번호
              <br />
              받기
            </>
          )}
        </button>
      </div>
      <div className="flex justify-between">
        <input
          name="verify"
          value={certifyNo}
          className="w-[79%] h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
          type="email"
          placeholder="인증번호를 입력해주세요."
          onChange={(e) => setCertifyNo(e.target.value)}
        />
        <button
          className={`
      w-[20%] h-10 ${
        certifyDisabled ? "bg-[#bebebe]" : "bg-sky-500"
      } text-white text-xs`}
          disabled={certifyDisabled}
        >
          인증하기
        </button>
      </div>
      <input
        name="userId"
        value={userId}
        className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        type="text"
        placeholder="아이디를 입력해주세요."
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        name="charName"
        value={charName}
        className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        type="text"
        placeholder="캐릭터 이름을 입력해주세요."
        onChange={(e) => setCharName(e.target.value)}
      />
      <input
        name="userPassword"
        value={userPassword}
        className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        onChange={(e) => setUserPassword(e.target.value)}
      />
      <input
        name="confirmUserPassword"
        value={confirmUserPassword}
        className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        type="password"
        placeholder="비밀번호를 다시 한번 입력해주세요."
        onChange={(e) => setConfirmUserPassword(e.target.value)}
      />
      <button
        className="w-full h-10 bg-sky-500 text-white rounded-xl hover:bg-sky-600"
        type="submit"
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
