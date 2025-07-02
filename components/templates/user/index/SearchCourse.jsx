"use client";

import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Card from "@/components/modules/Card/Card";
import debounce from "lodash.debounce";

const mockCourses = [{ id: 1, title: "دوره جاوااسکریپت مقدماتی" }];

export default function SearchCourses() {
  const [query, setQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(mockCourses);

  const handleSearch = useCallback(
    debounce((value) => {
      const results = mockCourses.filter((course) =>
        course.title.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredCourses(results);
    }, 300),
    [],
  );

  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  return (
    <div className="mt-8">
      <div className="mx-auto w-2/3 md:w-1/3">
        <Input
          type="text"
          placeholder="جستجوی دوره..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="placeholder:font-yekan mb-4"
        />
      </div>
      <div className="grid grid-cols-1 gap-5 space-y-2 bg-gray-50 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} className="col-span-1">
              <Card tag={[]} />
            </div>
          ))
        ) : (
          <p className="col-span-full py-10 text-center text-red-400">
            دوره‌ای یافت نشد.
          </p>
        )}
      </div>
    </div>
  );
}
