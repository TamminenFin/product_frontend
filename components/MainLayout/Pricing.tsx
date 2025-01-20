"use client";

import { useGetAllPlan } from "@/hooks/pricing.hooks";
import { TPricingPlan } from "@/types";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const Pricing = () => {
  const { data, isLoading } = useGetAllPlan();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {data?.data?.map((plan: TPricingPlan, idx: number) => (
        <div
          key={idx}
          className={`bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow ${
            idx === 1 ? "border-2 border-blue-600" : ""
          }`}
        >
          <div className="text-center mb-6">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
              {plan.title}
            </h3>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              ${plan.price}/mo
            </p>
          </div>
          <ul className="space-y-4 mb-8">
            {plan.features.map((feature: string, featureIdx: number) => (
              <li key={featureIdx} className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm sm:text-base lg:text-lg">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href={`/signup?categoryLimit=${
              plan._id === "678d32da6be81a3e8cc82348"
                ? "5"
                : plan._id === "678d32fc6be81a3e8cc8234a"
                ? "10"
                : "unlimeted"
            }`}
          >
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Pricing;
