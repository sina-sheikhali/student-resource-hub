import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Users } from "lucide-react";
import { StarIcon } from "@heroicons/react/24/solid";
import { baseUrl } from "@/client/baseUrl";

export default function Card({
  _id,
  slug,
  thumbnail_path,
  name,
  teacher,
  ratings_avg_rating,
  thumbnailUrl,
  users_count,
  tag,
  userRating,
}) {
  return (
    <div className="flex transform flex-col gap-4 rounded-3xl border bg-white p-4 transition duration-500 hover:scale-105">
      <div className="">
        <Link href={`/dashboard/courses/${slug}`}>
          <Image
            src={`https://mmmovahed.ir/storage/${thumbnail_path}`}
            width={200}
            height={200}
            className="h-[200px] w-full object-cover"
            alt=""
          />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <Link href={`/dashboard/courses/${slug}`}>
            <span className="text-primaryTitle line-clamp-1 text-xl font-semibold">
              {name}
            </span>
          </Link>
        </div>
        <div className="text-primaryTextBoxflex w-full gap-3 text-sm">
          <p className="line-clamp-2 text-ellipsis text-gray-400">
            دوره دیزاین پترن به شما کمک می‌کند کدهای خوانا و مقیاس‌پذیر بنویسید
            و با یادگیری الگوهای استاندارد، به یک برنامه نویس داناتر تبدیل شوید
            و شانس استخدام خود را افزایش دهید.
          </p>
        </div>
        <div className="border-primaryGray2 border-t-2 pt-2"></div>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-x-0.5 text-gray-500">
            <User />
            <span>{teacher}</span>
          </div>
          {ratings_avg_rating && (
            <div className="flex items-center gap-x-0.5 text-yellow-500">
              <span className="block self-start">
                {ratings_avg_rating && parseInt(ratings_avg_rating).toFixed(1)}
              </span>
              <StarIcon className="h-5 w-5" />
            </div>
          )}
          {users_count && (
            <div className="flex items-center gap-x-0.5 text-gray-800">
              <span className="block self-start ">{users_count}</span>
              <Users className="h-5 w-5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
