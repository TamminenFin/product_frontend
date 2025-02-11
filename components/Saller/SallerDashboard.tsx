"use client";
import { useGetDashboardData } from "@/hooks/dashboard.hooks";
import { Card } from "../ui/card";
import { useGetCurrentSaller } from "@/hooks/auth.hooks";

const SallerDashboard = () => {
  const { data, isLoading } = useGetDashboardData();
  const { data: sallerInfo, isLoading: IsSallerLoading } =
    useGetCurrentSaller();
  if (isLoading || IsSallerLoading) return <div>Loading...</div>;

  const todaysDate = new Date();
  const subscriptionEndDate = new Date(sallerInfo?.data?.subEndDate);

  const timeDefference = subscriptionEndDate.getTime() - todaysDate.getTime();

  const dayCount = timeDefference / (1000 * 60 * 60 * 24);

  return (
    <>
      <h1 className="text-xl font-semibold mb-7">
        Your subscription will end in : {dayCount.toFixed()} day
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Total Product</div>
          </div>
          <div className="mt-4 text-2xl md:text-3xl font-semibold">
            {data?.data?.productCount}
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Total Category</div>
          </div>
          <div className="mt-4 text-2xl md:text-3xl font-semibold">
            {data?.data?.categoryCount}
          </div>
        </Card>
      </div>
    </>
  );
};

export default SallerDashboard;
