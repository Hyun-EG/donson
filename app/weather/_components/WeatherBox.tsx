"use client";

import React, { useEffect, useState } from "react";
import { WeatherType } from "./types";

const weatherTranslator: Record<string, string> = {
  Clear: "맑음",
  Clouds: "흐림",
  Rain: "비",
  Drizzle: "이슬비",
  Thunderstorm: "천둥번개",
  Snow: "눈",
  Mist: "습기 많은 흐림",
  Smoke: "연기",
  Haze: "미세먼지",
  Dust: "먼지",
  Fog: "안개",
  Sand: "모래바람",
  Ash: "화산재",
  Squall: "돌풍",
  Tornado: "토네이도",
};

const WeatherBox = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [weather, setWeather] = useState<WeatherType | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        console.error("위치 정보를 가져올 수 없습니다:", err.message);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, []);

  useEffect(() => {
    if (!coords) return;

    const getWeather = async () => {
      const res = await fetch("/api/get-weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat: coords.lat, lon: coords.lon }),
      });

      if (res.ok) {
        const data = await res.json();
        setWeather(data);
      } else {
        console.error("날씨 정보를 받아오지 못함");
      }
    };

    getWeather();
  }, [coords]);

  return (
    <section>
      {weather ? (
        <main>
          <p className="">
            <span>현위치: </span>
            <span className="text-3xl font-bold">{weather.name}</span>
          </p>
          <article className="w-full h-64 p-4 mt-4 flex flex-col justify-center items-center border border-[#bebebe] rounded-xl text-xl shadow-lg">
            <div className="flex flex-col items-start">
              <p>
                온도: <span className="font-bold">{weather.main.temp}°C</span>
              </p>
              <p>
                날씨:
                <span className="font-bold">
                  {" "}
                  {weatherTranslator[weather.weather[0].main] ||
                    weather.weather[0].description}
                </span>
              </p>
              <p>
                습도:{" "}
                <span className="font-bold">{weather.main.humidity}%</span>
              </p>
              <p>
                비오냐?:{" "}
                <span className="font-bold">
                  {["Rain", "Drizzle"].includes(weather.weather[0].main)
                    ? "비 오는 중"
                    : "비 안 옴"}
                </span>
              </p>
            </div>
          </article>
        </main>
      ) : (
        <p>날씨 정보를 불러오는 중...</p>
      )}
    </section>
  );
};

export default WeatherBox;
