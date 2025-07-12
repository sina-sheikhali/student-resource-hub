import { handleFileChange } from "@/utils/inputFileUtils";
import Image from "next/image";
import React from "react";

export default function InputFile({
  children,
  selectedFile,
  setSelectedFile,
  allowedTypes,
  size,
  img,
  title,
  type,
}) {
  return (
    <div
      className={`flex min-h-[250px] w-full flex-col items-center justify-center rounded-md border-2 border-dashed sm:w-full`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
          handleFileChange({ target: { files: [droppedFile] } });
        }
      }}
    >
      <label className="relative flex w-full cursor-pointer flex-col items-center justify-center px-5 py-5 md:py-10">
        {!children && (
          <>
            <Image
              alt=""
              src={`/images/upload${img}.png`}
              width={50}
              height={50}
            />
            <div className="flex items-center gap-x-3" dir="ltr">
              <p className="text-gray-400">
                {selectedFile ? selectedFile.name : title}
              </p>
            </div>
          </>
        )}

        <input
          type="file"
          accept={type.map((ext) => "." + ext).join(",")}
          className="hidden"
          onChange={(e) =>
            handleFileChange(e, allowedTypes, size, setSelectedFile)
          }
        />
        {children}
      </label>
    </div>
  );
}
