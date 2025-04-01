import { useUser } from "@/lib/user.provider";
import { logoutUser } from "@/services/auth.services";
import { Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BiCategory, BiLogoProductHunt } from "react-icons/bi";
import { MdDashboard, MdOutlineLogout } from "react-icons/md";
import { TiStopwatch } from "react-icons/ti";
import { FaCodePullRequest } from "react-icons/fa6";
import translate from "@/utils/translate";

const Navlinks = ({ onLinkClick }: { onLinkClick: () => void }) => {
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
    <nav className="flex  h-[70vh] md:h-[calc(100vh-95px)] flex-col justify-between">
      <div className="space-y-1">
        <Link
          href="/admin"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
            "/admin"
          )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
          prefetch={false}
          onClick={onLinkClick}
        >
          <MdDashboard className="h-5 w-5" />
          {translate.admin.routes.dashboard}
        </Link>
        <Link
          href="/admin/categories"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
            "/admin/categories"
          )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
          prefetch={false}
          onClick={onLinkClick}
        >
          <BiCategory className="h-5 w-5" />
          {translate.admin.routes.categories}
        </Link>
        <Link
          href="/admin/sallers"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
            "/admin/sallers"
          )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
          prefetch={false}
          onClick={onLinkClick}
        >
          <Users className="h-5 w-5" />
          {translate.admin.routes.sallers}
        </Link>
        <Link
          href="/admin/products"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
            "/admin/products"
          )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
          prefetch={false}
          onClick={onLinkClick}
        >
          <BiLogoProductHunt className="h-5 w-5" />
          {translate.admin.routes.products}
        </Link>
        <Link
          href="/admin/subscription-check"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
            "/admin/subscription-check"
          )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
          prefetch={false}
          onClick={onLinkClick}
        >
          <TiStopwatch className="h-5 w-5" />
          {translate.admin.routes.subscriptionCheck}
        </Link>
        <Link
          href="/admin/request"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${isActive(
            "/admin/request"
          )} hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
          prefetch={false}
          onClick={onLinkClick}
        >
          <FaCodePullRequest className="h-5 w-5" />
          {translate.admin.routes.requests}
        </Link>
      </div>
      <button
        onClick={() => {
          handleLogOut();
          onLinkClick();
        }}
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-50`}
      >
        <MdOutlineLogout className="h-5 w-5" />
        {translate.admin.routes.logout}
      </button>
    </nav>
  );
};

export default Navlinks;
