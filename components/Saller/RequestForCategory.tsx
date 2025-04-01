// RequestForCategory Component
"use client";

import { useSendRequest } from "@/hooks/auth.hooks";
import { useGeatAllCategory } from "@/hooks/category.hooks";
import { TCategory } from "@/types";
import translate from "@/utils/translate";
import { Loader, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type TSelectCategory = { name: string; status: string }[];

const RequestForCategory = () => {
  const { data, isLoading } = useGeatAllCategory();
  const [selectCategory, setSelectCategory] = useState<TSelectCategory>([]);
  const { mutate: addCategory, isPending } = useSendRequest();
  const router = useRouter();

  const handleSelect = (name: string) => {
    setSelectCategory((prev) => {
      if (prev.some((category) => category.name === name)) {
        return prev.filter((category) => category.name !== name);
      }
      return [...prev, { name, status: "Active" }];
    });
  };

  const isSelected = (name: string) =>
    selectCategory.some((category) => category.name === name);

  const handleNext = () => {
    console.log(selectCategory);
    addCategory(selectCategory, {
      onSuccess: (data) => {
        console.log(data);
        if (data?.success) {
          toast.success("Request sent successfully!");
          router.push("/");
        }
      },
    });
  };

  const totalCost = selectCategory.length * 10;

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={30} />
      </div>
    );
  }

  return (
    <div>
      {/* Dynamic Cost Message */}
      <div className="text-center mb-6">
        <p className="text-lg font-medium">
          {selectCategory.length > 0
            ? `${translate.selectCategory.totalText1st} ${selectCategory.length} ${translate.selectCategory.totalText2st} S/‎${totalCost}/${translate.selectCategory.totalText3st}.`
            : translate.selectCategory.totalText}
        </p>
      </div>

      {/* Category List */}
      <div className="flex items-center justify-center flex-wrap gap-3">
        {data?.data
          ?.sort((a: TCategory, b: TCategory) => a.name.localeCompare(b.name))
          ?.map((category: TCategory) => (
            <div
              key={category?._id}
              className={`text-xs md:text-base font-medium cursor-pointer rounded-full transition-colors ${
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
            `${translate.selectCategory.button}`
          )}
        </button>
      </div>
    </div>
  );
};

export default RequestForCategory;
