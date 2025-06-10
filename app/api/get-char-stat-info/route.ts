import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { ocid } = await req.json();
  if (!ocid) {
    return NextResponse.json(
      { message: "OCID가 존재하지 않습니다.", status: 400 },
      { status: 400 }
    );
  }
  const res = await fetch(
    `https://open.api.nexon.com/maplestory/v1/character/stat?ocid=${ocid}`,
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXON_API_KEY!,
      },
    }
  );
  if (!res.ok) {
    return NextResponse.json(
      {
        message:
          "캐릭터 식별자 또는 요청 경로가 틀렸거나 존재하지 않는 API-KEY입니다.",
        status: 400,
      },
      { status: 400 }
    );
  }

  const data = await res.json();

  return NextResponse.json(data);
}
