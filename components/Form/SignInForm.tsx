"use client";
import React, { FormEvent } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useUserSignIn } from "@/hooks/auth.hooks";
import { useUser } from "@/lib/user.provider";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const { mutate: signInUser } = useUserSignIn();
  const { setIsLoading } = useUser();
  const route = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    signInUser(
      { email, password },
      {
        onSuccess: () => {
          setIsLoading(true);
          route.push("/");
        },
      }
    );
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
            Email Address
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <Label
            htmlFor="password"
            className="text-gray-700 dark:text-gray-300"
          >
            Password
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="* * * * * *"
            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 py-2 rounded-md text-white hover:bg-purple-600"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
