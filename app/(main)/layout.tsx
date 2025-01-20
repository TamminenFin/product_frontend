import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getCategorys } from "@/services/category.services";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const category = await getCategorys();
  return (
    <div>
      <Navbar category={category?.data} />
      <div className="min-h-[calc(100vh-176px)]">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
