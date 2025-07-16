"use client";

import useLoadingStore from "@/store/common/useLoadingStore";
import useResourceStore from "@/store/user/useResouceStore";
import { Loader2Icon, SquarePlayIcon } from "lucide-react";
import { useEffect } from "react";

export default function Sidebar({ setUrlVideo, urlVideo }) {
  const { resourcesCourse } = useResourceStore();
  const isLoadingStore = useLoadingStore();
  const fetchResourcesCourseLoading = isLoadingStore.isLoading(
    "fetchResourcesCourse",
  );

  const handleSetUrlVideo = (lesson) => {
    setUrlVideo({
      thumbnail_path: lesson.thumbnail_path,
      file_path: lesson.file_path,
    });
  };

  useEffect(() => {
    const items = resourcesCourse.filter((item) => item.type === "video");
    const firstItem = items[0];

    if (firstItem) {
      setUrlVideo({
        thumbnail_path: firstItem.thumbnail_path,
        file_path: firstItem.file_path,
      });
    }
  }, [fetchResourcesCourseLoading]);

  return (
    <div className="min-h-[285px] rounded-xl bg-gray-100 p-4">
      <h2 className="mb-5 text-lg font-semibold md:text-xl">جلسات دوره</h2>
      {!fetchResourcesCourseLoading ? (
        (() => {
          const items = resourcesCourse.filter((item) => item.type === "video");

          return items.length > 0 ? (
            <div className="space-y-1.5 text-sm md:text-base">
              {items.length > 0 &&
                items.map(
                  (lesson, index) =>
                    lesson.type == "video" && (
                      <button
                        key={lesson.id}
                        onClick={() => handleSetUrlVideo(lesson)}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 border-b border-gray-200 last:border-b-0"
                      >
                        <div
                          className={`group flex w-full justify-between py-2 transition-colors hover:text-green-400`}
                        >
                          <div className="flex w-3/4 items-center gap-x-1.5">
                            <div className="flex h-6 max-w-6 min-w-6 items-center justify-center rounded-sm bg-gray-900 text-gray-100">
                              {index + 1}
                            </div>
                            <p
                              className={`w-2/3 cursor-pointer overflow-hidden pr-0.5 text-right text-sm font-semibold text-ellipsis whitespace-nowrap transition-colors group-hover:text-green-400 hover:text-green-400 md:text-base ${urlVideo.file_path === lesson.file_path ? "text-green-400" : "text-gray-600"}`}
                            >
                              {lesson.title}
                            </p>
                          </div>

                          <div
                            className={`transition-colors group-hover:text-green-400 ${urlVideo.file_path === lesson.file_path ? "text-green-400" : "text-gray-600"}`}
                          >
                            <SquarePlayIcon className="h-6 w-6" />
                          </div>
                        </div>
                      </button>
                    ),
                )}
            </div>
          ) : (
            <div className="flex h-[160px] items-center justify-center text-lg">
              <p>موردی یافت نشد!</p>
            </div>
          );
        })()
      ) : (
        <div className="flex min-h-[160px] items-center justify-center">
          <Loader2Icon className="h-8 w-8 animate-spin text-red-400" />
        </div>
      )}
    </div>
  );
}
