"use client";

import LoadingOverlay from "@/app/(components)/LoadingOverlay";
import { useEffect, useState } from "react";

const MaplePointPriceForm = ({ userId }: { userId: string }) => {
  const [eventMultiplierInputValue, setEventMultiplierInputValue] =
    useState<number>();
  const [curMultiplier, setCurMultiplier] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/baseball-multiplier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          value: eventMultiplierInputValue,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        return;
      }
      alert(
        `배율 변경에 성공하였습니다! 현재 배율은 ${eventMultiplierInputValue} 입니다.`
      );
      setEventMultiplierInputValue(0);
      setCurMultiplier(eventMultiplierInputValue || 0);
    } catch (error) {
      console.error(error, "서버에러");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMultiplier = async () => {
    const res = await fetch("/api/baseball-multiplier");
    const data = await res.json();
    setCurMultiplier(data.multiplier);
  };

  useEffect(() => {
    fetchMultiplier();
  }, []);

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <form onSubmit={handleSubmitEvent} className="mt-4 flex flex-col gap-2">
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
          type="submit"
          className="w-full px-2 py-1 bg-sky-500 text-white"
        >
          배율변경
        </button>
      </form>
      <div className="mt-4">
        <p className="text-center">
          현재 야구게임 배율은{" "}
          <span className="text-red-500">{curMultiplier}</span> 입니다.
        </p>
      </div>
    </>
  );
};

export default MaplePointPriceForm;
