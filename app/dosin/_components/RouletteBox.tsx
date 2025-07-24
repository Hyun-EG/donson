"use client";

import { useState } from "react";
import SpinnerCanvas from "./SpinnerCanvas";
import { useRouter } from "next/navigation";

export default function RouletteBox({ userId }: { userId: string }) {
  const fixedItems = [
    "1",
    "3",
    "1",
    "5",
    "1",
    "10",
    "1",
    "3",
    "1",
    "5",
    "1",
    "20",
    "1",
    "3",
    "1",
    "5",
    "1",
    "3",
    "1",
    "3",
  ];

  const [result, setResult] = useState<string | null>(null);
  const [selectedNum, setSelectedNum] = useState<number | null>(null);
  const [battingInputValue, setBattingInputValue] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const router = useRouter();

  const handleSpin = () => {
    if (!selectedNum || !battingInputValue) {
      alert("필수 정보가 누락되었습니다.");
      return;
    }
    setResult(null);
    setIsPending(true);
    document.getElementById("spinner")?.dispatchEvent(new Event("rotate"));
  };

  const gameResult = async (finalResult: string) => {
    if (!selectedNum || !battingInputValue) {
      alert("필수 정보가 누락되었습니다.");
      setIsPending(false);
      return;
    }

    try {
      const res = await fetch("/api/dosin-reward", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          selectedNum,
          battingDp: Number(battingInputValue),
          result: finalResult,
        }),
      });

      if (!res.ok) {
        alert("보유한 DP가 없거나 토큰이 만료됐습니다.");
        return;
      }

      const data = await res.json();
      alert(data.message);
    } catch (_) {
      alert("게임 진행 중 에러가 발생하였습니다. 고객 문의 부탁드립니다.");
    } finally {
      router.refresh();
      setIsPending(false);
    }
  };

  return (
    <div>
      {isReady ? (
        <div className="flex flex-col items-center relative">
          <div className="absolute top-8 w-2 h-12 bg-black z-10 rounded-sm" />

          <SpinnerCanvas
            items={fixedItems}
            onResult={(value) => {
              setResult(value);
              gameResult(value);
            }}
          />

          <div className="my-2 text-2xl font-bold text-gray-800">
            결과: <span className="text-red-500">{result ?? "-"}</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            {[1, 3, 5, 10, 20].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedNum(num)}
                className={`w-10 h-8 border rounded-xl ${
                  selectedNum === num ? "bg-yellow-500 text-white" : ""
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <input
            className="w-24 h-8 mb-2 pl-2 border bg-white"
            type="number"
            placeholder="배팅할 DP"
            value={battingInputValue}
            onChange={(e) => setBattingInputValue(e.target.value)}
          />

          <button
            onClick={() => {
              handleSpin();
            }}
            disabled={isPending}
            className={`bg-yellow-400 text-xl font-bold py-2 px-4 rounded ${
              isPending
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-yellow-500"
            }`}
          >
            돌려돌려 돌림판
          </button>
        </div>
      ) : (
        <div>
          <div className="my-4">
            <p className="text-center text-red-500 font-bold">
              게임 횟수: 무제한
            </p>
            <p className="text-sm text-center font-bold">
              이후에 기간이 변경될 수 있습니다.
            </p>
          </div>
          <ul>
            <li className="text-sm font-bold">RULE</li>
            <li className="text-xs">- 5개의 숫자가 존재하는 룰렛입니다</li>
            <li className="text-xs">
              - 숫자를 하나 선택한 뒤 배팅 금액을 입력합니다.
            </li>
            <li className="text-xs">
              - 선택한 숫자와 결과가 일치할 경우 DP를 얻게됩니다.
            </li>
            <li className="text-xs">
              - 선택한 숫자와 결과가 불일치할 경우 DP를 잃게됩니다.
            </li>
            <li className="text-xs">
              - 1은 배팅금액의 <span className="text-red-500">50% </span>
              나머지는 해당하는 숫자의 배를 얻게됩니다.
            </li>
            <li className="mt-4">ex. 배팅: 10DP 선택숫자: 3 승리보상: 30</li>
            <li>ex. 배팅: 10DP 선택숫자: 1 승리보상: 5</li>
          </ul>
          <div className="my-10 flex justify-center">
            <button
              onClick={() => {
                setIsReady(true);
              }}
              className="px-4 py-2 bg-sky-500 text-white text-xl font-bold rounded-[6px]"
            >
              시작하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
