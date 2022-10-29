import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Header = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggle = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <Sidebar openSidebar={openSidebar} toggle={toggle} />
      <Navbar toggle={toggle} />
    </>
  );
};

export default Header;
