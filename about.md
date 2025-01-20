import Image from "next/image";
import aboutImage from "../../../assets/about.webp";
import Pricing from "@/components/MainLayout/Pricing";

const AboutPage = async () => {
return (
<>

<main className="min-h-screen">
<section className="py-16 px-4 text-center bg-indigo-500 text-white">
<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
About Us
</h1>
<p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
Welcome to Your Marketplace, where buyers find the products they
need, and sellers create opportunities.
</p>
</section>

        {/* About Us & Mission Section */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
                About Us & Our Mission
              </h2>
              <p className="text-base sm:text-lg lg:text-xl mb-4">
                At Your Marketplace, our mission is to create a seamless
                platform that connects buyers with sellers. We strive to empower
                sellers by providing the tools they need to grow their
                businesses and offer buyers a wide range of quality products.
              </p>
              <p className="text-base sm:text-lg lg:text-xl mb-6">
                By fostering a supportive environment for sellers and ensuring a
                smooth shopping experience for buyers, we aim to be a trusted
                hub for all your marketplace needs.
              </p>
            </div>
            <div>
              <Image
                src={aboutImage}
                alt="Illustration of a digital marketplace"
                width={1024}
                height={1024}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Seller Category Pricing
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the perfect category package for your business. Prices
                are billed monthly and include all platform features.
              </p>
            </div>

            <Pricing />
          </div>
        </div>
      </main>
    </>

);
};

export default AboutPage;
