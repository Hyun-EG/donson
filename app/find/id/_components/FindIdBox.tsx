"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";

const FindIdBox = () => {
  const [nameInputValue, setNameInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [foundUserId, setFoundUserId] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleFindId = async () => {
    try {
      if (!nameInputValue || !emailInputValue) {
        alert("모든 입력 필드를 채워주세요.");
        return;
      }
      const res = await fetch("/api/find-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nameInputValue, emailInputValue }),
      });
      console.log("res", res);
      if (!res.ok) {
        throw new Error("응답값이 존재하지 않습니다.");
      }
      const data = await res.json();
      setFoundUserId(data);
    } catch (error) {
      console.error("서버 에러", error);
    }
  };

  useEffect(() => {
    if (foundUserId) {
      setIsShowModal(true);
    }
  }, [foundUserId]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleFindId();
        setNameInputValue("");
        setEmailInputValue("");
      }}
      className="w-full flex flex-col gap-2"
    >
      <input
        type="text"
        className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        placeholder="성함을 입력해주세요."
        value={nameInputValue}
        onChange={(e) => {
          setNameInputValue(e.target.value);
        }}
      />
      <input
        type="text"
        className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        placeholder="이메일을 입력해주세요."
        value={emailInputValue}
        onChange={(e) => {
          setEmailInputValue(e.target.value);
        }}
      />
      <button className="w-full h-10 bg-sky-500 text-white rounded-xl">
        아이디 찾기
      </button>
      {isShowModal && (
        <Modal setIsShowModal={setIsShowModal} foundUserId={foundUserId} />
      )}
    </form>
  );
};

export default FindIdBox;
