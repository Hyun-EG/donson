"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import useUserStore from "@/store/useUserStore";

const InfoBox = ({ userId }: { userId: string }) => {
  const { ocid, setUserIdAndOcid } = useUserStore();
  const [charInfo, setCharInfo] = useState<CharInfo | null>(null);

  useEffect(() => {
    if (userId) {
      setUserIdAndOcid(userId);
    }
  }, [userId, setUserIdAndOcid]);

  useEffect(() => {
    if (!ocid) return;

    const fetchCharInfo = async () => {
      try {
        const res = await fetch("/api/get-char-basic-info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ocid }),
        });
        const data = await res.json();
        setCharInfo(data);
      } catch (error) {
        console.error("캐릭터 기본 정보 가져오기 실패", error);
      }
    };
    fetchCharInfo();
  }, [ocid]);

  return (
    <main className="flex flex-col items-center">
      <section className="flex">
        {charInfo?.character_image && (
          <Image
            className="border rounded-xl"
            src={charInfo?.character_image}
            alt="캐릭터 이미지"
            width={120}
            height={120}
          />
        )}
        <article className="flex flex-col px-4">
          <p>
            월드: <span className="font-bold">{charInfo?.world_name}</span>
          </p>
          <p>
            용사: <span className="font-bold">{charInfo?.character_name}</span>
            님
          </p>
          <p>
            해방 여부:
            <span>
              {charInfo?.liberation_quest_clear_flag === "true"
                ? "해방 완료"
                : "해방도 못했네"}
            </span>
          </p>
          <p>
            레벨: <span className="font-bold">{charInfo?.character_level}</span>
          </p>
          <p>
            길드:
            <span className="font-bold">{charInfo?.character_guild_name}</span>
          </p>
          <p>
            생성 날짜:
            <span className="font-bold">
              {charInfo?.character_date_create?.split("T")[0]}
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
                width: `${Math.floor(Number(charInfo?.character_exp_rate))}%`,
              }}
              className="h-2 bg-green-300 rounded-r-xl"
            />
          </div>
          <div className="w-[15%]">
            <p className="text-sm">{charInfo?.character_exp_rate}%</p>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default InfoBox;
