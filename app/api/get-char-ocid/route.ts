import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ message: "userId 없음" }, { status: 400 });
    }

    const db = (await connectDB).db("donson");
    const user = await db.collection("user").findOne({ userId });

    if (!user) {
      return NextResponse.json({ message: "사용자 없음" }, { status: 404 });
    }

    console.log("유저 정보:", user);

    if (!user.ocid) {
      return NextResponse.json(
        { message: "OCID가 등록되지 않았습니다." },
        { status: 400 }
      );
    }
    const ocid = user.ocid;

    return NextResponse.json({ ocid });
  } catch (error) {
    console.error("API 오류", error);
    return NextResponse.json({ message: "서버 에러 발생" }, { status: 500 });
  }
}
