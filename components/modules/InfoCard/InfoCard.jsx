import React from "react";
export default function InfoCard({
  title,
  data,
  bgColor,
  icon: Icon,
  iconBg,
  iconColor,
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-2xl bg-gradient-to-r ${bgColor} p-5 shadow-md`}
    >
      <div className="flex h-[52px] flex-col text-white">
        <p className="font-semibold">{title}</p>
        <h3 className="text-2xl font-bold">{data}</h3>
      </div>
      <div className={`rounded-full ${iconBg} p-3 ${iconColor}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  );
}
