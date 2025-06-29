import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  try {
    const db = (await connectDB).db("donson");

    const now = new Date();
    const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    const target = await db.collection("check-in").findOne({ userId: userId });

    if (target && target.date !== today) {
      await db.collection("check-in").updateOne(
        { userId },
        {
          $set: {
            checked: false,
            date: today,
          },
        }
      );
      target.checked = false;
    }

    if (!target) {
      await db.collection("check-in").insertOne({
        userId,
        checked: true,
        createdAt: Date.now(),
        date: today,
      });
      return NextResponse.json(
        { message: "출석체크에 성공하였습니다", status: 200 },
        { status: 200 }
      );
    }

    if (target?.checked) {
      return NextResponse.json(
        { message: "중복 출석체크는 불가능합니다.", status: 409 },
        { status: 409 }
      );
    }

    const result = await db.collection("check-in").updateOne(
      {
        userId,
      },
      {
        $set: {
          checked: true,
          updateAt: Date.now(),
          date: today,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "출석체크에 실패하였습니다.", status: 400 },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "출석체크에 성공하였습니다", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "출석체크중 에러가 발생하였습니다.", status: 500 },
      { status: 500 }
    );
  }
}
