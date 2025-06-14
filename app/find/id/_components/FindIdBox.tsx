"use client";

import { useState } from "react";
import Modal from "./Modal";

const FindIdBox = () => {
  const [nameInputValue, setNameInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsShowModal(true);
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
        <Modal idValue="테스트" setIsShowModal={setIsShowModal} />
      )}
    </form>
  );
};

export default FindIdBox;
