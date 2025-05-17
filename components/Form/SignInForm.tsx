"use client";
import React, { FormEvent } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useUserSignIn } from "@/hooks/auth.hooks";
import { useUser } from "@/lib/user.provider";
import { useRouter } from "next/navigation";
import translate from "@/utils/translate";
import { toast } from "sonner";

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
        onSuccess: (data) => {
          if (data?.success) {
            setIsLoading(true);
            route.push("/");
          } else {
            toast.error(data?.message);
          }
        },
      }
    );
  };

  const handleForgotPassword = () => {
    route.push("/forgot-password");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
            {translate.signIn.labels.email}
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder={translate.signIn.emailPlaceholder}
            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-2">
          <Label
            htmlFor="password"
            className="text-gray-700 dark:text-gray-300"
          >
            {translate.signIn.labels.password}
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
        <div className="mb-6 text-right">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-purple-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 py-2 rounded-md text-white hover:bg-purple-600"
        >
          {translate.signIn.buttonText}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
