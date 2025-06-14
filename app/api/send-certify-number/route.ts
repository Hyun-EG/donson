import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { to } = await req.json();
  const db = (await connectDB).db("donson");

  const seqCertifyNo = [...Array(6)]
    .map(() => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      return chars.charAt(Math.floor(Math.random() * chars.length));
    })
    .join("");

  await db
    .collection("certify")
    .createIndex({ createdAt: 1 }, { expireAfterSeconds: 300 });

  const existing = await db.collection("certify").findOne({ userEmail: to });

  if (existing) {
    return NextResponse.json(
      { message: "이미 인증번호가 전송되었습니다. 잠시 후 다시 시도해주세요." },
      { status: 400 }
    );
  }

  await db.collection("certify").insertOne({
    userEmail: to,
    certifyNo: seqCertifyNo,
    createdAt: new Date(),
  });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "DONSON 인증번호입니다.",
      html: `
    <div style="font-family: sans-serif; font-size: 16px;">
      <p><strong>D O N S O N</strong> 인증번호입니다.</p>
      <p style="margin-top: 12px;">인증번호: <strong style="font-size: 18px;">${seqCertifyNo}</strong></p>
      <p style="color: gray; font-size: 14px;">유효 시간은 5분입니다.</p>
    </div>
  `,
    });

    return NextResponse.json({ message: "메일 전송 완료" });
  } catch (err) {
    console.error("메일 전송 실패", err);
    return NextResponse.json({ message: "메일 전송 실패" }, { status: 500 });
  }
}
