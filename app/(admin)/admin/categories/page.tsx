import Category from "@/components/Admin/Category";
import translate from "@/utils/translate";
import React from "react";

const CategoriesPage = () => {
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold text-center">
        {translate.admin.categoriesPage.heading}
      </h1>
      <Category />
    </div>
  );
};

export default CategoriesPage;
