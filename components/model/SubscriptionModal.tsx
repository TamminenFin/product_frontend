import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MdEventAvailable } from "react-icons/md";
import { format, parseISO } from "date-fns";
import { useAcceptRequest } from "@/hooks/auth.hooks";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plus } from "lucide-react";
import { Calendar } from "../ui/calendar";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sallerId: string;
  refetch: () => void;
  dates: { startDate: string; endDate: string };
};

const SubscriptionModal = ({
  isOpen,
  setIsOpen,
  sallerId,
  refetch,
  dates,
}: Props) => {
  const { isPending, mutate: acceptRequest } = useAcceptRequest();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [initialStartDate, setInitialStartDate] = useState<Date | undefined>();
  const [initialEndDate, setInitialEndDate] = useState<Date | undefined>();

  useEffect(() => {
    const parsedStartDate = dates.startDate
      ? parseISO(dates.startDate)
      : undefined;
    const parsedEndDate = dates.endDate ? parseISO(dates.endDate) : undefined;
    setStartDate(parsedStartDate);
    setEndDate(parsedEndDate);
    setInitialStartDate(parsedStartDate);
    setInitialEndDate(parsedEndDate);
  }, [dates]);

  const isDateChanged =
    startDate !== initialStartDate || endDate !== initialEndDate;

  const handleConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!startDate || !endDate) {
      alert("Both start and end dates are required.");
      return;
    }
    acceptRequest(
      { sallerId, startDate, endDate },
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

  const handleAddOneMonth = () => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    if (today > new Date(dates.endDate)) {
      setStartDate(today);
      setEndDate(nextMonth);
    } else {
      const updateEndDate = new Date(dates.endDate);
      updateEndDate.setMonth(updateEndDate.getMonth() + 1);
      setEndDate(updateEndDate);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <p>
              Please select the start and end dates for your subscription
              period.
            </p>
            <Button
              onClick={handleAddOneMonth}
              variant="outline"
              className="mt-2"
            >
              <Plus /> Month
            </Button>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleConfirm} className="mt-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2" />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Select start date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2" />
                  {endDate ? (
                    format(endDate, "PPP")
                  ) : (
                    <span>Select end date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <button
            disabled={isPending || !isDateChanged}
            type="submit"
            className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isPending || !isDateChanged
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
