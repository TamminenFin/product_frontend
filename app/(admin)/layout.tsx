import SideBarAdmin from "@/components/Admin/SideBarAdmin";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SideBarAdmin>{children}</SideBarAdmin>
    </>
  );
};

export default layout;
