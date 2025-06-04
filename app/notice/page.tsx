import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";
import React from "react";

const Notice = async () => {
  const cookie = await getUserCookies();

  if (!cookie) {
    redirect("/signin");
  }
  return <section>Notice page</section>;
};

export default Notice;
