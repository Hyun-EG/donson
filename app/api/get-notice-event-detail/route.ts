import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { selectedNoticeNo } = await req.json();
  if (!selectedNoticeNo) {
    return NextResponse.json(
      { message: "이벤트 ID를 받아오지 못했습니다.", status: 400 },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://open.api.nexon.com/maplestory/v1/notice-event/detail?notice_id=${selectedNoticeNo}`,
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXON_API_KEY!,
      },
    }
  );
  if (!res.ok) {
    return NextResponse.json(
      { message: "응답값이 존재하지 않습니다.", status: 400 },
      { status: 400 }
    );
  }
  const data = await res.json();
  const img = data.contents;
  const match = img.match(/<img[^>]+src="([^"]+)"/);
  const imageUrl = match ? match[1] : null;
  return NextResponse.json(imageUrl);
}
