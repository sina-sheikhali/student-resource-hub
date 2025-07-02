import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { StarIcon } from "@heroicons/react/24/solid";

export default function Card({
  _id,
  slug,
  name,
  teacher,
  ratings_avg_rating,
  thumbnailUrl,
  duration,
  tag,
  userRating,
}) {
  const [stars, setStars] = useState(
    () => Number(localStorage.getItem(`stars-${slug}`)) || userRating || 0,
  );
  const [hoveredStar, setHoveredStar] = useState(null);

  //   const { changeRating } = useTutorialStore();

  // آپدیت مقدار ستاره‌ها و ذخیره در localStorage
  const handleStarClick = (idx) => {
    const storedRating = localStorage.getItem(`stars-${slug}`);
    if (!storedRating && userRating === null) {
      setStars(idx + 1);
      localStorage.setItem(`stars-${slug}`, idx + 1);
      //   changeRating({
      //     courseId: _id,
      //     rate: localStorage.getItem(`stars-${slug}`),
      //   });
    }
  };

  return (
    <div className="flex transform flex-col gap-4 rounded-3xl border bg-white p-4 transition duration-500 hover:scale-105">
      <div className="">
        <Link href={`/dashboard/courses/${slug}`}>
          <Image
            src={""}
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
          <div className="flex items-center gap-x-0.5 text-yellow-500">
            <span className="block self-start">{ratings_avg_rating}</span>
            <StarIcon className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* <div className="flex justify-between">
          <div className="flex flex-row-reverse gap-x-0.5">
            {Array(5)
              .fill(null)
              .map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStarClick(idx)}
                  onMouseEnter={() => setHoveredStar(idx)}
                  onMouseLeave={() => setHoveredStar(null)}
                >
                  <FaStar
                    className={` ${
                      idx <=
                      (hoveredStar !== null && !stars ? hoveredStar : stars - 1)
                        ? "text-[#E0B31D]"
                        : "text-[#E0B31D]/50"
                    }`}
                  />
                </button>
              ))}
          </div>
          <div className="text-primaryTextBox flex items-center gap-2">
             <LuClock5 className="mt-1" /> 
             <span>{duration ? formatTime(duration) : "00:00"}</span>
           </div> 
         </div>  */}
    </div>
  );
}
