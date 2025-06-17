"use client";

import { useMemo } from "react";

type MepoPrice = {
  price: number;
  updateAt: string;
};

const MepoStatBox = ({ data }: { data: MepoPrice[] }) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const currentYear = now.getFullYear();
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const { thisMonthStats, lastMonthStats } = useMemo(() => {
    const thisMonthPrices: number[] = [];
    const lastMonthPrices: number[] = [];

    data.forEach(({ price, updateAt }) => {
      const date = new Date(updateAt);
      const year = date.getFullYear();
      const month = date.getMonth();

      if (year === currentYear && month === currentMonth) {
        thisMonthPrices.push(price);
      } else if (year === previousYear && month === previousMonth) {
        lastMonthPrices.push(price);
      }
    });

    const calcStats = (arr: number[]) => ({
      max: arr.length ? Math.max(...arr) : null,
      min: arr.length ? Math.min(...arr) : null,
    });

    return {
      thisMonthStats: calcStats(thisMonthPrices),
      lastMonthStats: calcStats(lastMonthPrices),
    };
  }, [data]);

  return (
    <section className="w-full">
      <h2 className="text-center font-bold">메포 통계</h2>
      <article className="p-10 flex justify-between">
        <aside className="p-4 border rounded-lg">
          <h3 className="text-center text-[#bebebe] font-bold">저번달</h3>
          <p className="text-sm text-red-500">
            최고가: {lastMonthStats.max ?? "-"}
          </p>
          <p className="text-sm text-blue-500">
            최저가: {lastMonthStats.min ?? "-"}
          </p>
        </aside>

        <aside className="p-4 border rounded-lg">
          <h3 className="text-center font-bold">이번달</h3>
          <p className="text-sm text-red-500">
            최고가: {thisMonthStats.max ?? "-"}
          </p>
          <p className="text-sm text-blue-500">
            최저가: {thisMonthStats.min ?? "-"}
          </p>
        </aside>
      </article>
    </section>
  );
};

export default MepoStatBox;
