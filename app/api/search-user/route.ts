import { connectDB } from "@/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchValue } = await req.json();

  if (!searchValue.trim()) {
    return NextResponse.json({ message: "양식을 입력해주세요." });
  }

  const db = (await connectDB).db("donson");
  const target = await db.collection("user").findOne({ userId: searchValue });
  const targetDP = await db.collection("dp").findOne({ userId: searchValue });

  if (!target) {
    return NextResponse.json(
      { message: "존재하지 않는 유저입니다.", status: 409 },
      { status: 409 }
    );
  }

  const userName = target.userName;
  const userId = target.userId;
  const userEmail = target.userEmail;
  const userCharName = target.charName;
  const dp = targetDP?.dp ?? 0;

  return NextResponse.json(
    {
      userName,
      userId,
      userEmail,
      userCharName,
      dp,
      message: "유저 검색에 성공하였습니다.",
      status: 200,
    },
    { status: 200 }
  );
}
