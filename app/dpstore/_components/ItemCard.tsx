"use client";

import React, { useState } from "react";
import { DPStoreProps } from "./types";
import LoadingOverlay from "@/app/(components)/LoadingOverlay";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";

const ItemCard = ({
  title,
  dpPoint,
  meso,
  description,
  condition,
}: DPStoreProps) => {
  const { userId } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleBuyAndAdd = async () => {
    setIsLoading(true);
    try {
      const buyRes = await fetch("/api/buy-item-result-dp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, dp: dpPoint, title }),
      });

      if (buyRes.status === 409) {
        alert("이미 구매한 상품이거나 포인트가 부족합니다.");
        return;
      }

      if (!buyRes.ok) {
        alert("아이템 구매에 실패하였습니다.");
        return;
      }

      const orderRes = await fetch("/api/bought-item-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, title, dpPoint, description }),
      });

      if (orderRes.status === 409) {
        alert("이미 구매한 상품입니다.");
        return;
      }

      if (!orderRes.ok) {
        alert("구매 리스트 추가 중 문제가 발생했습니다.");
        return;
      }

      alert("아이템을 성공적으로 구매하였습니다.");
      router.refresh();
    } catch (error) {
      alert("예상치 못한 에러가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full px-2 py-1 border border-[#bebebe] rounded-[6px]">
      {isLoading && <LoadingOverlay />}
      <header className="flex justify-between items-center">
        <p>
          <span className="font-bold text-xs">{title}</span>
        </p>
        <p className="text-xs">
          <span className="font-bold text-sky-500">{dpPoint} </span>p /{" "}
          <span className="font-bold text-sky-500">{meso} </span>만메소
        </p>
      </header>
      <main>
        <p className="font-bold text-xs">
          가능 직군 : <span>{condition}</span>
        </p>
        <span className="font-bold text-xs">{description}</span>
      </main>
      <footer>
        <button
          onClick={handleBuyAndAdd}
          className="w-full p-1 bg-sky-500 text-white text-sm rounded-[6px]"
        >
          구매하기
        </button>
      </footer>
    </section>
  );
};

export default ItemCard;
