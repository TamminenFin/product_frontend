import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSallerProduct,
  getSearchProduct,
  getSingleProduct,
  updateProduct,
} from "@/services/product.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ["CREATE_PRODUCT"],
    mutationFn: async (userData: FormData) => await createProduct(userData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useGetAllProduct = (date: DateRange | undefined) => {
  return useQuery({
    queryKey: ["GET_ALL_PRODUCT", date],
    queryFn: async () => await getAllProduct(date),
  });
};
export const useGetSingleProduct = (id: string) => {
  return useQuery({
    queryKey: ["GET_ALL_PRODUCT"],
    queryFn: async () => await getSingleProduct(id),
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationKey: ["UPDATE_PRODUCT"],
    mutationFn: async ({
      formData,
      id,
    }: {
      formData: FormData;
      id: string;
    }) => {
      return await updateProduct(formData, id);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationKey: ["DELETE_PRODUCT"],
    mutationFn: async (id: string) => await deleteProduct(id),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useGetProductBySearch = (
  searchTerms: string,
  category: string,
  location: string
) => {
  return useQuery({
    queryKey: ["SEARCH_PRODUCT", searchTerms, category, location],
    queryFn: async () =>
      await getSearchProduct(searchTerms, category, location),
  });
};

export const useGetSallerProduct = (id: string) => {
  return useQuery({
    queryKey: ["SEARCH_PRODUCT", id],
    queryFn: async () => await getSallerProduct(id),
  });
};
