"use client";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#ffd500", "#fe7096", "#047edf", "#07cdae"];

export default function PieChartComp() {
  return (
    <div>
      <div className="w-full text-center">
        <h3 className="text-lg font-semibold md:text-xl">آمار دانشجویان</h3>
      </div>
      <PieChart
        width={300}
        height={300}
        className="flex items-center justify-center"
      >
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value} نفر`, `تعداد`]} // متن دلخواه
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />
      </PieChart>
      <div className="flex gap-x-5">
        <div className="flex items-center justify-center gap-x-2">
          <div className="h-3 w-3 rounded-full bg-[#ffd500]"></div>
          <span className="text-sm">ریاضی</span>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <div className="h-3 w-3 rounded-full bg-[#fe7096]"></div>
          <span className="text-sm">ادبیات</span>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <div className="h-3 w-3 rounded-full bg-[#047edf]"></div>
          <span className="text-sm">زبان تخصصی</span>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <div className="h-3 w-3 rounded-full bg-[#07cdae]"></div>
          <span className="text-sm">ریاضی گسسته</span>
        </div>
      </div>
    </div>
  );
}
