"use client";

import React, { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { TCategory, TProduct } from "@/types";
import { LuSearchX } from "react-icons/lu";
import { useGetProductBySearch } from "@/hooks/product.hooks";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { ScrollArea } from "../ui/scroll-area";
import { useUser } from "@/lib/user.provider";
import Link from "next/link";
import { useGetCurrentSaller } from "@/hooks/auth.hooks";
import PendingUserModel from "../model/PendingUserModel";
import SubscriptionEndMessage from "../model/SubscriptionEndMessage";
import { useGeatAllCategory } from "@/hooks/category.hooks";

const Navbar = () => {
  const { user } = useUser();
  const { data: userInfo } = useGetCurrentSaller();
  const { data: category, isLoading } = useGeatAllCategory();
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pendingModalOpen, setPendingModalOpen] = useState(false);
  const [endModalOpen, setEndModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const selectedCategory = searchParams.get("category");
  const selectedLocation = searchParams.get("location");

  const { data } = useGetProductBySearch(
    searchTerm,
    selectedCategory || "",
    selectedLocation || ""
  );

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", categoryName);
    router.push(`?${params.toString()}`);
  };

  const handleLocationSelect = (location: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("location", location);
    router.push(`?${params.toString()}`);
  };

  console.log(category);

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
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      setSearchResults(
        category?.data
          ?.map((cat: TCategory) => cat.name)
          .filter((name: string) =>
            name.toLowerCase().includes(value.toLowerCase())
          )
      );
    } else {
      setSearchResults([]);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md py-4">
      <div className="container mx-auto px-2 md:px-4 flex flex-wrap gap-4 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-purple-600"
        >
          Logo
        </Link>

        {/* Location Dropdown */}
        <div className="hidden sm:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {selectedLocation || "Select Location"}{" "}
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {["sylhet", "Dhaka", "chittagong"].map((location) => (
                <DropdownMenuItem
                  key={location}
                  onClick={() => handleLocationSelect(location)}
                >
                  {location}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
            {searchTerm && data?.data?.length > 0 ? (
              <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mt-1 rounded shadow-md z-10">
                <ScrollArea className="h-72">
                  {data?.data?.map((product: Partial<TProduct>) => (
                    <div
                      key={product?._id}
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
            ) : searchTerm && searchResults.length === 0 ? (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200  mt-1 rounded shadow-md z-10 flex items-center py-5 gap-2 text-gray-500 text-md justify-center">
                <span>
                  <LuSearchX />
                </span>
                <p>No result found</p>
              </div>
            ) : null}
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
          <Link href={"/signup"}>
            <button className="bg-purple-600 px-3 md:px-4 rounded-md py-2 md:py-2.5 text-white hover:bg-purple-700 text-[10px] md:text-sm">
              Be a Seller
            </button>
          </Link>
        )}

        {/* Mobile Search and Location Dropdown */}
        <div className="flex items-center gap-2 w-full sm:hidden">
          <div className="flex-1">
            <div className="relative">
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
              {searchTerm && data?.data?.length > 0 ? (
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
              ) : searchTerm && searchResults.length === 0 ? (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200  mt-1 rounded shadow-md z-10 flex items-center py-5 gap-2 text-gray-500 text-xs justify-center">
                  <span>
                    <LuSearchX />
                  </span>
                  <p>No result found</p>
                </div>
              ) : null}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center border border-gray-300 rounded gap-2 text-xs px-2 py-1.5">
                {selectedLocation || "Location"} <ChevronDown size={14} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-xs">
              {["sylhet", "Dhaka", "chittagong"].map((location) => (
                <DropdownMenuItem
                  key={location}
                  onClick={() => handleLocationSelect(location)}
                >
                  {location}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative mt-4 mx-auto container px-2 md:px-4">
        <div className="flex items-center gap-2">
          <button
            className="p-1 border border-gray-300 rounded md:rounded-md"
            onClick={handleScrollLeft}
          >
            <ChevronLeft size={20} className="hidden md:block" />
            <ChevronLeft size={12} className="md:hidden block" />
          </button>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-3 scrollbar-hide px-2"
          >
            <div
              onClick={() => handleCategoryClick("")}
              className={`flex-shrink-0 px-2 md:px-4 py-1 md:py-2 rounded md:rounded-md text-xs sm:text-sm font-medium cursor-pointer ${
                selectedCategory === ""
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              All
            </div>
            {category?.data?.map((cat: TCategory) => (
              <div
                key={cat?._id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`flex-shrink-0 px-2 md:px-4 py-1 md:py-2 rounded md:rounded-md text-xs sm:text-sm font-medium cursor-pointer ${
                  selectedCategory === cat.name
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {cat.name}
              </div>
            ))}
          </div>
          <button
            className="p-1 border border-gray-300 rounded md:rounded-md"
            onClick={handleScrollRight}
          >
            <ChevronRight size={20} className="md:block hidden" />
            <ChevronRight size={12} className="block md:hidden" />
          </button>
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
