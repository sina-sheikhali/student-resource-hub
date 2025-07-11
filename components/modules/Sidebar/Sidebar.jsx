"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  SidebarProvider,
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BookCheck,
  House,
  LogOut,
  Menu,
  ChartBarStacked,
  University,
  SquareUserRound,
  BookPlus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

const menuItemsUser = [
  { label: "داشبورد", icon: <House size={20} />, path: "/dashboard" },
  {
    label: "دوره‌ها",
    icon: <BookCheck size={20} />,
    path: "/dashboard/courses",
  },
];

const menuItemsAdmin = [
  { label: "داشبورد", icon: <House size={20} />, path: "/admin" },
  { label: "دوره‌ها", icon: <BookCheck size={20} />, path: "/admin/courses" },
  {
    label: "دانشکده ها",
    icon: <University size={20} />,
    path: "/admin/colleges",
  },

  {
    label: "اساتید",
    icon: <SquareUserRound size={20} />,
    path: "/admin/teachers",
  },
  {
    label: "دانشجویان",
    icon: <Users size={20} />,
    path: "/admin/students",
  },
  {
    label: "دسته بندی ها",
    icon: <ChartBarStacked size={20} />,
    path: "/admin/categories",
  },
];

const menuItemsTeacher = [
  { label: "داشبورد", icon: <House size={20} />, path: "/teacher" },
  {
    label: "ایجاد دوره",
    icon: <BookPlus size={20} />,
    path: "/teacher/createCourse",
  },
  {
    label: "دوره ها",
    icon: <BookCheck size={20} />,
    path: "/teacher/courses",
  },
];

const getRoleFromPath = (pathname) => {
  const firstSegment = pathname.split("/")[1];
  if (firstSegment === "dashboard") return "user";
  if (firstSegment === "admin") return "admin";
  if (firstSegment === "teacher") return "teacher";
  return null;
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const role = getRoleFromPath(pathname);

  let menuItems = [];
  if (role === "user") menuItems = menuItemsUser;
  else if (role === "admin") menuItems = menuItemsAdmin;
  else if (role === "teacher") menuItems = menuItemsTeacher;

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });
    Cookies.remove("role_token", { path: "/" });
    router.replace("/sign-in");
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <div className="absolute h-14 w-full bg-slate-100">
          <SheetTrigger asChild>
            <Button className="absolute top-2 right-2 z-50">
              <Menu />
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent side="right" className="w-[250px] bg-white p-0">
          {/* ✅ این قسمت رو اضافه کن */}
          <SheetHeader>
            <SheetTitle className="">
              <span className="text-lg">منو</span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex h-full flex-col px-4">
            <ul>
              {menuItems.map((item) => (
                <li key={item.path} className="mb-2">
                  <Link
                    href={item.path}
                    className="flex items-center gap-3 rounded p-2 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto border-t pt-4">
              <Button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <LogOut /> خروج
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <SidebarProvider>
      <div className="relative flex">
        <ShadSidebar className="transition-width flex w-64 flex-col bg-white shadow-lg duration-300 ease-in-out">
          <SidebarHeader className="border-b p-4">
            <h1 className="text-xl font-bold">خوش آمدید</h1>
          </SidebarHeader>
          <SidebarContent className="flex-1 overflow-y-auto p-4">
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem
                  key={`${item.href}-${index}`}
                  className={`mb-2 rounded-lg ${
                    pathname === item.path ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                >
                  <Link
                    href={item.path}
                    className="flex items-center gap-3 px-3 py-2"
                  >
                    {item.icon}
                    <span className="text-base">{item.label}</span>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <Button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm hover:underline"
            >
              <LogOut /> خروج
            </Button>
          </SidebarFooter>
        </ShadSidebar>
      </div>
    </SidebarProvider>
  );
}
