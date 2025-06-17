import { connectDB } from "@/util/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id }: { id: string } = await req.json();
  try {
    const db = (await connectDB).db("donson");
    if (!db) {
      return NextResponse.json(
        { message: "존재하지 않는 DB입니다.", status: 400 },
        { status: 400 }
      );
    }
    const removeTarget = await db
      .collection("contact")
      .deleteOne({ _id: new ObjectId(id) });
    if (!removeTarget) {
      return NextResponse.json(
        { message: "존재하지 않는 문의내역입니다..", status: 400 },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "문의내역 삭제가 완료됐습니다.", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("문의내역 제거 중 에러가 발생했습니다.", error);
    return NextResponse.json(
      { message: "문의내역 제거 중 에러가 발생했습니다.", status: 500 },
      { status: 500 }
    );
  }
}
