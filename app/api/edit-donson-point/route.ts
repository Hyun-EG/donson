import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let { userId, dp } = await req.json();

  try {
    const db = (await connectDB).db("donson");
    const target = await db.collection("dp").findOne({ userId });

    if (!target) {
      await db.collection("dp").insertOne({ userId, dp });
      return NextResponse.json(
        { message: "포인트가 지급되었습니다.", status: 200 },
        { status: 200 }
      );
    }

    await db.collection("dp").updateOne(
      { userId },
      {
        $inc: {
          dp: dp,
        },
      }
    );
    return NextResponse.json(
      { message: "포인트가 지급되었습니다.", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "포인트 지급중 에러가 발생하였습니다.", status: 500 },
      { status: 500 }
    );
  }
}
