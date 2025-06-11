import { redirect } from "next/navigation";
import InfoBox from "./_components/InfoBox";
import { getUserCookies } from "@/util/getUserCookie";

const page = async () => {
  const cookie = await getUserCookies();

  if (!cookie) {
    redirect("/signin");
  }

  const { ocid } = cookie;

  const res = await fetch(
    `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`,
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXON_API_KEY!,
      },
      next: { revalidate: 60 },
    }
  );
  const charBasicInfo = await res.json();

  return (
    <section>
      <InfoBox charBasicInfo={charBasicInfo} />
    </section>
  );
};

export default page;
