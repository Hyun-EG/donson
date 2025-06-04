import { redirect } from "next/navigation";
import InfoBox from "./_components/InfoBox";
import { getUserCookies } from "@/util/getUserCookie";

const page = async () => {
  const cookie = await getUserCookies();

  if (!cookie) {
    redirect("/signin");
  }

  const { userId } = cookie;

  return (
    <section>
      <InfoBox userId={userId!} />
    </section>
  );
};

export default page;
