import { Contact } from "./types";
import InquiryDetailsBox from "./InquiryDetailsBox";

const AdminBox = ({ contacts }: { contacts: Contact[] }) => {
  return (
    <section>
      <InquiryDetailsBox contacts={contacts} />
    </section>
  );
};

export default AdminBox;
