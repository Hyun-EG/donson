import { connectDB } from "@/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, title } = await req.json();

  try {
    const db = (await connectDB).db("donson");
    await db.collection("bought-items").deleteOne({ userId, title });
    return NextResponse.json(
      { message: "처리된 상품 삭제를 완료했습니다.", status: 200 },
      { status: 200 }
    );
  } catch (_) {
    return NextResponse.json(
      { message: "삭제 처리중 에러가 발생하였습니다", status: 500 },
      { status: 500 }
    );
  }
}
