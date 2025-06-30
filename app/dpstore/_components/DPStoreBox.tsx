import React from "react";
import ItemCard from "./ItemCard";

const DPStoreBox = () => {
  return (
    <section className="flex flex-col gap-1">
      <ItemCard
        title="출석체크 (딸칵형)"
        dpPoint={10}
        meso={4000}
        description="딸칵형 출첵 (조건없이 출석이 가능한 이벤트)"
      />
      <ItemCard
        title="출석체크 (마릿수)"
        dpPoint={30}
        meso={10000}
        description="마릿수 출첵 (조건이 존재하는 이벤트)"
      />
      <ItemCard
        title="패키지 A"
        dpPoint={50}
        meso={18000}
        description="마릿수 출첵 + 일퀘(아케인) + 일퀘(어센틱) + 디데이 출첵"
      />
      <ItemCard
        title="하위보스 (전체) + 마일리지 적립"
        dpPoint={30}
        meso={18000}
        description="자쿰~핑크빈(하드,카오스) + 마일리지 적립"
      />
      <ItemCard
        title="검밑솔 보스 + 마일리지 적립"
        dpPoint={150}
        meso={70000}
        description="스우~진힐라(카오스, 하드) 보스컷 400% 이상만"
      />
    </section>
  );
};

export default DPStoreBox;
