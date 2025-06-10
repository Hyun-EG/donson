import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";
import React from "react";

const Notice = async () => {
  const cookie = await getUserCookies();

  if (!cookie) {
    redirect("/signin");
  }
  return <main className="flex flex-col gap-2">공지사항</main>;
};

export default Notice;
