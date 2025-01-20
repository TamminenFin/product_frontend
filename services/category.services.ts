"use server";

import axiosInstance from "@/lib/axiosInstence";
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
    revalidateTag("category");
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
  try {
    const res = await fetch("http://localhost:5000/api/v1/category", {
      next: {
        tags: ["category"],
      },
    });
    return res.json();
  } catch (err: any) {
    return err?.response?.data;
  }
};
