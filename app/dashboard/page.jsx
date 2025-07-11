"use client";
import Sidebar from "@/components/modules/Sidebar/Sidebar";
import MyCourses from "@/components/templates/user/index/MyCourses";
import SearchCourses from "@/components/templates/user/index/SearchCourse";
import React from "react";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-y-5">
      <SearchCourses />
      <div className="">
        <MyCourses />
      </div>
    </div>
  );
}
