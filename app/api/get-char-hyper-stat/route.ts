import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { ocid } = await req.json();
  const res = await fetch(
    `https://open.api.nexon.com/maplestory/v1/character/hyper-stat?ocid=${ocid}`,
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
}
