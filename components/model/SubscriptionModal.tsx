import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // Assuming you have a ShadCN-styled Input component
import { MdEventAvailable } from "react-icons/md";
import { format } from "date-fns";
import { useAcceptRequest } from "@/hooks/auth.hooks";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sallerId: string;
  refetch: () => void;
};

const SubscriptionModal = ({ isOpen, setIsOpen, sallerId, refetch }: Props) => {
  const { isPending, mutate: acceptRequest } = useAcceptRequest();
  const today = new Date();
  const defaultStartDate = format(today, "yyyy-MM-dd");

  const handleConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;

    acceptRequest(
      { sallerId, startDate: new Date(startDate), endDate: new Date(endDate) },
      {
        onSuccess: (data) => {
          if (data?.success) {
            refetch();
            setIsOpen(false);
          }
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="font-plus max-w-[450px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <MdEventAvailable className="text-blue-600 w-8 h-8" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-semibold text-gray-800 text-center">
            Set Subscription Period
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-600 mt-2">
            Please select the start and end dates for your subscription period.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleConfirm} className="mt-4 space-y-4">
          {/* Start Date Input */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <div className="relative mt-1">
              <Input
                type="date"
                id="startDate"
                name="startDate"
                defaultValue={defaultStartDate}
                className="pr-10"
                required
                disabled={isPending}
              />
            </div>
          </div>

          {/* End Date Input */}
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <div className="relative mt-1">
              <Input
                type="date"
                id="endDate"
                name="endDate"
                className="pr-10"
                required
                disabled={isPending}
              />
            </div>
          </div>

          <button
            disabled={isPending}
            type="submit"
            className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 
              ${
                isPending
                  ? "bg-blue-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
              }`}
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
              "Confirm"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
