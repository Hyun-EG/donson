import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";
import React from "react";
import DPStoreBox from "./_components/DPStoreBox";
import { connectDB } from "@/util/mongodb";

const DPStore = async () => {
  const cookie = await getUserCookies();
  const userId = await cookie?.userId;

  if (!cookie) {
    redirect("/signin");
  }

  const db = (await connectDB).db("donson");
  const user = await db.collection("dp").findOne({ userId });
  const userDp = await user?.dp;

  return (
    <main className="mb-10 flex flex-col gap-2">
      <h6 className="text-center text-lg font-bold">DP Store</h6>
      <p className="font-bold text-xs text-red-500">
        * 상품을 통해 얻은 재화는 공제되지 않습니다.
      </p>
      <p className="font-bold text-xs">
        * 구매 상품은 구매일 기준 주차로 진행됩니다.
      </p>
      <p className="font-bold text-xs">
        * 메소로 구매 희망하는 상품은 고객문의를 통해 남겨주세요.
      </p>
      <p className="font-bold text-xs">
        * 이외에 주문형 상품은 고객문의를 통해 남겨주세요.
      </p>
      <p className="font-bold text-xs">
        ex) 주간 유니온 퀘스트 , 제시 가격: 5p
      </p>
      <p className="text-end text-sm font-bold">
        DP 포인트 : <span className="text-sky-500">{userDp}</span> p
      </p>
      <article>
        <DPStoreBox />
      </article>
    </main>
  );
};

export default DPStore;
