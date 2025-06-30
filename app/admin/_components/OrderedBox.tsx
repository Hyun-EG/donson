"use client";

import React, { useState } from "react";

const OrderedBox = ({
  groupedOrders,
}: {
  groupedOrders: Record<string, { title: string; done: boolean }[]>;
}) => {
  const [isShowDetail, setIsShowDetail] = useState<string | null>(null);

  return (
    <section className="mt-4 flex flex-col">
      <h1 className="font-bold text-center">용사님들의 주문내역</h1>
      <main>
        {Object.entries(groupedOrders).map(([userId, items]) => (
          <div key={userId}>
            <div
              onClick={() => {
                setIsShowDetail((prev) => (prev === userId ? null : userId));
              }}
              className="flex flex-col gap-1 px-2 py-4 border-b border-[#bebebe] cursor-pointer"
            >
              <p className="text-sm">
                용사님: <span className="font-bold">{userId}</span>
              </p>
            </div>
            {isShowDetail === userId && (
              <div className="px-4 pt-4 flex flex-col gap-2">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 text-sm border rounded bg-gray-100"
                  >
                    <p>타이틀: {item.title}</p>
                    <button className="w-full py-1 mt-2 bg-sky-500 text-white rounded-[6px]">
                      수행 완료하기
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </main>
    </section>
  );
};

export default OrderedBox;
