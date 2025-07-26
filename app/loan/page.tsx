import React from "react";
import LoanBox from "./_components/LoanBox";

const LoanPage = () => {
  return (
    <main>
      <h1 className="text-lg font-bold text-center">디피론</h1>
      <ul className="text-sm">
        <li>- DP를 대출해드립니다</li>
        <li>- 이자는 없습니다</li>
      </ul>
      <LoanBox />
    </main>
  );
};

export default LoanPage;
