import React from "react";
import BaseBallBox from "./_components/BaseBallBox";
import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";
import { connectDB } from "@/mongodb";

const BaseBall = async () => {
  const cookies = await getUserCookies();
  const userId = await cookies?.userId;

  const db = (await connectDB).db("donson");

  if (!userId || typeof userId !== "string") {
    redirect("/signin");
  }

  await db.collection("baseball").deleteOne({ userId });

  return (
    <section>
      <h1 className="text-center text-lg font-bold">야구게임</h1>
      <BaseBallBox userId={userId} />
    </section>
  );
};

export default BaseBall;
