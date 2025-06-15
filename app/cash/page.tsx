import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";
import React from "react";
import CashListBox from "./_components/CashListBox";

const Cash = async () => {
  const cookie = await getUserCookies();

  if (!cookie) {
    redirect("/signin");
  }

  const resCashList = await fetch(
    "https://open.api.nexon.com/maplestory/v1/notice-cashshop",
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXON_API_KEY!,
      },
    }
  );
  const cashList = await resCashList.json();

  return (
    <main className="flex flex-col gap-2">
      <h6 className="text-center text-lg font-bold">캐시샵 공지</h6>
      <CashListBox cashList={cashList} />
    </main>
  );
};

export default Cash;
