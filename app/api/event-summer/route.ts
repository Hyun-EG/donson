import { connectDB } from "@/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  const db = (await connectDB).db("donson");
  const target = await db.collection("summer-event").findOne({ userId });

  try {
    if (!target) {
      await db.collection("summer-event").insertOne({ userId, done: true });
      await db.collection("dp").updateOne(
        { userId },
        {
          $inc: {
            dp: 10,
          },
        }
      );
      return NextResponse.json(
        { message: "리워드 지급이 완료됐습니다.", status: 200 },
        { status: 200 }
      );
    }

    if (target?.done === true) {
      return NextResponse.json(
        { message: "해당 이벤트는 계정당 한번만 가능합니다.", status: 409 },
        { status: 409 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "리워드 지급 중 에러가 발생했습니다.", status: 500 },
      { status: 500 }
    );
  }
}
