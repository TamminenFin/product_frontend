import {
  getAllPricing,
  getSinglePricing,
  updatePricing,
} from "@/services/pricing.services";
import { TPricingPlan } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAllPlan = () => {
  return useQuery({
    queryKey: ["PRICING"],
    queryFn: async () => await getAllPricing(),
  });
};

export const useGetSinglePlan = (id: string) => {
  return useQuery({
    queryKey: ["PRICING_SINGLE"],
    queryFn: async () => await getSinglePricing(id),
  });
};

type UpdatePricingParams = {
  formData: TPricingPlan;
  id: string;
};

export const useUpdatePricing = () => {
  return useMutation({
    mutationKey: ["UPDATE_PLAN"],
    mutationFn: async ({ formData, id }: UpdatePricingParams) => {
      return await updatePricing(formData, id);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
};
