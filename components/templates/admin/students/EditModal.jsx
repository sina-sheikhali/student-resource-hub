import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import useLoadingStore from "@/store/common/useLoadingStore";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import useUserStore from "@/store/admin/useUsersStore";
import { useEffect } from "react";

export default function EidtModal({ rowId, setIsOpen, data }) {
  const isLoadingStore = useLoadingStore();

  const updateUserLoading = isLoadingStore.isLoading("updateUserLoading");
  const fetchUserEnrollmentsLoading = isLoadingStore.isLoading(
    "fetchUserEnrollmentsLoading",
  );
  const { updateUser, fetchUserEnrollments, userEnrollments } = useUserStore();

  // hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    updateUser(rowId, data.name, setIsOpen);
  };

  useEffect(() => {
    fetchUserEnrollments(rowId);

    const currentUsername = data.find((item) => item.id == rowId);
    console.log(currentUsername.name);

    setValue("name", currentUsername.name);
  }, []);

  return (
    <div className="w-[300px] md:w-[600px]">
      <div className="mb-5 border-b pb-5">
        <div>
          <h3 className="mb-5 text-lg font-semibold md:text-xl">
            دوره های ثبت نام شده
          </h3>
        </div>
        <div>
          {fetchUserEnrollmentsLoading ? (
            <div className="flex justify-center">
              <Loader2Icon className="h-8 w-8 animate-spin text-red-400" />
            </div>
          ) : (
            <ol className="list-decimal space-y-1.5 pr-4 text-base">
              {userEnrollments.length > 0 &&
                userEnrollments.map((course) => (
                  <li
                    key={course.id}
                    className="pr-1 text-base font-semibold text-gray-600"
                  >
                    {course.name}
                  </li>
                ))}
            </ol>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-5">
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

          <div className="col-span-full mt-5">
            <Button>
              {updateUserLoading ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                "ویرایش"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
