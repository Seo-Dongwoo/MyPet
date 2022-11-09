import { RiFileCopyLine } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import { AiFillFileAdd, AiFillSetting } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { GoListUnordered } from "react-icons/go";

export const SidebarData = [
  {
    icon: <IoIosHome />,
    title: "Home",
    path: "/admin",
  },
  {
    icon: <RiFileCopyLine />,
    title: "Products",
    path: "/admin/products",
  },
  {
    icon: <AiFillFileAdd />,
    title: "Add Products",
    path: "/admin/addproduct",
  },
  {
    icon: <FiUsers />,
    title: "Users",
    path: "/admin/users",
  },
  {
    icon: <GoListUnordered />,
    title: "Orders",
    path: "/admin/orders",
  },
  {
    icon: <AiFillSetting />,
    title: "Settings",
    path: "/admin/settings",
  },
];
