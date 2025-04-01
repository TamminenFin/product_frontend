"use client";
import React, { FormEvent } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useUserRegistation } from "@/hooks/auth.hooks";
import { useUser } from "@/lib/user.provider";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  MapPin,
  Store,
  Tag,
  Loader,
  LucideProps,
  Phone,
  Info,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Citys } from "@/types/Citys";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import translate from "@/utils/translate";

const SignUpForm = () => {
  const { mutate: createUser, isPending } = useUserRegistation();
  const { setIsLoading } = useUser();
  const route = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const city = formData.get("city") as string;
    const postCode = formData.get("postCode") as string;
    const password = formData.get("password") as string;
    const address = formData.get("address") as string;
    const shopName = formData.get("shopName") as string;
    const shopId = formData.get("shopId") as string;

    const params = searchParams.toString().split("=")[1];
    let categoryLimit: string | number;
    if (params == "5") {
      categoryLimit = 5;
    } else if (params == "10") {
      categoryLimit = 10;
    } else if (params == "unlimeted") {
      categoryLimit = 1000;
    } else {
      categoryLimit = 5;
    }

    createUser(
      {
        name,
        email,
        password,
        address,
        shopName,
        shopId,
        phone,
        city,
        postCode,
        categoryLimit: categoryLimit,
      },
      {
        onSuccess: (data) => {
          if (data?.success) {
            route.push("/select-category");
            setIsLoading(true);
          }
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Input */}
      <InputField
        label={translate.signUp.fields.userName.label}
        id="name"
        placeholder={translate.signUp.fields.userName.placeholder}
        icon={User}
        required
      />

      {/* Email Input */}
      <InputField
        label={translate.signUp.fields.email.label}
        id="email"
        type="email"
        placeholder={translate.signUp.fields.email.placeholder}
        icon={Mail}
        required
      />

      {/* Contact Input */}
      <InputField
        label={translate.signUp.fields.phone.label}
        id="phone"
        type="text"
        placeholder={translate.signUp.fields.phone.placeholder}
        icon={Phone}
        required
      />

      {/* Password Input */}
      <InputField
        label={translate.signUp.fields.password.label}
        id="password"
        type="password"
        placeholder="* * * * * *"
        icon={Lock}
        required
      />

      {/* Address Input */}
      <InputField
        label={translate.signUp.fields.address.label}
        id="address"
        placeholder={translate.signUp.fields.address.placeholder}
        icon={MapPin}
        required
      />

      <div className="flex items-center gap-3 w-full">
        <div className="w-full">
          <Label>{translate.signUp.fields.city.label}</Label>
          <Select name="city" required>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={translate.signUp.fields.city.placeholder}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{translate.signUp.fields.city.label}</SelectLabel>
                <ScrollArea className="h-52">
                  {Citys.sort((a, b) => a.city.localeCompare(b.city)).map(
                    (location, index) => (
                      <SelectItem
                        key={`${location} ${index}`}
                        value={location.city}
                      >
                        {location.city}
                      </SelectItem>
                    )
                  )}
                </ScrollArea>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <Label>{translate.signUp.fields.postalCode.label}</Label>
          <Input
            name="postCode"
            type="text"
            required
            placeholder={translate.signUp.fields.postalCode.placeholder}
          />
        </div>
      </div>

      {/* Shop Name Input */}
      <InputField
        label={translate.signUp.fields.shopName.label}
        id="shopName"
        placeholder={translate.signUp.fields.shopName.placeholder}
        icon={Store}
        required
      />

      {/* Shop ID Input */}

      <div className="relative">
        <div className="flex items-center gap-3">
          <Label htmlFor="shopId" className="text-gray-700 dark:text-gray-300">
            {translate.signUp.fields.shopID.label}
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{translate.signUp.fields.shopID.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="relative mt-1.5">
          <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type={"text"}
            id="shopId"
            name="shopId"
            placeholder={translate.signUp.fields.shopID.placeholder}
            className="pl-10"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full py-2 rounded-md text-white transition-colors ${
          isPending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-500 hover:bg-purple-600"
        }`}
        disabled={isPending}
      >
        {isPending ? (
          <Loader className="w-5 h-5 mx-auto animate-spin" />
        ) : (
          `${translate.signUp.button}`
        )}
      </button>
    </form>
  );
};

const InputField = ({
  label,
  id,
  type = "text",
  placeholder,
  icon: Icon,
  required = false,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  required?: boolean;
}) => (
  <div className="relative">
    <Label htmlFor={id} className="text-gray-700 dark:text-gray-300">
      {label}
    </Label>
    <div className="relative mt-1.5">
      <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className="pl-10"
        required={required}
      />
    </div>
  </div>
);

export default SignUpForm;
