"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import Card from "@/components/modules/Card/Card";
import debounce from "lodash.debounce";
import useCourseStore from "@/store/user/useCourseStore";
import useLoadingStore from "@/store/common/useLoadingStore";
import { Loader2Icon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "@/components/modules/Pagination/Pagination";

export default function SearchCourses() {
  const [query, setQuery] = useState("");
  const [openSearchResult, setOpenSearchResult] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const resultRef = useRef(null); // برای اسکرول

  const { serachCourse, searchResult, setSearchResult } = useCourseStore();
  const searchCourseLoading = useLoadingStore((state) =>
    state.isLoading("searchCourseLoading"),
  );

  const handleSearch = useCallback(
    debounce((value) => {
      serachCourse(value);
    }, 300),
    [],
  );

  useEffect(() => {
    if (query.trim() !== "") {
      handleSearch(query);
      setOpenSearchResult(true);
      setCurrentPage(1); // ریست صفحه هنگام جستجوی جدید
    } else {
      setSearchResult("");
      setOpenSearchResult(false);
    }
    return () => {
      handleSearch.cancel();
    };
  }, [query, handleSearch]);

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

  const paginatedResults = searchResult.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(searchResult.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mt-8">
      <div className="mx-auto w-2/3 md:w-1/3">
        <Input
          type="text"
          placeholder="جستجوی دوره...(بر اساس : نام دوره | نام استاد  )"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="placeholder:font-yekan mb-4"
        />
      </div>

      <AnimatePresence>
        {openSearchResult && (
          <motion.div
            ref={resultRef}
            className="pt-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h3 className="mb-5 text-lg font-semibold md:text-xl">
                نتایج جستجو ...
              </h3>
            </div>

            <div className="grid min-h-[408px] grid-cols-1 gap-5 space-y-2 rounded-sm bg-gray-50 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {!searchCourseLoading ? (
                paginatedResults.length > 0 ? (
                  paginatedResults.map((course) => (
                    <div key={course.id} className="col-span-1">
                      <Card slug={course.id} {...course} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center">
                    <p className="py-10 text-center text-gray-500">
                      دوره‌ای یافت نشد.
                    </p>
                  </div>
                )
              ) : (
                <div className="col-span-full flex items-center justify-center">
                  <Loader2Icon className="h-8 w-8 animate-spin text-red-400" />
                </div>
              )}
            </div>

            {/* صفحه‌بندی */}
            {searchResult.length > itemsPerPage && (
              <div className="mt-6">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
