import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { price } = await req.json();

  try {
    const db = (await connectDB).db("donson");
    const result = await db
      .collection("maple-point")
      .insertOne({ price: price, updateAt: new Date() });
    if (!result) {
      return NextResponse.json(
        {
          message: "메이플포인트 가격 등록에 실패하였습니다.",
          status: 400,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "메이플포인트 가격 등록을 완료했습니다.", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "메이플포인트 가격을 올리던 중 에러가 발생했습니다",
    });
  }
}
