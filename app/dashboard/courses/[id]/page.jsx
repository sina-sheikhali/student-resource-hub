"use client";
import VideoPlayer from "@/components/templates/user/courses/details/VideoPlayer";
import Sidebar from "@/components/templates/user/courses/details/Sidebar";
import Resources from "@/components/templates/user/courses/details/Resources";
import Comments from "@/components/templates/user/courses/details/Comment";
import useCourseStore from "@/store/user/useCourseStore";
import { use, useEffect, useState } from "react";
import useResourceStore from "@/store/user/useResouceStore";

export default function page({ params }) {
  const { id } = use(params);
  const [urlVideo, setUrlVideo] = useState("");

  const { fetchCourseDetails, courseDetails } = useCourseStore();
  const { fetchResourcesCourse, resourcesCourse } = useResourceStore();

  useEffect(() => {
    fetchCourseDetails(id);
    fetchResourcesCourse(id);
  }, []);

  if (courseDetails?.course?.name) {
    return (
      <div className="mt-5">
        <h1 className="mb-4 text-2xl font-bold">{courseDetails.course.name}</h1>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-1/4">
            <Sidebar setUrlVideo={setUrlVideo} />
          </div>

          <div className="flex flex-col gap-6 lg:w-3/4">
            <VideoPlayer courseDetails={courseDetails} urlVideo={urlVideo} />
            <Resources courseDetails={courseDetails.course} />
            <Comments courseId={id} />
          </div>
        </div>
      </div>
    );
  }
}
