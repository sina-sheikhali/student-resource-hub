"use client";
import AddCollege from "@/components/templates/admin/colleges/AddCollege";
import TableSection from "@/components/templates/admin/colleges/TableSection";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-8">
      <TableSection />
      <AddCollege />
    </div>
  );
}
