"use client";

import useUserStore from "@/store/useUserStore";
import { useEffect } from "react";

const AuthGuard = () => {
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/user");
      try {
        if (!res.ok) {
          useUserStore.setState({ userId: "", ocid: "" });
          localStorage.removeItem("user-store");
        }
      } catch (error) {
        console.error("로그인 유저 정보 확인 실패", error);
        useUserStore.setState({ userId: "", ocid: "" });
        localStorage.removeItem("user-store");
      }
    };
    checkAuth();
  }, []);
  return null;
};

export default AuthGuard;
