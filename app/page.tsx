import { redirect } from "next/navigation";
import InfoBox from "./_components/InfoBox";
import { getUserCookies } from "@/util/getUserCookie";

const page = async () => {
  const result = await getUserCookies();

  try {
  } catch (error) {}

  if (!result) {
    redirect("/signin");
  }

  const { userId } = result;

  return (
    <section>
      <InfoBox userId={userId!} />
    </section>
  );
};

export default page;
