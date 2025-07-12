import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCollegeStore from "@/store/admin/useCollegeStore";
import useLoadingStore from "@/store/common/useLoadingStore";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

export default function AddCollege() {
  const isLoadingStore = useLoadingStore();
  const collegeDetailsLoading = isLoadingStore.isLoading(
    "createCollegeLoading",
  );

  const { createCollege } = useCollegeStore();
  // hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createCollege(data, reset);
  };
  return (
    <div className="w-full rounded-lg border bg-white p-4 shadow-md">
      <h3 className="mb-5 text-lg font-semibold md:text-xl">افزودن دانشکده</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1">
            <label className="mb-1 block">نام</label>
            <Input
              {...register("name", { required: "نام الزامی است" })}
              className="w-full border p-2"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="col-span-1">
            <label className="mb-1 block">شهر</label>
            <Input
              {...register("city", { required: "شهر الزامی است" })}
              className="w-full border p-2"
            />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>
          <div className="col-span-1">
            <label className="mb-1 block">رتبه</label>
            <Input
              {...register("rank", { required: "رتبه الزامی است" })}
              className="w-full border p-2"
            />
            {errors.rank && (
              <p className="text-sm text-red-500">{errors.rank.message}</p>
            )}
          </div>

          <div className="col-span-full mt-5">
            <Button>
              {collegeDetailsLoading ? (
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
