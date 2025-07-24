import { connectDB } from "@/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, selectedNum, battingDp, result } = await req.json();

  const db = (await connectDB).db("donson");
  const batDP = Number(battingDp);

  const parsedResult = Number(result);

  if (selectedNum === parsedResult && parsedResult !== 1) {
    await db.collection("dp").updateOne(
      { userId },
      {
        $inc: {
          dp: batDP * parsedResult,
        },
      }
    );
    return NextResponse.json({
      message: `게임에 승리하여 ${batDP * parsedResult}의 DP를 획득하였습니다`,
    });
  }

  if (selectedNum === parsedResult && parsedResult === 1) {
    await db.collection("dp").updateOne(
      { userId },
      {
        $inc: {
          dp: Math.ceil(batDP / 2),
        },
      }
    );
    return NextResponse.json({
      message: `게임에 승리하여 ${Math.ceil(batDP / 2)}의 DP를 획득하였습니다`,
    });
  }

  if (selectedNum !== parsedResult) {
    await db.collection("dp").updateOne(
      { userId },
      {
        $inc: {
          dp: -batDP,
        },
      }
    );
    return NextResponse.json({
      message: `게임에 패배하여 ${batDP}의 DP를 잃었습니다.`,
    });
  }

  return NextResponse.json(
    { message: "결과 계산에 실패하였습니다." },
    { status: 400 }
  );
}
