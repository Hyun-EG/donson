import bcrypt from "bcrypt";
import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    userName,
    userEmail,
    userId,
    charName,
    userPassword,
    confirmUserPassword,
  } = body;

  if (
    !userName ||
    !userEmail ||
    !userId ||
    !charName ||
    !userPassword ||
    !confirmUserPassword
  ) {
    return NextResponse.json(
      { message: "모든 필드를 입력해주세요.", status: 400 },
      { status: 400 }
    );
  }

  if (userPassword !== confirmUserPassword) {
    return NextResponse.json(
      { message: "비밀번호가 일치하지 않습니다.", status: 400 },
      { status: 400 }
    );
  }

  const SALT_ROUNDS = 10;
  const hashedPW = await bcrypt.hash(userPassword, SALT_ROUNDS);

  try {
    const db = (await connectDB).db("donson");
    const existingUser = await db.collection("user").findOne({
      $or: [{ userId }, { userEmail }, { userName }, { charName }],
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "이미 존재하는 사용자 정보입니다.", status: 409 },
        { status: 409 }
      );
    }

    await db.collection("user").insertOne({
      userName,
      userEmail,
      userId,
      charName,
      hashedPW,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "회원가입 성공", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("서버 에러입니다.", error);
    return NextResponse.json(
      { message: "서버 오류", status: 500 },
      { status: 500 }
    );
  }
}
