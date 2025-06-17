import { connectDB } from "@/util/mongodb";
import { Contact } from "./_components/types";
import AdminBox from "./_components/AdminBox";

const Admin = async () => {
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
      <AdminBox contacts={contact} />
    </section>
  );
};

export default Admin;
