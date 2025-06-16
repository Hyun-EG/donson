import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userName, userEmail, userId, charName } = await req.json();

  if (!userName || !userEmail || !userId || !charName) {
    return NextResponse.json(
      { message: "모든 필드를 채워주세요.", status: 400 },
      { status: 400 }
    );
  }
  try {
    const db = (await connectDB).db("donson");

    const updateProfile = await db.collection("user").updateOne(
      { userId },
      {
        $set: {
          userName,
          userEmail,
          charName,
          updatedAt: new Date(),
        },
      }
    );

    if (updateProfile.matchedCount === 0) {
      return NextResponse.json(
        { message: "일치하는 아이디가 없습니다.", status: 400 },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "정보가 성공적으로 변경되었습니다.", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "개인정보 변경 진행 중 에러가 발생했습니다.", status: 500 },
      { status: 500 }
    );
  }
}
