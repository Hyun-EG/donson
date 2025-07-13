"use client";

import { useEffect, useState } from "react";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      setIsChecked(true);
      return;
    }
    const checkAuth = async () => {
      try {
        if (!userId) return;

        const res = await fetch("/api/check-refresh-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
          credentials: "include",
        });

        if (!res.ok) {
          sessionStorage.removeItem("userId");
        }
      } catch (error) {
        console.error("토큰 갱신 실패", error);
      } finally {
        setIsChecked(true);
      }
    };

    checkAuth();

    const refreshAccessToken = setInterval(() => {
      checkAuth();
    }, 1000 * 60 * 30);

    return () => clearInterval(refreshAccessToken);
  }, []);

  if (!isChecked) return null;

  return <>{children}</>;
};

export default AuthWrapper;
