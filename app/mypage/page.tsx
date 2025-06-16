import React from "react";
import MyPageBox from "./_components/MyPageBox";
import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";

const MyPage = async () => {
  const cookie = await getUserCookies();
  if (!cookie) {
    redirect("/signin");
  }
  return (
    <section>
      <h1 className="mb-4 font-bold text-center text-lg">마이페이지</h1>
      <main>
        <MyPageBox />
      </main>
    </section>
  );
};

export default MyPage;
