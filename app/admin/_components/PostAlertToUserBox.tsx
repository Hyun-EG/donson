"use client";

import LoadingOverlay from "@/app/(components)/LoadingOverlay";
import { useState } from "react";

const PostAlertToUserBox = () => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePostAlertToUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/send-test-push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: inputTitle,
          content: inputContent,
        }),
      });
      if (!res.ok) {
        alert("알림 보내기에 실패하였습니다.");
        return;
      }
      if (res.ok) {
        alert("공지를 성공적으로 보냈습니다.");
        return;
      }
    } catch (_) {
      alert("공지를 보내던 중 에러가 발생하였습니다 서버에러.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full mt-4">
      {isLoading && <LoadingOverlay />}
      <p className="text-center font-bold">용사님들께 알림 보내기</p>
      <div className="flex flex-col items-center gap-1">
        <input
          placeholder="공지 제목"
          className="w-full h-8 pl-2 border bg-white"
          type="text"
          value={inputTitle}
          onChange={(e) => {
            setInputTitle(e.target.value);
          }}
        />
        <input
          placeholder="공지 내용"
          className="w-full h-8 pl-2 border bg-white"
          type="text"
          value={inputContent}
          onChange={(e) => {
            setInputContent(e.target.value);
          }}
        />
        <button
          onClick={() => {
            handlePostAlertToUsers();
          }}
          className="w-full h-8 bg-sky-500 text-white font-bold"
        >
          공지 보내기
        </button>
      </div>
    </section>
  );
};

export default PostAlertToUserBox;
