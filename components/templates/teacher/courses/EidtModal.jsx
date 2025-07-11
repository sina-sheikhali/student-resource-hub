import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import useLoadingStore from "@/store/common/useLoadingStore";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCourseStore from "@/store/admin/useCourseStore";
import { Loader2Icon } from "lucide-react";
import useCollegeStore from "@/store/admin/useCollegeStore";
import useCategoryStore from "@/store/admin/useCategoryStore";
import { useEffect } from "react";

export default function EidtModal({ rowId, setIsOpen }) {
  const isLoadingStore = useLoadingStore();
  const courseLoading = isLoadingStore.isLoading("fetchCourseLoading");
  const updateCourseLoading = isLoadingStore.isLoading("updateCourseLoading");
  const collegesLoading = isLoadingStore.isLoading("fetchCollegesLoading");
  const categoriesLoading = isLoadingStore.isLoading("fetchCategoriesLoading");
  const { colleges, fetchAllColleges } = useCollegeStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { course, updateCourse } = useCourseStore();

  // hook-form
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (course?.name) {
      reset({
        name: course.name,
        description: course.description,
        category_id: course.category_id,
        college_id: course.college_id,
      });
    }
  }, [course]);

  useEffect(() => {
    fetchCategories();
    fetchAllColleges();
  }, []);

  const onSubmit = (data) => {
    updateCourse(rowId, data, setIsOpen);
  };

  return (
    <div className="w-[600px]">
      {courseLoading ? (
        <div className="flex h-24 items-center justify-center">
          <Loader2Icon className="h-8 w-8 animate-spin text-red-400" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-5">
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
              <label className="mb-1 block">توضیحات</label>
              <Input
                {...register("description", { required: "نام الزامی است" })}
                className="w-full border p-2"
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block">دسته‌بندی</label>
              <Controller
                control={control}
                name="category_id"
                rules={{ required: "انتخاب دسته‌بندی الزامی است" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    dir="rtl"
                    disabled={categoriesLoading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          categoriesLoading ? (
                            <Loader2Icon className="h-4 w-4 animate-spin" />
                          ) : (
                            "انتخاب کنید"
                          )
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.length > 0 &&
                        categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category_id && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.category_id.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block">دانشکده</label>
              <Controller
                control={control}
                name="college_id"
                rules={{ required: "انتخاب دانشکده الزامی است" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    dir="rtl"
                    disabled={collegesLoading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          collegesLoading ? (
                            <Loader2Icon className="h-4 w-4 animate-spin" />
                          ) : (
                            "انتخاب کنید"
                          )
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {colleges.length > 0 &&
                        colleges.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.college_id && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.college_id.message}
                </p>
              )}
            </div>
            <div className="col-span-full mt-5">
              <Button>
                {updateCourseLoading ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  "ویرایش"
                )}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
