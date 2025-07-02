import MostWanted from "@/components/templates/user/courses/Slider/MostWanted";
import NewlyAddedCourses from "@/components/templates/user/courses/Slider/NewlyAddedCourses";
import RatedCourses from "@/components/templates/user/courses/Slider/RatedCourses";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-y-10">
      <MostWanted />
      <RatedCourses />
      <NewlyAddedCourses />
    </div>
  );
}
