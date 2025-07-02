"use client";
import AddCollege from "@/components/templates/admin/teachers/AddTeacher";
import TableSection from "@/components/templates/admin/teachers/TableSection";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-8">
      <TableSection />
      <AddCollege />
    </div>
  );
}
