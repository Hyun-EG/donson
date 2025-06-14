"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "./Modal";
import { validateSignupInput } from "@/util/validateSignupInput";
import { getCharInfo, getCharOcid } from "@/service/checkCharService";
import {
  matchCertifyNumber,
  sendCertifyNumber,
} from "@/service/certifyService";

const SignupForm = () => {
  const router = useRouter();

  // inputValue
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [certifyNo, setCertifyNo] = useState("");
  const [userId, setUserId] = useState("");
  const [charName, setCharName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmUserPassword, setConfirmUserPassword] = useState("");

  // buttonState
  const [sendCertifyDisabled, setSendCertifyDisabled] = useState(false);
  const [matchCertifyDisabled, setMatchCertifyDisabled] = useState(false);

  const [charOcid, setCharOcid] = useState<string | null>(null);
  const [charInfo, setCharInfo] = useState(null);

  // modalState
  const [isShowModal, setIsShowModal] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const errorMessage = validateSignupInput({
      userName,
      userEmail,
      certifyNo,
      userId,
      charName,
      userPassword,
      confirmUserPassword,
    });

    if (errorMessage) {
      alert(errorMessage);
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
          certifyNo,
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
    } catch (error) {
      console.error("인증번호 인증 실패:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleCheckChar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!charName) {
      alert("캐릭터 이름을 입력해주세요.");
      return;
    }

    try {
      const resCharOcid = await getCharOcid(charName);
      if (!resCharOcid.ok) {
        const err = await resCharOcid.json();
        alert(err.message || "캐릭터를 찾을 수 없습니다.");
        return;
      }

      const { ocid } = await resCharOcid.json();
      if (!ocid) {
        alert("유효하지 않은 캐릭터입니다.");
        return;
      }
      setCharOcid(ocid);

      const resCharInfo = await getCharInfo(ocid);
      if (!resCharInfo.ok) {
        const err = await resCharInfo.json();
        alert(err.message || "캐릭터 정보를 불러올 수 없습니다.");
        return;
      }

      const info = await resCharInfo.json();
      setCharInfo(info);
      setIsShowModal(true);
    } catch (err) {
      console.error("캐릭터 확인 중 오류:", err);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSignup}>
      {isShowModal && (
        <Modal setIsShowModal={setIsShowModal} charInfo={charInfo} />
      )}
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
          name="verify"
          value={certifyNo}
          className="w-[79%] h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
          type="text"
          placeholder="인증번호를 입력해주세요."
          onChange={(e) => setCertifyNo(e.target.value)}
          disabled={matchCertifyDisabled}
        />
        <button
          type="button"
          className={`
      w-[20%] h-10 ${
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
      <input
        name="userId"
        value={userId}
        className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        type="text"
        placeholder="아이디를 입력해주세요."
        onChange={(e) => setUserId(e.target.value)}
      />
      <div className="flex justify-between">
        <input
          name="charName"
          value={charName}
          className="w-[79%] h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
          type="text"
          placeholder="캐릭터 이름을 입력해주세요."
          onChange={(e) => setCharName(e.target.value)}
        />
        <button
          type="button"
          onClick={handleCheckChar}
          className="w-[20%] h-10 bg-sky-500 text-white text-xs"
        >
          확인
        </button>
      </div>
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
