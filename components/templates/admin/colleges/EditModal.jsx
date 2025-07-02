import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import useLoadingStore from "@/store/common/useLoadingStore";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import useCollegeStore from "@/store/admin/useCollegeStore";
import { useEffect } from "react";

export default function EidtModal({ rowId, setIsOpen }) {
  const isLoadingStore = useLoadingStore();
  const collegeDetailsLoading = isLoadingStore.isLoading(
    "collegeDetailsLoading",
  );
  const updateCollegeLoading = isLoadingStore.isLoading("updateCollegeLoading");
  const { collegeDetails, updateCollege } = useCollegeStore();

  // hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (collegeDetails?.name) {
      reset({
        name: collegeDetails.name,
      });
    }
  }, [collegeDetails]);
  

  const onSubmit = (data) => {
    updateCollege(rowId, data, setIsOpen);
  };

  return (
    <div className="w-[600px]">
      {collegeDetailsLoading ? (
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

            <div className="col-span-full mt-5">
              <Button>
                {updateCollegeLoading ? (
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
