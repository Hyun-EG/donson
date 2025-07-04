import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  try {
    const db = (await connectDB).db("donson");

    const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
    const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    const alreadyChecked = await db.collection("check-in").findOne({
      userId,
      date: today,
    });

    if (alreadyChecked) {
      return NextResponse.json(
        { message: "이미 오늘 출석체크를 하였습니다.", status: 409 },
        { status: 409 }
      );
    }

    await db.collection("check-in").insertOne({
      userId,
      date: today,
      createdAt: Date.now(),
    });

    return NextResponse.json(
      { message: "출석체크에 성공하였습니다", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "출석체크 중 에러가 발생하였습니다.", status: 500 },
      { status: 500 }
    );
  }
}
