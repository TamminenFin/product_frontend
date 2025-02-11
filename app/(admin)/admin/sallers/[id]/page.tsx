import SallerProducts from "@/components/Admin/SallerProduct";

const page = async ({ params }: { params: { id: string } }) => {
  return (
    <div>
      {" "}
      <SallerProducts id={params?.id} />{" "}
    </div>
  );
};

export default page;
