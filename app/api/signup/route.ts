import bcrypt from "bcrypt";
import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { addCharOcidToUser } from "@/lib/addCharOcidToUser";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    userName,
    userEmail,
    certifyNo,
    matchCertifyDisabled,
    userId,
    charName,
    userPassword,
    confirmUserPassword,
  } = body;

  if (
    !userName?.trim() ||
    !userEmail?.trim() ||
    !certifyNo?.trim() ||
    matchCertifyDisabled !== true ||
    !userId?.trim() ||
    !charName?.trim() ||
    !userPassword ||
    !confirmUserPassword
  ) {
    return NextResponse.json(
      { message: "모든 필드를 입력해주세요.", status: 400 },
      { status: 400 }
    );
  }

  if (userPassword !== confirmUserPassword) {
    return NextResponse.json(
      { message: "비밀번호가 일치하지 않습니다.", status: 400 },
      { status: 400 }
    );
  }

  const SALT_ROUNDS = 10;
  const hashedPW = await bcrypt.hash(userPassword, SALT_ROUNDS);

  try {
    const db = (await connectDB).db("donson");
    const cert = await db.collection("certify").findOne({
      userEmail,
      certifyNo,
    });

    if (cert?.certifyNo !== certifyNo) {
      return NextResponse.json(
        {
          message: "인증 번호가 일치하지 않습니다.",
          status: 400,
        },
        { status: 400 }
      );
    }

    if (matchCertifyDisabled === false) {
      return NextResponse.json(
        { message: "인증 번호 확인을 진행해주세요.", status: 400 },
        { status: 400 }
      );
    }

    const existingUser = await db.collection("user").findOne({
      $or: [{ userId }],
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "이미 존재하는 아이디입니다.", status: 409 },
        { status: 409 }
      );
    }

    await db.collection("user").insertOne({
      userName,
      userEmail,
      userId,
      charName,
      hashedPW,
      createdAt: new Date(),
    });

    await db.collection("dp").insertOne({
      userId,
      dp: 0,
      updateAt: Date.now(),
    });

    await db.collection("certify").deleteOne({ _id: cert?._id });

    try {
      await addCharOcidToUser(userId);
    } catch (e) {
      console.error("OCID 저장 실패", e);
    }

    return NextResponse.json(
      { message: "회원가입 성공", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("서버 에러입니다.", error);
    return NextResponse.json(
      { message: "서버 오류", status: 500 },
      { status: 500 }
    );
  }
}
