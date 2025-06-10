"use client";

import { useEffect, useState } from "react";
import { NoticeListType } from "./types";
import Link from "next/link";

const NoticeBox = () => {
  const [noticeList, setNoticeList] = useState<NoticeListType | null>(null);

  useEffect(() => {
    const fetchNoticeList = async () => {
      const res = await fetch("api/get-notice-list");
      if (!res.ok) return;
      const data = await res.json();
      setNoticeList(data);
    };
    fetchNoticeList();
  }, []);

  useEffect(() => {
    console.log("공지사항 목록", noticeList);
  }, [noticeList]);
  return (
    <section>
      {noticeList?.notice?.map((item) => (
        <article
          key={item.notice_id}
          className="w-full py-2 flex flex-col border-b border-black"
        >
          <p className="font-bold">{item.title}</p>
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
    </section>
  );
};

export default NoticeBox;
