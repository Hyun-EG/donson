"use client";

import LoadingOverlay from "@/app/(components)/LoadingOverlay";
import { useEffect, useState } from "react";

const MaplePointPriceForm = ({
  userId,
  multiplier,
}: {
  userId: string;
  multiplier: string;
}) => {
  const [eventMultiplierInputValue, setEventMultiplierInputValue] =
    useState<number>();

  const [isLoading, setIsLoading] = useState(true);
  const [curMultiplier, setCurMultiplier] = useState<string | null>(null);

  useEffect(() => {
    if (multiplier !== null && multiplier !== undefined) {
      setCurMultiplier(multiplier);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [multiplier]);

  const handleSubmitEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!Number.isFinite(eventMultiplierInputValue)) {
      alert("배율을 입력해주세요.");
      return;
    }

    e.stopPropagation();
    setIsLoading(true);
    try {
      const res = await fetch("/api/baseball-multiplier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, value: eventMultiplierInputValue }),
      });
      if (!res.ok) {
        alert("야구 게임 배율 변경에 실패하였습니다.");
        return;
      }
      alert("야구 게임 배율을 완료했습니다.");
      setEventMultiplierInputValue(0);
      setCurMultiplier(eventMultiplierInputValue?.toString() || null);
    } catch (error) {
      console.error("메이플 포인트 가격 등록 중 에러가 발생했습니다.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="mt-4 flex flex-col gap-2">
        {isLoading && <LoadingOverlay />}
        <h1 className="text-center font-bold">
          야구게임 변경 배율을 입력해주세요.
        </h1>
        <input
          className="w-full px-2 py-1 border bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
          type="number"
          placeholder="야구게임 배율을 입력해주세요."
          value={eventMultiplierInputValue}
          onChange={(e) => {
            setEventMultiplierInputValue(Number(e.target.value));
          }}
        />
        <button
          onClick={(e) => handleSubmitEvent(e)}
          type="button"
          className="w-full px-2 py-1 bg-sky-500 text-white"
        >
          배율변경
        </button>
      </form>
      <div className="mt-4">
        <p className="text-center">
          현재 야구게임 배율은{" "}
          <span className="text-red-500">
            {isLoading ? "로딩 중" : curMultiplier || "설정되지 않음"}
          </span>{" "}
          입니다.
        </p>
      </div>
    </>
  );
};

export default MaplePointPriceForm;
