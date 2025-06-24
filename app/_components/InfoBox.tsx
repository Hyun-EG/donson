"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CharStat } from "../info/_components/types";
import { formatKoreanNumber } from "@/util/formatKoreanNumber";
import { CharInfo, PersonalityRadarChartProps } from "./types";
import PersonalityRadarChart from "./PersonalityRadarChart";
import LoadingOverlay from "../(components)/LoadingOverlay";
import { useRouter } from "next/navigation";

const InfoBox = ({
  charBasicInfo,
  totalStat,
  propensity,
}: {
  charBasicInfo: CharInfo;
  totalStat: CharStat;
  propensity: PersonalityRadarChartProps;
}) => {
  const userCharName = charBasicInfo.character_name;
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const battlePower = totalStat?.final_stat?.find((stat) =>
    stat.stat_name.includes("전투력")
  )?.stat_value;

  useEffect(() => {
    if (userCharName) {
      sessionStorage.setItem("userCharName", userCharName);
    }
  }, []);

  useEffect(() => {
    if (charBasicInfo?.character_image) {
      setIsLoading(false);
    }
  }, [charBasicInfo]);

  const refreshData = () => {
    setIsLoading(true);
    router.refresh();
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <main className="flex flex-col items-center">
        <section className="flex">
          {charBasicInfo?.character_image && (
            <Image
              className="w-36 h-36 border border-[#bebebe] rounded-full bg-white "
              src={charBasicInfo?.character_image}
              alt="캐릭터 이미지"
              width={120}
              height={120}
              quality={100}
              onLoadingComplete={() => setIsLoading(false)}
              priority
            />
          )}
          <article className="flex flex-col justify-center px-4">
            <div className="flex gap-1 text-sm text-white">
              <span className="px-1 font-bold bg-sky-500 rounded-[6px]">
                {charBasicInfo?.world_name}
              </span>
              <button
                onClick={() => {
                  refreshData();
                }}
                disabled={isLoading}
                className="px-1 font-bold bg-gray-500 rounded-[6px]"
              >
                {isLoading ? "갱신 중" : "정보갱신"}
              </button>
            </div>
            <p className="text-sm">
              용사:{" "}
              <span className="font-bold">{charBasicInfo?.character_name}</span>{" "}
              님
            </p>
            <p className="text-sm">
              <span className="font-bold">{totalStat?.character_class} |</span>
              <span className="font-bold">
                {" "}
                {charBasicInfo?.character_level} |{" "}
              </span>
              <span className="font-bold">
                {charBasicInfo?.character_exp_rate}%
              </span>
            </p>
            <p className="text-sm">
              해방 여부:
              <span className="font-bold">
                {charBasicInfo?.liberation_quest_clear_flag === "true"
                  ? "해방 완료"
                  : "해방도 못했네"}
              </span>
            </p>
            <p className="text-sm">
              길드:
              <span className="font-bold">
                {charBasicInfo?.character_guild_name}
              </span>
            </p>
            <p className="text-sm">
              생성 날짜:
              <span className="font-bold">
                {charBasicInfo?.character_date_create?.split("T")[0]}
              </span>
            </p>
          </article>
        </section>
        <aside className="w-full flex flex-col justify-center">
          <div className="w-full h-12 mt-4 flex justify-center items-center border rounded-lg">
            <p>
              <span>전투력 :</span>{" "}
              <span className="font-bold text-xl">
                {battlePower
                  ? `${formatKoreanNumber(Number(battlePower))}`
                  : "전투력 정보 없음"}
              </span>
            </p>
          </div>
          <h1 className="text-sm font-bold">Exp</h1>
          <div className="w-full flex items-center gap-2">
            <div className="w-[85%] h-4 py-1">
              <div
                style={{
                  width: `${Math.floor(
                    Number(charBasicInfo?.character_exp_rate)
                  )}%`,
                }}
                className="h-2 bg-green-300 rounded-r-xl"
              />
            </div>
            <div className="w-[15%]">
              <p className="text-sm">{charBasicInfo?.character_exp_rate}%</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-64 h-64">
              <PersonalityRadarChart propensity={propensity} />
            </div>
          </div>
        </aside>
      </main>
    </>
  );
};

export default InfoBox;
