import {
  createNewCity,
  getAllCity,
  removeCity,
  updateCity,
} from "@/services/city.services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateCity = () => {
  return useMutation({
    mutationKey: ["CREATE_A_CITY"],
    mutationFn: async (payload: { name: string }) => {
      return await createNewCity(payload);
    },
  });
};

export const useUpdateCity = () => {
  return useMutation({
    mutationKey: ["UPDATE_A_CITY"],
    mutationFn: async (payload: { payload: { name: string }; id: string }) => {
      return await updateCity(payload.payload, payload.id);
    },
  });
};

export const useRemoveCity = () => {
  return useMutation({
    mutationKey: ["REMOVE_A_CITY"],
    mutationFn: async (payload: string) => {
      return await removeCity(payload);
    },
  });
};

export const useGetAllCity = () => {
  return useQuery({
    queryKey: ["GET_ALL_CITY"],
    queryFn: async () => await getAllCity(),
  });
};
