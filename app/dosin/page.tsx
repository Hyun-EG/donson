import { connectDB } from "@/mongodb";
import RouletteBox from "./_components/RouletteBox";
import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";

const RoulettePage = async () => {
  const cookie = await getUserCookies();
  if (!cookie) {
    redirect("/signin");
  }
  const userId = await cookie?.userId;

  const db = (await connectDB).db("donson");
  const target = await db.collection("dp").findOne({ userId });

  return (
    <section>
      <header>
        <h1 className="text-center text-lg font-bold">도신</h1>
        <p className="text-sm text-sky-500 font-bold">
          보유 DP :<span className="text-red-500"> {target?.dp}</span>
        </p>
      </header>
      <main>
        <RouletteBox userId={userId} />
      </main>
    </section>
  );
};

export default RoulettePage;
