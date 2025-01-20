import { useQuery } from "@tanstack/react-query";
import {
  getAdminDashboardData,
  getSallerDashboardData,
} from "@/services/dashboard.services";

export const useGetDashboardData = () => {
  return useQuery({
    queryKey: ["DASHBOARD_SALLER"],
    queryFn: async () => await getSallerDashboardData(),
  });
};
export const useGetAdminDashboardData = () => {
  return useQuery({
    queryKey: ["DASHBOARD_ADMIN"],
    queryFn: async () => await getAdminDashboardData(),
  });
};
