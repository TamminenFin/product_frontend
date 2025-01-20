import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { TPricingPlan } from "@/types";
import { useUpdatePricing } from "@/hooks/pricing.hooks";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  plan: TPricingPlan;
  refetch: () => void;
};

const PricingEditModal = ({ isOpen, setIsOpen, plan, refetch }: Props) => {
  const [features, setFeatures] = useState<string[]>([""]);
  const { mutate: updatePricing, isPending } = useUpdatePricing();

  useEffect(() => {
    setFeatures(plan.features);
  }, [plan]);

  // Handle feature input updates
  const handleFeatureChange = (value: string, index: number) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  // Add a new feature input field
  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  // Remove a feature input field
  const removeFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Extract values directly from the form elements
    const price = (document.getElementById("price") as HTMLInputElement).value;
    const title = (document.getElementById("title") as HTMLInputElement).value;

    // Check if price or title is invalid
    if (!price || !title) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const payload = { features, price: parseInt(price), title };
    updatePricing(
      { formData: payload, id: plan._id as string },
      {
        onSuccess: (data) => {
          if (data?.success) {
            setIsOpen(false);
            refetch();
          }
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="font-plus max-w-[450px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800 text-center">
            Edit Pricing Details
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-600 mt-2">
            Update the pricing details below and save your changes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Input
              type="text"
              id="title"
              defaultValue={plan?.title}
              placeholder="Enter pricing title"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Price Input */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <Input
              type="number"
              id="price"
              defaultValue={plan.price}
              placeholder="Enter price"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Features Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Features
            </label>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(e.target.value, index)}
                    placeholder={`Feature ${index + 1}`}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFeature}
              className="mt-3 text-blue-500 hover:text-blue-700 font-medium"
            >
              + Add Feature
            </button>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-5">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded-md font-medium hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition duration-200"
            >
              {isPending ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PricingEditModal;
