// Page Component
import RequestForCategory from "@/components/Saller/RequestForCategory";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  return (
    <div className="container mx-auto px-4 min-h-screen flex items-center justify-center w-full">
      <div className="w-screen">
        <h1 className="text-xl md:text-2xl font-semibold text-center">
          Select Category
        </h1>
        <p className="text-center mt-2">
          We provide various categories. You can choose your categories here,
          and you need to pay $10 for each category every month.
        </p>
        <Separator className="my-4 w-full" />
        <div>
          <RequestForCategory />
        </div>
      </div>
    </div>
  );
};

export default Page;
