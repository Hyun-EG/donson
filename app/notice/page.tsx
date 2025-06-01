import { verifyJWT } from "@/util/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Notice = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const decoded = token ? verifyJWT(token) : null;

  if (!decoded) {
    redirect("/signin");
  }
  return <section>Notice page</section>;
};

export default Notice;
