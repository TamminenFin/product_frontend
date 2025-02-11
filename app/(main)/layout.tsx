import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React, { ReactNode } from "react";

const Layout = async ({
  children,
  category,
}: {
  children: ReactNode;
  category: ReactNode;
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="w-full bg-white dark:bg-gray-900 shadow-md py-4">
        <div className="container mx-auto px-2 md:px-4">
          <Navbar />
          <div>{category}</div>
        </div>
      </nav>
      <div className="min-h-[calc(100vh-167px)]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
