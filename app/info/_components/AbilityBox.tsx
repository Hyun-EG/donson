"use client";

import { useState } from "react";
import { AbilityType } from "./types";

const AbilityBox = ({ ability }: { ability: AbilityType }) => {
  const [isShowAbilities, setIsShowAbilities] = useState(false);

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
        ability?.ability_info.map((item) => (
          <aside key={item.ability_no} className="flex gap-2 text-xs">
            <p>{item.ability_grade}</p>
            <p className="font-bold">{item.ability_value}</p>
          </aside>
        ))}
    </section>
  );
};

export default AbilityBox;
