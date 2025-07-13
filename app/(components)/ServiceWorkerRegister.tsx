"use client";

import { useEffect } from "react";

const ServiceWorkerRegister = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Service Worker 등록 완료"))
        .catch((err) => console.error("Service Worker 등록 실패", err));
    }
  }, []);

  return null;
};

export default ServiceWorkerRegister;
