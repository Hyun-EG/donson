import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  try {
    const db = (await connectDB).db("donson");

    const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
    const pad = (n: number) => n.toString().padStart(2, "0");
    const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate()
    )}`;

    const target = await db.collection("check-in").findOne({ userId });

    if (!target) {
      await db.collection("check-in").insertOne({ userId, date: today });

      return NextResponse.json(
        { message: "출석체크에 성공하였습니다", status: 200 },
        { status: 200 }
      );
    }

    if (target.date === today) {
      return NextResponse.json(
        { message: "이미 오늘 출석체크를 하였습니다.", status: 409 },
        { status: 409 }
      );
    }

    if (target.date !== today) {
      await db.collection("check-in").updateOne(
        { userId },
        {
          $set: {
            date: today,
          },
        }
      );

      return NextResponse.json(
        { message: "출석체크에 성공하였습니다", status: 200 },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "출석체크 중 에러가 발생하였습니다.", status: 500 },
      { status: 500 }
    );
  }
}
