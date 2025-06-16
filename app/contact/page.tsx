import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";
import React from "react";

const Contact = async () => {
  const cookie = await getUserCookies();
  if (!cookie) {
    redirect("/signin");
  }
  return <p>미개발구역</p>;
};

export default Contact;
