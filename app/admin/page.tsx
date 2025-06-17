import { connectDB } from "@/util/mongodb";
import { Contact } from "./_components/types";
import AdminBox from "./_components/AdminBox";
import MaplePointPriceForm from "./_components/MaplePointPriceForm";
import { getUserCookies } from "@/util/getUserCookie";
import { redirect } from "next/navigation";

const Admin = async () => {
  const cookie = await getUserCookies();
  if (!cookie) {
    redirect("/signin");
  }

  const db = (await connectDB).db("donson");
  const rawContact = await db.collection("contact").find().toArray();

  const contact: Contact[] = rawContact.map((doc) => ({
    _id: doc._id.toString(),
    userId: doc.userId,
    category: doc.category,
    content: doc.content,
  }));

  return (
    <section>
      <h1 className="text-lg text-center font-bold">관리자 메뉴</h1>
      <MaplePointPriceForm />
      <AdminBox contacts={contact} />
    </section>
  );
};

export default Admin;
