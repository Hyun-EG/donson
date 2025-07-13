import { connectDB } from "@/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { accessToken } from "@/util/jwt";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  const refreshTokenInCookie = req.cookies.get("refreshToken")?.value;

  const db = (await connectDB).db("donson");
  const target = await db.collection("user").findOne({ userId });

  if (!target) {
    return NextResponse.json(
      { message: "유저를 찾을 수 없습니다", status: 404 },
      { status: 404 }
    );
  }

  const refreshToken = target.refreshToken;
  if (refreshTokenInCookie === undefined) {
    return NextResponse.json(
      { message: "리프레시 토큰이 존재하지 않습니다.", status: 409 },
      { status: 409 }
    );
  }
  const isValid = await bcrypt.compare(refreshTokenInCookie, refreshToken);

  if (!isValid) {
    return NextResponse.json(
      { message: "부적절한 접근입니다.", status: 403 },
      { status: 403 }
    );
  }

  const userName = target.userName;
  const ocid = target.ocid;
  const userEmail = target.userEmail;
  const charName = target.charName;

  const newAccessToken = accessToken({
    userId,
    userEmail,
    userName,
    charName,
    ocid,
  });

  const res = NextResponse.json(
    { message: "accessToken 재발급 완료", status: 200 },
    { status: 200 }
  );

  res.cookies.set("token", newAccessToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
