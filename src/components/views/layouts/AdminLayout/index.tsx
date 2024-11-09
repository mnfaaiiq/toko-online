import Sidebar from "@/components/fragments/Sidebar";
import React from "react";
import { MdOutlineDashboard, MdProductionQuantityLimits } from "react-icons/md";

type PropTypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: <MdOutlineDashboard size={32} />,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: <MdProductionQuantityLimits size={32} />,
  },
];

const AdminLayout = (props: PropTypes) => {
  const { children } = props;
  return (
    <div>
      <Sidebar lists={listSidebarItem} />
      {children}
    </div>
  );
};

export default AdminLayout;
