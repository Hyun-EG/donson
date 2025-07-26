import { connectDB } from "@/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

interface Loan {
  _id: ObjectId;
  userId: string;
  loanA: boolean;
  loanB: boolean;
  loanC: boolean;
  loanD: boolean;
  updatedAt: number;
}

export async function POST(req: NextRequest) {
  const { userId, dp } = await req.json();
  const db = (await connectDB).db("donson");

  const loanCol = db.collection<Loan>("loan");

  const loanFieldMap: Record<number, keyof Loan> = {
    10: "loanA",
    25: "loanB",
    50: "loanC",
    100: "loanD",
  };

  const loanField = loanFieldMap[dp];
  if (!loanField) {
    return NextResponse.json(
      { message: "잘못된 대출 금액입니다.", status: 400 },
      { status: 400 }
    );
  }

  let target = await loanCol.findOne({ userId });

  if (!target) {
    const now = Date.now();
    await loanCol.insertOne({
      userId,
      loanA: false,
      loanB: false,
      loanC: false,
      loanD: false,
      updatedAt: now,
      _id: new ObjectId(),
    });
    target = await loanCol.findOne({ userId });
  }

  if (target?.[loanField]) {
    return NextResponse.json(
      { message: "이미 해당 대출을 받았습니다.", status: 400 },
      { status: 400 }
    );
  }

  try {
    await db.collection("dp").updateOne({ userId }, { $inc: { dp } });

    await loanCol.updateOne(
      { userId },
      {
        $set: {
          [loanField]: true,
          updatedAt: Date.now(),
        },
      }
    );

    return NextResponse.json(
      { message: "지급되었습니다.", status: 200 },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "대출 신청 중 에러가 발생했습니다.", status: 400 },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { userId, rePaymentDP } = await req.json();
  const db = (await connectDB).db("donson");

  const loanFieldMap: Record<number, keyof Loan> = {
    10: "loanA",
    25: "loanB",
    50: "loanC",
    100: "loanD",
  };

  const loanField = loanFieldMap[rePaymentDP];
  if (!loanField) {
    return NextResponse.json(
      { message: "잘못된 상환 금액", status: 400 },
      { status: 400 }
    );
  }

  const loan = await db.collection("loan").findOne({ userId });

  if (!loan || loan[loanField] === false) {
    return NextResponse.json(
      { message: "이미 상환 완료된 상품입니다.", status: 400 },
      { status: 400 }
    );
  }

  const dpDoc = await db.collection("dp").findOne({ userId });
  if (!dpDoc || dpDoc.dp < rePaymentDP) {
    return NextResponse.json(
      { message: "상환 가능한 포인트가 부족합니다.", status: 400 },
      { status: 400 }
    );
  }

  await db
    .collection("dp")
    .updateOne({ userId }, { $inc: { dp: -rePaymentDP } });

  await db.collection("loan").updateOne(
    { userId },
    {
      $set: {
        [loanField]: false,
        updatedAt: Date.now(),
      },
    }
  );

  return NextResponse.json(
    { message: "상환이 완료되었습니다.", status: 200 },
    { status: 200 }
  );
}
