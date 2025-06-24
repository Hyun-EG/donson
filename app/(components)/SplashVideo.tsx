"use client";

import { useEffect, useState } from "react";

const VideoSplashComponent = () => {
  return (
    <section className="w-full min-h-screen bg-ren-video bg-cover bg-center" />
  );
};

const SplashVideo = () => {
  const [isShowSplash, setIsShowSplash] = useState(false);

  useEffect(() => {
    const isPWA =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isPWA) {
      setIsShowSplash(true);
      setTimeout(() => {
        setIsShowSplash(false);
      }, 2000);
    }
  }, []);

  return isShowSplash ? <VideoSplashComponent /> : null;
};

export default SplashVideo;
