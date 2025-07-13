import { connectDB } from "@/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { nameInputValue, emailInputValue } = await req.json();
    const db = (await connectDB).db("donson");
    const data = await db
      .collection("user")
      .findOne({ userName: nameInputValue });
    if (
      data?.userName === nameInputValue &&
      data?.userEmail === emailInputValue
    ) {
      const userId = data?.userId;
      return NextResponse.json(userId);
    } else {
      return NextResponse.json(
        { message: "입력한 정보와 일치하는 유저가 없습니다", status: 400 },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "유저 아이디를 가져오지 못했습니다.", status: 400 },
      { status: 400 }
    );
  }
}
