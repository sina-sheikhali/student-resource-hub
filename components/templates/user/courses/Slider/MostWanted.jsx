"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

// import required modules
import { Navigation } from "swiper/modules";
import Card from "@/components/modules/Card/Card";
import useCourseStore from "@/store/user/useCourseStore";
import { useEffect } from "react";
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";
import Skeleton from "@/components/modules/Skeleton/Skeleton";
import useLoadingStore from "@/store/common/useLoadingStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function MostWanted() {
  const { mostWantedCourses, fetchByFilter } = useCourseStore();

  const isLoading = useLoadingStore((state) =>
    state.isLoading("mostwantedLoading"),
  );

  useEffect(() => {
    fetchByFilter("mostwanted");
  }, []);

  return (
    <div className="">
      <div className="mb-5">
        <SectionTitle text={"پربازدید ترین ها"} color="bg-red-500" />
      </div>
      <div className="relative rounded-sm bg-gray-50 p-3">
        <Swiper
          slidesPerView={4}
          spaceBetween={5}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-mostwanted-next-custom-1",
            prevEl: ".swiper-button-mostwanted-prev-custom-1",
          }}
          modules={[Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          className="mySwiper"
        >
          {isLoading ? (
            <Skeleton />
          ) : mostWantedCourses.length && mostWantedCourses.length > 0 ? (
            mostWantedCourses.map((item) => (
              <SwiperSlide key={item.id} className="!p-2">
                <Card tag={[]} {...item} slug={item.id} />
              </SwiperSlide>
            ))
          ) : (
            <div className="flex h-full min-h-[346px] w-full items-center justify-center">
              <p className="text-center text-gray-500">دوره‌ای پیدا نشد.</p>
            </div>
          )}

          <button className="swiper-button-mostwanted-next-custom-1 absolute top-1/2 left-0 z-20 -translate-y-1/2 transform cursor-pointer">
            <ChevronLeft className="h-7 w-7 rounded-full bg-cyan-500 p-1 text-white hover:bg-cyan-500/85 md:h-9 md:w-9" />
          </button>
          <button className="swiper-button-mostwanted-prev-custom-1 absolute top-1/2 right-0 z-20 -translate-y-1/2 transform cursor-pointer">
            <ChevronRight className="h-7 w-7 rounded-full bg-cyan-500 p-1 text-white hover:bg-cyan-500/85 md:h-9 md:w-9" />
          </button>
        </Swiper>
      </div>
    </div>
  );
}
