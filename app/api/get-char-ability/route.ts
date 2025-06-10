import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { ocid } = await req.json();
  try {
    if (!ocid) {
      return NextResponse.json(
        { message: "ocid가 없습니다.", status: 400 },
        { status: 400 }
      );
    }
    const res = await fetch(
      `https://open.api.nexon.com/maplestory/v1/character/ability?ocid=${ocid}`,
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
    return NextResponse.json(data);
  } catch (error) {
    console.error("캐릭터 어빌리티 능력치를 얻어오지 못했습니다.", error);
    return NextResponse.json(
      { message: "서버 에러", status: 500 },
      { status: 500 }
    );
  }
}
