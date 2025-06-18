import React from "react";
import RenBox from "./_components/RenBox";

const Ren = () => {
  return (
    <section>
      <h1 className="text-center font-bold">렌 사냥터|빌드</h1>
      <article className="my-4">
        <p className="text-sm text-red-500 text-center">
          고효율 추천 사냥터 정리
        </p>
      </article>
      <RenBox />
    </section>
  );
};

export default Ren;
