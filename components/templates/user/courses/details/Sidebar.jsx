"use client";

import useResourceStore from "@/store/user/useResouceStore";

export default function Sidebar({ setUrlVideo }) {
  const { resourcesCourse } = useResourceStore();

  const handleSetUrlVideo = (lesson) => {
    setUrlVideo({
      thumbnail_path: lesson.thumbnail_path,
      file_path: lesson.file_path,
    });
  };
  return (
    <div className="rounded bg-gray-100 p-4">
      <h2 className="mb-5 text-xl font-semibold">جلسات دوره</h2>
      <ol className="list-decimal space-y-1.5 pr-4 text-base">
        {resourcesCourse.length > 0 &&
          resourcesCourse.map(
            (lesson) =>
              lesson.type == "video" && (
                <li
                  key={lesson.id}
                  className="pr-1 text-base font-semibold text-gray-600"
                >
                  <button
                    onClick={() => handleSetUrlVideo(lesson)}
                    className="cursor-pointer hover:underline"
                  >
                    {lesson.title}
                  </button>
                </li>
              ),
          )}
      </ol>
    </div>
  );
}
