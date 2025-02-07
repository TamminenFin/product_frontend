import SideBarSaller from "@/components/Saller/SideBarSaller";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SideBarSaller>{children}</SideBarSaller>
    </>
  );
};

export default layout;
