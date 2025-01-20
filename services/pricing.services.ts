"use server";

import axiosInstance from "@/lib/axiosInstence";
import { TPricingPlan } from "@/types";
import { revalidateTag } from "next/cache";

export const getAllPricing = async () => {
  try {
    const { data } = await axiosInstance.get(`/pricing`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
export const getSinglePricing = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/pricing/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updatePricing = async (payload: TPricingPlan, id: string) => {
  try {
    const { data } = await axiosInstance.put(`/pricing/update/${id}`, payload);
    revalidateTag("pricing");
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
