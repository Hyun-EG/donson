import { redirect } from "next/navigation";
import InfoBox from "./_components/InfoBox";
import { getUserCookies } from "@/util/getUserCookie";

const page = async () => {
  const cookie = await getUserCookies();

  if (!cookie) {
    redirect("/signin");
  }

  const { ocid } = cookie;

  const resCharBasicInfo = await fetch(
    `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`,
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXON_API_KEY!,
      },
      next: { revalidate: 60 },
    }
  );
  const charBasicInfo = await resCharBasicInfo.json();

  const resBattlePower = await fetch(
    `https://open.api.nexon.com/maplestory/v1/character/stat?ocid=${ocid}`,
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXON_API_KEY!,
      },
    }
  );

  const totalStat = await resBattlePower.json();

  const resPropensity = await fetch(
    `https://open.api.nexon.com/maplestory/v1/character/propensity?ocid=${ocid}`,
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXON_API_KEY!,
      },
    }
  );

  const propensity = await await resPropensity.json();

  return (
    <section>
      <InfoBox
        charBasicInfo={charBasicInfo}
        totalStat={totalStat}
        propensity={propensity}
      />
    </section>
  );
};

export default page;
