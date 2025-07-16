import Skeleton from "@/components/modules/Skeleton/Skeleton";
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";
import Card from "@/components/modules/Card/Card";
import { useEffect, useState, useRef } from "react";
import Pagination from "@/components/modules/Pagination/Pagination";
import useCourseStore from "@/store/user/useCourseStore";
import useLoadingStore from "@/store/common/useLoadingStore";

export default function AllCourses() {
  const resultRef = useRef(null);
  const { fetchAllCourses, courses, searchResult } = useCourseStore();
  const isLoading = useLoadingStore((state) =>
    state.isLoading("fetchAllCourses"),
  );
  const searchCourseLoading = useLoadingStore((state) =>
    state.isLoading("searchCourseLoading"),
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const sectionRef = useRef(null);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const totalPages = Math.ceil((courses?.length || 0) / itemsPerPage);

  const paginatedCourses = courses?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (resultRef.current) {
        resultRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [currentPage]);

  if (!searchCourseLoading && searchResult?.length == 0) {
    return (
      <div ref={resultRef} className="pt-5">
        <div className="mb-5" ref={sectionRef}>
          <SectionTitle text={"دوره ها"} color="bg-blue-500" />
        </div>

        {isLoading ? (
          <Skeleton />
        ) : courses?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-5 gap-y-8 rounded-sm bg-gray-50 p-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {paginatedCourses.map((item) => (
                <div className="col-span-1" key={`${item.id}-courses`}>
                  <Card {...item} slug={item.id} />
                </div>
              ))}
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="col-span-full flex h-full min-h-[346px] w-full items-center justify-center rounded-sm bg-gray-50">
            <p className="text-center text-gray-500">دوره‌ای یافت نشد.</p>
          </div>
        )}
      </div>
    );
  }
}
