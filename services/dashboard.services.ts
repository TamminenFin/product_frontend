"use server";
import axiosInstance from "@/lib/axiosInstence";

export const getSallerDashboardData = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/saller`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
export const getAdminDashboardData = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/admin`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
