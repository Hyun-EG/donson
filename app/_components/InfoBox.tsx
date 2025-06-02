"use client";
import { useEffect, useState } from "react";

const InfoBox = ({ userId }: { userId: string }) => {
  const [ocid, setOcid] = useState("");
  useEffect(() => {
    const getOcid = async () => {
      try {
        const res = await fetch("/api/add-char-ocid", {
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

  useEffect(() => {
    const getCharInfo = async () => {
      const res = await fetch("/api/get-char-ocid", {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setOcid(data.ocid);
    };
    getCharInfo();
  });
  return (
    <div>
      <div>{userId}</div>
      <div>{ocid}</div>
    </div>
  );
};

export default InfoBox;
