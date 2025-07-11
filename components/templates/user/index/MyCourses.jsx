import Card from "@/components/modules/Card/Card";
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";
import Skeleton from "@/components/modules/Skeleton/Skeleton";
import useLoadingStore from "@/store/common/useLoadingStore";
import useCourseStore from "@/store/user/useCourseStore";
import React, { useEffect } from "react";

export default function MyCourses() {
  const { fetchMyCourse, myCourses } = useCourseStore();

  const isLoading = useLoadingStore((state) =>
    state.isLoading("fetchMyCoursesLoading"),
  );

  useEffect(() => {
    fetchMyCourse();
  }, []);

  return (
    <div>
      <div className="mb-5">
        <SectionTitle text={"دوره های من"} color="bg-red-500" />
      </div>
      <div className="grid grid-cols-1 gap-5 rounded-sm bg-gray-50 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <Skeleton />
        ) : myCourses?.length > 0 ? (
          myCourses.map((item) => (
            <div className="col-span-1" key={`${item.id}-myCourses`}>
              <Card {...item} slug={item.id}  />
            </div>
          ))
        ) : (
          <div className="col-span-full flex h-full min-h-[346px] w-full items-center justify-center">
            <p className="text-center text-gray-500">دوره‌ای پیدا نشد.</p>
          </div>
        )}
      </div>
    </div>
  );
}
