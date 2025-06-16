import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";
import React from "react";
import ContactBox from "./_components/ContactBox";

const Contact = async () => {
  const cookie = await getUserCookies();
  if (!cookie) {
    redirect("/signin");
  }
  const userId = cookie.userId;

  return (
    <section>
      <h1 className="text-center text-lg font-bold">고객문의</h1>
      <ContactBox userId={userId} />
    </section>
  );
};

export default Contact;
