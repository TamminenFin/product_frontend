"use client";

import { TCategory } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

const Categories = ({ category }: { category: TCategory[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", categoryName);
    router.push(`?${params.toString()}`);
  };

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

  return (
    <div className="relative lg:mt-3 mt-1 mx-auto container">
      <div className="flex items-center gap-2">
        {/* Scroll Left Button */}
        <button
          className="p-2 border border-gray-300 rounded-full md:rounded-md"
          onClick={handleScrollLeft}
        >
          <ChevronLeft size={20} className="hidden md:block" />
          <ChevronLeft size={12} className="md:hidden block" />
        </button>

        {/* Categories Container with overflow hidden */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-3 scrollbar-hide px-2 py-1 w-full"
        >
          {/* All Categories Button */}
          <div
            onClick={() => handleCategoryClick("")}
            className={`flex-shrink-0 px-4 py-2 rounded-md text-xs sm:text-sm font-medium cursor-pointer whitespace-nowrap ${
              selectedCategory === ""
                ? "bg-purple-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All
          </div>

          {/* Category Buttons */}
          {category
            ?.sort((a: TCategory, b: TCategory) => a.name.localeCompare(b.name))
            ?.map((cat: TCategory) => (
              <div
                key={cat?._id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`flex-shrink-0 px-4 py-2 rounded-md text-xs sm:text-sm font-medium cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.name
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {cat.name}
              </div>
            ))}
        </div>

        {/* Scroll Right Button */}
        <button
          className="p-2 border border-gray-300 rounded-full md:rounded-md"
          onClick={handleScrollRight}
        >
          <ChevronRight size={20} className="md:block hidden" />
          <ChevronRight size={12} className="block md:hidden" />
        </button>
      </div>
    </div>
  );
};

export default Categories;
