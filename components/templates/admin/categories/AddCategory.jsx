import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCategoryStore from "@/store/admin/useCategoryStore";
import useLoadingStore from "@/store/common/useLoadingStore";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

export default function AddCategory() {
  const isLoadingStore = useLoadingStore();
  const createCategoryLoading = isLoadingStore.isLoading(
    "createCategoryLoading",
  );

  const { createCategory } = useCategoryStore();
  // hook-form
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "active",
    },
  });

  const onSubmit = (data) => {
    createCategory(data, reset);
  };
  return (
    <div className="w-full rounded-lg border bg-white p-4 shadow-md">
      <h3 className="mb-5 text-xl font-bold">افزودن دسته بندی</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1">
            <label className="mb-1 block">عنوان</label>
            <Input
              {...register("name", { required: "نام الزامی است" })}
              className="w-full border p-2"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block">وضعیت</label>
            <Controller
              control={control}
              name="status"
              rules={{ required: "انتخاب وضعیت الزامی است" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  dir="rtl"
                >
                  <SelectTrigger className="w-full text-right">
                    <SelectValue placeholder="انتخاب وضعیت" />
                  </SelectTrigger>
                  <SelectContent className="text-right" position="popper">
                    <SelectGroup>
                      <SelectItem value="active" className="text-right">
                        فعال
                      </SelectItem>
                      <SelectItem value="inactive" className="text-right">
                        غیرفعال
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="mt-1 text-sm text-red-500">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="col-span-full mt-5">
            <Button>
              {createCategoryLoading ? (
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
