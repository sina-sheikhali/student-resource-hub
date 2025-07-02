"use client";
import FormComp from "@/components/templates/admin/courses/CreateCourse";
import TableSection from "@/components/templates/admin/courses/TableSection";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-8">
      <TableSection />
      <FormComp />
    </div>
  );
}
