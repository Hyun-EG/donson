import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";
import React from "react";
import TotalStatBox from "./_components/TotalStatBox";
import HyperStatBox from "./_components/HyperStatBox";
import AbilityBox from "./_components/AbilityBox";

const Info = async () => {
  const cookie = await getUserCookies();
  if (!cookie) {
    redirect("/signin");
  }

  return (
    <section className="w-full flex flex-col ">
      <article className="flex flex-col">
        <TotalStatBox />
        <HyperStatBox />
        <AbilityBox />
      </article>
    </section>
  );
};

export default Info;
