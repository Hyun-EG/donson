import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { noticeId } = await req.json();

  if (!noticeId) {
    return NextResponse.json(
      { message: "noticeId가 없습니다.", status: 400 },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://open.api.nexon.com/maplestory/v1/notice-cashshop/detail?notice_id=${noticeId}`,
      {
        headers: {
          "x-nxopen-api-key": process.env.NEXON_API_KEY!,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "응답값을 받던 중 에러가 발생했습니다.", status: 400 },
        { status: 400 }
      );
    }

    const data = await res.json();
    const html = data.contents;

    const match = html.match(/<img[^>]+src="([^"]+)"/);
    const imageUrl = match ? match[1] : null;

    return NextResponse.json(imageUrl);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "캐시아이템 업데이트 상세정보를 가져오던 중 에러가 발생했습니다.",
        status: 500,
      },
      { status: 500 }
    );
  }
}
