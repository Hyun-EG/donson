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

  useEffect(() => {
    const startIdx = (curPage - 1) * VIEW_DATA;
    const endIdx = startIdx + VIEW_DATA;
    onPageChange(startIdx, endIdx);
  }, [curPage, allContacts]);

  return (
    <>
      <button
        className={`${curPage === 1 ? "text-[#bebebe]" : ""} text-sm`}
        onClick={() => setCurPage((prev) => Math.max(prev - 1, 1))}
        disabled={curPage === 1}
      >
        이전
      </button>
      <span>{curPage}</span>
      <button
        className={`${
          curPage === curTotalPage ? "text-[#bebebe]" : ""
        } text-sm`}
        onClick={() => setCurPage((prev) => Math.min(prev + 1, curTotalPage))}
        disabled={curPage === curTotalPage}
      >
        다음
      </button>
    </>
  );
};

export default Pagination;
