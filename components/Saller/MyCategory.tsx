"use client";
import { Separator } from "@/components/ui/separator";
import {
  useAddCategoryToSaller,
  useGetCurrentSaller,
} from "@/hooks/auth.hooks";
import { useGeatAllCategory } from "@/hooks/category.hooks";
import { useUser } from "@/lib/user.provider";
import { TCategory } from "@/types";
import translate from "@/utils/translate";
import { useEffect, useState } from "react";

type TSelectCategory = { name: string; status: string }[];

const MyCategory = () => {
  const { user } = useUser();
  const { data, refetch } = useGeatAllCategory();
  const [selectCategory, setSelectCategory] = useState<TSelectCategory>([]);
  const { data: sallerInfo } = useGetCurrentSaller(user?._id as string);
  const { mutate: addCategory, isPending } = useAddCategoryToSaller();

  useEffect(() => {
    setSelectCategory(sallerInfo?.data?.categories || []);
  }, [sallerInfo, data]);

  const isSelected = (name: string) =>
    selectCategory?.some((category) => category.name === name);

  const handleSelect = (name: string) => {
    setSelectCategory((prev) => {
      if (prev.some((category) => category.name === name)) {
        return prev.filter((category) => category.name !== name);
      }
      return [...prev, { name, status: "Pending" }];
    });
  };

  const isUpdateDisabled = () => {
    const selectedNames = selectCategory
      .map((category) => category.name)
      .sort();
    const originalNames = (sallerInfo?.data?.categories || [])
      .map((category: TCategory) => category.name)
      .sort();
    return JSON.stringify(selectedNames) === JSON.stringify(originalNames);
  };

  const handleCategory = () => {
    addCategory(selectCategory, {
      onSuccess: () => {
        refetch();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <div className="">
      <h1 className="text-xl md:text-2xl font-semibold text-center">
        {translate.sallerDashboard.myCategoryPage.heading}
      </h1>
      <p className="text-gray-500 text-center">
        {translate.sallerDashboard.myCategoryPage.title}
      </p>
      <Separator className="my-4 w-full" />
      <div>
        <div className="flex items-center justify-center flex-wrap gap-3">
          {data?.data
            ?.sort((a: TCategory, b: TCategory) =>
              a?.name?.localeCompare(b?.name)
            )
            ?.map((category: TCategory) => (
              <div
                className={`text-xs md:text-base font-medium cursor-pointer rounded-full ${
                  isSelected(category?.name)
                    ? "bg-blue-600 text-white py-[6px] px-[14px]"
                    : "border-2 border-blue-600 py-1 px-3"
                }`}
                key={category?._id}
                onClick={() => handleSelect(category?.name)}
              >
                {category?.name}
              </div>
            ))}
        </div>
        <div className="mt-14 flex justify-center items-center">
          <button
            onClick={handleCategory}
            className="bg-blue-600 px-5 py-2 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isUpdateDisabled() || isPending}
          >
            {translate.sallerDashboard.myCategoryPage.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCategory;
