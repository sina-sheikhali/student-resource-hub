"use client";

export default function Resources({ files }) {
  return (
    <div className="rounded bg-white p-4 shadow">
      <h3 className="mb-2 font-semibold">فایل‌های ضمیمه</h3>
      <ul className="space-y-1 text-sm">
        {files.map((file, idx) => (
          <li key={idx}>
            <a
              href={`/files/${file}`}
              className="text-blue-500 hover:underline"
              download
            >
              📎 {file}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
