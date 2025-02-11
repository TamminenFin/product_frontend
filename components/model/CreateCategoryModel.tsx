import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormEvent } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick: (e: FormEvent) => void;
};

const CreateCategoryModel = ({ isOpen, setIsOpen, handleClick }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="font-plus max-w-[525px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            Create a New Category
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-2">
            Fill in the details below to create a new category.
          </DialogDescription>
        </DialogHeader>

        {/* Category Name Input */}
        <form className="mt-3" onSubmit={handleClick}>
          <label
            htmlFor="category-name"
            className="block text-sm font-medium text-gray-700"
          >
            Category Name
          </label>
          <input
            id="name"
            name="name" // Ensure the input has a 'name' attribute to access it in FormData
            type="text"
            placeholder="Enter category name"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#D72323] focus:border-[#D72323] transition duration-150 ease-in-out"
          />
          <div className="flex justify-center mt-3">
            <button
              type="submit"
              className="w-full sm:w-auto text-white bg-[#D72323] px-6 py-2 rounded-md font-medium shadow-md hover:bg-[#b71b1b] transition duration-200 disabled:bg-gray-400"
            >
              Create
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModel;
