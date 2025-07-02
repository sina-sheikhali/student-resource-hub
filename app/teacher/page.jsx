import React from "react";
import {
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import InfoCard from "@/components/modules/InfoCard/InfoCard";
import PieChartComp from "@/components/templates/teacher/index/chart/PieChart";
import ComposedChartComp from "@/components/templates/teacher/index/chart/composedChart";

export default function Teacher() {
  const cards = [
    {
      title: "دانشجویان",
      data: "320",
      bgColor: "from-[#f6e384] to-[#ffd500]",
      icon: AcademicCapIcon,
      iconBg: "bg-white",
      iconColor: "text-amber-400",
    },
    {
      title: "دوره ها",
      data: "200",
      bgColor: "from-[#ffbf96] to-[#fe7096]",
      icon: BookOpenIcon,
      iconBg: "bg-white",
      iconColor: "text-pink-400",
    },
    {
      title: "واچ تایم هفتگی ",
      data: "850",
      bgColor: "from-[#90caf9] to-[#047edf]",
      icon: AcademicCapIcon,
      iconBg: "bg-white",
      iconColor: "text-blue-400",
    },
    {
      title: "واچ تایم ماهانه",
      data: "850",
      bgColor: "from-[#84d9d2] to-[#07cdae]",
      icon: ClockIcon,
      iconBg: "bg-white",
      iconColor: "text-teal-400",
    },
  ];
  return (
    <div className="flex flex-col gap-y-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((item, index) => (
          <InfoCard {...item} key={index} />
        ))}
      </div>
      <div className="flex w-full flex-col gap-5 gap-y-10 lg:flex-row">
        <div className="flex w-full items-center justify-center rounded-md border p-5 shadow-xl lg:w-1/3">
          <div className="">
            <PieChartComp />
          </div>
        </div>
        <div className="w-full rounded-md border p-5 shadow-xl lg:w-2/3">
          <ComposedChartComp />
        </div>
      </div>
    </div>
  );
}
