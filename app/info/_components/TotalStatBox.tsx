"use client";

import { charStatInfo } from "@/lib/api/charStatInfo";
import { useEffect, useState } from "react";
import { CharStat } from "./types";

const TotalStatBox = () => {
  const [ocid, setOcid] = useState(null);
  const [stat, setStat] = useState<CharStat | null>(null);
  const [userId, setUserId] = useState("");
  const [isShowTotalStat, setIsShowTotalStat] = useState(false);

  useEffect(() => {
    const getUserId = async () => {
      const cookie = await fetch("/api/auth/user");
      const data = await cookie.json();
      if (data.user?.userId) {
        setUserId(data.user.userId);
      }
    };
    getUserId();
  }, []);

  useEffect(() => {
    const saveCharOcid = async () => {
      if (!userId) return;

      const res = await fetch("api/get-char-ocid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      setOcid(data.ocid);
    };
    saveCharOcid();
  }, [userId]);

  useEffect(() => {
    const getCharStatInfo = async () => {
      if (!ocid) return;

      try {
        const data = await charStatInfo(ocid);
        setStat(data);
      } catch (error) {
        console.error("스탯 정보 가져오기 실패:", error);
      }
    };

    getCharStatInfo();
  }, [ocid]);

  useEffect(() => {
    if (stat) {
      console.log(stat);
    }
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
        ? stat?.final_stat.map((statItem, index) => (
            <div className="px-3 flex gap-2" key={index}>
              <span className="font-bold text-sm">{statItem.stat_name}</span>
              <span className="font-bold text-sm">{statItem.stat_value}</span>
            </div>
          ))
        : null}
    </section>
  );
};

export default TotalStatBox;
