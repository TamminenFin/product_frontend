import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar category={[{ name: "com", _id: "5456485" }]} />
      <div className="min-h-[calc(100vh-176px)]">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
