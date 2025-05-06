"use client";
import { useGetDashboardData } from "@/hooks/dashboard.hooks";
import { Card } from "../ui/card";
import { useGetCurrentSaller } from "@/hooks/auth.hooks";
import translate from "@/utils/translate";
import { useUser } from "@/lib/user.provider";

const SallerDashboard = () => {
  const { user } = useUser();
  const { data, isLoading } = useGetDashboardData();
  const { data: sallerInfo, isLoading: IsSallerLoading } = useGetCurrentSaller(
    user?._id as string
  );
  console.log({ sallerInfo });
  console.log({ data });
  console.log({ user });
  if (isLoading || IsSallerLoading) return <div>Loading...</div>;

  const todaysDate = new Date();
  const subscriptionEndDate = new Date(sallerInfo?.data?.subEndDate);

  const timeDefference = subscriptionEndDate.getTime() - todaysDate.getTime();

  const dayCount = timeDefference / (1000 * 60 * 60 * 24);

  return (
    <>
      <h1 className="text-xl font-semibold mb-7">
        {translate.sallerDashboard.dashboardPage.headings.beforeDateText}{" "}
        {dayCount.toFixed()}{" "}
        {translate.sallerDashboard.dashboardPage.headings.afterDateText}
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">
              {" "}
              {translate.sallerDashboard.dashboardPage.cardTitels.totalProduct}
            </div>
          </div>
          <div className="mt-4 text-2xl md:text-3xl font-semibold">
            {data?.data?.productCount}
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">
              {" "}
              {translate.sallerDashboard.dashboardPage.cardTitels.totalCategory}
            </div>
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
