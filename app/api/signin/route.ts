import { connectDB } from "@/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { accessToken, refreshToken } from "@/util/jwt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, userPassword } = body;

  const db = (await connectDB).db("donson");

  if (!userId || !userPassword) {
    return NextResponse.json(
      { message: "모든 필드를 입력해주세요", status: 400 },
      { status: 400 }
    );
  }

  const user = await db.collection("user").findOne({
    $or: [{ userId }],
  });
  if (!user) {
    return NextResponse.json(
      { message: "유저 정보가 존재하지 않습니다", status: 400 },
      { status: 400 }
    );
  }

  const userName = user.userName;
  const charName = user.charName;
  const userEmail = user.userEmail;
  const ocid = user.ocid;
  const isMatch = await bcrypt.compare(userPassword, user.hashedPW);

  try {
    if (!isMatch) {
      return NextResponse.json(
        { message: "비밀번호가 일치하지 않습니다", status: 400 },
        { status: 400 }
      );
    }
    const token = accessToken({ userName, charName, userEmail, userId, ocid });
    const refresh = refreshToken({
      userName,
      charName,
      userEmail,
      userId,
      ocid,
    });

    const hashedRefresh = await bcrypt.hash(refresh, 10);

    await db.collection("user").updateOne(
      { userId },
      {
        $set: { refreshToken: hashedRefresh },
      }
    );

    const res = NextResponse.json(
      { message: "로그인에 성공하였습니다.", status: 200 },
      { status: 200 }
    );
    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
      secure: process.env.NODE_ENV === "production",
    });

    res.cookies.set("refreshToken", refresh, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production",
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
