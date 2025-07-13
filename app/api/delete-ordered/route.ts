import { connectDB } from "@/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, title } = await req.json();

  try {
    const db = (await connectDB).db("donson");
    await db.collection("bought-items").updateOne(
      { userId, title },
      {
        $set: { done: true },
      }
    );
    await db.collection("ordered-items").deleteOne({ userId, title });
    return NextResponse.json(
      { message: "해당 아이템을 완료하여 삭제합니다.", status: 200 },
      { status: 200 }
    );
  } catch (_) {
    return NextResponse.json(
      { message: "아이템 삭제에 실패하였습니다.", status: 500 },
      { status: 500 }
    );
  }
}
