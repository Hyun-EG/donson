"use client";

import LoadingOverlay from "@/app/(components)/LoadingOverlay";
import { useState } from "react";

const MaplePointPriceForm = () => {
  const [mepoInputValue, setMepoInputValue] = useState<number>();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitMepoPrice = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!Number.isFinite(mepoInputValue)) {
      alert("가격을 입력해주세요");
      return;
    }

    e.stopPropagation();
    setIsLoading(true);
    try {
      const res = await fetch("/api/add-mepo-price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: mepoInputValue }),
      });
      if (!res.ok) {
        alert("메이플 포인트 가격 등록에 실패하였습니다.");
      }
      alert("메이플 포인트 가격 등록을 완료했습니다.");
      setMepoInputValue(0);
    } catch (error) {
      console.error("메이플 포인트 가격 등록 중 에러가 발생했습니다.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-4 flex flex-col gap-2">
      {isLoading && <LoadingOverlay />}
      <h1 className="text-center font-bold">
        실시간 메이플 포인트 가격을 입력해주세요.
      </h1>
      <input
        className="w-full px-2 py-1 border bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
        type="number"
        placeholder="메이플 포인트 가격을 입력해주세요."
        value={mepoInputValue}
        onChange={(e) => {
          setMepoInputValue(Number(e.target.value));
        }}
      />
      <button
        onClick={(e) => handleSubmitMepoPrice(e)}
        type="button"
        className="w-full px-2 py-1 bg-sky-500 text-white"
      >
        가격등록
      </button>
    </form>
  );
};

export default MaplePointPriceForm;
