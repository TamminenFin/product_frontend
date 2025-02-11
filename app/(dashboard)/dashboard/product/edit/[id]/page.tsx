import EditProduct from "@/components/Saller/EditProduct";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      <EditProduct id={id} />
    </div>
  );
};

export default Page;
