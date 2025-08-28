import { connectDB } from "@/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { value, userId } = await req.json();
  const db = (await connectDB).db("donson");

  try {
    await db
      .collection("baseball-multiplier")
      .updateOne({ userId }, { $set: { multiplier: value } }, { upsert: true });

    return NextResponse.json(
      { message: "야구게임 리워드 배율 변경에 성공하였습니다" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "배율 변경 중 알 수 없는 에러가 발생하였습니다." },
      { status: 500 }
    );
  }
}
