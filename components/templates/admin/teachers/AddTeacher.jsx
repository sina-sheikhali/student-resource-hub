import PasswordInput from "@/components/modules/PasswordInput/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useTeacherStore from "@/store/admin/useTeacherStore";
import useLoadingStore from "@/store/common/useLoadingStore";
import { Loader2Icon } from "lucide-react";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddCollege() {
  const isLoadingStore = useLoadingStore();
  const createTeacherLoading = isLoadingStore.isLoading("createTeacherLoading");
  const inputRef = useRef(null);

  const { createTeacher } = useTeacherStore();
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
  // hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(phoneValidationSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    createTeacher(data, reset);
  };
  return (
    <div className="w-full rounded-lg border bg-white p-4 shadow-md">
      <h3 className="mb-5 text-lg font-semibold md:text-xl">افزودن استاد</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1">
            <label className="mb-1 block">نام کاربری</label>
            <Input
              {...register("name", { required: "نام الزامی است" })}
              className="w-full border p-2"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="col-span-1">
            <label className="mb-1 block">شماره همراه</label>
            <Input
              {...register("phone", { required: "شهر الزامی است" })}
              className="w-full border p-2"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="col-span-1">
            <label className="mb-1 block">ایمیل</label>
            <Input
              {...register("email", { required: "رتبه الزامی است" })}
              className="font-roboto-regular w-full border p-2"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="col-span-1">
            <label className="mb-1 block">رمز عبور</label>
            <PasswordInput
              inputRef={inputRef}
              register={register}
              error={errors.password}
            />
          </div>

          <div className="col-span-full mt-5">
            <Button>
              {createTeacherLoading ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                "ثبت"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
