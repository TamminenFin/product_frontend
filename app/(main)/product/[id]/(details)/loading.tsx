import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Skeleton */}
        <div className="flex-1">
          <div className="w-full h-[600px] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        </div>

        {/* Right Section: Product Details Skeleton */}
        <div className="flex-1 space-y-3">
          <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>

          <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>

          <div className="h-8 w-1/3 bg-gray-300 dark:bg-gray-700 rounded mt-4"></div>

          <div className="mt-6 space-y-4">
            <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>

          <div className="mt-3 space-y-4">
            <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-2/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>

          <div className="mt-3 space-y-4">
            <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-2/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>

          <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
