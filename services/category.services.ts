"use server";

import axiosInstance from "@/lib/axiosInstence";
import { TRequest } from "@/types";
import { revalidateTag } from "next/cache";

export const createCategory = async (payload: { name: string }) => {
  try {
    const { data } = await axiosInstance.post(
      "/category/create-category",
      payload
    );
    revalidateTag("category");
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getAllCategory = async () => {
  try {
    const { data } = await axiosInstance.get("/category");
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getAllCategoryRequest = async () => {
  try {
    const { data } = await axiosInstance.get("/request");
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/category/remove/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getCategorys = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/category`, {
    cache: "force-cache",
    next: {
      tags: ["category"],
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const category = await res.json();
  return category;
};

export const sendCategoryRequest = async (payload: TRequest) => {
  try {
    const { data } = await axiosInstance.post("/request/create", payload);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
