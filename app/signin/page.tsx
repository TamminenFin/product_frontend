import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import SignInForm from "@/components/Form/SignInForm";

interface Props {
  searchParams: Record<string, string | string[]>;
}

const SignupForm = ({ searchParams }: Props) => {
  const getRedirectParams = () => {
    const params = new URLSearchParams(
      Object.entries(searchParams).reduce<Record<string, string>>(
        (acc, [key, value]) => {
          acc[key] = Array.isArray(value) ? value.join(",") : value;
          return acc;
        },
        {}
      )
    ).toString();

    return params ? `?${params}` : "";
  };
  return (
    <>
      {/* Background with Radial Gradient */}
      <div className="">
        <div className="flex justify-center items-center h-screen px-4">
          <div className="bg-white relative dark:bg-gray-800 px-6 py-9 rounded-xl shadow-xl w-full max-w-[370px]">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none">
              <Link href="/">
                <X className="w-6 h-6" />
              </Link>
            </button>

            {/* Logo and Heading */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Sign In
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join us to access all the features and get started
              </p>
            </div>
            <SignInForm />
            <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
              Don’t have an account?{" "}
              <Link href={`/signup${getRedirectParams()}`}>
                <span className="text-blue-500 hover:underline">Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
