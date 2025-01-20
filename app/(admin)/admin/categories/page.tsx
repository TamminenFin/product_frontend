import Category from "@/components/Admin/Category";
import React from "react";

const CategoriesPage = () => {
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold text-center">
        All Category
      </h1>
      <Category />
    </div>
  );
};

export default CategoriesPage;
