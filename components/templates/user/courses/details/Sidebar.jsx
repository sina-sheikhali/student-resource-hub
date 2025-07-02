"use client";

export default function Sidebar({ lessons }) {
  return (
    <div className="rounded bg-gray-100 p-4">
      <h2 className="mb-2 font-bold">جلسات دوره</h2>
      <ul className="space-y-1">
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            className="cursor-pointer text-sm text-blue-600 hover:underline"
          >
            {lesson.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
