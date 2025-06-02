import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userId = body.userId;

  const db = (await connectDB).db("donson");
  const user = await db.collection("user").findOne({ userId });

  if (!user) {
    return NextResponse.json({ message: "사용자 없음" }, { status: 404 });
  }

  console.log("유저 정보:", user);

  const ocid = user.ocid;
  return NextResponse.json({ ocid });
}
