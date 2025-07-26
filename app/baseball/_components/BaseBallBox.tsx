"use client";

import React, { useState } from "react";

const BaseBallBox = ({ userId }: { userId: string }) => {
  const [isStart, setIsStart] = useState(false);
  const [guessInput, setGuessInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [history, setHistory] = useState<
    { guess: string; strike: number; ball: number; out: number }[]
  >([]);
  const [turn, setTurn] = useState(0);

  const handleStart = async () => {
    const res = await fetch("/api/baseball-game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (res.ok) {
      setIsStart(true);
      setHistory([]);
      setTurn(0);
    } else {
      alert("이미 게임이 시작되었습니다.");
    }
  };

  const handleGuess = async () => {
    if (guessInput.length !== 4) return alert("4자리 숫자를 입력하세요.");

    const guess = guessInput.split("").map(Number);
    const res = await fetch("/api/baseball-game", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, guess }),
    });

    const data = await res.json();
    if (res.ok) {
      setHistory((prev) => [
        ...prev,
        {
          guess: guessInput,
          strike: data.strike,
          ball: data.ball,
          out: data.out,
        },
      ]);
      setTurn((prev) => prev + 1);
      setGuessInput("");
    } else {
      alert(data.message);
    }
  };

  const handleSubmit = async () => {
    if (answerInput.length !== 4) return alert("4자리 숫자를 입력하세요.");

    const result = answerInput.split("").map(Number);
    const res = await fetch("/api/baseball-game", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, result }),
    });

    const data = await res.json();
    alert(data.message);
    setIsStart(false);
    setAnswerInput("");
  };

  return (
    <section className="w-full px-2 py-1 mt-2 border">
      {!isStart && (
        <div>
          <div className="my-4">
            <p className="text-sm text-center font-bold">
              <span className="text-red-500">EVENT</span> 승리 시 [
              <span className="text-red-500"> 0.2 </span>
              <span className="text-sky-500">dp </span>] 를 적립합니다.
            </p>
            <p className="text-center text-red-500 font-bold">
              게임 횟수: 무제한
            </p>
          </div>
          <ul>
            <li className="text-sm font-bold">RULE</li>
            <li className="text-xs">- 4자리의 임의의 숫자가 주어집니다</li>
            <li className="text-xs">
              - 주어진 4자리의 숫자와 자릿수까지 맞추면 게임에 승리합니다.
            </li>
            <li className="text-xs">
              - 알맞은 자리에 숫자까지 같으면{" "}
              <span className="text-sky-500">STRIKE</span>
            </li>
            <li className="text-xs">
              - 자리는 틀렸으나 숫자가 존재하면{" "}
              <span className="text-orange-500">BALL</span>
            </li>
            <li className="text-xs">
              - 숫자가 존재하지 않으면 <span className="text-red-500">OUT</span>
            </li>
            <li className="text-xs text-red-500">
              - 중복된 숫자는 존재하지 않습니다.
            </li>
            <li className="mt-4">ex. 정답: 1340 제출한 답: 1438</li>
            <li>
              <span className="text-sky-500 font-bold">STRIKE</span>: 1
              <span className="text-orange-500 font-bold"> BALL</span>: 2{" "}
              <span className="text-red-500 font-bold">OUT</span>: 1
            </li>
          </ul>
          <div className="my-10 flex justify-center">
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-sky-500 text-white text-xl font-bold rounded-[6px]"
            >
              시작하기
            </button>
          </div>
        </div>
      )}

      {isStart && (
        <div className="w-full h-96 pt-4 flex flex-col justify-between">
          <div>
            <p className="text-sky-500 text-center">게임이 시작됐습니다.</p>
            <p className="text-sm">
              추론기회: <span className="text-red-500">{10 - turn}</span>
            </p>
            <p className="text-sm">
              제출기회: <span className="text-red-500">1</span>
            </p>
          </div>
          <div className="text-sm">
            {history.map((h, idx) => (
              <p key={idx}>
                {idx + 1}. <span className="font-bold">{h.guess} 결과: </span>{" "}
                <span className="text-sky-500 font-bold">{h.strike}</span>
                <span className="text-sky-500"> STRIKE </span>
                <span className="text-orange-500 font-bold">{h.ball}</span>
                <span className="text-orange-500"> BALL </span>
                <span className="text-red-500 font-bold">{h.out}</span>
                <span className="text-red-500"> OUT</span>
              </p>
            ))}
          </div>
          <div className="w-full flex flex-col items-center gap-1">
            <div className="flex gap-1">
              <input
                type="number"
                value={guessInput}
                onChange={(e) => setGuessInput(e.target.value)}
                className="pl-2 py-1 text-sm border bg-white rounded-[6px]"
                placeholder="숫자를 입력해주세요."
              />
              <button
                onClick={handleGuess}
                className="px-2 py-1 border rounded-[6px]"
              >
                추론
              </button>
            </div>
            <div className="flex gap-1">
              <input
                type="number"
                value={answerInput}
                onChange={(e) => setAnswerInput(e.target.value)}
                className="pl-2 py-1 text-sm border bg-white rounded-[6px]"
                placeholder="정답을 입력해주세요."
              />
              <button
                onClick={handleSubmit}
                className="px-2 py-1 border rounded-[6px]"
              >
                제출
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BaseBallBox;
