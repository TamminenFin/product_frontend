"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useUser } from "@/lib/user.provider";
import Link from "next/link";
import { useGetCurrentSaller } from "@/hooks/auth.hooks";
import PendingUserModel from "../model/PendingUserModel";
import SubscriptionEndMessage from "../model/SubscriptionEndMessage";
import { MultiValue } from "react-select";
import Select from "react-select";
import translate from "@/utils/translate";
import Logo from "../../assets/lastiendas_logo.png";
import { useGetAllCity } from "@/hooks/city.hooks";
import { cn } from "@/lib/utils";

type OptionType = {
  value: string;
  label: string;
};

const Navbar = () => {
  const { user } = useUser();
  const { data, isLoading } = useGetAllCity();
  const { data: userInfo } = useGetCurrentSaller(user?._id as string, {
    enabled: !!user?._id,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pendingModalOpen, setPendingModalOpen] = useState(false);
  const [endModalOpen, setEndModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const selectedLocations = searchParams.getAll("location[]") || [];

  const handleLocationChange = (selectedOptions: MultiValue<OptionType>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("location[]");
    selectedOptions.forEach((option) => {
      params.append("location[]", option.value);
    });
    router.push(`?${params.toString()}`);
  };

  const handleNavigate = () => {
    if (userInfo?.data?.status === "Pending") {
      setPendingModalOpen(true);
      return;
    }
    if (new Date() > new Date(userInfo?.data?.subEndDate as Date)) {
      setEndModalOpen(true);
      return;
    }
    router.push(user?.role === "admin" ? "/admin" : "/dashboard");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearchTerm(value);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      params.set("searchTerms", searchTerm);
    } else {
      params.delete("searchTerms");
    }
    router.push(`?${params.toString()}`);
  }, [router, searchParams, searchTerm]);

  const locationOptions: OptionType[] =
    data?.data
      ?.map((city: { name: string }) => ({
        value: city.name,
        label: city.name,
      }))
      .sort((a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name)
      ) || [];

  return (
    <nav>
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <Link href="/">
          <Image src={Logo} alt="Logo" width={140} height={40} />
        </Link>

        {/* Desktop Location Dropdown */}
        <div className="hidden sm:block w-60 text-xs">
          {isLoading ? (
            <div
              className={cn(
                "animate-pulse h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700"
              )}
            />
          ) : (
            <Select
              options={locationOptions}
              isMulti
              value={locationOptions.filter((option) =>
                selectedLocations.includes(option.value)
              )}
              onChange={handleLocationChange}
              placeholder="Select Location"
            />
          )}
        </div>

        {/* Desktop Search Input */}
        <div className="hidden sm:block flex-1">
          <div className="relative">
            <Input
              type="text"
              placeholder={translate.home.searchPlaceholder}
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search
              size={20}
              className="absolute top-2/4 left-3 transform -translate-y-2/4 text-gray-400"
            />
          </div>
        </div>

        {/* Auth Button */}
        {user?.email ? (
          <button
            onClick={handleNavigate}
            className="bg-purple-600 px-3 md:px-4 rounded-md py-2 md:py-2.5 text-white hover:bg-purple-700 text-[10px] md:text-sm"
          >
            {translate.home.goToDashboard}
          </button>
        ) : (
          <Link href={"/signin"}>
            <button className="bg-purple-600 px-3 md:px-4 rounded-md py-2 md:py-2.5 text-white hover:bg-purple-700 text-[10px] md:text-sm">
              {translate.home.goToLoginButton}
            </button>
          </Link>
        )}

        {/* Mobile Section */}
        <div className="flex flex-col items-center gap-2 w-full sm:hidden">
          {isLoading ? (
            <div
              className={cn(
                "animate-pulse h-9 w-full rounded-md bg-gray-200 dark:bg-gray-700"
              )}
            />
          ) : (
            <Select
              options={locationOptions}
              isMulti
              value={locationOptions.filter((option) =>
                selectedLocations.includes(option.value)
              )}
              onChange={handleLocationChange}
              placeholder={translate.home.selectCity}
              className="text-[10px] w-full"
            />
          )}

          <div className="relative w-full">
            <input
              type="text"
              placeholder={translate.home.searchPlaceholder}
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-7 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:focus:ring-purple-500 placeholder:text-xs w-full border-gray-300 py-1.5 rounded text-xs border"
            />
            <Search
              size={14}
              className="absolute top-2/4 left-3 transform -translate-y-2/4 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <PendingUserModel
        isOpen={pendingModalOpen}
        setIsOpen={setPendingModalOpen}
      />
      <SubscriptionEndMessage
        isOpen={endModalOpen}
        setIsOpen={setEndModalOpen}
      />
    </nav>
  );
};

export default Navbar;
