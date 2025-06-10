"use client";

import useUserStore from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { AbilityType } from "./types";

const AbilityBox = () => {
  const { ocid } = useUserStore();
  const [abilities, setAbilities] = useState<AbilityType | null>(null);
  const [isShowAbilities, setIsShowAbilities] = useState(false);

  useEffect(() => {
    const fetchAbility = async () => {
      console.log("현재 ocid:", ocid);
      if (!ocid) return;

      try {
        const res = await fetch("/api/get-char-ability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ocid }),
        });

        if (!res.ok) return;

        const data = await res.json();
        setAbilities(data);
      } catch (error) {
        console.error("어빌리티를 받아오지 못했습니다.", error);
      }
    };

    fetchAbility();
  }, [ocid]);

  useEffect(() => {
    console.log("어빌리티", abilities);
  }, [abilities]);

  return (
    <section className="px-3 py-2 flex flex-col border-b border-black">
      <article
        onClick={() => {
          setIsShowAbilities((prev) => (prev ? false : true));
        }}
        className="mb-2 flex justify-between items-center"
      >
        <h1 className="text-xl font-bold">어빌리티</h1>
        <span>{isShowAbilities ? "△" : "▽"}</span>
      </article>
      {isShowAbilities &&
        abilities?.ability_info.map((item) => (
          <aside key={item.ability_no} className="flex gap-2 text-xs">
            <p>{item.ability_grade}</p>
            <p className="font-bold">{item.ability_value}</p>
          </aside>
        ))}
    </section>
  );
};

export default AbilityBox;
