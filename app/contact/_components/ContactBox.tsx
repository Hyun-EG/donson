"use client";

import { useState } from "react";

const ContactBox = ({ userId }: { userId: string }) => {
  const [category, setCategory] = useState("계정/로그인 관련");
  const [content, setContent] = useState("");

  const handleContact = async () => {
    const res = await fetch("/api/send-contact-us", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        category: category,
        content: content,
      }),
    });
    if (!res.ok) {
      alert("문의내역 전송중 오류가 발생했습니다.");
      return;
    }
    alert("문의내역 전송에 성공하였습니다.");
    setContent("");
  };

  return (
    <section className="mt-4">
      <form>
        <label className="text-xs">
          ㅇ 해당 문의에 대한 답변은 평균{" "}
          <span className="text-red-500">1~2일</span> 정도 소요될 수 있습니다.
          <br />ㅇ 문의에 대한 답변은 회원님의 이메일로 발송됩니다.
        </label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="w-full h-8 px-2 my-1 bg-white border border-[#bebebe] rounded-lg"
          id="contact-us"
          name="contact"
        >
          <option value="계정/로그인 관련">계정/로그인 관련</option>
          <option value="오류 제보">오류 제보</option>
          <option value="기능 제안">기능 제안</option>
          <option value="컨텐츠 관련 문의">컨텐츠 관련 문의</option>
          <option value="기타">기타</option>
        </select>
        <textarea
          className="w-full h-40 p-1 border border-[#bebebe] bg-white rounded-lg outline-0 resize-none"
          name="contact-content"
          id="content"
          placeholder="문의 내역을 입력해주세요."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <button
          onClick={() => {
            handleContact();
          }}
          className="w-full h-8 bg-sky-500 text-white text-center"
          type="button"
        >
          제출하기
        </button>
      </form>
    </section>
  );
};

export default ContactBox;
