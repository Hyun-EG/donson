"use client";
import Image from "next/image";

const InfoBox = ({ charBasicInfo }: { charBasicInfo: CharInfo }) => {
  return (
    <main className="flex flex-col items-center">
      <section className="flex">
        {charBasicInfo?.character_image && (
          <Image
            className="border rounded-xl"
            src={charBasicInfo?.character_image}
            alt="캐릭터 이미지"
            width={120}
            height={120}
          />
        )}
        <article className="flex flex-col px-4">
          <p>
            월드: <span className="font-bold">{charBasicInfo?.world_name}</span>
          </p>
          <p>
            용사:{" "}
            <span className="font-bold">{charBasicInfo?.character_name}</span>님
          </p>
          <p>
            해방 여부:
            <span>
              {charBasicInfo?.liberation_quest_clear_flag === "true"
                ? "해방 완료"
                : "해방도 못했네"}
            </span>
          </p>
          <p>
            레벨:{" "}
            <span className="font-bold">{charBasicInfo?.character_level}</span>
          </p>
          <p>
            길드:
            <span className="font-bold">
              {charBasicInfo?.character_guild_name}
            </span>
          </p>
          <p>
            생성 날짜:
            <span className="font-bold">
              {charBasicInfo?.character_date_create?.split("T")[0]}
            </span>
          </p>
        </article>
      </section>
      <aside className="w-full flex flex-col justify-center">
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
      </aside>
    </main>
  );
};

export default InfoBox;
