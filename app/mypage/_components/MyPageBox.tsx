"use client";

import LoadingOverlay from "@/app/(components)/LoadingOverlay";
import { validateEditProfileInput } from "@/util/validateEditProfile";
import { validateResetPasswordInput } from "@/util/validateResetPasswordInput";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyPageBox = () => {
  const router = useRouter();

  const [isShowLoading, setIsLoading] = useState(false);

  const [isToggle, setIsToggle] = useState("개인정보변경");

  const [userNameInput, setUserNameInput] = useState("");
  const [userEmailInput, setUserEmailInput] = useState("");
  const [userIdInput, setUserIdInput] = useState("");
  const [userCharNameInput, setUserCharNameInput] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/auth/user");
        const data = await res.json();
        console.log("data", data);

        const userName = data.user.userName;
        const userId = data.user.userId;
        const userEmail = data.user.userEmail;
        const charName = data.user.charName;

        setUserNameInput(userName);
        setUserIdInput(userId);
        setUserEmailInput(userEmail);
        setUserCharNameInput(charName);
      } catch (error) {
        console.error("유저 정보를 불러오던 중 에러가 발생했습니다.", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

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

  return (
    <div className="w-full p-2 border border-[#bebebe] rounded-lg">
      {isShowLoading && <LoadingOverlay />}
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
  );
};

export default MyPageBox;
