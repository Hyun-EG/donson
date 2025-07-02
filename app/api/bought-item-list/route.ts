import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, title, dpPoint, description } = await req.json();

  try {
    const db = (await connectDB).db("donson");
    const bought = await db
      .collection("bought-items")
      .findOne({ userId, title });

    if (!bought) {
      await db.collection("ordered-items").insertOne({
        userId,
        title,
        dpPoint,
        description,
        orderedAt: Date.now(),
        done: false,
      });

      await db.collection("bought-items").insertOne({
        userId,
        title,
        dpPoint,
        description,
        boughtAt: Date.now(),
        done: false,
      });

      return NextResponse.json(
        {
          title,
          dpPoint,
          description,
          boughtAt: Date.now(),
          message: "구매리스트 추가에 성공하였습니다.",
          status: 200,
        },
        { status: 200 }
      );
    }

    if (bought) {
      return NextResponse.json(
        { message: "이미 구매한 상품입니다.", status: 409 },
        { status: 409 }
      );
    }
  } catch (_) {
    return NextResponse.json(
      { message: "구매리스트 추가에 실패하였습니다.", status: 500 },
      { status: 500 }
    );
  }
}
