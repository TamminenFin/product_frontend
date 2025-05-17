/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/axiosInstence";

export const createProduct = async (payload: FormData) => {
  try {
    const { data } = await axiosInstance.post(
      "/product/create-product",
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
export const getAllProduct = async () => {
  try {
    const { data } = await axiosInstance.get(`/product/get-products`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
export const getSingleProduct = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/product/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateProduct = async (payload: FormData, id: string) => {
  try {
    const { data } = await axiosInstance.post(
      `/product/update-product/${id}`,
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/product/delete/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getRelatedProduct = async () => {
  try {
    const { data } = await axiosInstance.get("/product/product");
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getSearchProduct = async (
  searchTerms: string,
  category: string,
  location: string
) => {
  try {
    const { data } = await axiosInstance.get(
      `/product/search?searchTerms=${searchTerms}&location=${location}&category=${category}`
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getSallerProduct = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/product/saller/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getProductDetailsWithSallerInfo = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/product/product-details/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
