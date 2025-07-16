import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import ProgressUpload from "@/components/modules/ProgressUplaod/ProgressUpload";
import useResourceStore from "@/store/admin/useRecourceStore";
import useLoadingStore from "@/store/common/useLoadingStore";
import { specifyTypeFile } from "@/utils/specifyTypeFile";
import ListFile from "@/components/modules/FileList/ListFile";
import InputFile from "@/components/modules/InputFile/InputFile";

export default function ResourceModal({ rowId, setIsOpen }) {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPhoto, setSelecetedPhoto] = useState(null);
  const cancelUploadRef = useRef(null);

  const { createResources, fetchResourcesCourse } = useResourceStore();
  const isLoadingStore = useLoadingStore();

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
        cancelUploadRef.current.cancel("آپلود لغو شد.");
      }
    };
  }, []);

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
      rowId,
    );
  };
  return (
    <div className="w-[350px] sm:w-[550px] lg:w-[800px]">
      <div className="grid grid-cols-1 justify-between gap-3 gap-y-6 border-b-2 border-gray-200 pb-8 lg:grid-cols-2">
        <ListFile title={"لیست ویدیو ها"} condition={"1"} rowId={rowId} />
        <ListFile title={"لیست فایل ها"} condition={"2"} rowId={rowId} />
      </div>
      <form onSubmit={handleSubmit(handleAddedResources)}>
        <h3 className="my-5 text-lg font-semibold md:text-xl">
          اضافه کردن مبنع
        </h3>
        <div className="flex flex-col gap-5">
          <InputFile
            allowedTypes={[
              "application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
              "application/vnd.ms-powerpoint", // .ppt
              "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
              "video/mp4",
            ]}
            size={100}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            img={"File"}
            title={"انتخاب فایل"}
            type={["mp4", "pdf", "pptx", "docx"]}
          />
          <InputFile
            allowedTypes={["image/png", "image/jpeg"]}
            size={5}
            setSelectedFile={setSelecetedPhoto}
            selectedFile={selectedPhoto}
            img={"Video"}
            title={"انتخاب تصویر"}
            type={["png", "jpg"]}
          />

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
