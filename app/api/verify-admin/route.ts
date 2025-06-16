import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  if (!userId) {
    return NextResponse.json(
      { message: "요청이 잘못됐습니다.", status: 400 },
      { status: 400 }
    );
  }

  const db = (await connectDB).db("donson");
  const user = await db.collection("user").findOne({ userId });
  if (!user) {
    return NextResponse.json(
      { message: "존재하지 않는 유저입니다.", status: 400 },
      { status: 400 }
    );
  }

  return NextResponse.json(!!user.admin);
}
