"use client";

import {
  matchCertifyNumber,
  sendCertifyNumber,
} from "@/service/certifyService";
import { validateResetPasswordInput } from "@/util/validateResetPasswordInput";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ResetPasswordBox = () => {
  const router = useRouter();

  const [sendCertifyDisabled, setSendCertifyDisabled] = useState(false);
  const [matchCertifyDisabled, setMatchCertifyDisabled] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [certifyNo, setCertifyNo] = useState("");

  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [isShowResetPasswordInput, setIsShowResetPasswordInput] =
    useState(false);

  const handlePostCertifyNo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await sendCertifyNumber(userEmail);
      if (res.ok) {
        setSendCertifyDisabled(true);
        alert("인증번호 전송에 성공하였습니다.");
      }
    } catch (error) {
      console.error("인증번호 전송 실패:", error);
    }
  };

  const handleMatchCertifyNo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await matchCertifyNumber(userEmail, certifyNo);
      if (res.ok) {
        setMatchCertifyDisabled(true);
        alert("인증번호 확인에 성공하였습니다.");
      }
      setIsValid(true);
    } catch (error) {
      console.error("인증번호 인증 실패:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleConfirmEmailValid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      alert("이메일 인증이 필요합니다.");
      return;
    }
    setIsShowResetPasswordInput(true);
  };

  const handleConfirmPasswordValid = async () => {
    if (resetPassword !== resetConfirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const errorMessage = validateResetPasswordInput({
      userPassword: resetPassword,
      confirmUserPassword: resetConfirmPassword,
    });

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail, resetPassword }),
    });

    if (!res.ok) {
      alert("비밀번호 재설정에 실패하였습니다.");
      return;
    }

    alert("비밀번호 재설정에 성공하였습니다.");
    router.push("/signin");
  };

  return (
    <form className="w-full flex flex-col gap-2">
      {isShowResetPasswordInput ? (
        <>
          <input
            name="password"
            value={resetPassword}
            className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
            type="password"
            placeholder="새로운 비밀번호를 입력해주세요."
            onChange={(e) => setResetPassword(e.target.value)}
          />
          <input
            name="confirmPassword"
            value={resetConfirmPassword}
            className="w-full  h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요."
            onChange={(e) => setResetConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="w-full h-10 bg-sky-500 text-white rounded-xl"
            onClick={() => {
              handleConfirmPasswordValid();
            }}
          >
            확인
          </button>
        </>
      ) : (
        <>
          <div className="flex justify-between">
            <input
              name="userEmail"
              value={userEmail}
              className="w-[79%] h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
              type="email"
              placeholder="이메일을 입력해주세요."
              onChange={(e) => setUserEmail(e.target.value)}
              disabled={sendCertifyDisabled}
            />
            <button
              type="button"
              onClick={(e) => {
                handlePostCertifyNo(e);
              }}
              className={`w-[20%] h-10 ${
                sendCertifyDisabled ? "bg-[#bebebe]" : "bg-sky-500"
              } text-white text-xs`}
              disabled={sendCertifyDisabled}
            >
              인증번호
              <br />
              받기
            </button>
          </div>
          <div className="flex justify-between">
            <input
              type="text"
              value={certifyNo}
              onChange={(e) => {
                setCertifyNo(e.target.value);
              }}
              className="w-[79%] h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="인증번호를 입력해주세요."
              disabled={matchCertifyDisabled}
            />
            <button
              type="button"
              className={`w-[20%] h-10 ${
                matchCertifyDisabled ? "bg-[#bebebe]" : "bg-sky-500"
              } text-white text-xs`}
              disabled={matchCertifyDisabled}
              onClick={(e) => {
                handleMatchCertifyNo(e);
              }}
            >
              인증하기
            </button>
          </div>
          <button
            onClick={(e) => {
              handleConfirmEmailValid(e);
            }}
            className="w-full h-10 bg-sky-500 text-white rounded-xl"
          >
            비밀번호 재설정
          </button>
        </>
      )}
    </form>
  );
};

export default ResetPasswordBox;
