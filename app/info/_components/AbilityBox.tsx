"use client";

import useUserStore from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { AbilityType } from "./types";

const AbilityBox = () => {
  const { ocid } = useUserStore();
  const [abilities, setAbilities] = useState<AbilityType | null>(null);

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
    <section>
      <article className="w-full h-12 px-3 flex justify-between items-center border-b border-black">
        <h1 className="text-xl font-bold">어빌리티</h1>
        <span>▽</span>
      </article>
      <aside></aside>
    </section>
  );
};

export default AbilityBox;
