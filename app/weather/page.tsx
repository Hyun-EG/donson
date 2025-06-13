import React from "react";
import WeatherBox from "./_components/WeatherBox";

const Weather = () => {
  return (
    <section className="flex flex-col gap-3">
      <h1 className="text-center text-lg font-bold">현재 날씨 정보</h1>
      <WeatherBox />
    </section>
  );
};

export default Weather;
