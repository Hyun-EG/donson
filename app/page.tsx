import { verifyJWT } from "@/util/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const decoded = token ? verifyJWT(token) : null;

  if (!decoded) {
    redirect("/signin");
  }
  return <section>Main page</section>;
};

export default page;
