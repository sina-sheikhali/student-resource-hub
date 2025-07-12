import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputFile from "@/components/modules/InputFile/InputFile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import useCategoryStore from "@/store/admin/useCategoryStore";
import useCollegeStore from "@/store/admin/useCollegeStore";
import useCourseStore from "@/store/admin/useCourseStore";
import useLoadingStore from "@/store/common/useLoadingStore";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function FormComp() {
  const [selectedPhoto, setSelecetedPhoto] = useState(null);
  const { fetchCategories, categories } = useCategoryStore();
  const { fetchAllColleges, colleges } = useCollegeStore();
  const { createCourse } = useCourseStore();
  const isLoadingStore = useLoadingStore();
  const categoriesLoading = isLoadingStore.isLoading("fetchCategoriesLoading");
  const collegesLoading = isLoadingStore.isLoading("fetchCollegesLoading");
  const createCourseLoading = isLoadingStore.isLoading("createCourseLoading");

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { status: "active" } });

  useEffect(() => {
    fetchCategories();
    fetchAllColleges();
  }, []);

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (selectedPhoto) {
      formData.append("thumbnail_path", selectedPhoto);
    }
    createCourse(formData, reset, setSelecetedPhoto);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-lg border p-4 shadow-md"
    >
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
          <label className="mb-1 block">تویضحات</label>
          <Input
            {...register("description", {
              required: "توضیحات الزامی است",
            })}
            className="w-full border p-2"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
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
            <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-1">
          <InputFile
            allowedTypes={["image/png", "image/jpeg"]}
            size={5}
            setSelectedFile={setSelecetedPhoto}
            selectedFile={selectedPhoto}
            img={"Video"}
            title={"انتخاب تصویر"}
            type={["png", "jpg"]}
          />
        </div>
      </div>

      <div className="mt-10">
        <Button type="submit">
          {createCourseLoading ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            "ثبت"
          )}
        </Button>
      </div>
    </form>
  );
}
