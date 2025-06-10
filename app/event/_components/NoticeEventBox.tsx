"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const NoticeEventBox = () => {
  const [notices, setNotices] = useState<NoticeListType | null>(null);
  const [noticesImgUrl, setNoticesImgUrl] = useState(null);
  const [selectedNoticeNo, setSelectedNoticeNo] = useState(0);
  const [isShowDetailNotice, setIsShowDetailNotice] = useState(0);
  useEffect(() => {
    const fetchNoticeList = async () => {
      try {
        const res = await fetch("/api/get-notice-event-list");
        if (!res.ok) {
          throw new Error("응답값이 존재하지 않습니다.");
        }

        const data = await res.json();
        setNotices(data);
      } catch (error) {
        console.error("공지 정보를 불러오지 못했습니다.", error);
      }
    };
    fetchNoticeList();
  }, []);

  useEffect(() => {
    if (selectedNoticeNo === 0) return;
    const fetchNoticeDetail = async () => {
      try {
        const res = await fetch("api/get-notice-event-detail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedNoticeNo }),
        });

        if (!res.ok) {
          throw new Error("응답값이 존재하지 않습니다.");
        }

        const data = await res.json();
        setNoticesImgUrl(data);
      } catch (error) {
        console.error("올바른 이미지 url을 받아오지 못했습니다.", error);
      }
    };
    fetchNoticeDetail();
  }, [selectedNoticeNo]);

  useEffect(() => {
    console.log("notice", notices);
    console.log("noticeDetail", notices?.event_notice);
  }, [notices]);

  return (
    <section>
      {notices?.event_notice?.map((item) => (
        <div className="flex flex-col items-center" key={item.notice_id}>
          <article
            onClick={() => {
              setSelectedNoticeNo(item.notice_id);
              setIsShowDetailNotice((prev) => (prev ? 0 : item.notice_id));
            }}
            className="w-full h-16 flex flex-col justify-center border-b border-black"
          >
            <aside>
              <p>
                <span className="font-bold">{item.title}</span>
              </p>
              <p>
                URL: <span className="text-xs">{item.url}</span>
              </p>
            </aside>
          </article>
          {selectedNoticeNo === item.notice_id &&
            isShowDetailNotice === item.notice_id &&
            noticesImgUrl && (
              <Image
                src={noticesImgUrl}
                alt="이벤트 이미지"
                width={800}
                height={200}
                style={{ objectFit: "cover" }}
              />
            )}
        </div>
      ))}
    </section>
  );
};

export default NoticeEventBox;
