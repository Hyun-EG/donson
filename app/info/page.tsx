import { verifyJWT } from "@/util/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Info = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const decoded = token ? verifyJWT(token) : null;

  if (!decoded) {
    redirect("/signin");
  }
  return <section>Info page</section>;
};

export default Info;
