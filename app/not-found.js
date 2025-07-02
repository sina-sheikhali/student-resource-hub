export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-9xl font-extrabold text-gray-400">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-700">صفحه پیدا نشد</p>
      <p className="mt-2 text-gray-500">
        متاسفیم، صفحه‌ای که دنبال آن هستید وجود ندارد یا حذف شده است.
      </p>
      <a
        href="/"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white shadow transition hover:bg-blue-700"
      >
        بازگشت به صفحه اصلی
      </a>
    </div>
  );
}
