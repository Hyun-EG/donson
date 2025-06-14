"use client";

import { useState } from "react";

const ResetPasswordBox = () => {
  const [validDisable, setValidDisable] = useState(false);
  const [resendStat, setResetStat] = useState(false);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [certifyNo, setCertifyNo] = useState("");
  return (
    <form className="w-full flex flex-col gap-2">
      <input
        type="text"
        className="w-full h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        placeholder="성함을 입력해주세요."
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
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
            setValidDisable(true);
            setResetStat(true);
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
          type="text"
          value={certifyNo}
          onChange={(e) => {
            setCertifyNo(e.target.value);
          }}
          className="w-[79%] h-10 px-2 border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
          placeholder="인증번호를 입력해주세요."
        />
        <button
          className={`w-[20%] h-10 ${
            validDisable ? "bg-sky-500" : "bg-[#bebebe]"
          } text-white text-xs`}
          disabled={validDisable}
        >
          인증하기
        </button>
      </div>
      <button className="w-full h-10 bg-sky-500 text-white rounded-xl">
        비밀번호 재설정
      </button>
    </form>
  );
};

export default ResetPasswordBox;
