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
import translate from "@/utils/translate";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddProduct = () => {
  const { data } = useGetCurrentSaller();
  const [image, setImage] = useState<File | string | null>(null);
  const { mutate: createProduct, isPending } = useCreateProduct();
  const route = useRouter();
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [priceType, setPriceType] = useState("Normal");

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();

    // Check for image before showing loading toast
    if (!image) {
      return toast.error("Please upload a product image.");
    }

    const loadingToast = toast.loading(
      "Please wait, product is being created..."
    );

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const category = selectedCategory?.map((cat: { label: string }) => ({
      name: cat.label,
    }));

    formData.append("image", image);
    formData.append(
      "data",
      JSON.stringify({
        name,
        price: parseFloat(price),
        location,
        category,
        description,
        priceType,
      })
    );

    createProduct(formData, {
      onSuccess: (data) => {
        toast.dismiss(loadingToast);
        if (data?.success) {
          toast.success("Product created successfully!");
          route.push("/dashboard/product");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      },
      onError: (err) => {
        toast.dismiss(loadingToast);
        toast.error("Failed to create product. Please try again.");
        console.error(err);
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
      <h1 className="text-2xl font-bold mb-4">
        {translate.sallerDashboard.addProductPage.heading}
      </h1>
      <form
        onSubmit={handleAddProduct}
        className="flex flex-col md:flex-row gap-8"
      >
        <div className="w-full md:w-1/2">
          <ImageUpload
            name="productImage"
            label={translate.sallerDashboard.addProductPage.labels.image}
            setUploadedFile={setImage}
            uploadedFile={image}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Label>{translate.sallerDashboard.addProductPage.labels.name}</Label>
          <Input
            name="name"
            required
            type="text"
            className="mt-1 mb-2 border-gray-300"
          />
          <Label>Select price type</Label>
          <ShadcnSelect required value={priceType} onValueChange={setPriceType}>
            <SelectTrigger className="w-full mb-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Price Type</SelectLabel>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Per Hour">por hora</SelectItem>
                <SelectItem value="Par Day">por día</SelectItem>
              </SelectGroup>
            </SelectContent>
          </ShadcnSelect>
          <Label>{translate.sallerDashboard.addProductPage.labels.price}</Label>
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
            placeholder={
              translate.sallerDashboard.addProductPage.placeholder.price
            }
          />
          <Label>
            {translate.sallerDashboard.addProductPage.labels.category}
          </Label>
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
                toast.error(
                  translate.sallerDashboard.addProductPage.selectError
                );
              } else {
                setSelectedCategory(select as []);
              }
            }}
          />
          <Label>
            {translate.sallerDashboard.addProductPage.labels.description}
          </Label>
          <Textarea
            required
            name="description"
            className="mt-1 resize-none mb-2 border-gray-300"
            rows={7}
          />
          <Button disabled={isPending} type="submit" className="mt-2 w-full">
            {translate.sallerDashboard.addProductPage.buttonText}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
