import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { ocid } = await req.json();
  try {
    const res = await fetch(
      `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`,
      {
        headers: {
          "x-nxopen-api-key": process.env.NEXON_API_KEY!,
        },
      }
    );
    if (!res.ok) {
      return NextResponse.json(
        { message: "잘못된 OCID 값 입니다.", status: 400 },
        { status: 400 }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("캐릭터 정보를 가져오던중 오류가 발생했습니다", error);
    return NextResponse.json(
      { message: "캐릭터 정보를 가져오던중 오류가 발생했습니다.", status: 500 },
      { status: 500 }
    );
  }
}
