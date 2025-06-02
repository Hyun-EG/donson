import { MyJwtPayload, verifyJWT } from "@/util/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import InfoBox from "./_components/InfoBox";

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const decoded = token ? (verifyJWT(token) as MyJwtPayload) : null;
  const userId = decoded?.userId;

  try {
  } catch (error) {}

  if (!decoded) {
    redirect("/signin");
  }
  return (
    <section>
      Main page
      <InfoBox userId={userId!} />
    </section>
  );
};

export default page;
