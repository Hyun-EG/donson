"use client";

import { Contact } from "./types";
import InquiryDetailsBox from "./InquiryDetailsBox";
import OrderedBox from "./OrderedBox";
import AdminNav from "./AdminNav";
import MaplePointPriceForm from "./MaplePointPriceForm";
import PostAlertToUserBox from "./PostAlertToUserBox";
import { useAdminNavStore } from "@/store/adminNavStore";
import SearchCustomer from "./SearchCustomer";

const AdminBox = ({
  contacts,
  groupedOrders,
}: {
  contacts: Contact[];
  groupedOrders: Record<string, { title: string; done: boolean }[]>;
}) => {
  const { selectedNavItem } = useAdminNavStore();
  return (
    <section>
      <AdminNav />
      {selectedNavItem === "메포반영" && <MaplePointPriceForm />}
      {selectedNavItem === "알림전송" && <PostAlertToUserBox />}
      {selectedNavItem === "문의내역" && (
        <InquiryDetailsBox contacts={contacts} />
      )}
      {selectedNavItem === "주문내역" && (
        <OrderedBox groupedOrders={groupedOrders} />
      )}
      {selectedNavItem === "고객검색" && <SearchCustomer />}
    </section>
  );
};

export default AdminBox;
