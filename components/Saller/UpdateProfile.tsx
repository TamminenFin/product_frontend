"use client";

import { useEffect } from "react";
import {
  FieldValues,
  SubmitHandler,
  useController,
  useForm,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useUser } from "@/lib/user.provider";
import {
  useGetCurrentSaller,
  useUpdateSallerProfile,
} from "@/hooks/auth.hooks";
import { useGetAllCity } from "@/hooks/city.hooks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import translate from "@/utils/translate";
import { ScrollArea } from "../ui/scroll-area";

type FormData = {
  name: string;
  email: string;
  address: string;
  city: string;
  shopName: string;
  shopId: string;
  phone: string;
  postalCode: string;
};

export default function UpdateProfile() {
  const { user } = useUser();
  const { mutate, isPending } = useUpdateSallerProfile();
  const { data: city, isLoading: isCityLoading } = useGetAllCity();

  const { data, isLoading } = useGetCurrentSaller(user?._id ?? "", {
    enabled: !!user?._id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control, // ✅ added
  } = useForm<FormData>();

  const {
    field: cityField,
    fieldState: { error: cityError },
  } = useController({
    name: "city",
    control, // ✅ passed
    rules: { required: "City is required" },
  });

  useEffect(() => {
    if (data?.data) {
      reset({ ...data?.data });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="text-muted-foreground text-sm">
          Loading profile...
        </span>
      </div>
    );
  }

  return (
    <Card className="max-w-[450px] mx-auto mt-8">
      <CardContent className="p-6">
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Editar perfil
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Actualiza tus datos personales y los de tu tienda. Todos los campos
          son obligatorios para guardar los cambios.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">
              {translate.signUp.fields.userName.label}
            </Label>
            <Input id="name" {...register("name", { required: true })} />
            {errors.name && (
              <p className="text-sm text-red-500">Name is required</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">{translate.signUp.fields.email.label}</Label>
            <Input
              id="email"
              readOnly
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">Email is required</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">{translate.signUp.fields.phone.label}</Label>
            <Input
              id="phone"
              type="phone"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">Phone is required</p>
            )}
          </div>
          <div>
            <Label htmlFor="address">
              {" "}
              <Label htmlFor="phone">
                {translate.signUp.fields.address.label}
              </Label>
            </Label>
            <Input id="address" {...register("address", { required: true })} />
            {errors.address && (
              <p className="text-sm text-red-500">Address is required</p>
            )}
          </div>
          <div>
            <Label>{translate.signUp.fields.city.label}</Label>
            {isCityLoading ? (
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
            ) : (
              <Select
                value={cityField.value}
                onValueChange={cityField.onChange}
                defaultValue={data?.data?.city}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={translate.signUp.fields.city.placeholder}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {translate.signUp.fields.city.label}
                    </SelectLabel>
                    <ScrollArea className="h-52">
                      {city?.data
                        ?.sort((a: { name: string }, b: { name: string }) =>
                          a?.name?.localeCompare(b?.name)
                        )
                        .map((location: { name: string; _id: string }) => (
                          <SelectItem key={location._id} value={location.name}>
                            {location.name}
                          </SelectItem>
                        ))}
                    </ScrollArea>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            {cityError && (
              <p className="text-sm text-red-500">{cityError.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="shopName">
              {translate.signUp.fields.shopName.label}
            </Label>
            <Input
              id="shopName"
              {...register("shopName", { required: true })}
            />
            {errors.shopName && (
              <p className="text-sm text-red-500">Shop Name is required</p>
            )}
          </div>
          <div>
            <Label htmlFor="postalCode">
              {translate.signUp.fields.postalCode.label}
            </Label>
            <Input
              id="postalCode"
              {...register("postalCode", { required: true })}
            />
            {errors.postalCode && (
              <p className="text-sm text-red-500">Postal Code is required</p>
            )}
          </div>
          <div>
            <Label htmlFor="shopId">
              {translate.signUp.fields.shopID.label}
            </Label>
            <Input id="shopId" {...register("shopId", { required: true })} />
            {errors.shopId && (
              <p className="text-sm text-red-500">Shop ID is required</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="bg-blue-600 px-5 w-full py-2 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || isPending ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
