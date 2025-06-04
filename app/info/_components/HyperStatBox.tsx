"use client";
import { charHyperStat } from "@/lib/api/charHyperStat";
import { useEffect, useState } from "react";
import { HyperStat } from "./types";

const HyperStatBox = () => {
  const [ocid, setOcid] = useState("");
  const [userId, setUserId] = useState("");
  const [hyperStat, setHyperStat] = useState<HyperStat | null>(null);
  useEffect(() => {
    const getUserId = async () => {
      const res = await fetch("/api/auth/user");
      const data = await res.json();
      if (data.user?.userId) {
        setUserId(data.user.userId);
      }
    };
    getUserId();
  }, []);

  useEffect(() => {
    const getOcid = async () => {
      if (!userId) return;
      const res = await fetch("/api/get-char-ocid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      setOcid(data.ocid);
    };
    getOcid();
  }, [userId]);

  useEffect(() => {
    const getCharHyperStat = async () => {
      if (!ocid) return null;
      try {
        const res = await charHyperStat(ocid);
        setHyperStat(res);
      } catch (error) {
        console.error("하이퍼 스탯 정보 가져오기 실패:", error);
      }
    };

    getCharHyperStat();
  }, [ocid]);

  useEffect(() => {
    if (hyperStat) {
      console.log("하이퍼스탯", hyperStat);
    } else {
      console.log("하이퍼스탯 못불러옴");
    }
  }, [hyperStat]);

  return (
    <section className="px-3 py-2 flex flex-col border-b border-black">
      <article className="flex justify-between items-center">
        <h1 className="text-xl font-bold">하이퍼 스탯</h1>
        <span>▽</span>
      </article>
    </section>
  );
};

export default HyperStatBox;
