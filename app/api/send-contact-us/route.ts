import { connectDB } from "@/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, category, content } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { message: "접근 권한이 없습니다.", status: 401 },
      { status: 401 }
    );
  }

  if (!content) {
    return NextResponse.json(
      { message: "문의 내역을 입력해주세요.", status: 400 },
      { status: 400 }
    );
  }

  try {
    const db = (await connectDB).db("donson");
    await db.collection("contact").insertOne({
      userId: userId,
      category: category,
      content: content,
    });
    return NextResponse.json(
      { message: "문의내역 전송을 완료했습니다.", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "문의내역 전송 중 에러가 발생했습니다.", status: 500 },
      { status: 500 }
    );
  }
}
