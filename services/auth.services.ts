/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/axiosInstence";
import { TCreateUser, TSignInUser, TSubscription } from "@/types";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { FieldValues } from "react-hook-form";

export const createUser = async (userData: TCreateUser) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);
    if (data?.success) {
      (await cookies()).set("accessToken", data?.data?.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1500,
      });
      (await cookies()).set("refreshToken", data?.data?.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });
    }
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = (await cookies()).get("refreshToken")?.value;
    const { data } = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        "x-refresh-token": refreshToken,
      },
    });
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return decodedToken;
  }
  return decodedToken;
};

export const signInUser = async (payload: TSignInUser) => {
  try {
    const { data } = await axiosInstance.post("/auth/signin", payload);
    if (data?.success) {
      (await cookies()).set("accessToken", data?.data?.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1500,
      });
      (await cookies()).set("refreshToken", data?.data?.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });
    }
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const addCategoryToSaller = async (
  payload: { name: string; status: string }[]
) => {
  try {
    const { data } = await axiosInstance.put(`/auth/add-category`, payload);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const sendRequest = async (
  payload: { name: string; status: string }[]
) => {
  try {
    const { data } = await axiosInstance.put(
      `/auth/saller/send-request`,
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const sendDeadlineEmail = async (payload: { sallerId: string }) => {
  try {
    const { data } = await axiosInstance.post(
      `/auth/saller/send-email`,
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const acceptRequest = async (payload: TSubscription) => {
  try {
    const { data } = await axiosInstance.put(
      `/auth/sallers/accept-request`,
      payload
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getCurrentSaller = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/auth/current-saller/${id}`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
export const getAllSallers = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/sallers`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
export const getAllRequestForSallers = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/sallers/request`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getDeadlineComingSallers = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/saller/deadline-comming`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const addTransactionId = async (payload: {
  sallerId: string;
  transactionId: string;
}) => {
  try {
    const { data } = await axiosInstance.put(`/auth/saller/add-transactionId`, {
      payload,
    });
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const logoutUser = async () => {
  try {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
  } catch (err: any) {
    return err;
  }
};

export const dealeteASaller = async (payload: { sallerId: string }) => {
  try {
    const { data } = await axiosInstance.delete(
      `/auth/saller/remove/${payload.sallerId}`
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateSallerProfile = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.put(`/auth/saller/update`, payload);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
export const updateSallerProfileByAdmin = async (payload: {
  userData: FieldValues;
  id: string;
}) => {
  try {
    const { data } = await axiosInstance.put(
      `/auth/saller/update/${payload.id}`,
      payload.userData
    );
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getAllSallerNeedForNotify = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/saller/reminder`);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const sendEmailForNotify = async (id: string) => {
  try {
    const { data } = await axiosInstance.patch(`/auth/send-notify-email`, {
      id,
    });
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const forgotPassword = async (payload: { email: string }) => {
  try {
    const { data } = await axiosInstance.post(`/auth/forgot-password`, payload);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
export const changePassword = async (payload: {
  password: string;
  token: string;
}) => {
  try {
    const { data } = await axiosInstance.post(`/auth/change-password`, payload);
    return data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
