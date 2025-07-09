"use client";

import React, { useState } from "react";

const BaseBallBox = () => {
  const [isStart, setIsStart] = useState(false);
  return (
    <section className="w-full px-2 py-1 mt-2 border">
      {!isStart && (
        <div>
          <ul>
            <li className="text-sm">RULE</li>
            <li className="text-xs">- 4자리의 임의의 숫자가 주어집니다</li>
            <li className="text-xs">
              - 주어진 4자리의 숫자와 자릿수까지 맞추면 게임에 승리합니다.
            </li>
            <li className="text-xs">
              - 알맞은 자리에 숫자까지 같으면{" "}
              <span className="text-sky-500">STRIKE</span>{" "}
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
            <li>ex. 정답: 1340 제출한 답: 1438</li>
            <li>
              <span>STRIKE</span>: 1 <span>BALL</span>: 2 <span>OUT</span>: 1
            </li>
          </ul>
          <div className="my-10 flex justify-center">
            <button
              onClick={() => {
                setIsStart(true);
              }}
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
            <p>
              남은기회: <span className="text-red-500">10</span>
            </p>
          </div>
          <div>
            <p>
              1. <span>넣은숫자</span> STRIKE: <span>1</span> BALL:{" "}
              <span>1</span> OUT: <span>1</span>
            </p>
            <p>
              2. <span>넣은숫자</span> STRIKE: <span>1</span> BALL:{" "}
              <span>1</span> OUT: <span>1</span>
            </p>
            <p>
              3. <span>넣은숫자</span> STRIKE: <span>1</span> BALL:{" "}
              <span>1</span> OUT: <span>1</span>
            </p>
            <p>
              4. <span>넣은숫자</span> STRIKE: <span>1</span> BALL:{" "}
              <span>1</span> OUT: <span>1</span>
            </p>
            <p>
              5. <span>넣은숫자</span> STRIKE: <span>1</span> BALL:{" "}
              <span>1</span> OUT: <span>1</span>
            </p>
            <p>
              6. <span>넣은숫자</span> STRIKE: <span>1</span> BALL:{" "}
              <span>1</span> OUT: <span>1</span>
            </p>
            <p>
              7. <span>넣은숫자</span> STRIKE: <span>1</span> BALL:{" "}
              <span>1</span> OUT: <span>1</span>
            </p>
            <p>
              8. <span>넣은숫자</span> STRIKE: <span>1</span> BALL:{" "}
              <span>1</span> OUT: <span>1</span>
            </p>
            <p>
              9. <span>넣은숫자</span> STRIKE: <span>1</span> BALL:{" "}
              <span>1</span> OUT: <span>1</span>
            </p>
            <p>
              10. <span>넣은숫자</span> STRIKE: <span>1</span> BALL:{" "}
              <span>1</span> OUT: <span>1</span>
            </p>
          </div>
          <input
            type="number"
            className="pl-2 border"
            placeholder="숫자를 입력해주세요."
          />
        </div>
      )}
    </section>
  );
};

export default BaseBallBox;
