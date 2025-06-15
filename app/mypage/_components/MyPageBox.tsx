import React from "react";

const MyPageBox = () => {
  return (
    <form className="flex flex-col items-center gap-1">
      <input
        className="w-[80%] h-8 px-2 text-sm border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        type="text"
        placeholder="비밀번호를 입력해주세요."
      />
      <input
        className="w-[80%] h-8 px-2 text-sm border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        type="text"
        placeholder="새로운 비밀번호를 입력해주세요."
      />
      <input
        className="w-[80%] h-8 px-2 text-sm border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        type="text"
        placeholder="새로운 비밀번호를 한번 더 입력해주세요."
      />
    </form>
  );
};

export default MyPageBox;
