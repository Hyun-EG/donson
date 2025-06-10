import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://open.api.nexon.com/maplestory/v1/notice-event",
      {
        headers: {
          "x-nxopen-api-key": process.env.NEXON_API_KEY!,
        },
      }
    );
    if (!res.ok) {
      NextResponse.json(
        { message: "응답값이 존재하지 않습니다", status: 400 },
        { status: 400 }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("서버 에러입니다.", error);
    return NextResponse.json(
      { message: "서버에러입니다.", status: 500 },
      { status: 500 }
    );
  }
}
