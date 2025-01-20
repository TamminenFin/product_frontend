import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaCalendarTimes } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubscriptionEndMessage = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="font-plus max-w-[450px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 bg-red-100 rounded-full">
              <FaCalendarTimes className="text-[#D72323] w-8 h-8" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-semibold text-gray-800 text-center">
            Subscription Ended
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-600 mt-2">
            Your subscription has expired. To continue enjoying our services,
            please renew your subscription. For assistance or to renew, contact
            us at <strong>+8801615718970</strong>. Thank you for being a valued
            member of our community.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionEndMessage;
