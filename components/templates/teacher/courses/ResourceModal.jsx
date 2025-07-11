import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import useResourceStore from "@/store/admin/useRecourceStore";
import { specifyTypeFile } from "@/utils/specifyTypeFile";
import useLoadingStore from "@/store/common/useLoadingStore";
import { percent } from "framer-motion";
import ProgressUpload from "@/components/modules/ProgressUplaod/ProgressUpload";

export default function ResourceModal({ rowId, setIsOpen }) {
  const [progress, setProgress] = useState(0);
  const cancelUploadRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPhoto, setSelecetedPhoto] = useState(null);

  const { createResources, fetchResourcesCourse, resourcesCourse } =
    useResourceStore();
  const isLoadingStore = useLoadingStore();
  const fetchResourcesCourseLoading = isLoadingStore.isLoading(
    "fetchResourcesCourseLoading",
  );
  const createResourcesLoading = isLoadingStore.isLoading(
    "createResourcesLoading",
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchResourcesCourse(rowId);
    return () => {
      if (cancelUploadRef.current) {
        cancelUploadRef.current.cancel("آپلود لغو شد  .");
      }
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
        "application/vnd.ms-powerpoint", // .ppt
        "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
        "video/mp4",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("فرمت فایل مجاز نیست.");
        e.target.value = "";
        return;
      }
      const maxSize = 100 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error(`فایل ${file.name} بزرگ‌تر از 100 مگابایت است.`);
        e.target.value = "";
        return;
      }
      setSelectedFile(file);
    }
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("تنها فرمت‌های JPG و PNG مجاز هستند.");
        e.target.value = "";
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error(`فایل ${file.name} بزرگ‌تر از 5 مگابایت است.`);
        e.target.value = "";
        return;
      }
      setSelecetedPhoto(file);
    }
  };

  const handleAddedResources = (data) => {
    let fileType = specifyTypeFile(selectedFile.type);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("course_id", rowId);
    selectedPhoto && formData.append("thumbnail_path", selectedPhoto);
    formData.append("type", fileType);
    formData.append("file", selectedFile);
    createResources(
      formData,
      setSelecetedPhoto,
      setSelectedFile,
      reset,
      setProgress,
      cancelUploadRef,
    );
  };
  return (
    <div className="w-[800px]">
      <div className="flex justify-between gap-3 border-b border-gray-300 pb-5">
        <div className="w-1/2">
          <h3 className="mb-2">لیست ویدیوها</h3>
          <div className="h-[200px] w-full overflow-y-scroll rounded-md border p-3">
            <ol className="list-inside list-decimal">
              {resourcesCourse.length > 0 &&
                resourcesCourse.map(
                  (item) =>
                    item.type == "video" && (
                      <li
                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                        key={item.id}
                      >
                        <span dir="ltr">{item.title}</span>
                      </li>
                    ),
                )}
            </ol>
          </div>
        </div>
        <div className="w-1/2">
          <h3 className="mb-2">لیست فایل ها</h3>
          <div className="h-[200px] w-full overflow-y-scroll rounded-md border p-3">
            <ol className="list-inside list-decimal">
              {resourcesCourse.length > 0 &&
                resourcesCourse.map(
                  (item) =>
                    item.type != "video" && (
                      <li
                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                        key={item.id}
                      >
                        <span dir="ltr">{item.title + "." + item.type}</span>
                      </li>
                    ),
                )}
            </ol>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleAddedResources)}>
        <h3 className="my-5 text-lg font-bold">اضافه کردن مبنع</h3>
        <div className="flex flex-col gap-5">
          <div
            className={`border-primarySubmit bg-primaryLightGreen/50 } flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed sm:w-full`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const droppedFile = e.dataTransfer.files[0];
              if (droppedFile) {
                handleFileChange({ target: { files: [droppedFile] } });
              }
            }}
          >
            <label className="flex w-full cursor-pointer flex-col items-center justify-center py-10">
              <Image
                alt=""
                src={"/images/uploadFile.png"}
                width={50}
                height={50}
              />
              <div className="flex items-center gap-x-3" dir="ltr">
                <p className="text-gray-400">
                  {selectedFile ? selectedFile.name : "انتخاب فایل"}
                </p>
              </div>

              <input
                type="file"
                accept=".mp4,.pdf,.docx,.ppt,.pptx"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div
            // className={`border-2 ${
            //   userProfile.image
            //     ? "border-primaryGray2"
            //     : "border-primarySubmit bg-primaryLightGreen/50 border-dashed"
            // } flex w-full flex-col items-center justify-center rounded-md sm:w-[500px]`}
            className={`flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed sm:w-full`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const droppedFile = e.dataTransfer.files[0];
              if (droppedFile) {
                handlePhotoChange({ target: { files: [droppedFile] } });
              }
            }}
          >
            <label className="flex w-full cursor-pointer flex-col items-center justify-center py-10">
              <Image
                alt=""
                src={"/images/uploadVideo.png"}
                width={50}
                height={50}
              />
              <div className="flex items-center gap-x-3" dir="ltr">
                <p className="text-gray-400">
                  {selectedPhoto ? selectedPhoto.name : "انتخاب تصویر"}
                </p>
              </div>

              <input
                type="file"
                accept=".png,.jpg"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
          </div>
          <div className="grid grid-cols-1 gap-5">
            <div className="col-span-1">
              <label className="mb-1 block">عنوان </label>
              <Input
                {...register("title", { required: "عنوان ویدیو الزامی است" })}
                className="w-full border p-2"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
          </div>
          <div>
            <ProgressUpload
              loading={createResourcesLoading}
              progress={progress}
              cancelUploadRef={cancelUploadRef}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
