"use client";

import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { TProduct } from "@/types";
import { useSearchParams } from "next/navigation";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Loader2 } from "lucide-react";

export default function Product() {
  const { ref, inView } = useInView();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category");
  const selectedLocation = searchParams.getAll("location[]") || [];
  const searchTerms = searchParams.get("searchTerms");

  const fetchProducts = async ({ pageParam }: { pageParam: number }) => {
    const res = await fetch(
      `https://product-serch-server.vercel.app/api/v1/product?page=${pageParam}&limit=3&location=${
        selectedLocation || ""
      }&category=${selectedCategory || ""}&searchTerms=${searchTerms || ""}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  };

  const {
    data,
    status,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", selectedCategory, selectedLocation, searchTerms],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.meta?.hasMore ? lastPage.meta.page + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, data]);

  if (status === "error") {
    return <p>Error: {error?.message || "An error occurred"}</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 mb-10">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : data?.pages.map((page, pageIndex) =>
              page?.data?.map((product: TProduct, index: number) => {
                const isLastProduct =
                  pageIndex === data.pages.length - 1 &&
                  index === page.data.length - 1;

                return (
                  <div
                    key={product._id}
                    ref={isLastProduct ? ref : undefined} // Attach ref to the last product
                  >
                    <ProductCard item={product} />
                  </div>
                );
              })
            )}
      </div>
      {isFetchingNextPage && (
        <div className="my-5 flex items-center justify-center">
          <Loader2 size={30} />
        </div>
      )}
    </>
  );
}
