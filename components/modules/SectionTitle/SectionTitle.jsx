import React from "react";

export default function SectionTitle({ text, color = "bg-blue-500" }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-xs ${color}`} />
      <h2 className="text-lg font-semibold md:text-xl">{text}</h2>
    </div>
  );
}
