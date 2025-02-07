"use client";

import { FormEvent, useState } from "react";
import ImageUpload from "../shared/ImageUpload";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useGetCurrentSaller } from "@/hooks/auth.hooks";
import Select from "react-select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useCreateProduct } from "@/hooks/product.hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TCategory } from "@/types";

const AddProduct = () => {
  const { data } = useGetCurrentSaller();
  const [image, setImage] = useState<File | string | null>(null);
  const { mutate: createProduct, isPending } = useCreateProduct();
  const route = useRouter();
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Please wait,Product is creating...");
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const category = selectedCategory?.map((cat: { label: string }) => ({
      name: cat.label,
    }));

    if (image) {
      formData.append("image", image);
    }
    formData.append(
      "data",
      JSON.stringify({
        name,
        price: parseFloat(price),
        location,
        category,
        description,
      })
    );

    createProduct(formData, {
      onSuccess: (data) => {
        console.log(data);
        if (data?.success) {
          toast.dismiss(loadingToast);
          route.push("/dashboard/product");
        }
      },
      onError: () => {
        toast.dismiss(loadingToast);
      },
    });
  };

  const categoryOption =
    data?.data?.categories?.map((category: TCategory) => ({
      label: category.name,
      value: category.name,
    })) || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form
        onSubmit={handleAddProduct}
        className="flex flex-col md:flex-row gap-8"
      >
        <div className="w-full md:w-1/2">
          <ImageUpload
            name="productImage"
            label="Upload Product Image"
            setUploadedFile={setImage}
            uploadedFile={image}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Label>Name</Label>
          <Input
            name="name"
            required
            type="text"
            className="mt-1 mb-2 border-gray-300"
          />
          <Label>Price</Label>
          <Input
            name="price"
            required
            type="text"
            className="mt-1 mb-2 border-gray-300"
            value={price}
            onChange={(e) => {
              const value = e.target.value;
              // Validate and allow only numbers with optional decimals
              if (/^\d*\.?\d*$/.test(value)) {
                setPrice(value);
              }
            }}
            placeholder="Enter price (e.g., 20.45)"
          />
          <Label>Category</Label>
          <Select
            isMulti
            name="category"
            required
            options={categoryOption}
            className="basic-multi-select mb-2"
            classNamePrefix="select"
            value={selectedCategory}
            onChange={(select) => {
              if (select.length > 2) {
                toast.error("You can select maximum 2 category!");
              } else {
                setSelectedCategory(select as []);
              }
            }}
          />
          <Label>Description</Label>
          <Textarea
            required
            name="description"
            className="mt-1 resize-none mb-2 border-gray-300"
            rows={7}
          />
          <Button disabled={isPending} type="submit" className="mt-2 w-full">
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
