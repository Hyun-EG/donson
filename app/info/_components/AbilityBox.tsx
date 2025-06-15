"use client";

import { useState } from "react";
import { AbilityType } from "./types";

const AbilityBox = ({ ability }: { ability: AbilityType }) => {
  const [isShowAbilities, setIsShowAbilities] = useState(true);

  return (
    <section className="px-3 py-2 flex flex-col border-b border-[#bebebe]">
      <article
        onClick={() => {
          setIsShowAbilities((prev) => (prev ? false : true));
        }}
        className="flex justify-between items-center"
      >
        <h1 className="font-bold">어빌리티</h1>
        <span>{isShowAbilities ? "△" : "▽"}</span>
      </article>
      {isShowAbilities &&
        ability?.ability_info.map((item) => (
          <aside key={item.ability_no} className="flex flex-col text-xs">
            <div className="flex items-center py-1">
              <div className="w-16">
                <p className="text-center">{item.ability_grade}</p>
              </div>
              <div
                className={`border border-[#bebebe] rounded-[4px] p-1 ${
                  item.ability_grade === "레전드리"
                    ? "bg-[#A4C700]"
                    : item.ability_grade === "유니크"
                    ? "bg-[#E89C00]"
                    : "bg-[#bebebe]"
                }`}
              >
                <p className="text-white font-bold">{item.ability_value}</p>
              </div>
            </div>
          </aside>
        ))}
    </section>
  );
};

export default AbilityBox;
