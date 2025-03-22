import Categories from "@/components/MainLayout/Categories";
import { getCategorys } from "@/services/category.services";
import React from "react";

const DefaultPage = async () => {
  const category = await getCategorys();
  return (
    <div>
      <Categories category={category?.data} />
    </div>
  );
};

export default DefaultPage;
