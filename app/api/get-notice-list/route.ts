import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://open.api.nexon.com/maplestory/v1/notice", {
    headers: {
      "x-nxopen-api-key": process.env.NEXON_API_KEY!,
    },
  });
  if (!res.ok) {
    return NextResponse.json(
      { message: "응답값이 존재하지 않습니다.", status: 400 },
      { status: 400 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
