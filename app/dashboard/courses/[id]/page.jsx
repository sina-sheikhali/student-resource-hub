"use client";
import VideoPlayer from "@/components/templates/user/courses/details/VideoPlayer";
import Sidebar from "@/components/templates/user/courses/details/Sidebar";
import Resources from "@/components/templates/user/courses/details/Resources";
import Comments from "@/components/templates/user/courses/details/Comment";
import useCourseStore from "@/store/user/useCourseStore";
import { useEffect } from "react";

export default function page({ params }) {
  const courseId = params.id;
  const { fetchCourseDetails, courseDetails } = useCourseStore();

  const course = {
    title: "آموزش ری‌اکت",
    videoUrl: "/videos/react-intro.mp4",
    lessons: [
      { id: 1, title: "معرفی دوره" },
      { id: 2, title: "JSX چیست؟" },
      { id: 3, title: "کامپوننت‌ها" },
    ],
    files: ["react.pdf", "project.zip"],
  };
  useEffect(() => {
    fetchCourseDetails(courseId);
    console.log(courseDetails);
  }, []);

  return (
    <div className="mt-5">
      <h1 className="mb-4 text-2xl font-bold">{course.title}</h1>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* لیست جلسات */}
        <div className="lg:w-1/4">
          <Sidebar lessons={course.lessons} />
        </div>

        {/* محتوای اصلی */}
        <div className="flex flex-col gap-6 lg:w-3/4">
          <VideoPlayer videoUrl={course.videoUrl} />
          <Resources files={course.files} />
          <Comments courseId={courseId} />
        </div>
      </div>
    </div>
  );
}
