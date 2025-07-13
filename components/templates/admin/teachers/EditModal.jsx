import { useEffect } from "react";
import useLoadingStore from "@/store/common/useLoadingStore";
import useTeacherStore from "@/store/admin/useTeacherStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2Icon } from "lucide-react";

export default function EidtModal({ rowId, setIsOpen }) {
  const isLoadingStore = useLoadingStore();
  const teacherDetailsLoading = isLoadingStore.isLoading(
    "teacherDetailsLoading",
  );
  const updateTeacherLoading = isLoadingStore.isLoading("updateTeacherLoading");
  const { teacherDetails, updateTeachers } = useTeacherStore();
  console.log(teacherDetails);

  const phoneValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required(" ایمیل خود را وارد کنید")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "ایمیل وارد شده معتبر نیست",
      ),

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
  useEffect(() => {
    if (teacherDetails?.name) {
      reset({
        name: teacherDetails.name,
        phone: teacherDetails?.phone,
        email: teacherDetails?.email,
      });
    }
  }, [teacherDetails]);

  const onSubmit = (data) => {
    updateTeachers(rowId, data, setIsOpen);
  };

  return (
    <div className="w-[300px] md:w-[600px]">
      {teacherDetailsLoading ? (
        <div className="flex h-24 items-center justify-center">
          <Loader2Icon className="h-8 w-8 animate-spin text-red-400" />
        </div>
      ) : (
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
                className="w-full border p-2"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="col-span-full mt-5">
              <Button>
                {updateTeacherLoading ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  "ثبت"
                )}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
