import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MdPendingActions } from "react-icons/md";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PendingUserModel = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="font-plus max-w-[450px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 bg-red-100 rounded-full">
              <MdPendingActions className="text-[#D72323] w-8 h-8" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-semibold text-gray-800 text-center">
            Request Pending
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-600 mt-2">
            Thank you for submitting your request. Our team is currently
            reviewing it, and we aim to process it within 2-3 business days. If
            you have any urgent concerns or need further assistance, please
            don&apos;t hesitate to contact us at <strong>+8801615718970</strong>
            . We appreciate your patience and understanding.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PendingUserModel;
