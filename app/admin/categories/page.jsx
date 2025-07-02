"use client";
import AddCategory from "@/components/templates/admin/categories/AddCategory";
import TableSection from "@/components/templates/admin/categories/TableSection";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-8">
      <TableSection />
      <AddCategory />
    </div>
  );
}
