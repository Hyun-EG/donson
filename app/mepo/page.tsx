import { getUserCookies } from "@/util/getUserCookie";
import { connectDB } from "@/util/mongodb";
import { redirect } from "next/navigation";
import MepoGraph from "./_components/MepoGraph";
import React from "react";
import { MepoPirce } from "./_components/types";
import MepoStatBox from "./_components/MepoStatBox";

const Mepo = async () => {
  const cookie = await getUserCookies();
  if (!cookie) {
    redirect("/signin");
  }

  const db = (await connectDB).db("donson");
  const mepoPrice: MepoPirce[] = (
    await db.collection("maple-point").find().sort({ updateAt: 1 }).toArray()
  ).map((item) => ({
    ...item,
    _id: item._id.toString(),
    price: item.price,
    updateAt: item.updateAt,
  }));

  console.log(mepoPrice);

  return (
    <section className="w-full h-full sm500:h-96 flex flex-col items-center">
      <h1 className="font-bold text-lg">메포 시세</h1>
      <aside className="mt-2 text-xs">
        <p>메포 시세는 넥슨 Open API 미제공으로 매일 수동 등록됩니다.</p>
        <p>등록시작일시 : 2025-06-17</p>
      </aside>
      <main className="w-full h-52 mt-4 z-[-1]">
        <MepoGraph data={mepoPrice} />
      </main>
      <MepoStatBox data={mepoPrice} />
    </section>
  );
};

export default Mepo;
