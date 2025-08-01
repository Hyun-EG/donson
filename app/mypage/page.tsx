import React from "react";
import MyPageBox from "./_components/MyPageBox";
import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";
import { connectDB } from "@/mongodb";
import { OrderedItemsType } from "./_components/types";

const MyPage = async () => {
  const cookie = await getUserCookies();
  if (!cookie) {
    redirect("/signin");
  }

  const userId = await cookie?.userId;

  const db = (await connectDB).db("donson");
  const target = await db.collection("user").findOne({ userId });
  const charName = target?.charName;
  const userName = target?.userName;
  const userEmail = target?.userEmail;

  console.log("result", charName);

  const resOcid = await fetch(
    `https://open.api.nexon.com/maplestory/v1/id?character_name=${charName}`,
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXON_API_KEY!,
      },
    }
  );

  const resBoughtItems = await db
    .collection("bought-items")
    .find({ userId })
    .toArray();

  const boughtItems: OrderedItemsType[] = resBoughtItems.map((item) => ({
    _id: item._id.toString(),
    userId: item.userId,
    title: item.title,
    dpPoint: item.dpPoint,
    description: item.description,
    boughtAt:
      typeof item.boughtAt === "object"
        ? new Date(item.boughtAt).getTime()
        : item.boughtAt,
    done: item.done,
  }));

  const data = await resOcid.json();
  const ocid = data.ocid;

  try {
    await db.collection("user").updateOne(
      {
        userId: userId,
      },
      { $set: { ocid } }
    );
  } catch (error) {
    console.error("ocid값 변경중 에러가 발생했습니다.", error);
  }

  return (
    <section className="mb-10">
      <h1 className="mb-4 font-bold text-center text-lg">마이페이지</h1>
      <main>
        <MyPageBox
          charName={charName}
          userName={userName}
          userId={userId}
          userEmail={userEmail}
          resBoughtItems={boughtItems}
        />
      </main>
    </section>
  );
};

export default MyPage;
