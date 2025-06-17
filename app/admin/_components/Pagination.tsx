"use client";

import { useEffect, useState } from "react";
import { Contact } from "./types";

const Pagination = ({
  curTotalPage,
  allContacts,
  onPageChange,
}: {
  curTotalPage: number;
  allContacts: Contact[];
  onPageChange: (start: number, end: number) => void;
}) => {
  const VIEW_DATA = 3;
  const [curPage, setCurPage] = useState(1);

  const isPrevDisabled = curPage <= 1 || curTotalPage === 0;
  const isNextDisabled = curPage >= curTotalPage || curTotalPage === 0;

  useEffect(() => {
    const startIdx = (curPage - 1) * VIEW_DATA;
    const endIdx = startIdx + VIEW_DATA;
    onPageChange(startIdx, endIdx);
  }, [curPage, allContacts]);

  useEffect(() => {
    if (curPage > curTotalPage && curTotalPage > 0) {
      setCurPage(curTotalPage);
    }
  }, [curTotalPage]);

  return (
    <>
      <button
        className={`${isPrevDisabled ? "text-[#bebebe]" : ""} text-sm`}
        onClick={() => setCurPage((prev) => Math.max(prev - 1, 1))}
        disabled={isPrevDisabled}
      >
        이전
      </button>
      <span>{curPage}</span>
      <button
        className={`${isNextDisabled ? "text-[#bebebe]" : ""} text-sm`}
        onClick={() => setCurPage((prev) => Math.min(prev + 1, curTotalPage))}
        disabled={isNextDisabled}
      >
        다음
      </button>
    </>
  );
};

export default Pagination;
