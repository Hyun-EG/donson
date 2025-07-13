import { connectDB } from "@/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, dp, title } = await req.json();

  const db = (await connectDB).db("donson");
  const target = await db.collection("dp").findOne({ userId });
  const targetItemList = await db
    .collection("ordered-items")
    .findOne({ userId, title });

  if (!target) {
    return NextResponse.json(
      { message: "구매 권한이 없습니다.", status: 400 },
      { status: 400 }
    );
  }

  if (targetItemList?.title === title) {
    return NextResponse.json(
      { message: "이미 구매한 상품입니다.", status: 409 },
      { status: 409 }
    );
  }

  if (target.dp >= dp) {
    const resultDp = target.dp - dp;
    await db.collection("dp").updateOne(
      { userId },
      {
        $set: {
          dp: resultDp,
        },
      }
    );
    return NextResponse.json(
      { message: "구매가 완료되었습니다.", status: 200 },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "포인트가 부족합니다.", status: 409 },
      { status: 409 }
    );
  }
}
