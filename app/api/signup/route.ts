import bcrypt from "bcrypt";
import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const name = data.get("userName")?.toString() ?? null;
  const email = data.get("userEmail")?.toString() ?? null;
  const id = data.get("userId")?.toString() ?? null;
  const password = data.get("userPassword")?.toString() ?? null;
  const confirmPassword = data.get("confirmUserPassword")?.toString() ?? null;

  if (!name || !email || !id || !password || !confirmPassword) {
    return NextResponse.json(
      { message: "모든 필드를 입력해주세요.", status: 400 },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "비밀번호가 일치하지 않습니다.", status: 400 },
      { status: 400 }
    );
  }

  const SALT_ROUNDS = 10;
  const hashedPW = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    const db = (await connectDB).db("donson");
    const existingUser = await db.collection("user").findOne({
      $or: [{ id }, { email }, { name }],
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "이미 존재하는 사용자 정보입니다.", status: 409 },
        { status: 409 }
      );
    }

    await db
      .collection("user")
      .insertOne({ name, email, id, hashedPW, createAt: new Date() });

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
