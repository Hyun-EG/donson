import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";
import React from "react";

const Info = async () => {
  const cookie = await getUserCookies();

  if (!cookie) {
    redirect("/signin");
  }
  return <section>Info page</section>;
};

export default Info;
