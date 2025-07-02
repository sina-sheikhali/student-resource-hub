"use client";

export default function Comments({ courseId }) {
  return (
    <div className="rounded bg-gray-50 p-4 shadow">
      <h3 className="mb-2 font-semibold">نظرات کاربران</h3>
      {/* بعداً می‌تونی اینجا فرم ارسال نظر و لیست کامنت‌ها اضافه کنی */}
      <p className="text-sm text-gray-500">نظری ثبت نشده است.</p>
    </div>
  );
}
