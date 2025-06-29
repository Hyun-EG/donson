import { connectDB } from "@/util/mongodb";
import MainNav from "./MainNav";
import { getUserCookies } from "@/util/getUserCookie";

const Nav = async () => {
  const cookie = await getUserCookies();
  const userId = await cookie?.userId;

  const db = (await connectDB).db("donson");

  // 유저 DP 포인트
  const targetDP = await db.collection("dp").findOne({ userId });
  if (!targetDP) {
    await db
      .collection("dp")
      .insertOne({ userId, dp: 0, updatedAt: Date.now() });
  }
  const dp = targetDP?.dp;

  // 관리자 계정 확인
  const targetAdmin = await db.collection("user").findOne({ userId });
  const isAdmin = (await targetAdmin?.admin) === true ? true : false;

  return (
    <section>
      <MainNav dp={dp} isAdmin={isAdmin} />
    </section>
  );
};

export default Nav;
