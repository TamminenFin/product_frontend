"use server";
import axiosInstance from "@/lib/axiosInstence";
import { TCreateUser, TSignInUser, TSubscription } from "@/types";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const createUser = async (userData: TCreateUser) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);
    if (data?.success) {
      cookies().set("accessToken", data?.data?.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 300,
      });
      cookies().set("refreshToken", data?.data?.refreshToken, {
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
    const refreshToken = cookies().get("refreshToken")?.value;
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
      cookies().set("accessToken", data?.data?.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 300,
      });
      cookies().set("refreshToken", data?.data?.refreshToken, {
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

export const getCurrentSaller = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/current-saller`);
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
