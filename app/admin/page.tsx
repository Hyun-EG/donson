import { connectDB } from "@/util/mongodb";
import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";
import MaplePointPriceForm from "./_components/MaplePointPriceForm";
import AdminBox from "./_components/AdminBox";
import { Contact } from "./_components/types";
import PostAlertToUserBox from "./_components/PostAlertToUserBox";

const Admin = async () => {
  const cookie = await getUserCookies();
  if (!cookie) {
    redirect("/signin");
  }

  const db = (await connectDB).db("donson");
  const rawContact = await db.collection("contact").find().toArray();
  const rawOrders = await db.collection("ordered-items").find().toArray();

  const contact: Contact[] = rawContact.map((doc) => ({
    _id: doc._id.toString(),
    userId: doc.userId,
    category: doc.category,
    content: doc.content,
  }));

  const groupedOrders = rawOrders.reduce((acc, curr) => {
    if (!acc[curr.userId]) acc[curr.userId] = [];
    acc[curr.userId].push({
      title: curr.title,
      done: curr.done,
    });
    return acc;
  }, {} as Record<string, { title: string; done: boolean }[]>);

  return (
    <section className="mb-10">
      <h1 className="text-lg text-center font-bold">관리자 메뉴</h1>
      <MaplePointPriceForm />
      <PostAlertToUserBox />
      <AdminBox contacts={contact} groupedOrders={groupedOrders} />
    </section>
  );
};

export default Admin;
