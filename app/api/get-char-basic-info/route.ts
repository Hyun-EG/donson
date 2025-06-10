import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { ocid } = await req.json();

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
      { error: "캐릭터 정보를 불러올 수 없음" },
      { status: 500 }
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}
