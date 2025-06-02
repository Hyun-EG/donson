import { NextRequest, NextResponse } from "next/server";

const API_KEY = `${process.env.NEXT_PUBLIC_NEXON_API_KEY}`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userName } = body;
  try {
    if (body) {
      const characterName = userName;
      const urlString =
        "https://open.api.nexon.com/heroes/v1/id?character_name=" +
        characterName;
      const res = await fetch(urlString, {
        headers: {
          "x-nxopen-api-key": API_KEY,
        },
      });

      if (!res.ok) {
        console.error("API 응답 실패:", res.status);
        return NextResponse.json(
          { message: "Nexon API 오류" },
          { status: res.status }
        );
      }

      const data = await res.json();
      console.log("불러온 API 값", data);

      return NextResponse.json(data);
    }
  } catch (error) {
    console.error("서버 에러입니다.", error);
    return NextResponse.json({ message: "서버 내부 오류" }, { status: 500 });
  }
}
