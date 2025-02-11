import MyCategory from "@/components/Saller/MyCategory";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <MyCategory />
      </div>

      <div className="mt-auto  py-4 text-center text-sm text-gray-700">
        <strong>Need more categories?</strong>
        <p>
          If you need an increased category limit, feel free to contact us at{" "}
          <a href="tel:+8801615718970" className="text-blue-500">
            +8801615718970
          </a>{" "}
          for assistance. We’re here to help!
        </p>
      </div>
    </div>
  );
};

export default Page;
