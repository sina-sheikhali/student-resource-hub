import { Button } from "@/components/ui/button";
import React from "react";

export default function ProgressUpload({ loading, cancelUploadRef, progress }) {
  const handleCancelRequest = () => {
    if (cancelUploadRef.current) {
      cancelUploadRef.current.cancel("آپلود لغو شد  .");
    }
  };
  return (
    <div className="flex w-full flex-col gap-y-5">
      <div
        className={`h-9 w-full rounded-md text-white ${
          loading
            ? "animate-widthUpload bg-primary/50 w-full overflow-hidden"
            : "flex w-[110px] gap-x-3"
        } `}
      >
        {!loading && (
          <Button
            type="submit"
            className={` ${loading ? "sm:!w-full" : "sm:!w-auto"} !w-full`}
          >
            {loading ? progress + "%" : "" ? "loader" : "ثبت "}
          </Button>
        )}
        {loading && (
          <div className="relative flex h-full items-center justify-center">
            <span className="z-50">{progress}%</span>
            <div
              style={{
                width: `${progress}%`,
                transition: "width 0.3s ease",
              }}
              className="bg-primary absolute right-0 h-full rounded-r-md transition-transform"
            ></div>
          </div>
        )}
      </div>
      {loading && (
        <Button
          onClick={handleCancelRequest}
          className={"!w-[150px] bg-amber-400/70 text-white hover:bg-amber-400"}
        >
          لغو درخواست
        </Button>
      )}
    </div>
  );
}
