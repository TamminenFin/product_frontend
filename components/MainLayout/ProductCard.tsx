import { TProduct } from "@/types";
import Image from "next/image";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

const ProductCard: React.FC<{ item: TProduct }> = ({ item }) => {
  return (
    <Link href={`/product/${item._id}`} passHref>
      <div className="p-4 bg-white bg-opacity-30 backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-30 dark:backdrop-blur-md rounded-lg border border-gray-200">
        <div className="rounded-md mb-4">
          <Image
            src={item.image}
            alt={item.name}
            width={360}
            height={360}
            className="object-cover w-full h-[120px] md:h-[200px] p-0"
          />
        </div>

        <div className="text-gray-600 text-sm mt-1">
          <div className="flex items-center gap-1.5">
            <FaLocationDot />
            <p>{item.location}</p>
          </div>
          <h2 className="text-md md:text-base mt-2 font-medium text-gray-800 dark:text-white">
            {item.name}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
