import React from "react";
import ItemCard from "./ItemCard";

/*
일주일 35p
한달 140p

메포패스 한달기준 84000p

하위
검밑솔
*/

const DPStoreBox = () => {
  return (
    <section className="flex flex-col gap-1">
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
        title="몬스터파크 (익몬)"
        condition="칼리 렌"
        dpPoint={20}
        meso={8000}
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
        title="마일리지 패키지"
        condition="전체"
        dpPoint={7}
        meso={4000}
        description="몬스터 컬렉션 + (선택)모바일M + 마일리지 적립"
      />
      <ItemCard
        title="유니온 퀘스트 + 적립"
        condition="전체"
        dpPoint={5}
        meso={3500}
        description="유니온 퀘스트 + 적립"
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
        dpPoint={15}
        meso={10000}
        description="일일퀘스트 (어센틱)"
      />
      <ItemCard
        title="패키지 A"
        condition="전체"
        dpPoint={20}
        meso={13000}
        description="딸칵/마릿수 출첵 + 일퀘(어센틱) + 디데이 출첵"
      />
      <ItemCard
        title="패키지 B"
        condition="전체"
        dpPoint={25}
        meso={16000}
        description="딸칵/마릿수 출첵 + 일퀘(아케인) + 일퀘(어센틱) + 디데이 출첵"
      />
      <ItemCard
        title="하위보스 (전체) + 마일리지 적립"
        condition="칼리 렌"
        dpPoint={30}
        meso={18000}
        description="자쿰~핑크빈(하드,카오스) + 마일리지 적립"
      />
      <ItemCard
        title="검밑솔 보스 (전체) + 마일리지 적립"
        condition="칼리 렌"
        dpPoint={150}
        meso={70000}
        description="[ 렌, 칼리 ] 검밑솔 보스컷 400% 이상만 + 마일리지 적립"
      />
    </section>
  );
};

export default DPStoreBox;
