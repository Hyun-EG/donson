import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";
import React from "react";
import NoticeEventBox from "./_components/NoticeEventBox";

const Notice = async () => {
  const cookie = await getUserCookies();

  if (!cookie) {
    redirect("/signin");
  }

  // 이벤트 목록

  const resEventList = await fetch(
    "https://open.api.nexon.com/maplestory/v1/notice-event",
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXON_API_KEY!,
      },
    }
  );

  if (!resEventList) {
    console.log("이벤트 목록을 받아오지 못했습니다.");
    return;
  }

  const eventList = await resEventList.json();

  return (
    <main className="flex flex-col gap-2">
      <h6 className="text-center text-lg font-bold">이벤트</h6>
      <NoticeEventBox eventList={eventList} />
    </main>
  );
};

export default Notice;
