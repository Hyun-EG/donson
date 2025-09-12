"use client";

import React, { useState } from "react";
import ItemCard from "./ItemCard";
import Nav from "./Nav";

/*
일주일 35p
한달 140p

메포패스 한달기준 84000p

하위
검밑솔
*/

const DPStoreBox = () => {
  const [isShowItems, setIsShowItems] = useState("일간");
  return (
    <section className="flex flex-col gap-1">
      <nav>
        <Nav setIsShowItems={setIsShowItems} />
      </nav>
      {isShowItems === "일간" && (
        <>
          <ItemCard
            title="출석체크 (딸칵형)"
            condition="계정당 캐릭 하나"
            dpPoint={7}
            meso={4000}
            description="딸칵형 출첵 (조건없이 출석이 가능한 이벤트)"
          />
          <ItemCard
            title="출석체크 (마릿수) + 데일리 출석체크"
            condition="계정당 캐릭 하나"
            dpPoint={10}
            meso={7000}
            description="마릿수 출첵 (조건이 존재하는 이벤트)"
          />
          <ItemCard
            title="일일퀘스트 (아케인)"
            condition="전체"
            dpPoint={15}
            meso={10000}
            description="일일퀘스트 (아케인)"
          />
          <ItemCard
            title="일일퀘스트 (어센틱)"
            condition="전체"
            dpPoint={20}
            meso={10000}
            description="일일퀘스트 (어센틱)"
          />
          <ItemCard
            title="몬스터파크 (요일/1회)"
            condition="전체"
            dpPoint={10}
            meso={7000}
            description="요일 당 1회만 진행됩니다."
          />
        </>
      )}
      {isShowItems === "주간" && (
        <>
          <ItemCard
            title="몬스터파크 (익몬)"
            condition="칼리 렌"
            dpPoint={50}
            meso={20000}
            description="익스트림 몬스터파크"
          />
          <ItemCard
            title="에픽던전"
            condition="칼리 렌"
            dpPoint={100}
            meso={40000}
            description="상위 에픽던전으로 진행됩니다."
          />
          <ItemCard
            title="유니온 퀘스트 + 적립"
            condition="전체"
            dpPoint={10}
            meso={7000}
            description="유니온 퀘스트 + 적립"
          />
        </>
      )}
      {isShowItems === "패키지" && (
        <>
          <ItemCard
            title="패키지 A"
            condition="전체"
            dpPoint={30}
            meso={13000}
            description="딸칵/마릿수 출첵 + 일퀘(어센틱) + 디데이 출첵"
          />
          <ItemCard
            title="패키지 B"
            condition="전체"
            dpPoint={40}
            meso={19000}
            description="딸칵/마릿수 출첵 + 일퀘(아케인) + 일퀘(어센틱) + 디데이 출첵"
          />
          <ItemCard
            title="마일리지 패키지"
            condition="전체"
            dpPoint={10}
            meso={5000}
            description="몬스터 컬렉션 + (선택)모바일M + 마일리지 적립"
          />
          <ItemCard
            title="하위보스 (전체) + 마일리지 적립"
            condition="칼리 렌"
            dpPoint={50}
            meso={20000}
            description="자쿰~핑크빈(하드,카오스) + 마일리지 적립"
          />
          <ItemCard
            title="검밑솔 보스 (전체) + 마일리지 적립"
            condition="칼리 렌"
            dpPoint={200}
            meso={90000}
            description="[ 렌, 칼리 ] 검밑솔 보스컷 400% 이상만 + 마일리지 적립"
          />
          <ItemCard
            title="세렌"
            condition="칼리 렌"
            dpPoint={250}
            meso={120000}
            description="[ 렌, 칼리 ] 세렌 250% 이상만"
          />
        </>
      )}
    </section>
  );
};

export default DPStoreBox;
