"use client";

import LoadingOverlay from "@/app/(components)/LoadingOverlay";
import { useState } from "react";
import { SearchUserType } from "./types";

const SearchCustomer = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<SearchUserType | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/search-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchValue,
        }),
      });

      const result = await res.json();
      setUserData(result);

      if (!res.ok) {
        alert(result.message);
        return;
      }
    } catch (_) {
      alert("유저 검색중 에러가 발생하였습니다.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="w-full mt-2 flex flex-col items-center">
      {isLoading && <LoadingOverlay />}
      <h1 className="text-center font-bold">고객검색</h1>
      <header className="w-full my-2">
        <input
          value={searchValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="유저의 아이디를 검색해주세요."
          className="w-[90%] h-10 pl-2 outline-none bg-white border"
          type="text"
        />
        <button
          onClick={handleSearch}
          className="w-[10%] h-10 bg-sky-500 text-white text-sm"
        >
          찾기
        </button>
      </header>
      <main className="w-full border-t">
        {userData ? (
          <article className="px-2 py-1 text-sm">
            <p>
              이름 :{" "}
              <span className="font-bold">
                {userData?.userName ?? "불러오지 못했습니다."}
              </span>{" "}
            </p>
            <p>
              아이디 :{" "}
              <span className="font-bold">
                {userData?.userId ?? "불러오지 못했습니다."}
              </span>
            </p>
            <p>
              이메일 :{" "}
              <span className="font-bold">
                {userData?.userEmail ?? "불러오지 못했습니다."}
              </span>
            </p>
            <p>
              캐릭터명 :{" "}
              <span className="font-bold">
                {userData?.userCharName ?? "불러오지 못했습니다."}
              </span>
            </p>
            <p>
              보유DP :{" "}
              <span className="font-bold">
                {userData?.dp ?? "불러오지 못했습니다."}
              </span>
            </p>
          </article>
        ) : (
          <p className="mt-10 text-center">불러온 정보 없음</p>
        )}
      </main>
    </section>
  );
};

export default SearchCustomer;
