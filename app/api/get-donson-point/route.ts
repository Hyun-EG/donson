import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  try {
    const db = (await connectDB).db("donson");
    const target = await db.collection("dp").findOne({ userId });
    if (!target) {
      return NextResponse.json(
        {
          message: "돈슨 포인트를 불러오던 중 에러가 발생하였습니다.",
          status: 400,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        dp: target.dp,
        status: 200,
      },
      { status: 200 }
    );
  } catch (_) {
    return NextResponse.json(
      {
        message: "dp를 불러오던 중 에러가 발생하였습니다.",
        status: 500,
      },
      { status: 500 }
    );
  }
}
