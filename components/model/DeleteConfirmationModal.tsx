import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react"; // Add the trash icon
import { FormEvent } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (e: FormEvent) => void;
  itemName: string;
};

const DeleteConfirmationModal = ({
  isOpen,
  setIsOpen,
  handleDelete,
  itemName,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="font-plus max-w-[450px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 bg-red-100 rounded-full">
              <Trash2 className="text-[#D72323] w-8 h-8" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-semibold text-gray-800 text-center">
            Confirm Deletion
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-600 mt-2">
            Are you sure you want to delete{" "}
            <b className="text-[#D72323]">{itemName}</b>? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        {/* Confirmation Buttons */}
        <div className="flex justify-center mt-5 space-x-4">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 w-full sm:w-auto bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 w-full sm:w-auto text-white bg-[#D72323] rounded-md font-medium hover:bg-[#b71b1b] transition duration-200"
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
