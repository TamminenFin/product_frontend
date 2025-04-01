import MyCategory from "@/components/Saller/MyCategory";
import translate from "@/utils/translate";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <MyCategory />
      </div>

      <div className="mt-auto  py-4 text-center text-sm text-gray-700">
        <strong>Need more categories?</strong>
        <p>
          {translate.sallerDashboard.myCategoryPage.footer.beforeContactText}{" "}
          <a href="tel:+8801615718970" className="text-blue-500">
            {translate.sallerDashboard.myCategoryPage.footer.contactNumber}
          </a>{" "}
          {translate.sallerDashboard.myCategoryPage.footer.afterContactText}
        </p>
      </div>
    </div>
  );
};

export default Page;
