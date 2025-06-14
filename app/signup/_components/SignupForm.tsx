"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "./Modal";

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
  const [resendStat, setResendStat] = useState(false);
  const [certifyDisabled, setCertifyDisabled] = useState(false);

  const [charOcid, setCharOcid] = useState<string | null>(null);
  const [charInfo, setCharInfo] = useState(null);

  // modalState
  const [isShowModal, setIsShowModal] = useState(false);

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

  const handleCheckChar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!charName) {
      alert("캐릭터 이름을 입력해주세요.");
      return;
    }

    try {
      const resCharOcid = await fetch("/api/signup/check-char", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: charName }),
      });

      if (!resCharOcid.ok) {
        const errorData = await resCharOcid.json();
        alert(errorData.message || "캐릭터를 찾을 수 없습니다.");
        return;
      }

      const { ocid } = await resCharOcid.json();
      if (!ocid) {
        alert("유효하지 않은 캐릭터입니다.");
        return;
      }

      setCharOcid(ocid);

      const resCharInfo = await fetch("/api/signup/get-char-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ocid }),
      });

      if (!resCharInfo.ok) {
        const errorData = await resCharInfo.json();
        alert(errorData.message || "캐릭터 정보를 불러올 수 없습니다.");
        return;
      }

      const charInfo = await resCharInfo.json();
      setCharInfo(charInfo);
      setIsShowModal(true);
    } catch (err) {
      console.error("캐릭터 확인 중 오류:", err);
      alert("오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    console.log("charOcid", charOcid);
    console.log("charInfo", charInfo);
  }, [charOcid, charInfo]);

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
          type="text"
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
