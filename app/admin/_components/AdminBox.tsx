import { Contact } from "./types";
import InquiryDetailsBox from "./InquiryDetailsBox";
import OrderedBox from "./OrderedBox";

const AdminBox = ({
  contacts,
  groupedOrders,
}: {
  contacts: Contact[];
  groupedOrders: Record<string, { title: string; done: boolean }[]>;
}) => {
  return (
    <section>
      <InquiryDetailsBox contacts={contacts} />
      <OrderedBox groupedOrders={groupedOrders} />
    </section>
  );
};

export default AdminBox;
