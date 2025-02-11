"use client";

import { useGetAllPlan } from "@/hooks/pricing.hooks";
import { TPricingPlan } from "@/types";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import PricingEditModal from "../model/PricingEditModal";

const Pricing = () => {
  const { data, isLoading, refetch } = useGetAllPlan();
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<TPricingPlan | null>(null);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {data?.data?.map((plan: TPricingPlan, idx: number) => (
        <div
          key={plan._id}
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
          <button
            onClick={() => {
              setSelectedPlan(plan);
              setOpen(true);
            }}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit
          </button>
        </div>
      ))}
      {selectedPlan && (
        <PricingEditModal
          isOpen={open}
          setIsOpen={setOpen}
          plan={selectedPlan}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Pricing;
