import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  try {
    const res = await fetch(
      `https://open.api.nexon.com/maplestory/v1/id?character_name=${name}`,
      {
        headers: {
          "x-nxopen-api-key": process.env.NEXON_API_KEY!,
        },
      }
    );
    if (!res.ok) {
      return NextResponse.json(
        { message: "존재하지 않는 캐릭터입니다.", status: 400 },
        { status: 400 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("캐릭터의 OCID를 받아오던 중 오류가 발생했습니다", error);
    return NextResponse.json(
      { message: "데이터를 받아오던 중 오류가 발생했습니다.", status: 500 },
      { status: 500 }
    );
  }
}
