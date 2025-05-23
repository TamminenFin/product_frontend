import {
  acceptRequest,
  addCategoryToSaller,
  addTransactionId,
  changePassword,
  createUser,
  dealeteASaller,
  forgotPassword,
  getAllRequestForSallers,
  getAllSallerNeedForNotify,
  getAllSallers,
  getCurrentSaller,
  getDeadlineComingSallers,
  sendDeadlineEmail,
  sendEmailForNotify,
  sendRequest,
  signInUser,
  updateSallerProfile,
  updateSallerProfileByAdmin,
} from "@/services/auth.services";
import { TCreateUser, TSignInUser, TSubscription } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUserRegistation = () => {
  return useMutation({
    mutationKey: ["USER_REGISTATION"],
    mutationFn: async (userData: TCreateUser) => await createUser(userData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
  });
};

export const useUserSignIn = () => {
  return useMutation({
    mutationKey: ["USER_SIGNIN"],
    mutationFn: async (userData: TSignInUser) => await signInUser(userData),
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useAddCategoryToSaller = () => {
  return useMutation({
    mutationKey: ["ADD_CATEGORY_SALLER"],
    mutationFn: async (userData: { name: string; status: string }[]) =>
      await addCategoryToSaller(userData),
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useSendRequest = () => {
  return useMutation({
    mutationKey: ["ADD_CATEGORY_SALLER"],
    mutationFn: async (userData: { name: string; status: string }[]) =>
      await sendRequest(userData),
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
export const useSendDeadlineEmail = () => {
  return useMutation({
    mutationKey: ["DEADLINE_EMAIL_SEND"],
    mutationFn: async (payload: { sallerId: string }) =>
      await sendDeadlineEmail(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useAcceptRequest = () => {
  return useMutation({
    mutationKey: ["ACCEPT_REQUEST"],
    mutationFn: async (payload: TSubscription) => await acceptRequest(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
export const useAddTransactionId = () => {
  return useMutation({
    mutationKey: ["TransactionId"],
    mutationFn: async (payload: { sallerId: string; transactionId: string }) =>
      await addTransactionId(payload),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message, {
          className: "bg-red-600",
        });
      }
    },
  });
};

export const useGetCurrentSaller = (id: string, options = {}) => {
  return useQuery({
    queryKey: ["CURRENT_SALLER", id],
    queryFn: async () => await getCurrentSaller(id),
    ...options,
  });
};

export const useGetAllSaller = () => {
  return useQuery({
    queryKey: ["ALL_SALLER_3"],
    queryFn: async () => await getAllSallers(),
  });
};

export const useGetAllSallerRequest = () => {
  return useQuery({
    queryKey: ["ALL_SALLER___________"],
    queryFn: async () => await getAllRequestForSallers(),
  });
};

export const useGetSubscriptionSaller = () => {
  return useQuery({
    queryKey: ["DEADLINE_SALLER"],
    queryFn: async () => await getDeadlineComingSallers(),
  });
};

export const useRemoveSaller = () => {
  return useMutation({
    mutationKey: ["DELETE_SALLER"],
    mutationFn: async (payload: { sallerId: string }) =>
      await dealeteASaller(payload),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message, {
          className: "bg-red-600",
        });
      }
    },
  });
};

export const useUpdateSallerProfile = () => {
  return useMutation({
    mutationKey: ["UPDATE_SALLER_PROFILE"],
    mutationFn: async (userData: FieldValues) =>
      await updateSallerProfile(userData),
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
export const useUpdateSallerProfileByAdmin = () => {
  return useMutation({
    mutationKey: ["UPDATE_SALLER_PROFILE_BY_ADMIN"],
    mutationFn: async (payload: { userData: FieldValues; id: string }) =>
      await updateSallerProfileByAdmin(payload),
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useGetAllSallerNeedNotify = () => {
  return useQuery({
    queryKey: ["GET_ALL_SALLER_THOSE_NEED_TO_TOTIFY"],
    queryFn: async () => await getAllSallerNeedForNotify(),
  });
};

export const useSendEmailForNotity = () => {
  return useMutation({
    mutationKey: ["SEND_EMAIL_FOR_NOTIFY"],
    mutationFn: async (id: string) => await sendEmailForNotify(id),
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ["FORGOT_PASSWORD"],
    mutationFn: async (payload: { email: string }) =>
      await forgotPassword(payload),
  });
};
export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async (payload: { password: string; token: string }) =>
      await changePassword(payload),
  });
};
