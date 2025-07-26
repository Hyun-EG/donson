import React from "react";
import ProductBox from "./ProductBox";
import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";
import { connectDB } from "@/mongodb";

const LoanBox = async () => {
  const cookie = await getUserCookies();
  const userId = cookie?.userId;

  if (!cookie) {
    redirect("/");
  }

  const db = (await connectDB).db("donson");
  const target = await db.collection("dp").findOne({ userId });
  const dp = target?.dp;

  return (
    <section className="w-full mt-4 flex flex-col gap-2">
      <p className="text-sm font-bold">
        나의 DP: <span className="text-red-500">{dp}</span>
      </p>
      <ProductBox userId={userId} title="디피론 A" dp={10} interest="-" />
      <ProductBox userId={userId} title="디피론 B" dp={25} interest="-" />
      <ProductBox userId={userId} title="디피론 C" dp={50} interest="-" />
      <ProductBox userId={userId} title="디피론 D" dp={100} interest="-" />
    </section>
  );
};

export default LoanBox;
