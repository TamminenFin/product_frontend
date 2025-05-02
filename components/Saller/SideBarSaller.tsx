"use client";
import React, { ReactNode, useState } from "react";
import SallerNavLink from "@/components/Saller/SallerNavLink";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import logo from "../../assets/lastiendas_logo.png";
import Image from "next/image";

const SideBarSaller = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };
  return (
    <div className="flex w-full">
      <div className="hidden lg:block lg:w-64 lg:sticky lg:left-0 lg:top-0 lg:shrink-0 lg:border-r lg:bg-gray-100 dark:lg:bg-gray-800 h-screen">
        <div className="flex h-full flex-col justify-between py-6 px-4">
          <div className="space-y-6">
            <Link href="/">
              <Image src={logo} alt="Logo" width={140} height={40} />
            </Link>
            <SallerNavLink onLinkClick={handleSidebarClose} />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[calc(100%-256px)]">
        <header className="sticky top-0 z-10 border-b bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 lg:hidden">
          <div className="flex gap-4">
            <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex h-full flex-col justify-between py-6 px-4">
                  <div className="space-y-6">
                    <SallerNavLink onLinkClick={handleSidebarClose} />
                  </div>
                  <div className="space-y-4"></div>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/">
              <Image src={logo} alt="Logo" width={140} height={40} />
            </Link>
          </div>
        </header>
        <main className="lg:p-3 mt-5">{children}</main>
      </div>
    </div>
  );
};

export default SideBarSaller;
