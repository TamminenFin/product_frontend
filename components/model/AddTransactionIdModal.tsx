import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddTransactionId } from "@/hooks/auth.hooks";
import { Plus } from "lucide-react";
import { FormEvent } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  id: string;
};

const AddTransactionIdModal = ({ isOpen, setIsOpen, refetch, id }: Props) => {
  const { mutate, isPending } = useAddTransactionId();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const transactionId = formData.get("transactionId") as string;

    mutate(
      { sallerId: id, transactionId: transactionId },
      {
        onSuccess: () => {
          refetch();
          setIsOpen(false);
        },
      }
    );
  };
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="font-plus max-w-[525px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            Add Transaction ID
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-2">
            Please enter the transaction ID carefully. Once submitted, this ID
            cannot be changed.
          </DialogDescription>
        </DialogHeader>

        {/* Transaction ID Input */}
        <form className="mt-3" onSubmit={handleSubmit}>
          <label
            htmlFor="transaction-id"
            className="block text-sm font-medium text-gray-700"
          >
            Transaction ID
          </label>
          <input
            id="transaction-id"
            name="transactionId"
            type="number"
            maxLength={6}
            placeholder="Enter transaction ID"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#D72323] focus:border-[#D72323] transition duration-150 ease-in-out"
          />
          <div className="flex justify-center mt-3">
            <button
              disabled={isPending}
              type="submit"
              className={`w-full flex items-center justify-center gap-1 sm:w-auto text-white px-6 py-2 rounded-md font-medium shadow-md transition duration-200 ${
                isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#D72323] hover:bg-[#b71b1b]"
              }`}
            >
              {isPending ? (
                <>
                  <span className="loader" /> Adding...
                </>
              ) : (
                <>
                  <Plus /> Add
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionIdModal;
