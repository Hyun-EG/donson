import { connectDB } from "@/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, selectedNum, battingDp, result } = await req.json();

  const db = (await connectDB).db("donson");
  const batDP = Number(battingDp);
  const parsedResult = Number(result);

  const user = await db.collection("dp").findOne({ userId });

  if (!user) {
    return NextResponse.json(
      { message: "유저 정보를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  if (user.dp < batDP) {
    return NextResponse.json(
      { message: "보유한 DP보다 더 큰 금액은 배팅할 수 없습니다." },
      { status: 400 }
    );
  }

  if (selectedNum === parsedResult && parsedResult !== 1) {
    const reward = batDP * parsedResult;

    await db.collection("dp").updateOne(
      { userId },
      {
        $inc: { dp: reward },
      }
    );

    return NextResponse.json({
      message: `게임에 승리하여 ${reward}의 DP를 획득하였습니다`,
    });
  }

  if (selectedNum === parsedResult && parsedResult === 1) {
    const reward = Math.ceil(batDP / 2);

    await db.collection("dp").updateOne(
      { userId },
      {
        $inc: { dp: reward },
      }
    );

    return NextResponse.json({
      message: `게임에 승리하여 ${reward}의 DP를 획득하였습니다`,
    });
  }

  if (selectedNum !== parsedResult) {
    await db.collection("dp").updateOne(
      { userId },
      {
        $inc: { dp: -batDP },
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
