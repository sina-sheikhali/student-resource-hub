"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "@/store/common/useAuthStore";
import useLoadingStore from "@/store/common/useLoadingStore";
import { Loader2Icon } from "lucide-react";
import PasswordInput from "@/components/modules/PasswordInput/PasswordInput";

export default function LoginPage() {
  const router = useRouter();
  const inputRef = useRef(null);

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
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-stretch justify-center gap-x-5 rounded-md border-2 border-gray-200 shadow-xl">
        <div className="w-[350px] p-5 sm:w-[400px]">
          <h1 className="mb-8 text-lg font-semibold md:text-xl">ورود </h1>
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
                <Label className={"mr-1 mb-1"} htmlFor="password">
                  رمز عبور
                </Label>

                <PasswordInput
                  inputRef={inputRef}
                  register={register}
                  error={errors.password}
                />
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
