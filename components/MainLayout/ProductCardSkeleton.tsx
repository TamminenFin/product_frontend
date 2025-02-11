import React from "react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="p-3 bg-white bg-opacity-30 backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-30 dark:backdrop-blur-md rounded-lg border border-gray-200 animate-pulse">
      <div className="rounded-md mb-4 bg-gray-300 dark:bg-gray-600 w-full h-[120px] md:h-[200px]"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
