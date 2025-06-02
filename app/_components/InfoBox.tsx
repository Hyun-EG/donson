"use client";
import { useEffect } from "react";

const InfoBox = ({ userId }: { userId: string }) => {
  useEffect(() => {
    const getOcid = async () => {
      try {
        const res = await fetch("/api/get-char-ocid", {
          method: "POST",
          body: JSON.stringify({ userId }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.error("OCID 저장 실패", res.status);
        }
      } catch (err) {
        console.error("서버 요청 에러", err);
      }
    };

    getOcid();
  }, [userId]);
  return <div>{userId}</div>;
};

export default InfoBox;
