"use client";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";
import useCourseDetailsStore from "@/store/user/useCourseDetailsStore";
import useLoadingStore from "@/store/common/useLoadingStore";
import { Loader2Icon } from "lucide-react";

export default function VideoPlayer({ courseDetails, urlVideo }) {
  const { registerCourse } = useCourseDetailsStore();
  const isLoading = useLoadingStore((state) =>
    state.isLoading("registerCourseLoading"),
  );

  const videoSrc = {
    type: "video",
    sources: [
      {
        src: `https://mmmovahed.ir/storage/${urlVideo.file_path}`,
        type: "video/mp4",
      },
    ],
    poster: `https://mmmovahed.ir/storage/${urlVideo.thumbnail_path}`,
  };

  return (
    <div className="flex w-full flex-col gap-5 lg:flex-row-reverse">
      <div className="w-full overflow-hidden rounded-xl lg:w-1/2">
        <Plyr source={videoSrc} />
      </div>
      <div className="flex min-h-[200px] w-full flex-col gap-5 rounded-xl border bg-gray-50 p-5 shadow-md lg:w-1/2">
        <div>
          <p>{courseDetails.course.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div>
            {courseDetails.is_registered ? (
              <Button disabled className={""}>
                ثبت نام کرده اید
              </Button>
            ) : (
              <Button
                className={"bg-green-400 hover:bg-green-600/70"}
                onClick={() =>
                  registerCourse({ course_id: courseDetails.course.id })
                }
              >
                {isLoading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "ثبت نام"
                )}
              </Button>
            )}
          </div>

          <div>
            <StarRating
              courseId={courseDetails.course.id}
              user_rating={courseDetails.user_rating}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
