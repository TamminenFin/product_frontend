"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
// import { TProduct } from "@/types";
// import { LuSearchX } from "react-icons/lu";
// import { useGetProductBySearch } from "@/hooks/product.hooks";
// import Image from "next/image";
// import { FaLocationDot } from "react-icons/fa6"
import { useUser } from "@/lib/user.provider";
import Link from "next/link";
import { useGetCurrentSaller } from "@/hooks/auth.hooks";
import PendingUserModel from "../model/PendingUserModel";
import SubscriptionEndMessage from "../model/SubscriptionEndMessage";
import { Citys } from "@/types/Citys";
import { MultiValue } from "react-select";
import Select from "react-select";

type OptionType = {
  value: string;
  label: string;
};

const Navbar = () => {
  const { user } = useUser();
  const { data: userInfo } = useGetCurrentSaller();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pendingModalOpen, setPendingModalOpen] = useState(false);
  const [endModalOpen, setEndModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  // const selectedCategory = searchParams.get("category");
  const selectedLocations = searchParams.getAll("location[]") || [];

  // const { data } = useGetProductBySearch(
  //   searchTerm,
  //   selectedCategory || "",
  //   selectedLocation || ""
  // );

  const handleLocationChange = (selectedOptions: MultiValue<OptionType>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Remove existing location params
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
    const value = e.target.value.trim(); // Trim extra spaces
    setSearchTerm(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("searchTerms", value);
    } else {
      params.delete("searchTerms");
    }

    router.push(`?${params.toString()}`); // Update the URL with the search term
  };

  // const handleNavigateProduct = (id: string) => {
  //   router.push(`/product/${id}`);
  //   setSearchTerm("");
  // };

  const locationOptions = Citys.map((city) => ({
    value: city.city,
    label: city.city,
  })).sort((a, b) => a.value.localeCompare(b.value));

  return (
    <nav className="">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-purple-600"
        >
          Logo
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
              placeholder="Search..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search
              size={20}
              className="absolute top-2/4 left-3 transform -translate-y-2/4 text-gray-400"
            />
            {/* Only show search results if there's a search term */}
            {/* {searchTerm && data?.data?.length > 0 ? (
              <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mt-1 rounded shadow-md z-10">
                <ScrollArea className="h-72">
                  {data?.data?.map((product: Partial<TProduct>) => (
                    <div
                      key={product?._id}
                      onClick={() =>
                        handleNavigateProduct(product?._id as string)
                      }
                      className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Image
                        src={product?.image as string}
                        width={40}
                        height={40}
                        alt={product?.name as string}
                      />
                      <div>
                        <h1 className="text-md font-medium">{product?.name}</h1>
                        <div className="flex items-center text-xs mt-1 text-gray-500">
                          <FaLocationDot />
                          <p>{product?.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            ) : searchTerm ? (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200  mt-1 rounded shadow-md z-10 flex items-center py-5 gap-2 text-gray-500 text-md justify-center">
                <span>
                  <LuSearchX />
                </span>
                <p>No result found</p>
              </div>
            ) : null} */}
          </div>
        </div>

        {/* Be a Seller Button */}
        {user?.email ? (
          <button
            onClick={handleNavigate}
            className="bg-purple-600 px-3 md:px-4 rounded-md py-2 md:py-2.5 text-white hover:bg-purple-700 text-[10px] md:text-sm"
          >
            Dashboard
          </button>
        ) : (
          <Link href={"/signin"}>
            <button className="bg-purple-600 px-3 md:px-4 rounded-md py-2 md:py-2.5 text-white hover:bg-purple-700 text-[10px] md:text-sm">
              Be a Seller
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
            placeholder="Select Location"
            className="text-[10px] w-full"
          />
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-7 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:focus:ring-purple-500 placeholder:text-xs w-full border-gray-300 py-1.5 rounded text-xs border"
            />
            <Search
              size={14}
              className="absolute top-2/4 left-3 transform -translate-y-2/4 text-gray-400"
            />
            {/* Only show search results if there's a search term */}
            {/* {searchTerm && data?.data?.length > 0 ? (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mt-1 rounded shadow-md z-10">
                  <ScrollArea className="h-52">
                    {data?.data?.map((product: Partial<TProduct>) => (
                      <div
                        key={product?._id}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Image
                          src={product?.image as string}
                          width={30}
                          height={30}
                          alt={product?.name as string}
                        />
                        <div>
                          <h1 className="text-[10px] font-medium leading-tight">
                            {product?.name}
                          </h1>
                          <div className="flex items-center text-[10px] text-gray-500">
                            <FaLocationDot />
                            <p>{product?.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              ) : searchTerm ? (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200  mt-1 rounded shadow-md z-10 flex items-center py-5 gap-2 text-gray-500 text-xs justify-center">
                  <span>
                    <LuSearchX />
                  </span>
                  <p>No result found</p>
                </div>
              ) : null} */}
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
