"use client";

import { useEffect, useState } from "react";
import { CharStat } from "./types";
import useUserStore from "@/store/useUserStore";

const TotalStatBox = () => {
  const { ocid } = useUserStore();
  const [stat, setStat] = useState<CharStat | null>(null);
  const [isShowTotalStat, setIsShowTotalStat] = useState(false);

  useEffect(() => {
    const getCharStatInfo = async () => {
      if (!ocid) return;

      try {
        const res = await fetch("/api/get-char-stat-info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ocid }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error("응답값이 존재하지 않습니다.");
        }

        setStat(data);
      } catch (error) {
        console.error("캐릭터 스탯 정보 가져오기 실패:", error);
      }
    };

    getCharStatInfo();
  }, [ocid]);

  useEffect(() => {
    console.log("종합능력치입니다.", stat);
  }, [stat]);

  return (
    <section className="w-full flex flex-col gap-2">
      <article
        className="flex items-center justify-between px-3 py-2 border-b border-black"
        onClick={() => {
          setIsShowTotalStat((prev) => (prev ? false : true));
        }}
      >
        <p className="text-xl font-bold">종합 능력치</p>
        <p className="cursor-pointer">{isShowTotalStat ? "△" : "▽"}</p>
      </article>
      {isShowTotalStat
        ? stat?.final_stat?.map((statItem, index) => (
            <aside className="px-3 flex gap-2" key={index}>
              <p className="font-bold text-xs">{statItem.stat_name}</p>
              <p className="font-bold text-xs">{statItem.stat_value}</p>
            </aside>
          ))
        : null}
    </section>
  );
};

export default TotalStatBox;
