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

  if (!user.admin) {
    return NextResponse.json(false);
  }

  if (user.admin) {
    return NextResponse.json(true);
  }

  return NextResponse.json(
    { message: "접근 권한이 없습니다.", status: 401 },
    { status: 401 }
  );
}
