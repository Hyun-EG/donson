import React from "react";
import LoanBox from "./_components/LoanBox";

const LoanPage = () => {
  return (
    <main>
      <h1 className="text-lg font-bold text-center">디피론</h1>
      <ul className="text-sm">
        <li>- DP를 빌려드립니다!</li>
        <li>- 이자는 없습니다!</li>
        <li className="text-xs text-red-500">
          - 상환이 완료되지 않은 경우, DP 스토어에서 상품 주문이 거절될 수
          있습니다
        </li>
      </ul>
      <LoanBox />
    </main>
  );
};

export default LoanPage;
