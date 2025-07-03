"use client";
import { useEffect, useState } from "react";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import Sidebar from "@/components/modules/Sidebar/Sidebar";

const VALID_ROUTES = ["dashboard", "teacher", "admin"];

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // یا یه لودر نمایش بده

  const isValidRoute = VALID_ROUTES.includes(segment);
  const showSidebar = isValidRoute && !pathname.endsWith("404");

  return (
    <div className="flex max-w-[2500px]">
      {showSidebar && (
        <div>
          <Sidebar />
        </div>
      )}
      <div
        className={`${
          showSidebar ? "flex-1" : "w-full"
        } min-h-screen px-5 py-20 md:py-5`}
      >
        {children}
      </div>
    </div>
  );
}
