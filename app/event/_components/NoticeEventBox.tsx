"use client";
import LoadingSpinner from "@/app/(components)/LoadingSpinner";
import Image from "next/image";
import { useEffect, useState } from "react";

const NoticeEventBox = ({ eventList }: { eventList: NoticeListType }) => {
  const [noticesImgUrl, setNoticesImgUrl] = useState(null);
  const [selectedNoticeNo, setSelectedNoticeNo] = useState(0);
  const [isShowDetailNotice, setIsShowDetailNotice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedNoticeNo === 0) return;
    const fetchNoticeDetail = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchNoticeDetail();
  }, [selectedNoticeNo]);

  return (
    <section>
      {eventList?.event_notice?.map((item) => (
        <div className="flex flex-col items-center" key={item.notice_id}>
          <article
            onClick={() => {
              setNoticesImgUrl(null);
              setSelectedNoticeNo((prev) => (prev ? 0 : item.notice_id));
              setIsShowDetailNotice((prev) => (prev ? 0 : item.notice_id));
            }}
            className="w-full h-16 flex flex-col justify-center border-b border-black"
          >
            <aside>
              <p>
                <span className="text-sm font-bold">{item.title}</span>
              </p>
              <p className="text-xs">
                기간: <span>{item.date_event_start.split("T")[0]}</span> -{" "}
                <span>{item.date_event_end.split("T")[0]}</span>
              </p>
            </aside>
          </article>
          {selectedNoticeNo === item.notice_id &&
            isShowDetailNotice === item.notice_id && (
              <div>
                {isLoading ? (
                  <LoadingSpinner />
                ) : noticesImgUrl ? (
                  <Image
                    src={noticesImgUrl}
                    alt="이벤트 이미지"
                    width={800}
                    height={200}
                    style={{ objectFit: "cover" }}
                  />
                ) : null}
              </div>
            )}
        </div>
      ))}
    </section>
  );
};

export default NoticeEventBox;
