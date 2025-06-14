"use client";

import { useState } from "react";

const ResetPasswordBox = () => {
  const [validDisable, setValidDisable] = useState(false);
  return (
    <form className="w-full flex flex-col gap-2">
      <input
        type="text"
        className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        placeholder="성함을 입력해주세요."
      />
      <input
        type="email"
        className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        placeholder="이메일을 입력해주세요."
      />
      <div className="flex justify-between">
        <input
          type="text"
          className="w-[74%] h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
          placeholder="인증번호를 입력해주세요."
        />
        <button
          className={`w-[25%] h-10 ${
            validDisable ? "bg-[#bebebe]" : "bg-sky-500"
          } text-white`}
          disabled={validDisable}
        >
          인증
        </button>
      </div>
      <button className="w-full h-10 bg-sky-500 text-white rounded-xl">
        비밀번호 재설정
      </button>
    </form>
  );
};

export default ResetPasswordBox;
