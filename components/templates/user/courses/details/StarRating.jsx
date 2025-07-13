"use client";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import useCourseDetailsStore from "@/store/user/useCourseDetailsStore";

export default function StarRating({ courseId, user_rating }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [hasRated, setHasRated] = useState(false);
  const { insertRate, updateRate } = useCourseDetailsStore();

  useEffect(() => {
    setRating(user_rating);
    setHover(null);
    setHasRated(false);
  }, [courseId, user_rating]);

  const handleClick = () => {
    if (hover && !hasRated) {
      const roundedRating = Math.round(hover * 2) / 2;
      setRating(roundedRating);
      setHasRated(true);

      if (user_rating) {
        updateRate({
          course_id: courseId,
          rating: roundedRating,
        });
      } else {
        insertRate({
          course_id: courseId,
          rating: roundedRating,
        });
      }
    }
  };

  const getFill = (index) => {
    const value = hover ?? rating;
    if (value >= index + 1) return "100%";
    if (value >= index + 0.5) return "50%";
    return "0%";
  };

  return (
    <div className="direction-ltr flex gap-1">
      {[0, 1, 2, 3, 4].map((index) => {
        const reversedIndex = 4 - index;
        const fill = getFill(reversedIndex);

        return (
          <div
            key={reversedIndex}
            className={`relative h-6 w-6 cursor-pointer ${hasRated ? "pointer-events-none opacity-50" : ""}`}
            onMouseMove={(e) => {
              const { left, width } = e.currentTarget.getBoundingClientRect();
              const isHalf = e.clientX - left < width / 2;
              setHover(reversedIndex + (isHalf ? 0.5 : 1));
            }}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              const { left, width } = e.currentTarget.getBoundingClientRect();
              const isHalf = touch.clientX - left < width / 2;
              setHover(reversedIndex + (isHalf ? 0.5 : 1));
            }}
            onMouseLeave={() => {
              if (!rating) setHover(null);
            }}
            onClick={handleClick}
          >
            <Star className="absolute top-0 left-0 h-full w-full text-gray-300" />
            <Star
              className="absolute top-0 left-0 h-full w-full overflow-hidden text-yellow-400"
              style={{
                clipPath: `inset(0 ${100 - parseFloat(fill)}% 0 0)`,
                fill: rating ? "your-desired-fill-color" : "currentColor",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
