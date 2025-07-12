export default function NotFoundPage() {
  return (
    <div className="flex h-full max-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-6xl font-extrabold text-gray-400 lg:text-9xl">404</h1>
      <p className="mt-4 text-xl font-semibold text-gray-700 lg:text-2xl">
        صفحه پیدا نشد
      </p>
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
