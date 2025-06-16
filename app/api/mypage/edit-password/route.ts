import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { userId, password, newPassword } = await req.json();
  const SALT_ROUNDS = 10;
  const newHashedPW = await bcrypt.hash(newPassword, SALT_ROUNDS);
  try {
    const db = (await connectDB).db("donson");
    const target = await db.collection("user").findOne({ userId });

    if (!target) {
      return NextResponse.json(
        { message: "존재하지 않는 사용자입니다.", status: 404 },
        { status: 404 }
      );
    }

    const originPW = target?.hashedPW;
    const isMatch = await bcrypt.compare(password, originPW);

    if (!isMatch) {
      return NextResponse.json(
        { message: "기존 비밀번호가 일치하지 않습니다.", status: 400 },
        { status: 400 }
      );
    }

    await db.collection("user").updateOne(
      { userId },
      {
        $set: {
          hashedPW: newHashedPW,
          updateAt: new Date(),
        },
      }
    );
    return NextResponse.json(
      { message: "비밀번호 변경에 성공하였습니다.", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "비밀번호 변경 중 에러가 발생했습니다.", status: 500 },
      { status: 500 }
    );
  }
}
