"use client";
import { logoutUser } from "@/services/auth.services";
import { Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BiCategory, BiLogoProductHunt } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { MdDashboard, MdOutlineLogout } from "react-icons/md";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { TiStopwatch } from "react-icons/ti";

const Navlinks = () => {
  const pathname = usePathname();
  const route = useRouter();
  const handleLogOut = async () => {
    await logoutUser();
    route.push("/");
  };

  const isActive = (path: string) =>
    pathname === path
      ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
      : "text-gray-700 dark:text-gray-400";
  return (
    <nav className="flex h-[calc(100vh-95px)] flex-col justify-between">
      <div className="space-y-1">
        <Link
          href="/admin"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
            "/admin"
          )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
          prefetch={false}
        >
          <MdDashboard className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="/admin/categories"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
            "/admin/categories"
          )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
          prefetch={false}
        >
          <BiCategory className="h-5 w-5" />
          Categories
        </Link>
        <Link
          href="/admin/sallers"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
            "/admin/sallers"
          )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
          prefetch={false}
        >
          <Users className="h-5 w-5" />
          Sallers
        </Link>
        <Link
          href="/admin/products"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
            "/admin/products"
          )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
          prefetch={false}
        >
          <BiLogoProductHunt className="h-5 w-5" />
          Products
        </Link>
        <Link
          href="/admin/request-saller"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
            "/admin/request-saller"
          )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
          prefetch={false}
        >
          <FaHistory className="h-5 w-5" />
          Pending Requests
        </Link>
        <Link
          href="/admin/pricing"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
            "/admin/pricing"
          )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
          prefetch={false}
        >
          <RiMoneyDollarBoxLine className="h-5 w-5" />
          Pricing
        </Link>
        <Link
          href="/admin/subscription-check"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
            "/admin/subscription-check"
          )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
          prefetch={false}
        >
          <TiStopwatch className="h-5 w-5" />
          Subscription-Check
        </Link>
      </div>
      <button
        onClick={handleLogOut}
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium  hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
      >
        <MdOutlineLogout className="h-5 w-5" />
        Logout
      </button>
    </nav>
  );
};

export default Navlinks;
