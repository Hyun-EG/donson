import { generateUniqueNumbers } from "@/util/generateUniqueNums";
import { connectDB } from "@/mongodb";
import { NextRequest, NextResponse } from "next/server";

const db = (await connectDB).db("donson");

function isSameArray(a: number[], b: number[]) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  const existing = await db.collection("baseball").findOne({ userId });

  if (!existing) {
    const uniqueNums = generateUniqueNumbers();

    await db.collection("baseball").insertOne({
      userId,
      uniqueNums,
      turn: 0,
    });

    return NextResponse.json(
      { message: "유니크 4자리 숫자 생성 완료", status: 200 },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: "이미 유니크 숫자가 존재합니다.", status: 409 },
    { status: 409 }
  );
}

export async function PUT(req: NextRequest) {
  const { userId, guess } = await req.json();

  const target = await db.collection("baseball").findOne({ userId });

  if (!target) {
    return NextResponse.json(
      { message: "게임을 시작하지 않았습니다.", status: 400 },
      { status: 400 }
    );
  }

  if (target.turn >= 10) {
    return NextResponse.json(
      {
        message: "기회가 모두 소진되었습니다. 정답을 제출해주세요.",
        status: 409,
      },
      { status: 409 }
    );
  }

  let strike = 0;
  let ball = 0;

  for (let i = 0; i < 4; i++) {
    if (guess[i] === target.uniqueNums[i]) strike++;
    else if (target.uniqueNums.includes(guess[i])) ball++;
  }

  await db.collection("baseball").updateOne({ userId }, { $inc: { turn: 1 } });

  return NextResponse.json(
    { strike, ball, out: 4 - (strike + ball), status: 200 },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest) {
  const { userId, result } = await req.json();

  const target = await db.collection("baseball").findOne({ userId });

  if (!target) {
    return NextResponse.json(
      { message: "게임을 시작하지 않았습니다.", status: 400 },
      { status: 400 }
    );
  }

  const isCorrect = isSameArray(result, target.uniqueNums);

  await db.collection("baseball").deleteOne({ userId });

  if (!isCorrect) {
    return NextResponse.json(
      { message: "틀렸습니다.", status: 200 },
      { status: 200 }
    );
  }

  await db.collection("dp").updateOne({ userId }, { $inc: { dp: 0.2 } });

  return NextResponse.json(
    { message: "정답입니다. 포인트 0.2 지급 완료", status: 200 },
    { status: 200 }
  );
}
