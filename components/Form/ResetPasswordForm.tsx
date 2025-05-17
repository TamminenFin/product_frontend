"use client";
import React, { FormEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useChangePassword } from "@/hooks/auth.hooks";

const ResetPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { mutate } = useChangePassword();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!searchParams.get("resetLink")) {
      toast.error("Please try again!");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    setIsSubmitting(true);
    mutate(
      {
        password: newPassword,
        token: searchParams.get("resetLink") as string,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          if (data.success) {
            toast.success(data?.message);
            setIsSubmitting(true);
            router.push("/signin");
          } else {
            toast.error(data?.message);
          }
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Restablecer contraseña
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label
                htmlFor="newPassword"
                className="text-gray-700 dark:text-gray-300"
              >
                Nueva contraseña
              </Label>
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="* * * * * *"
                className="mt-1"
                required
              />
            </div>
            <div className="mb-6">
              <Label
                htmlFor="confirmPassword"
                className="text-gray-700 dark:text-gray-300"
              >
                Confirmar contraseña
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="* * * * * *"
                className="mt-1"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-500 py-2 rounded-md text-white hover:bg-purple-600 disabled:opacity-50"
            >
              {isSubmitting ? "Restableciendo..." : "Restablecer contraseña"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
