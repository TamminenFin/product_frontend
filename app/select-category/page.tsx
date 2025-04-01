// Page Component
import RequestForCategory from "@/components/Saller/RequestForCategory";
import { Separator } from "@/components/ui/separator";
import translate from "@/utils/translate";

const Page = () => {
  return (
    <div className="container mx-auto px-4 min-h-screen flex items-center justify-center w-full">
      <div className="w-screen">
        <h1 className="text-xl md:text-2xl font-semibold text-center">
          {translate.selectCategory.title}
        </h1>
        <p className="text-center mt-2">{translate.selectCategory.subtitle}</p>
        <Separator className="my-4 w-full" />
        <div>
          <RequestForCategory />
        </div>
      </div>
    </div>
  );
};

export default Page;
