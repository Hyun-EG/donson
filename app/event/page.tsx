import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";
import React from "react";
import NoticeEventBox from "./_components/NoticeEventBox";

const Notice = async () => {
  const cookie = await getUserCookies();

  if (!cookie) {
    redirect("/signin");
  }
  return (
    <main className="flex flex-col gap-2">
      <h6 className="text-center text-lg font-bold">이벤트</h6>
      <NoticeEventBox />
    </main>
  );
};

export default Notice;
