import Card from "@/components/modules/Card/Card";
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";
import React from "react";

export default function MyCourses() {
  return (
    <div>
      <div className="mb-5">
        <SectionTitle text={"دوره های من"} color="bg-red-500" />
      </div>
      <div className="grid grid-cols-1 gap-5 rounded-sm bg-gray-50 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="col-span-1">
          <Card tag={[]} />
        </div>
      </div>
    </div>
  );
}
