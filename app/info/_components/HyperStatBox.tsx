"use client";
import { useState } from "react";
import { HyperStat } from "./types";

const HyperStatBox = ({ totalHyperStat }: { totalHyperStat: HyperStat }) => {
  const [isShowHyperStat, setIsShowHyperStat] = useState(false);

  return (
    <section className="px-3 py-2 flex flex-col border-b border-[#bebebe]">
      <article
        onClick={() => {
          setIsShowHyperStat((prev) => (prev ? false : true));
        }}
        className="flex justify-between items-center"
      >
        <h1 className="font-bold">하이퍼 스탯</h1>
        <span>{isShowHyperStat ? "△" : "▽"}</span>
      </article>
      {isShowHyperStat
        ? totalHyperStat?.hyper_stat_preset_1.map((item, index) => (
            <aside key={index} className="flex gap-2 text-xs">
              <p className="font-bold">{item.stat_type}</p>
              <p>{item.stat_level}</p>
              <p>{item.stat_increase === null ? "-" : item.stat_increase}</p>
            </aside>
          ))
        : null}
    </section>
  );
};

export default HyperStatBox;
