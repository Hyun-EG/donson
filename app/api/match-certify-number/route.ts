import { connectDB } from "@/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userEmail, certifyNo } = await req.json();
  const db = (await connectDB).db("donson");

  const match = await db.collection("certify").findOne({
    userEmail,
    certifyNo: certifyNo,
  });

  if (!match) {
    return NextResponse.json(
      { message: "인증 실패", valid: false },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "인증 성공", valid: true });
}
