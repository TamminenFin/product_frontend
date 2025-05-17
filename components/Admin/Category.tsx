"use client";

import { FormEvent, useState } from "react";
import CreateCategoryModel from "../model/CreateCategoryModel";
import {
  useCreateCategory,
  useDeleteCategory,
  useGeatAllCategory,
} from "@/hooks/category.hooks";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { TCategory } from "@/types";
import { X } from "lucide-react";
import DeleteConfirmationModal from "../model/DeleteConfirmationModal";
import translate from "@/utils/translate";

type SelectedItemType = { name: string; _id: string } | null;

const Category = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelModelOpen, setIsDelModelOpen] = useState(false);
  const [selectedItem, setSelctedItem] = useState<SelectedItemType>(null);
  const { data, refetch } = useGeatAllCategory();
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleCreateCategory = (e: FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Creating category....");
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const name = formData.get("name") as string;

    createCategory(
      { name },
      {
        onSuccess: () => {
          toast.dismiss(loadingToast);
          setIsOpen(false);
          refetch();
        },
        onError: () => {
          toast.dismiss(loadingToast);
          toast.error("Failed to create category.");
        },
      }
    );
  };

  const handleDelete = () => {
    if (selectedItem) {
      deleteCategory(selectedItem?._id, {
        onSuccess: () => {
          refetch();
          setIsDelModelOpen(false);
        },
      });
    }
  };

  const hadleModelOpen = (item: { name: string; _id: string }) => {
    setSelctedItem(item);
    setIsDelModelOpen(true);
  };

  return (
    <div>
      <div className="flex justify-end mt-3">
        <button
          className="bg-purple-600 px-5 py-2 rounded-md text-white"
          onClick={() => setIsOpen(true)}
        >
          {translate.admin.categoriesPage.buttonText}
        </button>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center flex-wrap justify-center gap-4">
        {data?.data
          ?.sort((a: TCategory, b: TCategory) =>
            a?.name?.localeCompare(b?.name)
          )
          ?.map((category: TCategory) => (
            <div
              key={category?._id}
              className="flex gap-1 items-center bg-blue-600 px-4 py-1.5 rounded-full text-white"
            >
              <h1 className="text-lg">{category?.name}</h1>
              <button
                onClick={() =>
                  hadleModelOpen({ name: category.name, _id: category?._id })
                }
              >
                <X size={16} className="text-red-600" />
              </button>
            </div>
          ))}
      </div>
      <CreateCategoryModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClick={handleCreateCategory}
      />
      <DeleteConfirmationModal
        isOpen={isDelModelOpen}
        setIsOpen={setIsDelModelOpen}
        handleDelete={handleDelete}
        itemName={selectedItem?.name || ""}
      />
    </div>
  );
};

export default Category;
