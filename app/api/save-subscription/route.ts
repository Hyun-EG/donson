import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/util/mongodb";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const db = (await connectDB).db("donson");

  const alreadyExists = await db.collection("subscriptions").findOne({
    endpoint: body.endpoint,
  });

  if (alreadyExists) {
    return NextResponse.json({ message: "이미 구독되어 있습니다." });
  }

  await db.collection("subscriptions").insertOne(body);

  return NextResponse.json({ message: "구독 완료" });
}
