"use client";

import React, { useEffect, useState } from "react";
import { DPProductsType } from "./types";
import LoadingOverlay from "@/app/(components)/LoadingOverlay";
import { useRouter } from "next/navigation";

const ProductBox = ({ userId, title, dp, interest }: DPProductsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoan = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          dp,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        return;
      }

      alert(result.message);
    } catch (_) {
      alert("포인트 지급중 에러가 발생했습니다. 고객문의 부탁드립니다.");
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  const handleRepayment = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/loan", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          rePaymentDP: dp,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        return;
      }

      alert(result.message);
    } catch (_) {
      alert("상환 처리 중 에러가 발생했습니다.");
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <article className="h-20 py-1 px-4 border">
        <p className="font-bold">{title}</p>
        <div className="flex items-center justify-between">
          <p className="text-xs">
            DP : {dp} <span className="text-sky-500">point</span>
          </p>
          <div className="flex gap-1">
            <button
              onClick={handleLoan}
              className="px-2 py-1 text-xs text-white bg-sky-500 rounded-xl"
            >
              신청하기
            </button>
            <button
              onClick={handleRepayment}
              className="px-2 py-1 text-xs text-white bg-sky-500 rounded-xl"
            >
              상환하기
            </button>
          </div>
        </div>
        <p className="text-sm">
          이자: <span className="text-red-500">{interest}</span>
        </p>
      </article>
    </div>
  );
};

export default ProductBox;
