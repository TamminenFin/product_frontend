"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiLogoProductHunt } from "react-icons/bi";
import { MdCategory, MdDashboard } from "react-icons/md";

const SallerNavLink = () => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
      : "text-gray-700 dark:text-gray-400";
  return (
    <nav className="space-y-1">
      <Link
        href="/dashboard"
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
          "/dashboard"
        )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
        prefetch={false}
      >
        <MdDashboard className="h-5 w-5" />
        Dashboard
      </Link>
      <Link
        href="/dashboard/product"
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
          "/dashboard/product"
        )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
        prefetch={false}
      >
        <BiLogoProductHunt className="h-5 w-5" />
        Product
      </Link>
      <Link
        href="/dashboard/my-category"
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
          "/dashboard/my-category"
        )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
        prefetch={false}
      >
        <MdCategory className="h-5 w-5" />
        My Category
      </Link>
    </nav>
  );
};

export default SallerNavLink;
