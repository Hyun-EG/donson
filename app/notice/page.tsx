import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";
import React from "react";
import NoticeBox from "./_components/NoticeBox";

const Notice = async () => {
  const cookie = await getUserCookies();

  if (!cookie) {
    redirect("/signin");
  }
  return (
    <main className="flex flex-col gap-2">
      <p className="text-center font-bold text-lg">공지사항</p>
      <NoticeBox />
    </main>
  );
};

export default Notice;
