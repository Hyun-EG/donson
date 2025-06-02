import { connectDB } from "@/util/mongodb";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = `${process.env.NEXT_PUBLIC_NEXON_API_KEY}`;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId } = body;
  try {
    if (body) {
      const db = (await connectDB).db("donson");
      const user = await db.collection("user").findOne({ userId: userId });
      if (!user) {
        throw new Error("사용자를 찾을 수 없습니다.");
      }
      const charName = user.charName;
      console.log(charName);
      const characterName = charName;
      const urlString =
        "https://open.api.nexon.com/maplestory/v1/id?character_name=" +
        characterName;
      const res = await fetch(urlString, {
        headers: {
          "x-nxopen-api-key": API_KEY,
        },
      });

      if (!res.ok) {
        console.error("API 응답 실패:", res.status);
        return NextResponse.json(
          { message: "Nexon API 오류" },
          { status: res.status }
        );
      }

      const data = await res.json();
      console.log("불러온 API 값", data.ocid);

      await db
        .collection("user")
        .updateOne({ userId: userId }, { $set: { oicd: data.ocid } });

      return NextResponse.json(data.ocid);
    }
  } catch (error) {
    console.error("서버 에러입니다.", error);
    return NextResponse.json({ message: "서버 내부 오류" }, { status: 500 });
  }
}
