"use client";

import { useEffect, useState } from "react";
import { NoticeListType } from "./types";
import Link from "next/link";
import LoadingSpinner from "@/app/(components)/LoadingSpinner";

const NoticeBox = () => {
  const [noticeList, setNoticeList] = useState<NoticeListType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNoticeList = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("api/get-notice-list");
        if (!res.ok) return;
        const data = await res.json();
        setNoticeList(data);
      } catch (error) {
        console.error("공지사항 리스트를 불러오지 못했습니다.", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNoticeList();
  }, []);

  return (
    <section>
      {isLoading ? (
        <div className="w-full py-[10%] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {noticeList?.notice?.map((item) => (
            <article
              key={item.notice_id}
              className="w-full py-2 flex flex-col border-b border-black"
            >
              <p className="text-sm font-bold">{item.title}</p>
              <p className="text-sm">ID : {item.notice_id}</p>
              <p className="text-sm">{item.date.split("T")[0]}</p>
              <p className="text-xs">{item.url}</p>
              <Link
                href={item.url}
                className="mt-1 p-1 border border-[#bebebe] rounded-xl text-center font-bold"
              >
                사이트 이동
              </Link>
            </article>
          ))}
        </>
      )}
    </section>
  );
};

export default NoticeBox;
