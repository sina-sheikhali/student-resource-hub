"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useResourceStore from "@/store/user/useResouceStore";
import dayjs from "dayjs";
import jalali from "jalali-dayjs";
import {
  CalendarDays,
  ChartColumnStacked,
  University,
  UserPen,
} from "lucide-react";

export default function Resources({ courseDetails }) {
  dayjs.extend(jalali);
  const { resourcesCourse } = useResourceStore();

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-4">
        <div className="flex items-center justify-between rounded-md bg-gray-100 p-4 shadow">
          <div className="flex w-3/4 flex-col font-bold">
            <span className="text-base text-gray-600">مدرس </span>
            <span className="block overflow-hidden pr-1 text-xs text-ellipsis whitespace-nowrap text-gray-400 md:text-sm">
              {courseDetails.teacher}
            </span>
          </div>
          <div className="rounded-full bg-green-400 p-2">
            <UserPen className="h-6 w-6 text-white md:h-8 md:w-8" />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-md bg-gray-100 p-4 shadow">
          <div className="flex w-3/4 flex-col font-bold">
            <span className="text-base text-gray-600">دسته بندی</span>
            <span className="block overflow-hidden pr-1 text-xs text-ellipsis whitespace-nowrap text-gray-400 md:text-sm">
              {courseDetails.category.name}
            </span>
          </div>
          <div className="rounded-full bg-green-400 p-2">
            <ChartColumnStacked className="h-6 w-6 text-white md:h-8 md:w-8" />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-md bg-gray-100 p-4 shadow">
          <div className="flex w-3/4 flex-col font-bold">
            <span className="text-base text-gray-600">دانشکده</span>
            <Tooltip>
              <TooltipTrigger>
                <span className="block overflow-hidden pr-1 text-right text-xs text-ellipsis whitespace-nowrap text-gray-400 md:text-sm">
                  {courseDetails.college.name}
                </span>
              </TooltipTrigger>
              <TooltipContent>{courseDetails.college.name}</TooltipContent>
            </Tooltip>
          </div>
          <div className="rounded-full bg-green-400 p-2">
            <University className="h-6 w-6 text-white md:h-8 md:w-8" />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-md bg-gray-100 p-4 shadow">
          <div className="flex w-3/4 flex-col font-bold">
            <span className="text-base text-gray-600">شروع دوره</span>
            <span className="block overflow-hidden pr-1 text-xs text-ellipsis whitespace-nowrap text-gray-400 md:text-sm">
              {dayjs(courseDetails.created_at)
                .locale("fa")
                .format("YYYY/MM/DD")}
            </span>
          </div>
          <div className="rounded-full bg-green-400 p-2">
            <CalendarDays className="h-6 w-6 text-white md:h-8 md:w-8" />
          </div>
        </div>
      </div>
      <div className="rounded bg-white p-4 shadow">
        <h3 className="mb-5 text-lg font-semibold md:text-xl">
          فایل‌های ضمیمه
        </h3>
        <ul className="space-y-1">
          {resourcesCourse.length > 0 &&
            resourcesCourse.map(
              (item) =>
                item.type !== "video" && (
                  <li key={item.id}>
                    <a
                      dir="ltr"
                      href={`https://mmmovahed.ir/storage/${item.file_path}`}
                      className="text-base font-semibold text-blue-500 hover:underline"
                      download
                    >
                      {item.title + "."}
                      {item.type}
                    </a>
                  </li>
                ),
            )}
        </ul>
      </div>
    </div>
  );
}
