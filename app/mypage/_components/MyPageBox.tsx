"use client";

import LoadingOverlay from "@/app/(components)/LoadingOverlay";
import { validateEditProfileInput } from "@/util/validateEditProfile";
import { validateResetPasswordInput } from "@/util/validateResetPasswordInput";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { OrderedItemsType } from "./types";

const MyPageBox = ({
  charName,
  userId,
  userName,
  userEmail,
  resBoughtItems,
}: {
  charName: string;
  userId: string;
  userName: string;
  userEmail: string;
  resBoughtItems: OrderedItemsType[];
}) => {
  const router = useRouter();

  const [isShowLoading, setIsLoading] = useState(false);

  const [isToggle, setIsToggle] = useState("개인정보변경");

  const [userNameInput, setUserNameInput] = useState(userName);
  const [userEmailInput, setUserEmailInput] = useState(userEmail);
  const [userIdInput, setUserIdInput] = useState(userId);
  const [userCharNameInput, setUserCharNameInput] = useState(charName);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const formatDate = (timestamp: number) => {
    if (!timestamp || isNaN(timestamp)) return "날짜 없음";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "날짜 오류";
    return date.toISOString().slice(0, 10);
  };

  console.log(resBoughtItems.map((i) => i.boughtAt));

  const handleEditProfile = async () => {
    setIsLoading(true);
    try {
      const validationMessage = validateEditProfileInput({
        userName: userNameInput,
        userEmail: userEmailInput,
        charName: userCharNameInput,
      });

      if (validationMessage) {
        alert(validationMessage);
        setIsLoading(false);
        return;
      }
      const res = await fetch("/api/mypage/edit-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userNameInput,
          userEmail: userEmailInput,
          userId: userIdInput,
          charName: userCharNameInput,
        }),
      });
      if (!res.ok) {
        throw new Error("개인정보 변경 중 에러가 발생했습니다.");
      }
      alert("개인정보를 성공적으로 변경하였습니다.");
      setUserNameInput(userNameInput);
      setUserEmailInput(userEmailInput);
      setUserCharNameInput(userCharNameInput);
      router.refresh();
    } catch (error) {
      console.error("개인정보 변경 중 에러가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPassword = async () => {
    try {
      const validationMessage = validateResetPasswordInput({
        userPassword: newPassword,
        confirmUserPassword: confirmNewPassword,
      });

      if (validationMessage) {
        alert(validationMessage);
        return;
      }

      const res = await fetch("api/mypage/edit-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userIdInput, password, newPassword }),
      });

      if (res.ok) {
        alert("비밀번호 변경에 성공하였습니다.");
        router.push("/");
      } else {
        alert("기존 비밀번호를 확인해주세요.");
      }
      return res;
    } catch (error) {
      console.error("비밀번호 변경 중 에러가 발생했습니다.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCompleteItem = async (title: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/delete-bought-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          title,
        }),
      });

      if (!res.ok) {
        alert("상품 삭제에 실패하였습니다.");
        return;
      } else {
        alert("처리완료 상품이 삭제되었습니다.");
      }
      router.refresh();
    } catch (_) {
      alert("상품 삭제 처리중 에러가 발생하였습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      {isShowLoading && <LoadingOverlay />}
      <div className="w-full p-2 border border-[#bebebe] rounded-lg">
        <nav className="mb-4">
          <ul className="w-full flex justify-center gap-4">
            <li
              onClick={() => {
                setIsToggle("개인정보변경");
              }}
              className={`${
                isToggle === "개인정보변경" ? "font-bold" : ""
              } text-sm`}
            >
              개인정보변경
            </li>
            <li
              onClick={() => {
                setIsToggle("비밀번호변경");
              }}
              className={`${
                isToggle === "비밀번호변경" ? "font-bold" : ""
              } text-sm`}
            >
              비밀번호변경
            </li>
          </ul>
        </nav>
        <form className="pb-2 flex flex-col items-center gap-1">
          {isToggle === "개인정보변경" ? (
            <>
              <input
                className="w-[80%] h-8 px-2 text-sm border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                type="text"
                placeholder="성함을 입력해주세요."
                value={userNameInput}
                onChange={(e) => {
                  setUserNameInput(e.target.value);
                }}
              />
              <input
                className="w-[80%] h-8 px-2 text-sm border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                type="text"
                placeholder="이메일을 입력해주세요."
                value={userEmailInput}
                onChange={(e) => {
                  setUserEmailInput(e.target.value);
                }}
              />
              <input
                className="w-[80%] h-8 px-2 text-sm border border-[#bebebe] bg-[#dbdbdb] focus:ring-2 focus:ring-sky-500 focus:outline-none z-[-1]"
                type="text"
                disabled={true}
                value={userIdInput}
              />
              <input
                className="w-[80%] h-8 px-2 text-sm border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                type="text"
                placeholder="캐릭터명을 입력해주세요."
                value={userCharNameInput}
                onChange={(e) => {
                  setUserCharNameInput(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  handleEditProfile();
                }}
                type="button"
                className="w-[80%] h-8 bg-sky-500 text-white"
              >
                변경하기
              </button>
            </>
          ) : (
            <>
              <input
                className="w-[80%] h-8 px-2 text-sm border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                className="w-[80%] h-8 px-2 text-sm border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                type="password"
                placeholder="새로운 비밀번호를 입력해주세요."
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <input
                className="w-[80%] h-8 px-2 text-sm border border-[#bebebe] bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                type="password"
                placeholder="새로운 비밀번호를 한번 더 입력해주세요."
                value={confirmNewPassword}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  handleEditPassword();
                }}
                type="button"
                className="w-[80%] h-8 bg-sky-500 text-white"
              >
                변경하기
              </button>
            </>
          )}
        </form>
      </div>
      <section className="mt-2 flex flex-col gap-1">
        <h1 className="mb-2 font-bold text-center">주문내역</h1>
        <p className="text-xs font-bold">중복거래방지</p>
        <p className="text-xs text-red-500 font-bold">
          *{" "}
          <span className="underline">
            처리완료된 상품 삭제시에만 해당 상품 재 구매가 가능합니다.
          </span>
        </p>
        <p className="text-xs font-bold">
          * 삭제버튼은 처리완료 상품에만 노출됩니다.
        </p>
        {resBoughtItems && resBoughtItems.length > 0 ? (
          resBoughtItems.map((item) => (
            <article
              key={item._id}
              className="px-2 py-1 border border-[#bebebe] rounded-[6px]"
            >
              <p className="text-xs">
                상품명: <span className="font-bold">{item.title}</span>
              </p>
              <p className="text-xs">
                가격: <span className="font-bold">{item.dpPoint}</span>
              </p>
              <p className="text-xs">
                상품내용:{" "}
                <span className="text-xs font-bold">{item.description}</span>
              </p>
              <p className="text-xs">
                구매날짜:{" "}
                <span className="text-xs font-bold">
                  {formatDate(item.boughtAt)}
                </span>
              </p>
              <div className="flex justify-between items-center">
                <p className="text-xs">
                  처리상태:{" "}
                  <span
                    className={`font-bold ${
                      item.done ? "text-sky-500" : "text-red-500"
                    }`}
                  >
                    {item.done ? "처리 완료" : "처리 중"}
                  </span>
                </p>
                {item.done && (
                  <button
                    onClick={() => {
                      handleDeleteCompleteItem(item.title);
                    }}
                    className="px-2 py-1 mr-4 text-xs text-white bg-sky-500 rounded-[6px]"
                  >
                    삭제하기
                  </button>
                )}
              </div>
            </article>
          ))
        ) : (
          <p className="py-4 text-center text-sm font-bold">
            주문 내역이 없습니다.
          </p>
        )}
      </section>
    </section>
  );
};

export default MyPageBox;
