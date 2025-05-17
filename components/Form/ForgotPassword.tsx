"use client";
import React, { FormEvent, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForgotPassword } from "@/hooks/auth.hooks";

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate, isPending } = useForgotPassword();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email") as string;

    if (!email) {
      toast.error("Por favor ingresa tu correo electrónico.");
      return;
    }

    mutate(
      { email },
      {
        onSuccess: (data) => {
          console.log(data);
          if (data.success) {
            toast.success(data?.message);
            setIsSubmitting(true);
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
            ¿Olvidaste tu contraseña?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label
                htmlFor="email"
                className="text-gray-700 dark:text-gray-300"
              >
                Correo electrónico
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Ingresa tu correo"
                className="mt-1"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="w-full bg-purple-500 py-2 rounded-md text-white hover:bg-purple-600 disabled:opacity-50"
            >
              {isSubmitting ? "Enviando..." : "Enviar enlace de recuperación"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
