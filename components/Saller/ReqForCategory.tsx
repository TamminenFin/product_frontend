"use client";
import { useSendCategoryRequest } from "@/hooks/category.hooks";
import { useUser } from "@/lib/user.provider";
import React from "react";

const ReqForCategory = () => {
  const { mutate, isPending } = useSendCategoryRequest();
  const { user } = useUser();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const categoryName = formData.get("categoryName");
    const productCount = formData.get("productCount");

    const payload = {
      name: categoryName as string,
      productCount: Number(productCount),
      sallerId: user?._id as string,
      email: user?.email as string,
    };

    mutate(payload);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-50px)]">
      <div className="max-w-md w-full px-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Request a New Category
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
              Category Name
            </label>
            <input
              type="text"
              name="categoryName"
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
              Number of Products
            </label>
            <input
              type="number"
              name="productCount"
              required
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            {isPending ? "Sending..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReqForCategory;
