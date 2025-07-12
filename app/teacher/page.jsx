"use client";
import React, { useEffect } from "react";
import {
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import InfoCard from "@/components/modules/InfoCard/InfoCard";
import PieChartComp from "@/components/templates/teacher/index/chart/PieChart";
import ComposedChartComp from "@/components/templates/teacher/index/chart/composedChart";
import useStatisticStore from "@/store/admin/useStatisticStore";

export default function Teacher() {
  const { fetchStatistics, statistics } = useStatisticStore();

  useEffect(() => {
    fetchStatistics();
  }, []);
  const cards = [
    {
      title: "دانشجویان",
      data: statistics.total_users,
      bgColor: "from-[#f6e384] to-[#ffd500]",
      icon: AcademicCapIcon,
      iconBg: "bg-white",
      iconColor: "text-amber-400",
    },
    {
      title: "دوره ها",
      data: statistics.total_courses,
      bgColor: "from-[#ffbf96] to-[#fe7096]",
      icon: BookOpenIcon,
      iconBg: "bg-white",
      iconColor: "text-pink-400",
    },
    {
      title: "اساتید",
      data: statistics.total_teachers,
      bgColor: "from-[#90caf9] to-[#047edf]",
      icon: AcademicCapIcon,
      iconBg: "bg-white",
      iconColor: "text-blue-400",
    },
    {
      title: "ادمین",
      data: statistics.total_admins,
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
