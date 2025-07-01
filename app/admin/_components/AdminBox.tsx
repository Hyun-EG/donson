import { Contact } from "./types";
import InquiryDetailsBox from "./InquiryDetailsBox";
import OrderedBox from "./OrderedBox";

const AdminBox = ({
  contacts,
  groupedOrders,
  userId,
}: {
  contacts: Contact[];
  groupedOrders: Record<string, { title: string; done: boolean }[]>;
  userId: string;
}) => {
  return (
    <section>
      <InquiryDetailsBox contacts={contacts} />
      <OrderedBox userId={userId} groupedOrders={groupedOrders} />
    </section>
  );
};

export default AdminBox;
