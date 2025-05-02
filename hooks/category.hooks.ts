import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getAllCategoryRequest,
  sendCategoryRequest,
} from "@/services/category.services";
import { TRequest } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCategory = () => {
  return useMutation({
    mutationKey: ["CREATE_CATEGORY"],
    mutationFn: async (payload: { name: string }) =>
      await createCategory(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGeatAllCategory = () => {
  return useQuery({
    queryKey: ["CATEGORY"],
    queryFn: async () => await getAllCategory(),
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationKey: ["DELETE_CATEGORY"],
    mutationFn: async (id: string) => await deleteCategory(id),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data?.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useSendCategoryRequest = () => {
  return useMutation({
    mutationKey: ["REQUEST_CATEGORY"],
    mutationFn: async (payload: TRequest) => await sendCategoryRequest(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllCategoryRequest = () => {
  return useQuery({
    queryKey: ["CATEGORY_REQUEST"],
    queryFn: async () => await getAllCategoryRequest(),
  });
};
