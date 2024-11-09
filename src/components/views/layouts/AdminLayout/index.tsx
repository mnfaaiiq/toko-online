import Sidebar from "@/components/fragments/Sidebar";
import React from "react";
import { FaUsers } from "react-icons/fa";
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
  {
    title: "Users",
    url: "/admin/users",
    icon: <FaUsers size={32} />,
  },
];

const AdminLayout = (props: PropTypes) => {
  const { children } = props;
  return (
    <div className="flex">
      <Sidebar lists={listSidebarItem} />
      <div className="w-full p-10">{children}</div>
    </div>
  );
};

export default AdminLayout;
