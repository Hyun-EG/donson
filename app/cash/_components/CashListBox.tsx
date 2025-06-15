"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LoadingSpinner from "@/app/(components)/LoadingSpinner";
import { CashList } from "./types";

const CashListBox = ({ cashList }: { cashList: CashList }) => {
  const [cashImgUrl, setCashImgUrl] = useState<string | null>(null);
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);
  const [isShowDetail, setIsShowDetail] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedNoticeId) return;

    const fetchCashDetail = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/get-cash-update-detail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ noticeId: selectedNoticeId }),
        });

        if (!res.ok) throw new Error("상세 이미지 응답 없음");

        const data = await res.json();
        setCashImgUrl(data);
      } catch (err) {
        console.error("캐시 상세 이미지 불러오기 실패", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCashDetail();
  }, [selectedNoticeId]);

  useEffect(() => {
    console.log("목록", cashList);
  }, [cashList]);

  return (
    <section>
      {cashList.cashshop_notice.map((item) => (
        <div className="flex flex-col items-center" key={item.notice_id}>
          <article
            onClick={() => {
              setCashImgUrl(null);
              const isSame = selectedNoticeId === item.notice_id;
              setSelectedNoticeId(isSame ? null : item.notice_id);
              setIsShowDetail(isSame ? null : item.notice_id);
            }}
            className="w-full h-16 flex flex-col justify-center border-b border-black cursor-pointer"
          >
            <aside>
              <p>
                <span className="text-xs font-bold">{item.title}</span>
              </p>
              <p className="text-xs">
                <span>{item?.date?.split("T")[0]}</span>
              </p>
            </aside>
          </article>

          {selectedNoticeId === item.notice_id &&
            isShowDetail === item.notice_id && (
              <div className="w-full flex justify-center items-center">
                {isLoading ? (
                  <LoadingSpinner />
                ) : cashImgUrl ? (
                  <Image
                    src={cashImgUrl}
                    alt="캐시 업데이트 이미지"
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

export default CashListBox;
