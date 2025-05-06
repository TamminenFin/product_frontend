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
import { Citys } from "@/types/Citys";
import { MultiValue } from "react-select";
import Select from "react-select";
import translate from "@/utils/translate";
import Logo from "../../assets/lastiendas_logo.png";

type OptionType = {
  value: string;
  label: string;
};

const Navbar = () => {
  const { user } = useUser();
  const { data: userInfo } = useGetCurrentSaller(user?._id as string);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pendingModalOpen, setPendingModalOpen] = useState(false);
  const [endModalOpen, setEndModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const selectedLocations = searchParams.getAll("location[]") || [];

  // Handle location change
  const handleLocationChange = (selectedOptions: MultiValue<OptionType>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Remove existing location params
    params.delete("location[]");

    selectedOptions.forEach((option) => {
      params.append("location[]", option.value);
    });

    router.push(`?${params.toString()}`);
  };

  // Navigate to the dashboard or show appropriate modal if conditions are met
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

  // Update the search term and searchParams in URL
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearchTerm(value);
  };

  // Update the searchParams in the URL based on searchTerm
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm) {
      params.set("searchTerms", searchTerm);
    } else {
      params.delete("searchTerms");
    }

    // Update the URL with the search term
    router.push(`?${params.toString()}`);
  }, [searchTerm, searchParams, router]);

  const locationOptions = Citys.map((city) => ({
    value: city.city,
    label: city.city,
  })).sort((a, b) => a.value.localeCompare(b.value));

  return (
    <nav className="">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <Link href="/">
          <Image src={Logo} alt="Logo" width={140} height={40} />
        </Link>

        {/* Location Dropdown */}
        <div className="hidden sm:block">
          <Select
            options={locationOptions}
            isMulti
            value={locationOptions.filter((option) =>
              selectedLocations.includes(option.value)
            )}
            onChange={handleLocationChange}
            placeholder="Select Location"
            className="w-60 text-[12px]"
          />
        </div>

        {/* Search Input */}
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

        {/* Be a Seller Button */}
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

        {/* Mobile Search and Location Dropdown */}
        <div className="flex flex-col items-center gap-2 w-full sm:hidden">
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
