import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import SignUpForm from "@/components/Form/SignUpForm";
import translate from "@/utils/translate";

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
    <div className="flex justify-center items-center min-h-screen py-4 bg-[#FEF2FB]">
      <div className="bg-white dark:bg-gray-800 relative p-6 rounded-lg shadow-md w-full max-w-md">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none">
          <Link href="/">
            <X className="w-5 h-5" />
          </Link>
        </button>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {translate.signUp.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {translate.signUp.subtitle}
          </p>
        </div>

        {/* SignUpForm Component */}
        <SignUpForm />

        {/* Redirect to Login */}
        <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-400">
          {translate.signUp.footer.text}
          <Link href={`/signin${getRedirectParams()}`}>
            <span className="text-purple-500 hover:underline">
              {" "}
              {translate.signUp.footer.link}
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
