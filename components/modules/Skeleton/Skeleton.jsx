"use client";
import { useEffect, useState } from "react";

export default function Skeleton() {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280)
        setColumns(4); // xl:grid-cols-4
      else if (width >= 1024)
        setColumns(3); // lg:grid-cols-3
      else if (width >= 640)
        setColumns(2); // sm:grid-cols-2
      else setColumns(1); // base:grid-cols-1
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="col-span-full grid w-full grid-cols-1 gap-5 overflow-x-auto  p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: columns }).map((_, idx) => (
        <div
          key={idx}
          className="col-span-1 h-[330px] animate-pulse rounded-lg bg-gray-200"
        />
      ))}
    </div>
  );
}
