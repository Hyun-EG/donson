import { connectDB } from "@/mongodb";

const API_KEY = process.env.NEXON_API_KEY!;

export const addCharOcidToUser = async (userId: string) => {
  const db = (await connectDB).db("donson");
  const user = await db.collection("user").findOne({ userId });

  if (!user) throw new Error("유저 없음");

  const charName = user.charName;
  const res = await fetch(
    `https://open.api.nexon.com/maplestory/v1/id?character_name=${charName}`,
    {
      headers: { "x-nxopen-api-key": API_KEY },
    }
  );

  if (!res.ok) {
    throw new Error(`넥슨 API 호출 실패: ${res.status}`);
  }

  const data = await res.json();

  await db
    .collection("user")
    .updateOne({ userId }, { $set: { ocid: data.ocid } });

  return data.ocid;
};
