// import RelatedProduct from "@/components/MainLayout/RelatedProduct";
import { getSingleProduct } from "@/services/product.services";
import translate from "@/utils/translate";
import Image from "next/image";
import React from "react";

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const data = await getSingleProduct(params?.id);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Image
            width={500}
            height={600}
            src={data?.data?.image}
            alt={data?.data?.name}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        {/* Right Section: Product Details */}
        <div className="flex-1 space-y-3">
          <h1 className="md:text-3xl text-2xl font-bold text-gray-900">
            {data?.data?.name}
          </h1>
          <div className="text-md md:text-xl text-gray-700">
            {data?.data?.category?.map((cat: { name: string }) => (
              <span className="font-semibold" key={cat?.name}>
                {cat.name} ,
              </span>
            ))}
          </div>

          <div className="text-xl sm:text-2xl font-semibold text-gray-800 mt-4">
            S/‎{data?.data?.price}{" "}
            {data?.data?.priceType === "Per Hour"
              ? "per hours"
              : data?.data?.priceType === "Par Day"
              ? "Par Day"
              : ""}
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm sm:text-base text-gray-500">
                {translate.productDetailsPage.labels.location}:
              </span>
              <span className="text-gray-700">{data?.data?.location}</span>
            </div>
          </div>
          <div className="mt-3 space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm sm:text-base text-gray-500">
                {translate.productDetailsPage.labels.shopName}:
              </span>
              <span className="text-gray-700">
                {data?.data?.sallerId?.shopName}
              </span>
            </div>
          </div>
          <div className="mt-3 space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm sm:text-base text-gray-500">
                {translate.productDetailsPage.labels.phoneNumber}:
              </span>
              <span className="text-gray-700">
                {data?.data?.sallerId?.phone}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm md:text-base">
            {data?.data?.description}
          </p>
        </div>
      </div>
      {/* <h1 className="mt-5 md:mt-10 mb-2 text-2xl md:text-3xl font-semibold">
        Related Product
      </h1>
      <RelatedProduct /> */}
    </div>
  );
};

export default ProductDetails;
