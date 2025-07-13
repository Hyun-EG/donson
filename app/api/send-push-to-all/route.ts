import { sendPushToAll } from "@/lib/sendPushToAll";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, body } = await req.json();
  try {
    await sendPushToAll(title, body);
    return NextResponse.json({ message: "푸시 발송 성공" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "푸시 발송 실패" }, { status: 500 });
  }
}
