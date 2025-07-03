"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "@/store/common/useAuthStore";
import { useRouter } from "next/navigation";
import useLoadingStore from "@/store/common/useLoadingStore";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const signUp = useAuthStore((state) => state.signUp);
  const isLoading = useLoadingStore((state) =>
    state.isLoading("signUpLoading"),
  );
  // ---------- yup ----------
  const phoneValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required(" ایمیل خود را وارد کنید")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "ایمیل وارد شده معتبر نیست",
      ),
    password: Yup.string()
      .required("رمز خود را وارد کنید")
      .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
    name: Yup.string()
      .required("نام کاربری را وارد کنید")
      .min(4, "نام کاربری باید حداقل 4 کاراکتر باشد"),
    phone: Yup.string()
      .required("شماره همراه خود را وارد کنید")
      .matches(/^09\d{9}$/, "شماره تلفن معتبر نیست"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(phoneValidationSchema),
    mode: "onChange",
  });

  const signUpHandler = async (data) => {
    signUp(data, router);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-stretch justify-center gap-x-5 rounded-md border-2 border-gray-200 shadow-xl">
        <div className="w-[350px] p-5 sm:w-[400px]">
          <h1 className="mb-8 text-xl font-bold">ثبت نام </h1>
          <form onSubmit={handleSubmit(signUpHandler)}>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-px">
                <Label className={"mr-1 mb-1"} htmlFor="username">
                  نام کاربری
                </Label>
                <div dir="ltr">
                  <Input placeholder="username" {...register("name")} />
                </div>
                {errors.name && (
                  <p className="mr-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-y-px">
                <Label className={"mr-1 mb-1"} htmlFor="phone">
                  شماره همراه
                </Label>
                <div dir="ltr">
                  <Input placeholder="phone" {...register("phone")} />
                </div>
                {errors.phone && (
                  <p className="mr-1 text-xs text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-y-px">
                <Label className={"mr-1 mb-1"} htmlFor="email">
                  ایمیل
                </Label>
                <div dir="ltr">
                  <Input
                    type={"email"}
                    placeholder="email"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="mr-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-y-px">
                <Label className={"mr-1 mb-1"} htmlFor="password">
                  رمز عبور
                </Label>
                <div dir="ltr">
                  <Input
                    type={"text"}
                    placeholder="password"
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <p className="mr-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-5 flex flex-row-reverse justify-between">
              <Button disabled={isLoading} className={"min-w-[100px]"}>
                {isLoading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "ثبت نام"
                )}
              </Button>
              <Link href={"/sign-in"}>
                <Button variant="link" className={"text-blue-400"}>
                  ورود
                </Button>
              </Link>
            </div>
          </form>
        </div>
        <div className="hidden items-center border-r-2 border-gray-200 p-5 px-10 md:flex">
          <Image
            src="/images/logo-univercity.png"
            width={200}
            height={200}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}
