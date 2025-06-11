import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";
import React from "react";
import TotalStatBox from "./_components/TotalStatBox";
import HyperStatBox from "./_components/HyperStatBox";
import AbilityBox from "./_components/AbilityBox";

const Info = async () => {
  const cookie = await getUserCookies();
  if (!cookie) {
    redirect("/signin");
  }

  const { ocid } = cookie;

  // 종합스탯
  const resTotalStat = await fetch(
    `https://open.api.nexon.com/maplestory/v1/character/stat?ocid=${ocid}`,
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXON_API_KEY!,
      },
    }
  );

  if (!resTotalStat.ok) {
    console.log("캐릭터 종합 능력치 정보를 받지 못했습니다.");
    return;
  }

  const totalStat = await resTotalStat.json();

  // 하이퍼스탯
  const resHyperStat = await fetch(
    `https://open.api.nexon.com/maplestory/v1/character/hyper-stat?ocid=${ocid}`,
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXON_API_KEY!,
      },
    }
  );

  if (!resHyperStat.ok) {
    console.log("캐릭터 종합 능력치 정보를 받지 못했습니다.");
    return;
  }

  const totalHyperStat = await resHyperStat.json();

  return (
    <section className="w-full flex flex-col ">
      <article className="flex flex-col">
        <TotalStatBox totalStat={totalStat} />
        <HyperStatBox totalHyperStat={totalHyperStat} />
        <AbilityBox />
      </article>
    </section>
  );
};

export default Info;
