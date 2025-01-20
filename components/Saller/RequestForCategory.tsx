"use client";

import { useGetCurrentSaller, useSendRequest } from "@/hooks/auth.hooks";
import { useGeatAllCategory } from "@/hooks/category.hooks";
import { TCategory } from "@/types";
import { Loader, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type TSelectCategory = { name: string; status: string }[];

const RequestForCategory = () => {
  const { data, isLoading } = useGeatAllCategory();
  const { data: sallerData, isLoading: sallerLoading } = useGetCurrentSaller();
  const [selectCategory, setSelectCategory] = useState<TSelectCategory>([]);
  const { mutate: addCategory, isPending } = useSendRequest();
  const router = useRouter();

  const handleSelect = (name: string) => {
    const categoryLimit = sallerData?.data?.categoryLimit || 5; // Default to 5 if not defined

    setSelectCategory((prev) => {
      if (prev.some((category) => category.name === name)) {
        // Remove the category if it's already selected
        return prev.filter((category) => category.name !== name);
      }

      if (prev.length >= categoryLimit) {
        toast.error(`You can select only ${categoryLimit} categories!`);
        return prev; // Return the unchanged selection if limit is exceeded
      }

      // Add the new category
      return [...prev, { name, status: "Pending" }];
    });
  };

  const isSelected = (name: string) =>
    selectCategory.some((category) => category.name === name);

  const handleNext = () => {
    addCategory(selectCategory, {
      onSuccess: (data) => {
        if (data?.success) {
          router.push("/");
        }
      },
    });
  };

  if (isLoading || sallerLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 size={30} />
      </div>
    );
  }

  return (
    <div>
      {/* Category List */}
      <div className="flex items-center justify-center flex-wrap gap-3">
        {data?.data?.map((category: TCategory) => (
          <div
            key={category?._id}
            className={`text-xs md:text-base font-medium cursor-pointer rounded-full ${
              isSelected(category?.name)
                ? "bg-blue-600 text-white py-[6px] px-[14px]"
                : "border-2 border-blue-600 py-1 px-3"
            }`}
            onClick={() => handleSelect(category?.name)}
          >
            {category?.name}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-14 flex justify-center items-center">
        <button
          onClick={handleNext}
          className={`w-full py-2 rounded-md text-white transition-colors ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600"
          }`}
          disabled={isPending}
        >
          {isPending ? (
            <Loader className="w-5 h-5 mx-auto animate-spin" />
          ) : (
            "Send Request"
          )}
        </button>
      </div>
    </div>
  );
};

export default RequestForCategory;
