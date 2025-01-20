"use client";

import { useGetSingleProduct, useUpdateProduct } from "@/hooks/product.hooks";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import Select from "react-select";
import { Input } from "../ui/input";
import ImageUpload from "../shared/ImageUpload";
import { FormEvent, useEffect, useState } from "react";
import { useGetCurrentSaller } from "@/hooks/auth.hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TCategory } from "@/types";

const EditProduct = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetSingleProduct(id);
  const [image, setImage] = useState<File | string | null>(null);
  const { data: sallerInfo, isLoading: isSallerLoading } =
    useGetCurrentSaller();
  const { mutate: updateProduct, isPending: isProductUpdating } =
    useUpdateProduct();
  const route = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<
    { label: string; value: string }[]
  >([]);

  // Set default category when data is fetched
  useEffect(() => {
    if (data?.data?.category) {
      const defaultCategories = data.data.category.map((cat: TCategory) => ({
        label: cat.name,
        value: cat.name,
      }));
      setSelectedCategory(defaultCategories);
    }
  }, [data]);

  const handelEditProduct = (e: FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Please wait, product is updating...");
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;

    const category = selectedCategory.map((cat) => cat.value);

    if (image instanceof File) {
      formData.append("image", image);
    }
    formData.append(
      "data",
      JSON.stringify({ name, price, location, category, description })
    );

    const payload = { formData, id };

    updateProduct(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.dismiss(loadingToast);
          route.push("/dashboard/product");
        }
      },
      onError: () => {
        toast.dismiss(loadingToast);
        toast.error("Failed to update the product");
      },
    });
  };

  if (isLoading || isSallerLoading) {
    return <p>Loading...</p>;
  }

  const categoryOption =
    sallerInfo?.data?.categories?.map((cat: TCategory) => ({
      label: cat.name,
      value: cat.name,
    })) || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form
        onSubmit={handelEditProduct}
        className="flex flex-col md:flex-row gap-8"
      >
        <div className="w-full md:w-1/2">
          <ImageUpload
            name="productImage"
            label="Upload Product Image"
            setUploadedFile={setImage}
            uploadedFile={image}
            defaultImage={data?.data?.image}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Label>Name</Label>
          <Input
            defaultValue={data?.data?.name}
            name="name"
            required
            type="text"
            className="mt-1 mb-2 border-gray-300"
          />
          <Label>Price</Label>
          <Input
            defaultValue={data?.data?.price}
            name="price"
            required
            type="number"
            className="mt-1 mb-2 border-gray-300"
          />
          <Label>Category</Label>
          <Select
            isMulti
            name="category"
            options={categoryOption}
            className="basic-multi-select mb-2"
            classNamePrefix="select"
            value={selectedCategory}
            onChange={(selected) => {
              if (selected.length > 2) {
                toast.error("You can select a maximum of 2 categories!");
              } else {
                setSelectedCategory(selected as []);
              }
            }}
          />
          <Label>Description</Label>
          <Textarea
            defaultValue={data?.data?.description}
            required
            name="description"
            className="mt-1 resize-none mb-2 border-gray-300"
            rows={7}
          />
          <Button
            disabled={isProductUpdating}
            type="submit"
            className="mt-2 w-full"
          >
            Edit Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
