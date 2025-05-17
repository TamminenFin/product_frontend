/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInstence";

export const createNewCity = async (payload: { name: string }) => {
  try {
    const { data } = await axiosInstance.post(`/city/create`, payload);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateCity = async (payload: { name: string }, id: string) => {
  try {
    const { data } = await axiosInstance.put(`/city/update/${id}`, payload);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const removeCity = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/city/remove/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getAllCity = async () => {
  try {
    const { data } = await axiosInstance.get(`/city`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
