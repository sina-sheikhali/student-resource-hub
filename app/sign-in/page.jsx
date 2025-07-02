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

export default function LoginPage() {
  const router = useRouter();

  const signIn = useAuthStore((state) => state.signIn);
  const isLoading = useLoadingStore((state) =>
    state.isLoading("signInLoading"),
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
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(phoneValidationSchema),
    mode: "onChange",
  });

  const signInHandler = async (data) => {
    signIn(data, router);
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-[350px] max-w-md rounded-md border p-4 shadow sm:w-[400px]">
        <h1 className="mb-8 text-xl">ورود </h1>
        <form onSubmit={handleSubmit(signInHandler)}>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-px">
              <Label className={"mr-1 mb-1"} htmlFor="username">
                ایمیل
              </Label>
              <div dir="ltr">
                <Input
                  className={"!font-roboto-regular"}
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
              <Label className={"mr-1 mb-1"} htmlFor="username">
                رمز عبور
              </Label>
              <div dir="ltr">
                <Input
                  className={"!font-roboto-regular"}
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
              {isLoading ? <Loader2Icon className="animate-spin" /> : "ورود"}
            </Button>
            <Link href={"/sign-up"}>
              <Button variant="link" className={"text-blue-400"}>
                ثبت نام
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
