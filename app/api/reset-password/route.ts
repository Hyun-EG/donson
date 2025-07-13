import { connectDB } from "@/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { userEmail, resetPassword } = await req.json();

    if (!userEmail || !resetPassword) {
      return NextResponse.json(
        { message: "이메일과 새로운 비밀번호가 필요합니다." },
        { status: 400 }
      );
    }

    const db = (await connectDB).db("donson");

    const hashedPassword = await bcrypt.hash(resetPassword, 10);

    const result = await db.collection("user").updateOne(
      { userEmail },
      {
        $set: {
          hashedPW: hashedPassword,
          updatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "해당 유저를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "비밀번호가 성공적으로 변경되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("비밀번호 재설정 오류:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
