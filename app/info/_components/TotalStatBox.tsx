"use client";

import { useState } from "react";
import { CharStat } from "./types";

const TotalStatBox = ({ totalStat }: { totalStat: CharStat }) => {
  const [isShowTotalStat, setIsShowTotalStat] = useState(false);

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
        ? totalStat?.final_stat?.map((statItem, index) => (
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
