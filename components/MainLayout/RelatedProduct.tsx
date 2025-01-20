"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function RelatedProduct() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);

  const products = [
    { id: 1, name: "Product 1", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Product 2", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Product 3", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Product 4", image: "https://via.placeholder.com/150" },
    { id: 5, name: "Product 5", image: "https://via.placeholder.com/150" },
    { id: 6, name: "Product 6", image: "https://via.placeholder.com/150" },
  ];

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(2);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(3);
      } else {
        setItemsToShow(4);
      }
    };

    updateItemsToShow(); // Initial check
    window.addEventListener("resize", updateItemsToShow);

    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, products.length - itemsToShow)
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= products.length - itemsToShow}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div
        className="flex transition-transform duration-300"
        style={{
          transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="p-2 flex-shrink-0"
            style={{ flexBasis: `${100 / itemsToShow}%` }}
          >
            <div className="p-4 border rounded shadow">
              <Image
                width={500}
                height={200}
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="mt-2 text-lg font-semibold text-center">
                {product.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
