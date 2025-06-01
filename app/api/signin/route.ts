import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signJWT } from "@/util/jwt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, password } = body;

  const db = (await connectDB).db("donson");

  if (!id || !password) {
    return NextResponse.json(
      { message: "모든 필드를 입력해주세요", status: 400 },
      { status: 400 }
    );
  }

  const user = await db.collection("user").findOne({
    $or: [{ id }],
  });
  if (!user) {
    return NextResponse.json(
      { message: "유저 정보가 존재하지 않습니다", status: 400 },
      { status: 400 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.hashedPW);

  try {
    if (!isMatch) {
      return NextResponse.json(
        { message: "비밀번호가 일치하지 않습니다", status: 400 },
        { status: 400 }
      );
    }
    const token = signJWT({ id });
    const res = NextResponse.json(
      { message: "로그인에 성공하였습니다.", status: 200 },
      { status: 200 }
    );
    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
      secure: false,
    });

    return res;
  } catch (error) {
    console.error("서버 에러입니다.", error);
    return NextResponse.json(
      { message: "서버 오류", status: 500 },
      { status: 500 }
    );
  }
}
