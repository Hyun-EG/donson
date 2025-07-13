import { NextRequest, NextResponse } from "next/server";
import { sendPushToAll } from "../send-push-to-all/route";

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();
  try {
    await sendPushToAll(title, content);
    return NextResponse.json({ message: "푸시 발송 성공" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "푸시 발송 실패" }, { status: 500 });
  }
}
