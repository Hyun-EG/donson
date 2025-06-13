import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { lat, lon } = await req.json();

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric&lang=kr`
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "날씨 응답값이 존재하지 않습니다.", status: 400 },
        { status: 400 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("서버 에러입니다.", error);
    return NextResponse.json(
      { message: "서버 에러입니다.", status: 500 },
      { status: 500 }
    );
  }
}
