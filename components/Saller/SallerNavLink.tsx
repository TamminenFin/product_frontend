"use client";
import { useUser } from "@/lib/user.provider";
import { logoutUser } from "@/services/auth.services";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BiLogoProductHunt } from "react-icons/bi";
import { MdCategory, MdDashboard, MdOutlineLogout } from "react-icons/md";
import { IoMdGitPullRequest } from "react-icons/io";

const SallerNavLink = ({ onLinkClick }: { onLinkClick: () => void }) => {
  const { setIsLoading } = useUser();
  const pathname = usePathname();
  const route = useRouter();
  const handleLogOut = async () => {
    await logoutUser();
    setIsLoading(true);
    route.push("/");
  };

  const isActive = (path: string) =>
    pathname === path
      ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
      : "text-gray-700 dark:text-gray-400";
  return (
    <nav className="flex h-[70vh] md:h-[calc(100vh-95px)] flex-col justify-between">
      <div className="space-y-1">
        <Link
          href="/dashboard"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
            "/dashboard"
          )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
          prefetch={false}
          onClick={onLinkClick}
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
          onClick={onLinkClick}
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
          onClick={onLinkClick}
        >
          <MdCategory className="h-5 w-5" />
          My Category
        </Link>
        <Link
          href="/dashboard/category-request"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
            "/dashboard/category-request"
          )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
          prefetch={false}
          onClick={onLinkClick}
        >
          <IoMdGitPullRequest className="h-5 w-5" />
          Category Request
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

export default SallerNavLink;
